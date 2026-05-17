import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const inp = "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await login(form.email, form.password);
      toast.success('Welcome back, ' + user.name + '!');
      navigate(user.role === 'recruiter' ? '/recruiter' : '/candidate');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h1>
        <p className="text-gray-500 mb-6">Sign in to your HireFlow account</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" value={form.email}
            onChange={e => setForm(p => ({ ...p, email: e.target.value }))} required className={inp} />
          <input type="password" placeholder="Password" value={form.password}
            onChange={e => setForm(p => ({ ...p, password: e.target.value }))} required className={inp} />
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          No account? <Link to="/register" className="text-blue-600 font-medium">Register here</Link>
        </p>
      </div>
    </div>
  );
}