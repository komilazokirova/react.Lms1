import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useAuth } from "../../hook/useAuth";

const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email kiritilishi shart')
    .email("Emailda @ bo'lishi shart"),
  password: z
    .string()
    .min(1, 'Parol kiritilishi shart')
    .min(4, "Parol kamida 4 ta belgidan iborat bo'lishi kerak"),
});

function Login() {
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
    mode: 'onBlur',
  });

  async function onSubmit(data) {
    setError('');
    setSubmitting(true);

    try {
      await login(data.email, data.password);
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

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
        <div>
          <input
            type="text"
            placeholder="Email"
            {...register('email')}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />
          {errors.email && (
            <p className="mt-1 text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div>


          <input
            type="password"
            placeholder="Parol"
            {...register('password')}
            className="w-full rounded-lg border p-3 outline-none focus:border-blue-500"
          />
          {errors.password && (
            <p className="mt-1 text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

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