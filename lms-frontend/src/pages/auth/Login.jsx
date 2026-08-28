import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { Card, Input, Button, Alert } from '../../components/ui.jsx';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [retrySeconds, setRetrySeconds] = useState(0);

  // ⏳ Dynamic Countdown Timer for Rate Limiting (429)
  useEffect(() => {
    if (retrySeconds <= 0) return;

    const timer = setInterval(() => {
      setRetrySeconds((prev) => {
        if (prev <= 1) {
          setError(''); // Timer complete hone par error clear kar do
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [retrySeconds]);

  // Helper function to format seconds into minutes & seconds
  const formatTime = (totalSeconds) => {
    if (totalSeconds < 60) return `${totalSeconds}s`;
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${mins}m ${secs}s`;
  };

  async function handleSubmit(e) {
    e.preventDefault();
    if (retrySeconds > 0) return; // Prevent submitting while locked

    setError('');
    setLoading(true);

    try {
      await login(form.email, form.password);
      navigate('/courses');
    } catch (err) {
      // Check if response is 429 Too Many Requests
      if (err.status === 429 && err.retryAfter) {
        setRetrySeconds(err.retryAfter);
      }
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  const isButtonDisabled = loading || retrySeconds > 0;

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-6">
      <h1 className="font-display mb-1 text-2xl font-semibold text-ink-900">Welcome back</h1>
      <p className="mb-6 text-sm text-ink-700">Log in to continue learning or teaching.</p>

      <Card className="p-6">
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {error && (
            <Alert>
              {retrySeconds > 0
                ? `Too many attempts! Please wait ${formatTime(retrySeconds)} before trying again.`
                : error}
            </Alert>
          )}

          <Input
            label="Email"
            type="email"
            required
            disabled={retrySeconds > 0}
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            placeholder="you@example.com"
          />

          <Input
            label="Password"
            type="password"
            required
            disabled={retrySeconds > 0}
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            placeholder="••••••••"
          />

          <Button
            type="submit"
            variant="accent"
            disabled={isButtonDisabled}
            className="mt-2 w-full"
          >
            {loading
              ? 'Logging in…'
              : retrySeconds > 0
                ? `Wait ${formatTime(retrySeconds)}`
                : 'Log in'}
          </Button>
        </form>
      </Card>

      <p className="mt-4 text-center text-sm text-ink-700">
        No account?{' '}
        <Link to="/register" className="font-medium text-brand-600 hover:underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}