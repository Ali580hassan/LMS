import React, { useEffect, useState } from 'react';
import { assignmentApi } from '../api/assignmentApi';

export const StudentSubmissionCard = ({ assignmentId, token }) => {
  const [submission, setSubmission] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!assignmentId) return;

    setLoading(true);
    assignmentApi
      .getMySubmission(assignmentId, token)
      .then((data) => {
        setSubmission(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || 'Failed to fetch submission');
        setLoading(false);
      });
  }, [assignmentId, token]);

  if (loading) return <div>Loading your submission...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!submission) return <div>You have not submitted this assignment yet.</div>;

  return (
    <div className="p-4 border rounded-md shadow-sm bg-white">
      <h3 className="text-lg font-bold">Your Submission</h3>
      <p className="text-sm text-gray-500">
        Submitted at: {new Date(submission.submittedAt).toLocaleString()}
      </p>

      <div className="mt-4 p-3 bg-gray-50 rounded">
        <p className="font-semibold">
          Grade:{' '}
          <span className="text-blue-600">
            {submission.grade ? submission.grade : 'Not graded yet'}
          </span>
        </p>
        {submission.comment && (
          <p className="mt-2 text-gray-700">
            <span className="font-semibold">Instructor Feedback:</span> {submission.comment}
          </p>
        )}
      </div>
    </div>
  );
};