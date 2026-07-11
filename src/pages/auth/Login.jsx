
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from "./../hook/useAuth";

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      await login(email, password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="w-full max-w-md rounded-2xl bg-white p-8 shadow-xl">
      <h2 className="mb-2 text-3xl font-bold">Kirish</h2>
      <p className="mb-8 text-gray-500">Davom etish uchun tizimga kiring.</p>

      <form onSubmit={handleSubmit} className="space-y-5">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

        <input
          type="password"
          placeholder="Parol"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
        />

        {error && <p className="text-sm text-red-500">{error}</p>}

        <button
          type="submit"
          disabled={submitting}
          className="w-full rounded-lg bg-blue-600 py-3 text-white hover:bg-blue-700 disabled:opacity-50"
        >
          {submitting ? 'Kutilmoqda...' : 'Kirish'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-gray-500">
        Hisobingiz yo'qmi?{' '}
        <Link to="/register" className="font-semibold text-blue-600">
          Ro'yxatdan o'ting
        </Link>
      </p>
    </div>
  );
}

export default Login;