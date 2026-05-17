import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import toast from 'react-hot-toast';
import { MapPin, Briefcase, DollarSign, ArrowLeft } from 'lucide-react';

export default function JobDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [applying, setApplying] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');

  useEffect(() => { loadJob(); }, [id]);

  async function loadJob() {
    try {
      const { data } = await api.get('/jobs/' + id);
      setJob(data);
    } catch (err) {
      toast.error('Job not found');
      navigate('/');
    } finally { setLoading(false); }
  }

  async function handleApply(e) {
    e.preventDefault();
    if (!user) {
      toast.error('Please login to apply');
      navigate('/login');
      return;
    }
    setApplying(true);
    try {
      await api.post('/applications', { jobId: id, coverLetter });
      toast.success('Application submitted!');
      navigate('/candidate');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to apply');
    } finally { setApplying(false); }
  }

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>;
  if (!job) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-4">
            <ArrowLeft size={18} /> Back
          </button>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-8">
        <div className="bg-white rounded-xl shadow-sm border p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">{job.title}</h1>
            <p className="text-xl text-gray-600 mb-4">{job.company}</p>
            <div className="flex flex-wrap gap-4 text-sm text-gray-500">
              <span className="flex items-center gap-1"><MapPin size={16} />{job.location}</span>
              <span className="flex items-center gap-1"><Briefcase size={16} />{job.type}</span>
              {job.salary?.min && (
                <span className="flex items-center gap-1">
                  <DollarSign size={16} />
                  {job.salary.min} - {job.salary.max} {job.salary.currency}
                </span>
              )}
            </div>
          </div>

          <div className="prose max-w-none mb-6">
            <h3 className="text-lg font-semibold mb-3">Description</h3>
            <p className="text-gray-600 whitespace-pre-wrap">{job.description}</p>
          </div>

          {job.requirements?.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-3">Requirements</h3>
              <div className="flex flex-wrap gap-2">
                {job.requirements.map((req, i) => (
                  <span key={i} className="bg-blue-50 text-blue-700 px-3 py-1 rounded-md text-sm">{req}</span>
                ))}
              </div>
            </div>
          )}

          {user?.role === 'candidate' && (
            <form onSubmit={handleApply} className="mt-8 pt-8 border-t">
              <h3 className="text-lg font-semibold mb-4">Apply for this position</h3>
              <textarea
                value={coverLetter}
                onChange={e => setCoverLetter(e.target.value)}
                placeholder="Cover Letter (optional)"
                rows={5}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 mb-4 outline-none focus:border-blue-500"
              />
              <button type="submit" disabled={applying}
                className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 disabled:opacity-60">
                {applying ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          )}

          {!user && (
            <div className="mt-8 pt-8 border-t text-center">
              <p className="text-gray-600 mb-4">Login to apply for this position</p>
              <button onClick={() => navigate('/login')}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700">
                Login to Apply
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}