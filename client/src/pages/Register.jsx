import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const inp = "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500";

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'candidate', company: '' });
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  function handleChange(e) { setForm(p => ({ ...p, [e.target.name]: e.target.value })); }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const user = await register(form.name, form.email, form.password, form.role, form.company);
      toast.success('Account created!');
      navigate(user.role === 'recruiter' ? '/recruiter' : '/candidate');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Registration failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Create Account</h1>
        <p className="text-gray-500 mb-6">Join HireFlow today</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required className={inp} />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inp} />
          <input name="password" type="password" placeholder="Password (min 6 chars)" value={form.password} onChange={handleChange} required minLength={6} className={inp} />
          <div className="grid grid-cols-2 gap-3">
            {['candidate', 'recruiter'].map(r => (
              <button key={r} type="button" onClick={() => setForm(p => ({ ...p, role: r }))}
                className={`py-2 rounded-lg border-2 font-medium capitalize transition-all
                  ${form.role === r ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-200 text-gray-500'}`}>
                {r}
              </button>
            ))}
          </div>
          {form.role === 'recruiter' && (
            <input name="company" placeholder="Company Name" value={form.company} onChange={handleChange} required className={inp} />
          )}
          <button type="submit" disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
            {loading ? 'Creating account...' : 'Create Account'}
          </button>
        </form>
        <p className="text-center text-gray-500 mt-4">
          Already have an account? <Link to="/login" className="text-blue-600 font-medium">Sign in</Link>
        </p>
      </div>
    </div>
  );
}