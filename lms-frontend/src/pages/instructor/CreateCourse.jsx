import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Input, Textarea, Button, Alert } from '../../components/ui.jsx';

export default function CreateCourse() {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', description: '' });
  const [categories, setCategories] = useState([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    api.getCategories().then(setCategories).catch(() => {});
  }, []);

  function toggleCategory(id) {
    setSelectedCategoryIds((ids) =>
      ids.includes(id) ? ids.filter((c) => c !== id) : [...ids, id],
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      const course = await api.createCourse(
        { ...form, categoryIds: selectedCategoryIds },
        token,
      );

      // 🔹 Notify Navbar to update course count without page refresh
      window.dispatchEvent(new Event('courseCreated'));

      navigate(`/courses/${course.id}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="mx-auto max-w-xl px-6 py-10">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">Create a course</h1>
      <p className="mb-6 text-sm text-ink-700">Give it a clear title — you can add lessons after.</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && <Alert>{error}</Alert>}
          <Input
            label="Title"
            required
            minLength={3}
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            placeholder="Introduction to NestJS"
          />
          <Textarea
            label="Description"
            rows={4}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="What will students learn in this course?"
          />

          {categories.length > 0 && (
            <div>
              <span className="mb-1.5 block text-sm font-medium text-ink-700">Categories</span>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => {
                  const active = selectedCategoryIds.includes(cat.id);
                  return (
                    <button
                      type="button"
                      key={cat.id}
                      onClick={() => toggleCategory(cat.id)}
                      className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        active
                          ? 'border-brand-500 bg-brand-50 text-brand-700'
                          : 'border-ink-900/15 text-ink-700 hover:bg-ink-900/5'
                      }`}
                    >
                      {cat.name}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <Button type="submit" variant="accent" disabled={loading} className="mt-2 w-full">
            {loading ? 'Creating…' : 'Create course'}
          </Button>
        </form>
      </Card>
    </div>
  );
}