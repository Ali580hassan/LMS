import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert } from '../../components/ui.jsx';

export default function CourseStudents() {
  const { id } = useParams();
  const { token } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getCourseStudents(id, token)
      .then(setEnrollments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/instructor/courses" className="mb-4 inline-block text-sm text-brand-600 hover:underline">
        ← Back to my courses
      </Link>
      <h1 className="font-display mb-6 text-2xl font-semibold text-ink-900">Enrolled Students</h1>

      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      )}
      {error && <Alert>{error}</Alert>}

      {!loading && enrollments.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-700">No students enrolled yet.</Card>
      )}

      <div className="flex flex-col gap-2">
        {enrollments.map((enr) => (
          <Card key={enr.id} className="flex items-center justify-between gap-3 p-4">
            <div>
              <h3 className="text-sm font-medium text-ink-900">{enr.student?.name}</h3>
              <p className="text-xs text-ink-600">{enr.student?.email}</p>
            </div>
            <Badge tone="brand">{enr.progressPercentage}% complete</Badge>
          </Card>
        ))}
      </div>
    </div>
  );
}