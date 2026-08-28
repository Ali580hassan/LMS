import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert } from '../../components/ui.jsx';

export default function MyCourses() {
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getMyEnrollments(token)
      .then(setEnrollments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [token]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <h1 className="font-display mb-6 text-2xl font-semibold text-ink-900">My Courses</h1>

      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      )}
      {error && <Alert>{error}</Alert>}

      {!loading && enrollments.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-700">
          You haven't enrolled in any courses yet.
        </Card>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {enrollments.map((enr) => (
          <Link key={enr.id} to={`/courses/${enr.course.id}`}>
            <Card className="flex h-full flex-col gap-3 p-5 transition-shadow hover:shadow-lg">
              <h2 className="font-display text-base font-semibold text-ink-900">
                {enr.course.title}
              </h2>
              <p className="line-clamp-3 text-sm text-ink-700">{enr.course.description}</p>
              <Badge tone="brand">{enr.progressPercentage}% complete</Badge>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}