import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { api } from '../api/client.js';
import { Card, Button, Textarea, Badge, Spinner, Alert } from './ui.jsx';

function StarDisplay({ rating }) {
    return (
        <span className="text-amber-500">
            {'★'.repeat(rating)}
            <span className="text-ink-900/15">{'★'.repeat(5 - rating)}</span>
        </span>
    );
}

export default function ReviewList({ courseId, isStudentEnrolled }) {
    const { token, user } = useAuth();
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const [showForm, setShowForm] = useState(false);
    const [editingReviewId, setEditingReviewId] = useState(null);
    const [rating, setRating] = useState(5);
    const [comment, setComment] = useState('');
    const [submitting, setSubmitting] = useState(false);
    const [submitError, setSubmitError] = useState('');

    // Extracting user ID safely from JWT payload
    const currentUserId = user?.sub || user?.id || user?.userId;

    function load() {
        setLoading(true);
        Promise.all([api.getReviews(courseId, token), api.getAverageRating(courseId, token)])
            .then(([reviewData, avgRes]) => {
                setReviews(reviewData || []);

                let ratingVal = avgRes;
                if (typeof avgRes === 'object' && avgRes !== null) {
                    ratingVal = avgRes.averageRating ?? avgRes.avg ?? avgRes.rating ?? null;
                }

                const numericRating = Number(ratingVal);
                if (!isNaN(numericRating) && numericRating > 0) {
                    setAvgRating(numericRating);
                } else {
                    setAvgRating(null);
                }
            })
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }

    useEffect(() => {
        load();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [courseId]);

    const myReview = reviews.find(
        (r) => String(r.enrollment?.student?.id) === String(currentUserId)
    );

    function startEdit(review) {
        setEditingReviewId(review.id);
        setRating(review.rating);
        setComment(review.comment);
        setShowForm(true);
    }

    function cancelForm() {
        setShowForm(false);
        setEditingReviewId(null);
        setRating(5);
        setComment('');
        setSubmitError('');
    }

    async function handleSubmit(e) {
        e.preventDefault();
        setSubmitError('');
        setSubmitting(true);
        try {
            if (editingReviewId) {
                await api.updateReview(courseId, editingReviewId, { rating, comment }, token);
            } else {
                await api.createReview(courseId, { rating, comment }, token);
            }
            cancelForm();
            load();
        } catch (err) {
            setSubmitError(err.message);
        } finally {
            setSubmitting(false);
        }
    }

    async function handleDelete(reviewId) {
        if (!window.confirm('Are you sure you want to delete this review?')) return;
        try {
            await api.deleteReview(courseId, reviewId, token);
            load();
        } catch (err) {
            alert(err.message);
        }
    }

    return (
        <div className="mt-8">
            <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                    <h2 className="font-display text-lg font-semibold text-ink-900">Reviews</h2>
                    <Badge tone={avgRating !== null ? 'brand' : 'neutral'}>
                        {avgRating !== null ? `${avgRating.toFixed(1)} ★` : 'N/A ★'}
                    </Badge>
                </div>
                {isStudentEnrolled && !myReview && !showForm && (
                    <Button variant="ghost" onClick={() => setShowForm(true)}>
                        + Write a review
                    </Button>
                )}
            </div>

            {isStudentEnrolled && showForm && (
                <Card className="mb-4 p-5">
                    <div className="mb-3 flex items-center justify-between">
                        <h3 className="text-sm font-semibold text-ink-900">
                            {editingReviewId ? 'Edit your review' : 'Write a review'}
                        </h3>
                        <Button variant="ghost" size="sm" onClick={cancelForm}>
                            Cancel
                        </Button>
                    </div>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                        {submitError && <Alert>{submitError}</Alert>}

                        <div>
                            <span className="mb-1.5 block text-sm font-medium text-ink-700">Rating</span>
                            <div className="flex gap-1">
                                {[1, 2, 3, 4, 5].map((n) => (
                                    <button
                                        key={n}
                                        type="button"
                                        onClick={() => setRating(n)}
                                        className={`text-2xl ${n <= rating ? 'text-amber-500' : 'text-ink-900/15'}`}
                                    >
                                        ★
                                    </button>
                                ))}
                            </div>
                        </div>

                        <Textarea
                            label="Comment"
                            rows={3}
                            required
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            placeholder="What did you think of this course?"
                        />

                        <Button type="submit" variant="accent" disabled={submitting} className="w-fit">
                            {submitting ? 'Saving…' : editingReviewId ? 'Update review' : 'Submit review'}
                        </Button>
                    </form>
                </Card>
            )}

            {loading && (
                <div className="flex items-center gap-2 text-ink-700">
                    <Spinner /> Loading…
                </div>
            )}
            {error && <Alert>{error}</Alert>}

            {!loading && reviews.length === 0 && (
                <Card className="p-6 text-center text-sm text-ink-700">No reviews yet.</Card>
            )}

            <div className="flex flex-col gap-2">
                {reviews.map((r) => {
                    const reviewStudentId = r.enrollment?.student?.id;

                    // Match current logged in student with review owner
                    const isMine =
                        reviewStudentId !== undefined &&
                        currentUserId !== undefined &&
                        String(reviewStudentId) === String(currentUserId);

                    return (
                        <Card key={r.id} className="p-4">
                            <div className="mb-1 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-medium text-ink-900">
                                        {r.enrollment?.student?.name || 'Anonymous Student'}
                                    </span>
                                    {isMine && <Badge tone="brand">You</Badge>}
                                </div>
                                <StarDisplay rating={r.rating} />
                            </div>

                            <p className="text-sm text-ink-700">{r.comment}</p>

                            {isMine && !showForm && (
                                <div className="mt-3 flex gap-2 border-t border-ink-900/5 pt-2">
                                    <Button variant="ghost" size="sm" onClick={() => startEdit(r)}>
                                        Edit
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="text-red-600 hover:text-red-700"
                                        onClick={() => handleDelete(r.id)}
                                    >
                                        Delete
                                    </Button>
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>
        </div>
    );
}