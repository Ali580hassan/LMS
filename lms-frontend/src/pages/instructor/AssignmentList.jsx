// src/components/AssignmentList.jsx
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';

import { api } from '../../api/client.js';
import { Card, Button, Alert, Spinner } from '../../components/ui.jsx';
import AssignmentCard from './AssignmentCard.jsx';

export default function AssignmentList({ courseId, isOwner , isStudentEnrolled }) {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Delete modal state
  const [deletingAssignment, setDeletingAssignment] = useState(null);
  const [deletingLoading, setDeletingLoading] = useState(false);

  function load() {
    setLoading(true);
    api
      .getAssignments(courseId, token)
      .then(setAssignments)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [courseId]);

  // Trigger delete modal
  function handleDeleteClick(paramCourseId, paramAssignmentId) {
    const targetCourseId = paramAssignmentId ? paramCourseId : courseId;
    const targetAssignmentId = paramAssignmentId ? paramAssignmentId : paramCourseId;

    const assignmentToFind = assignments.find((a) => a.id === targetAssignmentId);
    
    setDeletingAssignment({
      id: targetAssignmentId,
      courseId: targetCourseId,
      title: assignmentToFind?.title || 'this assignment',
    });
  }

  // Confirm Delete Action
  async function confirmDelete() {
    if (!deletingAssignment) return;

    setDeletingLoading(true);
    try {
      await api.deleteAssignment(deletingAssignment.courseId, deletingAssignment.id, token);
      setDeletingAssignment(null);
      load();
    } catch (err) {
      setError(err.message);
    } finally {
      setDeletingLoading(false);
    }
  }

  return (
    <div className="mt-8">
      <div className="mb-3 flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold text-ink-900">Assignments</h2>
        {isOwner && (
          <Button variant="ghost" onClick={() => navigate(`/courses/${courseId}/assignments/new`)}>
            + Create assignment
          </Button>
        )}
      </div>

      {loading && (
        <div className="flex items-center gap-2 text-ink-700">
          <Spinner /> Loading…
        </div>
      )}
      {error && <Alert>{error}</Alert>}

      {!loading && assignments.length === 0 && (
        <Card className="p-6 text-center text-sm text-ink-700">No assignments yet.</Card>
      )}

      <div className="flex flex-col gap-2">
        {assignments.map((a) => (
        <AssignmentCard
  key={a.id}
  courseId={courseId}  // ← ye add karo
  assignment={{ ...a, courseId: a.courseId || courseId }}
  isOwner={isOwner}
  isStudentEnrolled={isStudentEnrolled}
  onEdit={(assignment) => navigate(`/courses/${courseId}/assignments/${assignment.id}/edit`)}
  onDelete={handleDeleteClick}
  onSubmit={(assignmentId, dto) => api.submitAssignment(courseId, assignmentId, dto, token)}
/>
        ))}
      </div>

      {/* Delete Confirmation Modal Window */}
      {deletingAssignment && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-3 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-red-100 text-red-600">
                ⚠️
              </div>
              <h3 className="font-display text-lg font-bold text-stone-900">Delete Assignment</h3>
            </div>
            
            <p className="text-sm text-stone-600 leading-relaxed">
              Are you sure you want to delete <strong className="text-stone-900">"{deletingAssignment.title}"</strong>? This action cannot be undone.
            </p>

            <div className="flex justify-end gap-2 pt-6">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setDeletingAssignment(null)}
                disabled={deletingLoading}
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={confirmDelete}
                disabled={deletingLoading}
                className="bg-red-600 text-white hover:bg-red-700"
              >
                {deletingLoading ? 'Deleting…' : 'Delete Assignment'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}