import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Spinner, Alert } from '../../components/ui.jsx';

export default function QuizStats() {
  const { id } = useParams();
  const { token } = useAuth();
  const [attempts, setAttempts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getCourseQuizStats(id, token)
      .then(setAttempts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [id, token]);

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to="/instructor/courses" className="mb-4 inline-block text-sm text-brand-600 hover:underline">
        ← Back to my courses
      </Link>
      <h1 className="font-display mb-6 text-2xl font-semibold text-ink-900">Quiz Attempts</h1>

      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      )}
      {error && <Alert>{error}</Alert>}

      {!loading && attempts.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-700">No quiz attempts yet.</Card>
      )}

      <div className="flex flex-col gap-2">
        {attempts.map((attempt) => (
          <Card key={attempt.id} className="flex items-center justify-between gap-3 p-4">
            <div>
              <h3 className="text-sm font-medium text-ink-900">
                {attempt.enrollment?.student?.name}
              </h3>
              <p className="text-xs text-ink-600">{attempt.enrollment?.student?.email}</p>
              <p className="mt-1 text-xs text-ink-600">
                {attempt.quiz?.title} · {new Date(attempt.attemptedAt).toLocaleDateString()}
              </p>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-sm font-semibold text-ink-900">
                {attempt.score}/{attempt.totalQuestions}
              </span>
              <Badge tone={attempt.passed ? 'success' : 'warning'}>
                {attempt.passed ? 'Passed' : 'Not passed'}
              </Badge>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}