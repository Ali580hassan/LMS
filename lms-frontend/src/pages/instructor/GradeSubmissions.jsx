import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Badge, Button, Input, Spinner, Alert } from '../../components/ui.jsx';

export default function GradeSubmissions() {
  const { id: courseId, assignmentId } = useParams();
  const { token } = useAuth();

  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [gradingId, setGradingId] = useState(null); // kis submission ko grade kar rahe hain
  const [gradeForm, setGradeForm] = useState({ grade: '', comment: '' });
  const [saving, setSaving] = useState(false);

  function load() {
    setLoading(true);
    api
      .getSubmissions(courseId, assignmentId, token)
      .then(setSubmissions)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId, assignmentId]);

  function startGrading(submission) {
    setGradingId(submission.id);
    setGradeForm({ grade: submission.grade || '', comment: submission.comment || '' });
  }

  async function handleSaveGrade(submissionId) {
    setSaving(true);
    try {
      await api.gradeSubmission(courseId, submissionId, gradeForm, token);
      setGradingId(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-3xl px-6 py-10">
      <Link to={`/courses/${courseId}`} className="mb-4 inline-block text-sm text-brand-600 hover:underline">
        ← Back to course
      </Link>
      <h1 className="font-display mb-6 text-2xl font-semibold text-ink-900">Submissions</h1>

      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      )}
      {error && <Alert>{error}</Alert>}

      {!loading && submissions.length === 0 && (
        <Card className="p-8 text-center text-sm text-ink-700">No submissions yet.</Card>
      )}

      <div className="flex flex-col gap-3">
        {submissions.map((s) => (
          <Card key={s.id} className="p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h3 className="text-sm font-semibold text-ink-900">{s.enrollment?.student?.name}</h3>
                <p className="text-xs text-ink-600">{s.enrollment?.student?.email}</p>
                <p className="mt-1 text-xs text-ink-600">
                  Submitted {new Date(s.submittedAt).toLocaleDateString()}
                </p>
              </div>
              {s.grade && <Badge tone="success">Grade: {s.grade}</Badge>}
            </div>

            {s.content && <p className="mt-3 text-sm text-ink-700">{s.content}</p>}
            {s.fileUrl && (
              <Button
                type="button"
                onClick={() => {
                  const width = 800;
                  const height = 600;
                  const left = (window.innerWidth - width) / 2;
                  const top = (window.innerHeight - height) / 2;

                  // URL constructor automatically paths missing slashes cleanly
                  const targetUrl = new URL(s.fileUrl, 'http://localhost:3000').href;

                  window.open(
                    targetUrl,
                    'FilePreview',
                    `width=${width},height=${height},top=${top},left=${left},resizable=yes,scrollbars=yes,status=no,toolbar=no`
                  );
                }}
                variant="outline"
                className="mt-3 mr-3"
              >
                View attached file
              </Button>
            )}

            {gradingId === s.id ? (
              <div className="mt-4 flex flex-col gap-3 border-t border-ink-900/8 pt-3">
                <Input
                  label="Grade"
                  value={gradeForm.grade}
                  onChange={(e) => setGradeForm({ ...gradeForm, grade: e.target.value })}
                  placeholder="A, B+, etc."
                />
                <Input
                  label="Feedback (optional)"
                  value={gradeForm.comment}
                  onChange={(e) => setGradeForm({ ...gradeForm, comment: e.target.value })}
                  placeholder="Nice work on..."
                />
                <div className="flex gap-2">
                  <Button variant="accent" onClick={() => handleSaveGrade(s.id)} disabled={saving}>
                    {saving ? 'Saving…' : 'Save grade'}
                  </Button>
                  <Button variant="ghost" onClick={() => setGradingId(null)}>
                    Cancel
                  </Button>
                </div>
              </div>
            ) : (
              <Button variant="outline" className="mt-3" onClick={() => startGrading(s)}>
                {s.grade ? 'Edit grade' : 'Grade this submission'}
              </Button>
            )}
          </Card>
        ))}
      </div>
    </div>
  );
}