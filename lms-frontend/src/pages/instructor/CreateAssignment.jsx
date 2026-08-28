import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Input, Textarea, Button, Alert } from '../../components/ui.jsx';

export default function CreateAssignment() {
  const { id: courseId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', description: '', deadline: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await api.createAssignment(courseId, form, token);
      navigate(`/courses/${courseId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">Create an assignment</h1>
      <p className="mb-6 text-sm text-ink-700">Set a title, instructions, and a deadline.</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert>{error}</Alert>}
          <Input
            label="Title"
            required
            minLength={3}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Week 3 Assignment"
          />
          <Textarea
            label="Description / instructions"
            rows={4}
            required
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What should students submit?"
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
          <Button type="submit" variant="accent" disabled={loading} className="mt-2 w-full">
            {loading ? 'Creating…' : 'Create assignment'}
          </Button>
        </form>
      </Card>
    </div>
  );
}