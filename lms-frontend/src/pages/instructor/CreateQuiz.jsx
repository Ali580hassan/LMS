import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { api } from '../../api/client.js';
import { Card, Input, Button, Alert } from '../../components/ui.jsx';

export default function CreateQuiz() {
  const { id: courseId } = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ title: '', passingScore: 70 });
  const [questions, setQuestions] = useState([
    { text: '', options: ['', ''], correctAnswerIndex: 0 },
  ]);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);

  function addQuestion() {
    setQuestions((prev) => [...prev, { text: '', options: ['', ''], correctAnswerIndex: 0 }]);
  }

  function removeQuestion(index) {
    setQuestions((prev) => prev.filter((_, i) => i !== index));
  }

  function updateQuestionText(index, text) {
    setQuestions((prev) => prev.map((q, i) => (i === index ? { ...q, text } : q)));
  }

  function addOption(qIndex) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, options: [...q.options, ''] } : q)),
    );
  }

  function removeOption(qIndex, optIndex) {
    setQuestions((prev) =>
      prev.map((q, i) => {
        if (i !== qIndex) return q;
        const newOptions = q.options.filter((_, oi) => oi !== optIndex);
        const newCorrectIndex =
          q.correctAnswerIndex === optIndex
            ? 0
            : q.correctAnswerIndex > optIndex
            ? q.correctAnswerIndex - 1
            : q.correctAnswerIndex;
        return { ...q, options: newOptions, correctAnswerIndex: newCorrectIndex };
      }),
    );
  }

  function updateOption(qIndex, optIndex, value) {
    setQuestions((prev) =>
      prev.map((q, i) =>
        i === qIndex
          ? { ...q, options: q.options.map((opt, oi) => (oi === optIndex ? value : opt)) }
          : q,
      ),
    );
  }

  function setCorrectAnswer(qIndex, optIndex) {
    setQuestions((prev) =>
      prev.map((q, i) => (i === qIndex ? { ...q, correctAnswerIndex: optIndex } : q)),
    );
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      await api.createQuiz(courseId, { ...form, questions }, token);
      navigate(`/courses/${courseId}`);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-10">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">Create a quiz</h1>
      <p className="mb-6 text-sm text-ink-700">Add questions, mark the correct option for each.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        {error && <Alert>{error}</Alert>}

        <Card className="p-5">
          <div className="flex flex-col gap-4">
            <Input
              label="Quiz title"
              required
              minLength={3}
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Module 1 Quiz"
            />
            <Input
              label="Passing score (%)"
              type="number"
              min={0}
              max={100}
              value={form.passingScore}
              onChange={(e) => setForm({ ...form, passingScore: Number(e.target.value) })}
            />
          </div>
        </Card>

        {questions.map((q, qIndex) => (
          <Card key={qIndex} className="p-5">
            <div className="mb-3 flex items-center justify-between">
              <span className="text-sm font-medium text-ink-700">Question {qIndex + 1}</span>
              {questions.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeQuestion(qIndex)}
                  className="text-xs text-red-600 hover:underline"
                >
                  Remove question
                </button>
              )}
            </div>

            <Input
              required
              minLength={3}
              value={q.text}
              onChange={(e) => updateQuestionText(qIndex, e.target.value)}
              placeholder="Question text"
              className="mb-3"
            />

            <span className="mb-1.5 block text-xs font-medium text-ink-700">
              Options — select the correct one
            </span>
            <div className="flex flex-col gap-2">
              {q.options.map((opt, optIndex) => (
                <div key={optIndex} className="flex items-center gap-2">
                  <input
                    type="radio"
                    name={`correct-${qIndex}`}
                    checked={q.correctAnswerIndex === optIndex}
                    onChange={() => setCorrectAnswer(qIndex, optIndex)}
                  />
                  <input
                    required
                    value={opt}
                    onChange={(e) => updateOption(qIndex, optIndex, e.target.value)}
                    placeholder={`Option ${optIndex + 1}`}
                    className="flex-1 rounded-lg border border-ink-900/15 px-2.5 py-1.5 text-sm outline-none focus:border-brand-500"
                  />
                  {q.options.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removeOption(qIndex, optIndex)}
                      className="text-xs text-ink-600 hover:text-red-600"
                    >
                      ✕
                    </button>
                  )}
                </div>
              ))}
              <button
                type="button"
                onClick={() => addOption(qIndex)}
                className="w-fit text-xs text-brand-600 hover:underline"
              >
                + Add option
              </button>
            </div>
          </Card>
        ))}

        <Button type="button" variant="outline" onClick={addQuestion} className="w-fit">
          + Add question
        </Button>

        <div className="flex gap-2">
          <Button type="submit" variant="accent" disabled={saving} className="flex-1">
            {saving ? 'Creating…' : 'Create quiz'}
          </Button>
          <Button type="button" variant="outline" onClick={() => navigate(-1)}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}