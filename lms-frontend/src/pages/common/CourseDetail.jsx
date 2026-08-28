import { useEffect, useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';

import {
  Badge,
  Button,
  Spinner,
  Alert,
  Input,
  Textarea,
} from '../../components/ui.jsx';

import LessonList from './LessonList.jsx';
import QuizList from './QuizList.jsx';
import AssignmentList from '../instructor/AssignmentList.jsx';
import ReviewList from '../../components/ReviewList.jsx';

export default function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user, token } = useAuth();

  const [course, setCourse] = useState(null);
  const [quizzes, setQuizzes] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // =========================================================
  // MODALS / ACTIVE LESSON
  // =========================================================

  const [showAddLesson, setShowAddLesson] = useState(false);
  const [editingLesson, setEditingLesson] = useState(null);
  const [deletingLesson, setDeletingLesson] = useState(null);
  const [showCancelEnrollModal, setShowCancelEnrollModal] = useState(false);
  const [activeLesson, setActiveLesson] = useState(null);

  // =========================================================
  // LOADING STATES
  // =========================================================

  const [enrolling, setEnrolling] = useState(false);
  const [isUnmuted, setIsUnmuted] = useState(false);
  const [deletingLessonLoading, setDeletingLessonLoading] = useState(false);
  const [savingLesson, setSavingLesson] = useState(false);

  // =========================================================
  // LESSON FORM
  // =========================================================

  const [lessonForm, setLessonForm] = useState({
    title: '',
    description: '',
    videoUrl: '',
  });

  const [lessonFormError, setLessonFormError] = useState('');

  // =========================================================
  // USER ID
  // =========================================================

  const userId = String(
    user?.id ??
    user?._id ??
    user?.sub ??
    user?.userId ??
    ''
  );

  const isStudent = user?.role === 'student';

  // =========================================================
  // LOAD COURSE
  // =========================================================

  const loadCourse = useCallback(
    async (showSpinner = true) => {
      if (!id) return;

      if (showSpinner) {
        setLoading(true);
      }

      try {
        setError('');

        const data = await api.getCourse(id);

        setCourse(data);
      } catch (err) {
        setError(err.message || 'Failed to load course');
      } finally {
        if (showSpinner) {
          setLoading(false);
        }
      }
    },
    [id]
  );

  // =========================================================
  // INITIAL COURSE LOAD
  // =========================================================

  useEffect(() => {
    loadCourse(true);
  }, [loadCourse]);

  // =========================================================
  // LOAD QUIZZES
  // =========================================================

  const loadQuizzes = useCallback(async () => {
    if (!id || !token) return;

    try {
      const data = await api.getQuizzes(id, token);

      setQuizzes(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Failed to load quizzes:', err);
    }
  }, [id, token]);

  useEffect(() => {
    if (course) {
      loadQuizzes();
    }
  }, [course, loadQuizzes]);

  // =========================================================
  // EMBED YOUTUBE URL
  // =========================================================

  function getEmbedUrl(url) {
    if (!url) return '';

    try {
      const trimmedUrl = url.trim();

      const normalizedUrl = /^https?:\/\//i.test(trimmedUrl)
        ? trimmedUrl
        : `https://${trimmedUrl}`;

      let embedBase = '';

      const lowerUrl = normalizedUrl.toLowerCase();

      // YouTube Shorts
      if (lowerUrl.includes('/shorts/')) {
        const videoId = normalizedUrl
          .split('/shorts/')[1]
          ?.split(/[/?]/)[0];

        embedBase = videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : normalizedUrl;
      }

      // YouTube Watch / Live
      else if (
        lowerUrl.includes('youtube.com/watch') ||
        lowerUrl.includes('youtube.com/live')
      ) {
        const urlObj = new URL(normalizedUrl);

        const videoId =
          urlObj.searchParams.get('v') ||
          normalizedUrl.split('/live/')[1]?.split(/[/?]/)[0];

        embedBase = videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : normalizedUrl;
      }

      // youtu.be
      else if (lowerUrl.includes('youtu.be/')) {
        const videoId = normalizedUrl
          .split('youtu.be/')[1]
          ?.split(/[/?]/)[0];

        embedBase = videoId
          ? `https://www.youtube.com/embed/${videoId}`
          : normalizedUrl;
      }

      // Already embed URL
      else if (lowerUrl.includes('youtube.com/embed/')) {
        embedBase = normalizedUrl;
      }

      // Direct video
      else {
        return normalizedUrl;
      }

      const separator = embedBase.includes('?') ? '&' : '?';

      return `${embedBase}${separator}autoplay=1&mute=${isUnmuted ? '0' : '1'
        }&enablejsapi=1&rel=0`;
    } catch {
      return url.trim();
    }
  }

  // =========================================================
  // ENROLL
  // =========================================================

  async function handleEnroll() {
    if (!token || enrolling) return;

    setEnrolling(true);

    try {
      await api.enroll(id, token);

      await loadCourse(false);
    } catch (err) {
      alert(err.message || 'Enrollment failed');
    } finally {
      setEnrolling(false);
    }
  }

  // =========================================================
  // CANCEL ENROLLMENT
  // =========================================================

  async function handleConfirmCancelEnrollment() {
    if (!token || enrolling) return;

    setEnrolling(true);

    try {
      await api.cancelEnrollment(id, token);

      setShowCancelEnrollModal(false);

      await loadCourse(false);
    } catch (err) {
      alert(err.message || 'Failed to cancel enrollment');
    } finally {
      setEnrolling(false);
    }
  }

  // =========================================================
  // SAVE LESSON
  // =========================================================

  const handleSaveLesson = async (e) => {
    e.preventDefault();

    setLessonFormError('');
    setSavingLesson(true);

    try {
      const payload = {
        title: lessonForm.title.trim(),
        description: lessonForm.description?.trim() || undefined,
        videoUrl: lessonForm.videoUrl?.trim() || undefined,
      };

      if (editingLesson) {
        await api.updateLesson(
          id,
          editingLesson.id,
          payload,
          token
        );
      } else {
        await api.createLesson(id, payload, token);
      }

      setShowAddLesson(false);
      setEditingLesson(null);

      setLessonForm({
        title: '',
        description: '',
        videoUrl: '',
      });

      await loadCourse(false);
    } catch (err) {
      setLessonFormError(
        err.message || 'Failed to save lesson'
      );
    } finally {
      setSavingLesson(false);
    }
  };

  // =========================================================
  // DELETE LESSON
  // =========================================================

  const handleDeleteLesson = async () => {
    if (!deletingLesson || deletingLessonLoading) return;

    setDeletingLessonLoading(true);

    try {
      await api.deleteLesson(
        id,
        deletingLesson.id,
        token
      );

      setDeletingLesson(null);

      await loadCourse(false);
    } catch (err) {
      alert(err.message || 'Failed to delete lesson');
    } finally {
      setDeletingLessonLoading(false);
    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="mx-auto flex min-h-[60vh] max-w-4xl items-center justify-center gap-3 text-stone-600">
        <Spinner />

        <span className="text-sm font-medium">
          Loading course details…
        </span>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error && !course) {
    return (
      <div className="mx-auto max-w-4xl px-6 py-10">
        <Alert>{error}</Alert>
      </div>
    );
  }

  if (!course) {
    return null;
  }

  // =========================================================
  // OWNER
  // =========================================================

  const instructorId =
    course?.instructor?.id ??
    course?.instructor?._id ??
    course?.instructorId;

  const isOwner =
    !isStudent &&
    Boolean(userId) &&
    Boolean(instructorId) &&
    Number(instructorId) === Number(userId);

  // =========================================================
  // CURRENT ENROLLMENT
  // =========================================================

  const currentEnrollment = Array.isArray(course.enrollments)
    ? course.enrollments.find(
      (enrollment) =>
        Number(enrollment?.student?.id) ===
        Number(userId)
    )
    : null;

  const isEnrolled = Boolean(currentEnrollment);

  const isStudentEnrolled =
    isStudent && isEnrolled;

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="mx-auto max-w-4xl space-y-6 px-4 py-8 sm:px-6">

      {/* ERROR */}
      {error && <Alert>{error}</Alert>}

      {/* =====================================================
          COURSE BANNER
      ===================================================== */}

      <div className="relative overflow-hidden rounded-2xl border-2 border-stone-200/80 bg-gradient-to-br from-[#fefbea] via-stone-400 to-amber-700 p-6 text-white shadow-2xl sm:p-8">

        <div className="relative z-10 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">

          <div className="space-y-3">

            <div className="flex flex-wrap items-center gap-2">

              <Badge
                tone={
                  course.isPublished
                    ? 'success'
                    : 'neutral'
                }
              >
                {course.isPublished
                  ? 'Published'
                  : 'Draft'}
              </Badge>

              {course.instructor?.name && (
                <span className="text-xs font-medium text-gray-800">
                  By{' '}
                  <strong className="text-amber-950">
                    {course.instructor.name}
                  </strong>
                </span>
              )}

            </div>

            <h1 className="font-display text-2xl font-bold tracking-tight text-amber-950 sm:text-3xl">
              {course.title}
            </h1>

            {course.categories?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">

                {course.categories.map((cat) => (
                  <span
                    key={cat.id}
                    className="inline-flex items-center rounded-md bg-white/30 px-2.5 py-0.5 text-xs font-medium text-amber-950 backdrop-blur-sm"
                  >
                    {cat.name}
                  </span>
                ))}

              </div>
            )}

            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-amber-950">
              {course.description}
            </p>

          </div>

          {/* ACTIONS */}

          <div className="flex shrink-0 flex-wrap gap-2 pt-2 sm:pt-0">

            {/* STUDENT ENROLLMENT */}

            {isStudent && (
              isEnrolled ? (
                <Button
                  variant="outline"
                  onClick={() =>
                    setShowCancelEnrollModal(true)
                  }
                  disabled={enrolling}
                  className="border-white/20 bg-white/30 text-amber-950 hover:bg-white/20"
                >
                  Cancel Enrollment
                </Button>
              ) : (
                <Button
                  variant="accent"
                  onClick={handleEnroll}
                  disabled={enrolling}
                  className="w-full shadow-lg sm:w-auto"
                >
                  {enrolling
                    ? 'Enrolling…'
                    : 'Enroll Now'}
                </Button>
              )
            )}

            {/* INSTRUCTOR */}

            {isOwner && (
              <>
                <Button
                  variant="ghost"
                  onClick={() =>
                    navigate(
                      `/courses/${id}/quizzes/new`
                    )
                  }
                  className="border border-amber-900/20 !bg-amber-600 text-white hover:!bg-white/20 hover:text-amber-950"
                >
                  + Create quiz
                </Button>

                <Button
                  variant="accent"
                  onClick={() => {
                    setLessonForm({
                      title: '',
                      description: '',
                      videoUrl: '',
                    });

                    setEditingLesson(null);
                    setLessonFormError('');
                    setShowAddLesson(true);
                  }}
                  className="w-full hover:!bg-white/20 hover:text-amber-950 sm:w-auto"
                >
                  + Add Lesson
                </Button>

                <Button
                  variant="ghost"
                  onClick={() =>
                    navigate(
                      `/courses/${id}/assignments/new`
                    )
                  }
                  className="bg-amber-500 text-white hover:bg-white/20 hover:text-amber-950"
                >
                  + Create assignment
                </Button>
              </>
            )}

          </div>
        </div>
      </div>

      {/* =====================================================
          PROGRESS
      ===================================================== */}

      {isStudentEnrolled && (
        <div className="rounded-xl border border-stone-200 bg-white p-5 shadow-sm">

          <div className="flex items-center justify-between text-sm font-semibold text-stone-800">

            <span>
              🎓 Your Course Progress
            </span>

            <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-0.5 text-xs font-bold text-amber-800">
              {currentEnrollment?.progressPercentage ?? 0}%
              {' '}Completed
            </span>

          </div>

          <div className="mt-3 h-2.5 w-full overflow-hidden rounded-full bg-stone-100">

            <div
              className="h-full rounded-full bg-amber-600 transition-all duration-500 ease-out"
              style={{
                width: `${Math.min(
                  100,
                  Math.max(
                    0,
                    currentEnrollment?.progressPercentage ?? 0
                  )
                )}%`,
              }}
            />

          </div>
        </div>
      )}

      {/* =====================================================
          LESSONS
      ===================================================== */}

      <LessonList
        courseId={course.id}
        lessons={course.lessons || []}
        isOwner={isOwner}
        isEnrolled={isStudentEnrolled}
        userId={userId}
        onPlayLesson={(lesson) => {
          setIsUnmuted(false);
          setActiveLesson(lesson);
        }}
        onEditLesson={(lesson) => {
          setLessonForm({
            title: lesson.title || '',
            description: lesson.description || '',
            videoUrl: lesson.videoUrl || '',
          });

          setLessonFormError('');
          setEditingLesson(lesson);
        }}
        onDeleteLesson={(lesson) =>
          setDeletingLesson(lesson)
        }
        onRefresh={() => loadCourse(false)}
      />

      {/* =====================================================
          QUIZZES
      ===================================================== */}

      <QuizList
        courseId={id}
        quizzes={quizzes}
        isOwner={isOwner}
        isEnrolled={isEnrolled}
        isStudent={isStudent}
        onRefresh={loadQuizzes}
      />

      {/* =====================================================
          ASSIGNMENTS
      ===================================================== */}

      <AssignmentList
        courseId={id}
        isOwner={isOwner}
        isStudentEnrolled={isStudentEnrolled}
      />

      {/* =====================================================
          REVIEWS
      ===================================================== */}

      <ReviewList
        courseId={id}
        isStudentEnrolled={isStudentEnrolled}
      />

      {/* =====================================================
          ADD / EDIT LESSON MODAL
      ===================================================== */}

      {(showAddLesson || editingLesson) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-4 flex items-center justify-between border-b pb-3">

              <h3 className="font-display text-lg font-bold text-stone-900">
                {editingLesson
                  ? 'Edit Lesson'
                  : 'Add New Lesson'}
              </h3>

              <button
                type="button"
                onClick={() => {
                  setShowAddLesson(false);
                  setEditingLesson(null);
                  setLessonFormError('');
                }}
                className="rounded-lg bg-stone-100 p-1.5 text-stone-500 hover:bg-stone-200"
              >
                ✕
              </button>

            </div>

            <form
              onSubmit={handleSaveLesson}
              className="flex flex-col gap-4"
            >

              {lessonFormError && (
                <Alert>{lessonFormError}</Alert>
              )}

              <Input
                label="Lesson Title"
                required
                minLength={3}
                value={lessonForm.title}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    title: e.target.value,
                  })
                }
                placeholder="Setting up project"
              />

              <Textarea
                label="Description"
                rows={3}
                value={lessonForm.description}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    description: e.target.value,
                  })
                }
              />

              <Input
                label="Video URL (YouTube or Direct Link)"
                type="url"
                value={lessonForm.videoUrl}
                onChange={(e) =>
                  setLessonForm({
                    ...lessonForm,
                    videoUrl: e.target.value,
                  })
                }
                placeholder="https://www.youtube.com/watch?v=..."
              />

              <div className="flex justify-end gap-2 pt-2">

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => {
                    setShowAddLesson(false);
                    setEditingLesson(null);
                    setLessonFormError('');
                  }}
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={savingLesson}
                >
                  {savingLesson
                    ? 'Saving…'
                    : editingLesson
                      ? 'Save Changes'
                      : 'Save Lesson'}
                </Button>

              </div>
            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          CANCEL ENROLLMENT MODAL
      ===================================================== */}

      {showCancelEnrollModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-100 text-amber-600">
                ⚠️
              </div>

              <h3 className="font-display text-lg font-bold text-stone-900">
                Cancel Enrollment
              </h3>

            </div>

            <p className="text-sm leading-relaxed text-stone-600">
              Are you sure you want to cancel your enrollment for{' '}
              <strong className="text-stone-900">
                "{course.title}"
              </strong>
              ? You will lose access to lessons,
              assignments, and quizzes.
            </p>

            <div className="flex justify-end gap-2 pt-6">

              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setShowCancelEnrollModal(false)
                }
                disabled={enrolling}
              >
                Keep Enrolled
              </Button>

              <Button
                type="button"
                onClick={
                  handleConfirmCancelEnrollment
                }
                disabled={enrolling}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {enrolling
                  ? 'Cancelling…'
                  : 'Yes, Cancel Enrollment'}
              </Button>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          DELETE LESSON MODAL
      ===================================================== */}

      {deletingLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">

            <div className="mb-3 flex items-center gap-3">

              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                ⚠️
              </div>

              <h3 className="font-display text-lg font-bold text-stone-900">
                Delete Lesson
              </h3>

            </div>

            <p className="text-sm leading-relaxed text-stone-600">
              Are you sure you want to delete{' '}
              <strong className="text-stone-900">
                "{deletingLesson.title}"
              </strong>
              ? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-6">

              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeletingLesson(null)
                }
                disabled={deletingLessonLoading}
              >
                Cancel
              </Button>

              <Button
                type="button"
                onClick={handleDeleteLesson}
                disabled={deletingLessonLoading}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {deletingLessonLoading
                  ? 'Deleting…'
                  : 'Delete Lesson'}
              </Button>

            </div>
          </div>
        </div>
      )}

      {/* =====================================================
          VIDEO MODAL
      ===================================================== */}

      {activeLesson && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">

          <div className="relative w-full max-w-3xl overflow-hidden rounded-2xl bg-stone-900 p-4 text-white shadow-2xl sm:p-6">

            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-display text-lg font-bold text-white">
                {activeLesson.title}
              </h3>

              <button
                onClick={() =>
                  setActiveLesson(null)
                }
                className="rounded-lg bg-white/10 px-3 py-1.5 text-xs font-bold text-stone-300 hover:bg-white/20 hover:text-white"
              >
                ✕ Close
              </button>

            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-xl bg-black">

              {/(youtube\.com|youtu\.be)/i.test(
                activeLesson.videoUrl || ''
              ) ? (
                <>
                  <iframe
                    key={`${activeLesson.id}-${isUnmuted}`}
                    src={getEmbedUrl(
                      activeLesson.videoUrl
                    )}
                    title={activeLesson.title}
                    className="h-full w-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />

                  {!isUnmuted && (
                    <button
                      type="button"
                      onClick={() =>
                        setIsUnmuted(true)
                      }
                      className="absolute bottom-4 right-4 z-10 flex items-center gap-2 rounded-lg bg-amber-600 px-3 py-2 text-xs font-bold text-white shadow-lg hover:bg-amber-500"
                    >
                      🔊 Unmute Audio
                    </button>
                  )}
                </>
              ) : (
                <video
                  src={activeLesson.videoUrl}
                  controls
                  autoPlay
                  className="h-full w-full object-contain"
                >
                  Your browser does not support the video tag.
                </video>
              )}

            </div>

            {activeLesson.description && (
              <p className="mt-4 text-xs leading-relaxed text-stone-300">
                {activeLesson.description}
              </p>
            )}

          </div>
        </div>
      )}

    </div>
  );
}