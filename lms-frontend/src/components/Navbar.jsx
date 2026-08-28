import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { api, API_URL } from '../api/client.js';
import { Button, Badge } from './ui.jsx';
import { IoPerson, IoNotificationsOutline } from "react-icons/io5";
import { io } from 'socket.io-client';
import { toast } from 'react-toastify';

export default function Navbar() {
  const { user, logout, token } = useAuth();
  const navigate = useNavigate();


  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileModalOpen, setProfileModalOpen] = useState(false);
  const [enrolledCount, setEnrolledCount] = useState(0);
  const [createdCount, setCreatedCount] = useState(0);

  // 🔔 NOTIFICATION STATES
  const [notifications, setNotifications] = useState([]);
  const [notifDropdownOpen, setNotifDropdownOpen] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  const modalRef = useRef(null);
  const profileButtonRef = useRef(null);
  const notifRef = useRef(null);

  const closeMobileMenu = () => setMobileMenuOpen(false);

  const toggleProfileModal = (e) => {
    e.stopPropagation();
    setProfileModalOpen((prev) => !prev);
  };

  const toggleNotifDropdown = (e) => {
    e.stopPropagation();
    setNotifDropdownOpen((prev) => !prev);
  };
  async function handleMarkAsRead(id) {
    try {
      await api.markNotificationRead(id, token);

      setNotifications((prev) =>
        prev.map((notification) =>
          notification.id === id
            ? { ...notification, isRead: true }
            : notification
        )
      );

      setUnreadCount((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error('Failed to mark notification as read:', err);
    }
  }
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target) &&
        profileButtonRef.current &&
        !profileButtonRef.current.contains(event.target)
      ) {
        setProfileModalOpen(false);
      }
      if (notifRef.current && !notifRef.current.contains(event.target)) {
        setNotifDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 📥 1. FETCH INITIAL NOTIFICATIONS FROM DATABASE
  useEffect(() => {
    if (!user || !token) return;

    const fetchNotifications = async () => {
      try {
        const res = await api.getNotifications(token);

        const list = Array.isArray(res)
          ? res
          : res?.data || res?.notifications || [];

        setNotifications(list);

        // Database wali unread notifications ka count
        setUnreadCount(
          list.filter((notification) => !notification.isRead).length
        );
      } catch (err) {
        console.error("Notifications Fetch Error:", err);
      }
    };

    fetchNotifications();
  }, [user, token]);

  // ⚡ 2. WEBSOCKET REAL-TIME LISTENER
  useEffect(() => {
    const rawUserId = user?.sub || user?.id;
    if (!rawUserId || !token) return;

    const userId = Number(rawUserId);

    const socket = io(API_URL, {
      query: { userId: userId },
      auth: { token: token },
      transports: ['websocket'],
    });

    socket.on('connect', () => {
      console.log('⚡ Socket Connected successfully as User ID:', userId);
      socket.emit('joinRoom', { userId });
    });

    socket.on('notification', (newNotification) => {
      console.log('🔔 New Notification Received:', newNotification);

      setNotifications((prev) => [newNotification, ...prev]);
      setUnreadCount((prev) => prev + 1);

      // React-Toastify Implementation
      toast.info(
        <div className="flex items-start gap-3 text-wrap">
          <div className="flex-1 overflow-hidden">
            <p className="text-xs font-bold text-ink-900 capitalize">
              {newNotification.type || 'New Notification'}
            </p>

            <p className="text-xs text-ink-700 mt-0.5 break-words whitespace-normal leading-relaxed">
              {newNotification.message}
            </p>
          </div>
        </div>,
        {
          position: "top-right",
          autoClose: 4000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    });

    socket.on('connect_error', (error) => {
      console.error('❌ Socket Connection Error:', error);
    });

    return () => {
      socket.disconnect();
    };
  }, [user, token]);

  // Existing Enrollment & Course Counts Logic
  useEffect(() => {
    if (!user || !token) return;

    const fetchCounts = () => {
      if (user.role === 'student') {
        api.getMyEnrollments(token)
          .then((res) => {
            const list = Array.isArray(res)
              ? res
              : (res?.data || res?.courses || res?.enrollments || []);
            setEnrolledCount(list.length);
          })
          .catch((err) => console.error("Enrollments Fetch Error:", err));
      } else if (user.role === 'instructor') {
        if (typeof api.getInstructorCourses !== 'function') {
          console.error("API Error: 'api.getInstructorCourses' is not defined in client.js");
          return;
        }

        api.getInstructorCourses(token)
          .then((res) => {
            let list = [];
            if (Array.isArray(res)) {
              list = res;
            } else if (res && typeof res === 'object') {
              list = res.courses || res.data || res.result || res.items || [];
            }
            setCreatedCount(list.length);
          })
          .catch((err) => console.error("Instructor Courses Fetch Error:", err));
      }
    };

    fetchCounts();

    window.addEventListener('courseCreated', fetchCounts);
    window.addEventListener('courseDeleted', fetchCounts);

    return () => {
      window.removeEventListener('courseCreated', fetchCounts);
      window.removeEventListener('courseDeleted', fetchCounts);
    };
  }, [user, token]);

  async function handleDeleteNotification(id) {
    try {
      await api.deleteNotification(id, token);
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      console.error('Failed to delete notification:', err);
    }
  }

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/8 bg-paper/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3.5 sm:px-6">
        {/* Brand Logo */}
        <Link
          to="/"
          onClick={closeMobileMenu}
          className="flex items-center font-display text-lg font-semibold tracking-tight text-ink-900"
        >
          <img
            src="/logo-edu.png"
            alt="EduVerse"
            className="mr-2.5 h-10 w-10 sm:h-12 sm:w-12"
          />
          <span>
            EduVerse LMS<span className="text-brand-500">.</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
          >
            Home
          </Link>
          <Link
            to="/courses"
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
          >
            Courses
          </Link>

          {user?.role === 'student' && (
            <>
              <Link
                to="/my-courses"
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                My Courses
              </Link>
              <Link
                to="/certificates"
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                Certificates
              </Link>
            </>
          )}

          {user?.role === 'instructor' && (
            <>
              <Link
                to="/instructor/courses"
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                My Courses
              </Link>
              <Link
                to="/courses/new"
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                Create course
              </Link>
            </>
          )}

          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <Link
              to="/instructor/certificates"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
            >
              Issued Certificates
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link
              to="/categories"
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
            >
              Categories
            </Link>
          )}

          {user ? (
            <div className="relative ml-2 flex items-center gap-2">

              {/* 🔔 NOTIFICATION BELL BUTTON WITH DROPDOWN */}
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  onClick={toggleNotifDropdown}
                  className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-ink-900/10 bg-white/60 text-ink-700 transition hover:bg-white hover:text-brand-500 hover:shadow-sm focus:outline-none"
                  aria-label="View Notifications"
                >
                  <IoNotificationsOutline className="h-5 w-5" />

                  {/* Red Unread Counter Badge */}
                  {unreadCount > 0 && (
                    <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white animate-pulse">
                      {unreadCount > 9 ? '9+' : unreadCount}
                    </span>
                  )}
                </button>

                {/* Notification Dropdown Panel */}
                {notifDropdownOpen && (
                  <div className="absolute right-0 top-12 z-50 w-80 rounded-2xl border border-ink-900/10 bg-white p-4 shadow-xl animate-in fade-in zoom-in-95">
                    <div className="mb-3 flex items-center justify-between border-b border-ink-900/8 pb-2">
                      <h4 className="text-xs font-bold text-ink-900">Notifications</h4>
                      <span className="text-[10px] text-ink-700 font-medium">
                        {notifications.length} Total
                      </span>
                    </div>

                    <div className="max-h-64 space-y-2 overflow-y-auto pr-1">
                      {notifications.length === 0 ? (
                        <p className="py-6 text-center text-xs text-ink-700">
                          No notifications yet
                        </p>
                      ) : (
                        notifications.map((item, index) => (
                          <div
                            key={item.id || index}
                            onClick={() => {
                              if (!item.isRead) {
                                handleMarkAsRead(item.id);
                              }
                            }}
                            className={`flex cursor-pointer items-start justify-between gap-2 rounded-xl p-3 text-xs transition ${item.isRead
                              ? 'bg-ink-900/5'
                              : 'bg-brand-500/10'
                              }`}
                          >
                            <div className="flex-1">
                              <p className="font-semibold text-brand-500 capitalize">
                                {item.type || 'System Notification'}
                              </p>
                              <p className="mt-1 text-ink-900">{item.message}</p>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleDeleteNotification(item.id)}
                              className="shrink-0 text-ink-500 hover:text-red-600"
                              title="Delete"
                            >
                              ✕
                            </button>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Profile Modal Button */}
              <button
                ref={profileButtonRef}
                type="button"
                onClick={toggleProfileModal}
                className="flex items-center gap-2 rounded-xl border border-ink-900/10 bg-white/60 px-3.5 py-1.5 text-left font-medium text-ink-900 transition hover:bg-white hover:shadow-sm focus:outline-none"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-full bg-brand-500/10 text-xs font-bold text-brand-500">
                  <IoPerson />
                </div>
                <span className="text-sm">Profile</span>
                <span className="text-xs text-ink-700">
                  {profileModalOpen ? '▲' : '▼'}
                </span>
              </button>

              {/* Profile Modal Drawer */}
              {profileModalOpen && (
                <div
                  ref={modalRef}
                  className="absolute right-0 top-12 z-50 w-72 rounded-2xl border border-ink-900/10 bg-white p-5 shadow-xl animate-in fade-in zoom-in-95"
                >
                  <div className="mb-3 flex items-center gap-3 border-b border-ink-900/8 pb-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-brand-500/10 font-bold text-brand-500">
                      {user.email?.charAt(0).toUpperCase()}
                    </div>
                    <div className="overflow-hidden">
                      <p className="truncate text-xs font-semibold text-ink-900">
                        {user.email}
                      </p>
                      <Badge tone="brand" className="mt-1">
                        {user.role}
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2 py-1 text-sm text-ink-700">
                    <div className="flex items-center justify-between rounded-lg bg-ink-900/5 px-3 py-2">
                      <span className="text-xs text-ink-700">Account Role</span>
                      <span className="font-semibold capitalize text-ink-900">
                        {user.role}
                      </span>
                    </div>

                    {user.role === 'student' && (
                      <div className="flex items-center justify-between rounded-lg bg-brand-500/10 px-3 py-2 text-brand-900">
                        <span className="text-xs font-medium">Enrolled Courses</span>
                        <span className="font-bold">{enrolledCount}</span>
                      </div>
                    )}

                    {user.role === 'instructor' && (
                      <div className="flex items-center justify-between rounded-lg bg-brand-500/10 px-3 py-2 text-brand-900">
                        <span className="text-xs font-medium">Created Courses</span>
                        <span className="font-bold">{createdCount}</span>
                      </div>
                    )}
                  </div>

                  <div className="mt-4 pt-2">
                    <Button
                      variant="outline"
                      className="w-full justify-center"
                      onClick={() => {
                        setProfileModalOpen(false);
                        logout();
                        navigate('/');
                      }}
                    >
                      Log out
                    </Button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="ml-2 flex items-center gap-2">
              <Link to="/login">
                <Button variant="ghost">Log in</Button>
              </Link>
              <Link to="/register">
                <Button variant="accent">Sign up</Button>
              </Link>
            </div>
          )}
        </nav>

        {/* Mobile Hamburger Toggle */}
        <div className="flex items-center gap-2 md:hidden">
          {user && (
            <button
              type="button"
              onClick={toggleProfileModal}
              className="flex items-center gap-1.5 rounded-lg border border-ink-900/10 bg-white/60 px-3 py-1.5 text-xs font-medium text-ink-900"
            >
              <IoPerson />
              <span>Profile</span>
            </button>
          )}

          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="inline-flex items-center justify-center rounded-lg p-2 text-ink-700 hover:bg-ink-900/5 focus:outline-none"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Profile Card Drawer */}
      {profileModalOpen && (
        <div className="border-t border-ink-900/8 bg-white p-4 shadow-lg md:hidden">
          <div className="mb-3 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/10 font-bold text-brand-500">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
            <div className="overflow-hidden">
              <p className="truncate text-xs font-semibold text-ink-900">{user?.email}</p>
              <Badge tone="brand">{user?.role}</Badge>
            </div>
          </div>

          {user?.role === 'student' && (
            <div className="flex items-center justify-between rounded-lg bg-brand-500/10 p-2.5 text-xs font-medium text-brand-900">
              <span>Enrolled Courses:</span>
              <span className="font-bold">{enrolledCount}</span>
            </div>
          )}

          {user?.role === 'instructor' && (
            <div className="flex items-center justify-between rounded-lg bg-brand-500/10 p-2.5 text-xs font-medium text-brand-900">
              <span>Created Courses:</span>
              <span className="font-bold">{createdCount}</span>
            </div>
          )}
        </div>
      )}

      {/* Mobile Navigation Dropdown Menu */}
      {mobileMenuOpen && (
        <nav className="flex flex-col gap-1 border-t border-ink-900/8 bg-paper px-4 pb-5 pt-3 md:hidden">
          <Link
            to="/"
            onClick={closeMobileMenu}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
          >
            Home
          </Link>
          <Link
            to="/courses"
            onClick={closeMobileMenu}
            className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
          >
            Courses
          </Link>

          {user?.role === 'student' && (
            <>
              <Link
                to="/my-courses"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                My Courses
              </Link>
              <Link
                to="/certificates"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                Certificates
              </Link>
            </>
          )}

          {user?.role === 'instructor' && (
            <>
              <Link
                to="/instructor/courses"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                My Courses
              </Link>
              <Link
                to="/courses/new"
                onClick={closeMobileMenu}
                className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
              >
                Create course
              </Link>
            </>
          )}

          {(user?.role === 'instructor' || user?.role === 'admin') && (
            <Link
              to="/instructor/certificates"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
            >
              Issued Certificates
            </Link>
          )}

          {user?.role === 'admin' && (
            <Link
              to="/categories"
              onClick={closeMobileMenu}
              className="rounded-lg px-3 py-2 text-sm font-medium text-ink-700 hover:bg-ink-900/5"
            >
              Categories
            </Link>
          )}

          <div className="mt-2 border-t border-ink-900/8 pt-3">
            {user ? (
              <Button
                variant="outline"
                className="w-full justify-center"
                onClick={() => {
                  closeMobileMenu();
                  logout();
                  navigate('/');
                }}
              >
                Log out
              </Button>
            ) : (
              <div className="flex flex-col gap-2">
                <Link to="/login" onClick={closeMobileMenu}>
                  <Button variant="ghost" className="w-full justify-center">
                    Log in
                  </Button>
                </Link>
                <Link to="/register" onClick={closeMobileMenu}>
                  <Button variant="accent" className="w-full justify-center">
                    Sign up
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </nav>
      )}
    </header>
  );
}