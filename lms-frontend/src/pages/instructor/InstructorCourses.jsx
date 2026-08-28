import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert, Button } from '../../components/ui.jsx';

export default function InstructorCourses() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('lms_token');

    api
      .getInstructorCourses(token)
      .then((data) => {
        setCourses(data);
      })
      .catch((err) => {
        setError(err.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">
        My Courses
      </h1>

      <p className="mb-6 text-sm text-ink-700">
        Manage your courses, students, and quizzes.
      </p>

      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      )}

      {error && <Alert>{error}</Alert>}

      {!loading && courses.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-700">
          You haven't created any courses yet.
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
          <div key={course.id}>
            <Card className="flex h-full flex-col gap-3 p-5">
              <div className="flex items-start justify-between gap-2">
                <h2 className="font-display text-base font-semibold text-ink-900">
                  {course.title}
                </h2>

                <Badge tone={course.isPublished ? 'success' : 'neutral'}>
                  {course.isPublished ? 'Published' : 'Draft'}
                </Badge>
              </div>

              <p className="line-clamp-2 text-sm text-ink-700">
                {course.description}
              </p>

              <div className="mt-auto flex gap-2">
                <Link
                  to={`/instructor/courses/${course.id}/students`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Students
                  </Button>
                </Link>

                <Link
                  to={`/instructor/courses/${course.id}/quiz-stats`}
                  className="flex-1"
                >
                  <Button variant="outline" className="w-full">
                    Quiz Stats
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}