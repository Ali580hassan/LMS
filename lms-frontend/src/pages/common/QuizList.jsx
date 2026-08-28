import { useState } from 'react';
import { Card, Button, Badge, Spinner } from '../../components/ui.jsx';
import { api } from '../../api/client.js';
import { useAuth } from '../../context/AuthContext.jsx';

export default function QuizList({
  courseId,
  quizzes = [],
  isOwner,
  isEnrolled,
  isStudent,
  onRefresh,
}) {
  const { token } = useAuth();

  const [activeQuiz, setActiveQuiz] = useState(null);
  const [historyQuiz, setHistoryQuiz] = useState(null);
  const [quizAttempts, setQuizAttempts] = useState([]);
  const [loadingAttempts, setLoadingAttempts] = useState(false);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [submittingQuiz, setSubmittingQuiz] = useState(false);
  const [quizResult, setQuizResult] = useState(null);

  async function handleDeleteQuiz(quizId) {
    if (!confirm('Are you sure you want to delete this quiz?')) return;
    try {
      await api.deleteQuiz(courseId, quizId, token);
      if (onRefresh) onRefresh();
    } catch (err) {
      alert(err.message);
    }
  }

  async function handleOpenHistory(quiz) {
    setHistoryQuiz(quiz);
    setLoadingAttempts(true);
    try {
      const attempts = await api.getMyQuizAttempts(courseId, quiz.id, token);
      setQuizAttempts(attempts);
    } catch (err) {
      console.error(err.message);
    } finally {
      setLoadingAttempts(false);
    }
  }

  async function handleSubmitQuiz() {
    if (!activeQuiz) return;
    setSubmittingQuiz(true);
    try {
      const answersArray = activeQuiz.questions.map((_, i) => quizAnswers[i] ?? -1);
      const res = await api.submitQuiz(courseId, activeQuiz.id, answersArray, token);
      setQuizResult(res);
    } catch (err) {
      alert(err.message);
    } finally {
      setSubmittingQuiz(false);
    }
  }

  return (
    <div className="space-y-3 pt-4">
      <h2 className="font-display text-lg font-semibold text-stone-900">Quizzes</h2>

      {quizzes.length === 0 && (
        <Card className="p-6 text-center text-sm text-stone-500">
          No quizzes available yet.
        </Card>
      )}

      <div className="flex flex-col gap-2">
        {quizzes.map((quiz) => (
          <Card key={quiz.id} className="flex items-center justify-between p-4">
            <div>
              <h3 className="text-sm font-semibold text-stone-900">{quiz.title}</h3>
              <p className="text-xs text-stone-500">
                {quiz.questions?.length || 0} questions · Pass: {quiz.passingScore}%
              </p>
            </div>

            <div className="flex items-center gap-2">
              {isStudent && isEnrolled && (
                <>
                  <Button variant="outline" onClick={() => handleOpenHistory(quiz)}>
                    History
                  </Button>
                  <Button
                    variant="accent"
                    onClick={() => {
                      setQuizAnswers({});
                      setQuizResult(null);
                      setActiveQuiz(quiz);
                    }}
                  >
                    Take Quiz
                  </Button>
                </>
              )}
              {isOwner && (
                <Button variant="danger" onClick={() => handleDeleteQuiz(quiz.id)}>
                  Delete
                </Button>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Quiz Attempt Modal */}
      {activeQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-bold text-stone-900">
                {activeQuiz.title}
              </h3>
              <button
                onClick={() => setActiveQuiz(null)}
                className="rounded-lg bg-stone-100 p-1.5 text-stone-600 hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            {quizResult ? (
              <div className="py-4 text-center">
                <p className="text-3xl font-semibold text-stone-900">
                  {quizResult.score}/{quizResult.totalQuestions}
                </p>
                <div className="mt-2">
                  <Badge tone={quizResult.passed ? 'success' : 'warning'}>
                    {quizResult.passed ? 'Passed' : 'Not passed'}
                  </Badge>
                </div>
                <div className="mt-6">
                  <Button variant="accent" onClick={() => setActiveQuiz(null)}>
                    Close
                  </Button>
                </div>
              </div>
            ) : (
              <>
                <div className="flex max-h-[60vh] flex-col gap-5 overflow-y-auto pr-1">
                  {activeQuiz.questions?.map((q, qIndex) => (
                    <div key={q.id || qIndex}>
                      <p className="mb-2 text-sm font-medium text-stone-900">
                        {qIndex + 1}. {q.text}
                      </p>
                      <div className="flex flex-col gap-1">
                        {q.options.map((opt, optIndex) => (
                          <label
                            key={optIndex}
                            className="flex cursor-pointer items-center gap-2 rounded-lg border border-stone-200 px-3 py-2 text-sm hover:bg-stone-50"
                          >
                            <input
                              type="radio"
                              name={`question-${qIndex}`}
                              checked={quizAnswers[qIndex] === optIndex}
                              onChange={() =>
                                setQuizAnswers({ ...quizAnswers, [qIndex]: optIndex })
                              }
                            />
                            {opt}
                          </label>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  variant="accent"
                  className="mt-5 w-full"
                  onClick={handleSubmitQuiz}
                  disabled={submittingQuiz}
                >
                  {submittingQuiz ? 'Submitting…' : 'Submit Quiz'}
                </Button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Quiz History Modal */}
      {historyQuiz && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between border-b pb-3">
              <div>
                <h3 className="font-display text-lg font-bold text-stone-900">
                  Attempt History
                </h3>
                <p className="text-xs text-stone-500">{historyQuiz.title}</p>
              </div>
              <button
                onClick={() => setHistoryQuiz(null)}
                className="rounded-lg bg-stone-100 p-1.5 text-stone-500 hover:bg-stone-200"
              >
                ✕
              </button>
            </div>

            {loadingAttempts ? (
              <div className="flex items-center justify-center gap-2 py-8 text-stone-600">
                <Spinner /> <span className="text-sm font-medium">Loading attempts…</span>
              </div>
            ) : quizAttempts.length === 0 ? (
              <p className="py-8 text-center text-sm text-stone-500">
                No attempts recorded yet for this quiz.
              </p>
            ) : (
              <div className="flex max-h-[50vh] flex-col gap-2 overflow-y-auto pr-1">
                {quizAttempts.map((attempt, index) => (
                  <div
                    key={attempt.id || index}
                    className="flex items-center justify-between rounded-xl border border-stone-200 bg-stone-50/50 p-3"
                  >
                    <div>
                      <p className="text-xs text-stone-500">
                        {attempt.createdAt
                          ? new Date(attempt.createdAt).toLocaleString()
                          : `Attempt #${index + 1}`}
                      </p>
                      <p className="text-sm font-semibold text-stone-800">
                        Score: {attempt.score} / {attempt.totalQuestions}
                      </p>
                    </div>
                    <Badge tone={attempt.passed ? 'success' : 'warning'}>
                      {attempt.passed ? 'Passed' : 'Failed'}
                    </Badge>
                  </div>
                ))}
              </div>
            )}

            <div className="mt-5 flex justify-end">
              <Button variant="ghost" onClick={() => setHistoryQuiz(null)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}