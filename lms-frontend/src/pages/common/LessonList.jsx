import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from 'react';

import {
  Card,
  Button,
  Spinner,
} from '../../components/ui.jsx';

import { api } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

const PAGE_LIMIT = 3;

export default function LessonList({
  courseId,
  lessons: initialLessons = [],
  isOwner,
  isEnrolled,
  userId,
  onPlayLesson,
  onEditLesson,
  onDeleteLesson,
  onRefresh,
}) {
  const { token } = useAuth();

  const [openMenuLessonId, setOpenMenuLessonId] = useState(null);
  const [completingLessonId, setCompletingLessonId] = useState(null);

  const [lessons, setLessons] = useState(
    Array.isArray(initialLessons) ? initialLessons : []
  );

  const [completedLessonIds, setCompletedLessonIds] = useState(new Set());

  // Pagination States
  const [lessonPage, setLessonPage] = useState(1);
  const [lessonTotalPages, setLessonTotalPages] = useState(1);
  const [lessonTotal, setLessonTotal] = useState(0);
  const [loadingLessons, setLoadingLessons] = useState(false);

  const isFirstRender = useRef(true);
  const dropdownRef = useRef(null);

  // Helper to extract completed IDs dynamically based on current userId
  const extractCompletedIds = useCallback((lessonArray) => {
    const completedIds = new Set();
    if (Array.isArray(lessonArray) && userId) {
      lessonArray.forEach((lesson) => {
        const completed = lesson?.progress?.some(
          (p) => Number(p?.enrollment?.student?.id) === Number(userId)
        );
        if (completed) {
          completedIds.add(Number(lesson.id));
        }
      });
    }
    return completedIds;
  }, [userId]);

  // =========================================================
  // FETCH LESSONS PAGINATED
  // =========================================================

  const fetchLessons = useCallback(async (pageToFetch) => {
    if (!courseId || !token) return;

    setLoadingLessons(true);

    try {
      const targetPage = pageToFetch || lessonPage;
      const response = await api.getLessonsPaginated(
        courseId,
        targetPage,
        PAGE_LIMIT,
        token
      );

      const newLessons = Array.isArray(response?.data) ? response.data : [];

      setLessons(newLessons);
      setLessonTotal(Number(response?.total || 0));

      const totalPages = Math.max(1, Number(response?.totalPages || 1));
      setLessonTotalPages(totalPages);

      // Clean sync for completed IDs: Directly replace set based on fresh server response
      const fetchedCompletedIds = extractCompletedIds(newLessons);
      setCompletedLessonIds(fetchedCompletedIds);

      if (newLessons.length === 0 && targetPage > 1 && totalPages < targetPage) {
        setLessonPage((prev) => Math.max(1, prev - 1));
      }
    } catch (error) {
      console.error('Failed to fetch lessons:', error);
    } finally {
      setLoadingLessons(false);
    }
  }, [courseId, lessonPage, token, extractCompletedIds]);

  // Refetch when page, courseId, token OR isEnrolled status changes
  useEffect(() => {
    fetchLessons(lessonPage);
  }, [lessonPage, courseId, token, isEnrolled, fetchLessons]);

  // Reset/Sync Initial Lessons when user or initialLessons changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      if (Array.isArray(initialLessons) && initialLessons.length > 0) {
        setCompletedLessonIds(extractCompletedIds(initialLessons));
      }
    }
  }, [initialLessons, extractCompletedIds]);

  // Dropdown dismiss logic
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpenMenuLessonId(null);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Sort Lessons
  const sortedLessons = useMemo(() => {
    return [...lessons].sort((a, b) => {
      if (a.order !== undefined && b.order !== undefined) {
        return a.order - b.order;
      }
      if (a.createdAt && b.createdAt) {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      }
      return Number(a.id || 0) - Number(b.id || 0);
    });
  }, [lessons]);

  // Actions
  const isLessonCompleted = useCallback(
    (lesson) => {
      if (!lesson?.id) return false;
      return completedLessonIds.has(Number(lesson.id));
    },
    [completedLessonIds]
  );

  const handleMarkComplete = async (lessonId) => {
    if (!token || !isEnrolled || completingLessonId !== null) return;

    const currentLesson = lessons.find((l) => Number(l.id) === Number(lessonId));
    if (currentLesson && isLessonCompleted(currentLesson)) return;

    setCompletingLessonId(lessonId);

    try {
      await api.markLessonComplete(lessonId, token);

      setCompletedLessonIds((prev) => new Set(prev).add(Number(lessonId)));

      setLessons((prevLessons) =>
        prevLessons.map((lesson) => {
          if (Number(lesson.id) !== Number(lessonId)) return lesson;
          return {
            ...lesson,
            progress: [
              ...(lesson.progress || []),
              { enrollment: { student: { id: Number(userId) } } },
            ],
          };
        })
      );

      if (onRefresh) await onRefresh();
    } catch (error) {
      console.error('Failed to mark lesson complete:', error);
      setCompletedLessonIds((prev) => {
        const next = new Set(prev);
        next.delete(Number(lessonId));
        return next;
      });
    } finally {
      setCompletingLessonId(null);
    }
  };

  const handleEdit = (lesson) => {
    setOpenMenuLessonId(null);
    if (onEditLesson) onEditLesson(lesson);
  };

  const handleDelete = async (lesson) => {
    setOpenMenuLessonId(null);
    if (!onDeleteLesson) return;

    await onDeleteLesson(lesson);

    if (lessonPage > 1 && sortedLessons.length === 1) {
      setLessonPage((prev) => Math.max(1, prev - 1));
    } else {
      fetchLessons(lessonPage);
    }
  };

  const handleNextPage = () => {
    if (lessonPage < lessonTotalPages && !loadingLessons) {
      setLessonPage((prev) => prev + 1);
    }
  };

  const handlePrevPage = () => {
    if (lessonPage > 1 && !loadingLessons) {
      setLessonPage((prev) => prev - 1);
    }
  };

  // Render UI
  if (loadingLessons && lessons.length === 0) {
    return (
      <Card className="flex items-center justify-center gap-2 p-10">
        <Spinner />
        <span className="text-sm text-stone-600">Loading lessons...</span>
      </Card>
    );
  }

  if (!loadingLessons && sortedLessons.length === 0) {
    return (
      <Card className="flex flex-col items-center justify-center p-10 text-center">
        <div className="mb-2 text-3xl">📚</div>
        <h3 className="text-sm font-semibold text-stone-800">No lessons added yet</h3>
        <p className="mt-1 max-w-sm text-xs text-stone-500">
          This course doesn't have any lessons uploaded. Check back later!
        </p>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="font-display text-xl font-bold text-stone-900">
            Course Lessons
          </h2>
          <p className="text-xs text-stone-500">
            {lessonTotal || sortedLessons.length}{' '}
            {lessonTotal === 1 ? 'lesson' : 'lessons'} available
          </p>
        </div>
        {loadingLessons && <Spinner />}
      </div>

      {/* LESSONS LIST */}
      <div className="flex flex-col gap-3">
        {sortedLessons.map((lesson, idx) => {
          const completed = isLessonCompleted(lesson);
          const isCompleting = completingLessonId === lesson.id;
          const displayIndex = (lessonPage - 1) * PAGE_LIMIT + idx + 1;

          return (
            <div
              key={lesson.id}
              className={`group relative flex w-full items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${completed
                ? 'border-emerald-200 bg-emerald-50/20 hover:border-emerald-300'
                : 'border-stone-200 bg-white hover:border-amber-500/50 hover:shadow-md'
                }`}
            >
              <button
                type="button"
                onClick={() => onPlayLesson?.(lesson)}
                className="flex flex-1 items-center gap-4 text-left focus:outline-none"
              >
                <span
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-sm font-bold transition-colors ${completed
                    ? 'bg-emerald-100 text-emerald-800'
                    : 'bg-stone-100 text-stone-700 group-hover:bg-amber-600 group-hover:text-white'
                    }`}
                >
                  {completed ? '✓' : displayIndex}
                </span>

                <div className="space-y-0.5">
                  <h3 className="text-sm font-semibold text-stone-900 transition-colors group-hover:text-amber-800">
                    {lesson.title}
                  </h3>
                  {lesson.description && (
                    <p className="line-clamp-1 text-xs text-stone-500">
                      {lesson.description}
                    </p>
                  )}
                </div>
              </button>

              <div className="flex items-center gap-3">
                {lesson.videoUrl ? (
                  <button
                    type="button"
                    onClick={() => onPlayLesson?.(lesson)}
                    className="inline-flex items-center gap-1.5 rounded-lg border border-amber-200 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-900 transition-colors hover:bg-amber-100"
                  >
                    <span>▶</span> Play
                  </button>
                ) : (
                  <span className="text-xs font-medium text-stone-400">
                    No Video
                  </span>
                )}

                {/* COMPLETE BUTTON FIX */}
                {isEnrolled && (
                  completed ? (
                    <span className="rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-semibold text-emerald-800">
                      Completed
                    </span>
                  ) : (
                    <button
                      type="button"
                      onClick={() => handleMarkComplete(lesson.id)}
                      disabled={isCompleting}
                      className="rounded-lg border border-stone-200 bg-white px-2.5 py-1.5 text-xs font-semibold text-emerald-700 transition-colors hover:border-emerald-300 hover:bg-emerald-50 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      {isCompleting ? 'Saving…' : '✓ Mark Complete'}
                    </button>
                  )
                )}

                {/* INSTRUCTOR CONTROLS */}
                {isOwner && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        setOpenMenuLessonId(
                          openMenuLessonId === lesson.id ? null : lesson.id
                        );
                      }}
                      className="flex h-8 w-8 items-center justify-center rounded-lg text-lg font-bold text-stone-500 hover:bg-stone-100 hover:text-stone-900"
                    >
                      ⋮
                    </button>

                    {openMenuLessonId === lesson.id && (
                      <div
                        ref={dropdownRef}
                        className="absolute right-0 top-10 z-20 w-36 rounded-xl border border-stone-200 bg-white py-1 shadow-xl"
                      >
                        <button
                          type="button"
                          onClick={() => handleEdit(lesson)}
                          className="flex w-full items-center px-4 py-2 text-left text-xs font-medium text-stone-700 hover:bg-stone-50"
                        >
                          Edit Lesson
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(lesson)}
                          className="flex w-full items-center px-4 py-2 text-left text-xs font-medium text-red-600 hover:bg-red-50"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* PAGINATION CONTROLS */}
      {lessonTotalPages > 1 && (
        <div className="mt-4 flex items-center justify-center gap-3">
          <Button
            variant="outline"
            disabled={lessonPage === 1 || loadingLessons}
            onClick={handlePrevPage}
          >
            Previous
          </Button>

          <span className="text-sm text-stone-700">
            Page {lessonPage} of {lessonTotalPages}
          </span>

          <Button
            variant="outline"
            disabled={lessonPage === lessonTotalPages || loadingLessons}
            onClick={handleNextPage}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}