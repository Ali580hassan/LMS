import { useState, useEffect } from 'react';
import { Card, Badge, Button, Textarea, Alert, Spinner } from '../../components/ui.jsx';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Link } from 'react-router-dom';

export default function AssignmentCard({ courseId, assignment, isOwner, isStudentEnrolled, onEdit, onDelete, onSubmit }) {
  const { token } = useAuth();
  const isPastDeadline = new Date(assignment.deadline) < new Date();

  const [showModal, setShowModal] = useState(false);
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const [mySubmission, setMySubmission] = useState(null);
  const [checkingSubmission, setCheckingSubmission] = useState(isStudentEnrolled);
  const [showResultModal, setShowResultModal] = useState(false);

  useEffect(() => {
    if (!isStudentEnrolled) {
      setCheckingSubmission(false);
      return;
    }
    api
      .getMySubmission(courseId, assignment.id, token)
      .then(setMySubmission)
      .catch(() => setMySubmission(null))
      .finally(() => setCheckingSubmission(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [assignment.id, isStudentEnrolled]);

  async function handleSubmitClick() {
    setSubmitError('');
    if (!content.trim() && !file) {
      setSubmitError('Add some text or attach a file before submitting.');
      return;
    }

    setSubmitting(true);
    try {
      let fileUrl;
      if (file) {
        setUploading(true);
        const uploaded = await api.uploadFile(file, token);
        fileUrl = uploaded.url;
        setUploading(false);
      }

      const result = await onSubmit(assignment.id, {
        content: content.trim() || undefined,
        fileUrl,
      });
      setMySubmission(result);
      setShowModal(false);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
      setUploading(false);
    }
  }

  return (
    <>
      <Card className="flex items-center justify-between gap-3 p-4">
        <div>
          <h3 className="text-sm font-semibold text-ink-900">{assignment.title}</h3>
          <p className="line-clamp-1 text-xs text-ink-600">{assignment.description}</p>
          <Badge tone={isPastDeadline ? 'warning' : 'neutral'}>
            Due {new Date(assignment.deadline).toLocaleDateString()}
          </Badge>
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {isOwner && (
            <>
              <Button variant="ghost" onClick={() => onEdit(assignment)} className="text-xs">
                Edit
              </Button>
              <Link to={`/courses/${courseId}/assignments/${assignment.id}/submissions`}>
                <Button variant="ghost" className="flex items-center gap-1.5 text-xs">
                  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M2 4h12M2 8h12M2 12h8" strokeLinecap="round" />
                  </svg>
                  Submissions
                </Button>
              </Link>
              <Button variant="danger" onClick={() => onDelete(assignment.id)} className="text-xs">
                Delete
              </Button>
            </>
          )}

          {isStudentEnrolled && checkingSubmission && <Spinner />}

          {isStudentEnrolled && !checkingSubmission && !mySubmission && (
            <Button variant="accent" onClick={() => setShowModal(true)}>
              Submit
            </Button>
          )}

          {mySubmission && (
            <Button
              variant="outline"
              onClick={() => setShowResultModal(true)}
              className="flex items-center gap-1.5 text-xs"
            >
              <Badge tone="success">Submitted</Badge>
              View Result
            </Button>
          )}
        </div>
      </Card>

      {/* Submit Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink-900">
                Submit — {assignment.title}
              </h3>
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg bg-stone-100 p-1.5 text-stone-600 hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {submitError && <Alert>{submitError}</Alert>}

              <Textarea
                label="Your answer (optional if attaching a file)"
                rows={4}
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your submission here…"
              />

              <label className="block">
                <span className="mb-1.5 block text-sm font-medium text-ink-700">
                  Attach a file (optional)
                </span>
                <input
                  type="file"
                  onChange={(e) => setFile(e.target.files?.[0] ?? null)}
                  className="block w-full text-sm text-ink-700 file:mr-3 file:rounded-lg file:border-0 file:bg-ink-900/5 file:px-3 file:py-2 file:text-sm file:font-medium file:text-ink-900 hover:file:bg-ink-900/10"
                />
                {file && <p className="mt-1 text-xs text-ink-600">Selected: {file.name}</p>}
              </label>

              <div className="flex justify-end gap-2 pt-2">
                <Button variant="ghost" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
                <Button variant="accent" onClick={handleSubmitClick} disabled={submitting}>
                  {uploading ? 'Uploading file…' : submitting ? 'Submitting…' : 'Submit assignment'}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Result Modal */}
      {showResultModal && mySubmission && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-ink-900">
                Your Submission — {assignment.title}
              </h3>
              <button
                onClick={() => setShowResultModal(false)}
                className="rounded-lg bg-stone-100 p-1.5 text-stone-600 hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <Badge tone="success">Submitted</Badge>
                <span className="text-xs text-ink-600">
                  {new Date(mySubmission.submittedAt).toLocaleDateString()}
                </span>
              </div>

              {mySubmission.content && (
                <div>
                  <span className="mb-1 block text-xs font-medium text-ink-700">Your answer</span>
                  <p className="rounded-lg bg-ink-900/5 px-3 py-2 text-sm text-ink-900">
                    {mySubmission.content}
                  </p>
                </div>
              )}

              {mySubmission.fileUrl && (
                <div>
                  {mySubmission.fileUrl && (
                    <div>
                      <span className="mb-1 block text-xs font-medium text-ink-700">Attached file</span>
                      {mySubmission.fileUrl.startsWith('/') ? (
                        <Button
                          type="button"
                          variant="outline"
                          className="text-sm"
                          onClick={() =>
                            window.open(
                              `http://localhost:3000${mySubmission.fileUrl}`,
                              '_blank',
                              'noopener,noreferrer,width=900,height=700',
                            )
                          }
                        >
                          View file
                        </Button>
                      ) : (
                        <p className="text-xs text-red-600">
                          This file link is from an older submission and is no longer valid.
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}

              <div className="border-t border-ink-900/8 pt-4">
                {mySubmission.grade ? (
                  <>
                    <div className="mb-2 flex items-center gap-2">
                      <span className="text-xs font-medium text-ink-700">Grade</span>
                      <Badge tone="brand">{mySubmission.grade}</Badge>
                    </div>
                    {mySubmission.comment ? (
                      <div>
                        <span className="mb-1 block text-xs font-medium text-ink-700">
                          Instructor feedback
                        </span>
                        <p className="rounded-lg bg-brand-50 px-3 py-2 text-sm text-ink-900">
                          {mySubmission.comment}
                        </p>
                      </div>
                    ) : (
                      <p className="text-xs text-ink-600">No written feedback given.</p>
                    )}
                  </>
                ) : (
                  <p className="text-sm text-ink-600">Not graded yet — check back later.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}