import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import {
  Card,
  Badge,
  Spinner,
  Alert,
  Button,
  Input,
  Textarea,
} from '../../components/ui.jsx';
import CourseMenu from '../../components/CourseMenu.jsx';

// Separate Rating Component placed outside to prevent unnecessary re-renders
function CourseRatingBadge({ courseId, token }) {
  const [avg, setAvg] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    api
      .getAverageRating(courseId, token)
      .then((res) => {
        if (!isMounted) return;

        // Handle Object structure { averageRating: 4.5 }
        let ratingVal = res;

        if (typeof res === 'object' && res !== null) {
          ratingVal =
            res.averageRating ??
            res.average ??
            res.rating ??
            res.avg ??
            null;
        }

        const numericRating = Number(ratingVal);

        if (!isNaN(numericRating) && numericRating > 0) {
          setAvg(numericRating);
        } else {
          setAvg(null);
        }
      })
      .catch((err) => {
        console.error(`[Rating API Error] Course ${courseId}:`, err);
        setAvg(null);
      })
      .finally(() => {
        if (isMounted) {
          setLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [courseId, token]);

  if (loading) {
    return <Badge tone="neutral">...</Badge>;
  }

  if (avg === null) {
    return <Badge tone="neutral">N/A ★</Badge>;
  }

  return <Badge tone="brand">{avg.toFixed(1)} ★</Badge>;
}

export default function Courses() {
  const { user, token } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // =========================
  // Pagination
  // =========================
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // =========================
  // Search & Category
  // =========================
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  // =========================
  // Course Edit Modal
  // =========================
  const [editingCourse, setEditingCourse] = useState(null);
  const [editCourseForm, setEditCourseForm] = useState({
    title: '',
    description: '',
  });
  const [updatingCourse, setUpdatingCourse] = useState(false);

  // =========================
  // Course Delete Modal
  // =========================
  const [deletingCourse, setDeletingCourse] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // ==========================================================
  // Load Categories
  // Categories only need to be fetched once
  // ==========================================================
  useEffect(() => {
    api
      .getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message));
  }, []);

  // ==========================================================
  // Load Courses
  //
  // Backend handles:
  // 1. Search
  // 2. Category filtering
  // 3. Pagination
  //
  // Debounce = 400ms
  // ==========================================================
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(true);
      setError('');

      api
        .getCourses(
          page,
          10,
          search,
          activeCategoryId
        )
        .then((courseResponse) => {
          setCourses(courseResponse.data || courseResponse);
          setTotalPages(courseResponse.totalPages || 1);
        })
        .catch((err) => {
          setError(err.message);
        })
        .finally(() => {
          setLoading(false);
        });
    }, 600);

    // Cancel previous timer if user types again
    return () => clearTimeout(timer);
  }, [page, search, activeCategoryId]);

  // ==========================================================
  // Delete Course
  // ==========================================================
  async function handleConfirmDelete() {
    if (!deletingCourse) return;

    setIsDeleting(true);

    try {
      await api.deleteCourse(deletingCourse.id, token);

      setDeletingCourse(null);

      // Reload current page
      setLoading(true);

      const courseResponse = await api.getCourses(
        page,
        10,
        search,
        activeCategoryId
      );

      setCourses(courseResponse.data || courseResponse);
      setTotalPages(courseResponse.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
      setLoading(false);
    }
  }

  // ==========================================================
  // Toggle Publish
  // ==========================================================
  async function handleTogglePublish(courseId) {
    try {
      await api.togglePublish(courseId, token);

      setLoading(true);

      const courseResponse = await api.getCourses(
        page,
        10,
        search,
        activeCategoryId
      );

      setCourses(courseResponse.data || courseResponse);
      setTotalPages(courseResponse.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  // ==========================================================
  // Open Edit Modal
  // ==========================================================
  function handleOpenEditModal(course) {
    setEditingCourse(course);

    setEditCourseForm({
      title: course.title || '',
      description: course.description || '',
    });
  }

  // ==========================================================
  // Update Course
  // ==========================================================
  async function handleUpdateCourse(e) {
    e.preventDefault();

    if (!editingCourse) return;

    setUpdatingCourse(true);

    try {
      await api.updateCourse(
        editingCourse.id,
        editCourseForm,
        token
      );

      setEditingCourse(null);

      setLoading(true);

      const courseResponse = await api.getCourses(
        page,
        10,
        search,
        activeCategoryId
      );

      setCourses(courseResponse.data || courseResponse);
      setTotalPages(courseResponse.totalPages || 1);
    } catch (err) {
      setError(err.message);
    } finally {
      setUpdatingCourse(false);
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">

      {/* =====================================================
          Page Header
      ===================================================== */}
      <div className="mb-8">
        <h1 className="font-display text-2xl font-semibold text-ink-900">
          Explore courses
        </h1>

        <p className="mt-1 text-sm text-ink-700">
          Learn something new, taught by instructors on Ilm.
        </p>
      </div>

      {/* =====================================================
          Loading
      ===================================================== */}
      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner />
          Loading courses…
        </div>
      )}

      {/* =====================================================
          Error
      ===================================================== */}
      {error && <Alert>{error}</Alert>}

      {/* =====================================================
          Search + Categories
      ===================================================== */}
      {!loading && !error && (
        <div className="mb-6 flex flex-col gap-3">

          {/* Search */}
          <Input
            placeholder="Search courses…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);

              // Search change hone par page 1
              setPage(1);
            }}
            className="max-w-sm"
          />

          {/* Categories */}
          <div className="flex flex-wrap gap-2">

            {/* All Categories */}
            <button
              onClick={() => {
                setActiveCategoryId(null);

                // Category change hone par page 1
                setPage(1);
              }}
              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${activeCategoryId === null
                ? 'border-brand-500 bg-brand-50 text-brand-700'
                : 'border-ink-900/15 text-ink-700 hover:bg-ink-900/5'
                }`}
            >
              All
            </button>

            {/* Categories */}
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategoryId(cat.id);

                  // Category change hone par page 1
                  setPage(1);
                }}
                className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${activeCategoryId === cat.id
                  ? 'border-brand-500 bg-brand-50 text-brand-700'
                  : 'border-ink-900/15 text-ink-700 hover:bg-ink-900/5'
                  }`}
              >
                {cat.name}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================
          No Courses
      ===================================================== */}
      {!loading && !error && courses.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-700">
          No courses found matching your criteria.
        </Card>
      )}

      {/* =====================================================
          Courses Grid
      ===================================================== */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">

        {courses.map((course) => {

          const isOwner =
            user && course.instructor?.id === user.sub;

          return (
            <Card
              key={course.id}
              className="relative flex h-full flex-col justify-between gap-3 p-5 transition-shadow hover:shadow-lg"
            >

              <div className="flex flex-col gap-3">

                {/* =================================================
                    Header
                ================================================= */}
                <div className="flex items-start justify-between gap-2">

                  <Link
                    to={`/courses/${course.id}`}
                    className="hover:underline"
                  >
                    <h2 className="font-display text-base font-semibold text-ink-900">
                      {course.title}
                    </h2>
                  </Link>

                  <div className="flex items-center gap-2">

                    {/* Publish Status */}
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

                    {/* Rating */}
                    <CourseRatingBadge className="flex"
                      courseId={course.id}
                      token={token}
                    />

                    {/* Instructor Menu */}
                    {isOwner && (
                      <CourseMenu
                        isPublished={course.isPublished}
                        onEdit={() =>
                          handleOpenEditModal(course)
                        }
                        onDelete={() =>
                          setDeletingCourse(course)
                        }
                        onTogglePublish={() =>
                          handleTogglePublish(course.id)
                        }
                      />
                    )}
                  </div>
                </div>

                {/* =================================================
                    Main Content
                ================================================= */}
                <Link
                  to={`/courses/${course.id}`}
                  className="flex flex-col gap-3"
                >

                  <p className="line-clamp-3 text-sm text-ink-700">
                    {course.description ||
                      'No description provided yet.'}
                  </p>

                  {/* Categories */}
                  {course.categories?.length > 0 && (
                    <div className="flex flex-wrap gap-1">

                      {course.categories.map((cat) => (
                        <Badge
                          key={cat.id}
                          tone="brand"
                        >
                          {cat.name}
                        </Badge>
                      ))}

                    </div>
                  )}
                </Link>
              </div>

              {/* =================================================
                  Instructor
              ================================================= */}
              {course.instructor?.name && (
                <p className="mt-auto pt-2 text-xs text-ink-600">
                  By {course.instructor.name}
                </p>
              )}

            </Card>
          );
        })}

      </div>

      {/* =====================================================
          Edit Course Modal
      ===================================================== */}
      {editingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">

            {/* Header */}
            <div className="mb-4 flex items-center justify-between">

              <h3 className="font-display text-lg font-bold text-ink-900">
                Edit Course
              </h3>

              <button
                onClick={() => setEditingCourse(null)}
                className="rounded-lg bg-stone-100 p-1.5 text-stone-600 hover:bg-stone-200"
              >
                ✕
              </button>

            </div>

            {/* Form */}
            <form
              onSubmit={handleUpdateCourse}
              className="flex flex-col gap-4"
            >

              {/* Title */}
              <Input
                label="Course Title"
                required
                value={editCourseForm.title}
                onChange={(e) =>
                  setEditCourseForm({
                    ...editCourseForm,
                    title: e.target.value,
                  })
                }
              />

              {/* Description */}
              <Textarea
                label="Course Description"
                rows={4}
                required
                value={editCourseForm.description}
                onChange={(e) =>
                  setEditCourseForm({
                    ...editCourseForm,
                    description: e.target.value,
                  })
                }
              />

              {/* Buttons */}
              <div className="flex justify-end gap-2 pt-2">

                <Button
                  type="button"
                  variant="ghost"
                  onClick={() =>
                    setEditingCourse(null)
                  }
                >
                  Cancel
                </Button>

                <Button
                  type="submit"
                  variant="accent"
                  disabled={updatingCourse}
                >
                  {updatingCourse
                    ? 'Updating…'
                    : 'Save Changes'}
                </Button>

              </div>

            </form>
          </div>
        </div>
      )}

      {/* =====================================================
          Delete Confirmation Modal
      ===================================================== */}
      {deletingCourse && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-xl bg-white p-6 shadow-2xl">

            <h3 className="font-display text-lg font-bold text-ink-900">
              Delete Course
            </h3>

            <p className="mt-2 text-sm text-ink-700">
              Are you sure you want to delete{' '}
              <span className="font-semibold text-ink-900">
                "{deletingCourse.title}"
              </span>
              ? This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-2">

              <Button
                type="button"
                variant="ghost"
                onClick={() =>
                  setDeletingCourse(null)
                }
              >
                Cancel
              </Button>

              <Button
                type="button"
                variant="danger"
                disabled={isDeleting}
                onClick={handleConfirmDelete}
              >
                {isDeleting
                  ? 'Deleting…'
                  : 'Delete Course'}
              </Button>

            </div>

          </div>
        </div>
      )}

      {/* =====================================================
          Pagination
      ===================================================== */}
      {totalPages > 1 && (
        <div className="mt-8 flex items-center justify-center gap-2">

          {/* Previous */}
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() =>
              setPage((p) => p - 1)
            }
          >
            Previous
          </Button>

          {/* Current Page */}
          <span className="text-sm text-ink-700">
            Page {page} of {totalPages}
          </span>

          {/* Next */}
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() =>
              setPage((p) => p + 1)
            }
          >
            Next
          </Button>

        </div>
      )}

    </div>
  );
}