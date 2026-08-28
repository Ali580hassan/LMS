import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Input, Textarea, Button, Alert, Spinner } from '../../components/ui.jsx';

export default function EditAssignment() {
  const { id: courseId, assignmentId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', description: '', deadline: '' });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    api
      .getAssignment(courseId, assignmentId, token)
      .then((assignment) => {
        setForm({
          title: assignment.title,
          description: assignment.description,
          // deadline backend se ISO string aata hai (jaise "2026-08-20T00:00:00.000Z"),
          // lekin <input type="date"> ko "YYYY-MM-DD" format chahiye — isliye trim karna zaroori hai
          deadline: assignment.deadline?.slice(0, 10),
        });
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [courseId, assignmentId, token]);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.updateAssignment(courseId, assignmentId, form, token);
      navigate(`/courses/${courseId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  if (loading) {
    return (
      <div className="mx-auto flex max-w-xl items-center gap-2 px-6 py-10 text-ink-700">
        <Spinner /> Loading…
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">Edit assignment</h1>
      <p className="mb-6 text-sm text-ink-700">Update the title, description, or deadline.</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert>{error}</Alert>}
          <Input
            label="Title"
            required
            minLength={3}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
          <Textarea
            label="Description / instructions"
            rows={4}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
          />
          <label className="block">
            <span className="mb-1.5 block text-sm font-medium text-ink-700">Deadline</span>
            <input
              type="date"
              required
              value={form.deadline}
              onChange={(e) => setForm({ ...form, deadline: e.target.value })}
              className="w-full rounded-xl border border-ink-900/15 bg-white px-3.5 py-2.5 text-sm text-ink-900 outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-100"
            />
          </label>
          <div className="mt-2 flex gap-2">
            <Button type="submit" variant="accent" disabled={saving} className="flex-1">
              {saving ? 'Saving…' : 'Save changes'}
            </Button>
            <Button type="button" variant="outline" onClick={() => navigate(-1)}>
              Cancel
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
}