import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Input, Button, Alert, Spinner, Badge } from '../../components/ui.jsx';

export default function Categories() {
  const { token } = useAuth();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const [name, setName] = useState('');
  const [creating, setCreating] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');

  // Delete Modal State
  const [deletingCategory, setDeletingCategory] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  function load() {
    setLoading(true);
    api
      .getCategories()
      .then(setCategories)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
  }, []);

  async function handleCreate(e) {
    e.preventDefault();
    setError('');
    setCreating(true);
    try {
      await api.createCategory({ name }, token);
      setName('');
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setCreating(false);
    }
  }

  function startEdit(category) {
    setEditingId(category.id);
    setEditName(category.name);
  }

  async function handleSaveEdit(e, id) {
    if (e) e.preventDefault();
    try {
      await api.updateCategory(id, { name: editName }, token);
      setEditingId(null);
      load();
    } catch (err) {
      setError(err.message);
    }
  }

  function promptDelete(category) {
    setDeletingCategory(category);
  }

  async function confirmDelete() {
    if (!deletingCategory) return;
    setIsDeleting(true);
    try {
      await api.deleteCategory(deletingCategory.id, token);
      setDeletingCategory(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">Categories</h1>
      <p className="mb-6 text-sm text-ink-700">
        Manage the categories instructors can tag their courses with.
      </p>

      <Card className="mb-6 p-5">
        <form onSubmit={handleCreate} className="flex items-end gap-2">
          <div className="flex-1">
            <Input
              label="New category"
              required
              minLength={2}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Web Development"
            />
          </div>
          <Button type="submit" variant="accent" disabled={creating}>
            {creating ? 'Adding…' : 'Add'}
          </Button>
        </form>
      </Card>

      {error && <Alert className="mb-4">{error}</Alert>}

      {loading ? (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      ) : categories.length === 0 ? (
        <Card className="p-6 text-center text-sm text-ink-700">No categories yet.</Card>
      ) : (
        <div className="flex flex-col gap-2">
          {categories.map((cat) => (
            <Card key={cat.id} className="flex items-center justify-between gap-3 p-4">
              {editingId === cat.id ? (
                <form
                  onSubmit={(e) => handleSaveEdit(e, cat.id)}
                  className="flex flex-1 items-center gap-2"
                >
                  <input
                    autoFocus
                    value={editName}
                    onChange={(e) => setEditName(e.target.value)}
                    className="flex-1 rounded-lg border border-ink-900/15 px-2.5 py-1.5 text-sm outline-none focus:border-brand-500"
                  />
                  <div className="flex gap-1">
                    <Button type="submit" variant="accent">
                      Save
                    </Button>
                    <Button type="button" variant="ghost" onClick={() => setEditingId(null)}>
                      Cancel
                    </Button>
                  </div>
                </form>
              ) : (
                <>
                  <Badge tone="brand">{cat.name}</Badge>
                  <div className="flex gap-1">
                    <Button type="button" variant="ghost" onClick={() => startEdit(cat)}>
                      Edit
                    </Button>
                    <Button type="button" variant="danger" onClick={() => promptDelete(cat)}>
                      Delete
                    </Button>
                  </div>
                </>
              )}
            </Card>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deletingCategory && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                ⚠️
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900">
                Delete Category
              </h3>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-stone-900">"{deletingCategory.name}"</strong>? Courses tagged with it will lose this tag.
            </p>
            <div className="flex justify-end gap-2 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeletingCategory(null)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmDelete}
                disabled={isDeleting}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {isDeleting ? 'Deleting…' : 'Delete Category'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}