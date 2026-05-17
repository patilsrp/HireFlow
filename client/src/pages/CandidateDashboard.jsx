import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import api from '../api/axios';
import JobCard from '../components/JobCard';
import { Search, LogOut } from 'lucide-react';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-700',
  reviewed: 'bg-blue-100 text-blue-700',
  shortlisted: 'bg-green-100 text-green-700',
  rejected: 'bg-red-100 text-red-700',
  hired: 'bg-emerald-100 text-emerald-700'
};

export default function CandidateDashboard() {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [search, setSearch] = useState('');
  const [tab, setTab] = useState('browse');
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadData(); }, []);

  async function loadData() {
    try {
      const [jobsRes, appsRes] = await Promise.all([api.get('/jobs'), api.get('/applications/my')]);
      setJobs(jobsRes.data.jobs);
      setApplications(appsRes.data);
    } finally { setLoading(false); }
  }

  async function handleSearch(e) {
    e.preventDefault();
    const { data } = await api.get('/jobs?search=' + search);
    setJobs(data.jobs);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-600">HireFlow</h1>
          <p className="text-sm text-gray-500">Welcome, {user?.name}</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-gray-500 hover:text-red-500">
          <LogOut size={18} /> Logout
        </button>
      </header>
      <div className="max-w-5xl mx-auto px-6 py-8">
        <div className="flex gap-4 mb-6 border-b">
          {['browse', 'applications'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={'pb-3 px-1 font-medium capitalize border-b-2 transition-colors ' +
                (tab === t ? 'border-blue-600 text-blue-600' : 'border-transparent text-gray-500')}>
              {t === 'browse' ? 'Browse Jobs' : 'My Applications (' + applications.length + ')'}
            </button>
          ))}
        </div>

        {tab === 'browse' && (
          <>
            <form onSubmit={handleSearch} className="flex gap-3 mb-6">
              <div className="relative flex-1">
                <Search size={18} className="absolute left-3 top-3.5 text-gray-400" />
                <input value={search} onChange={e => setSearch(e.target.value)}
                  placeholder="Search jobs by title, skill, company..."
                  className="w-full pl-10 pr-4 py-3 border rounded-lg outline-none focus:border-blue-500" />
              </div>
              <button type="submit" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700">Search</button>
            </form>
            {loading ? <p className="text-center text-gray-500 py-12">Loading jobs...</p> : (
              <div className="grid gap-4 md:grid-cols-2">
                {jobs.map(job => <JobCard key={job._id} job={job} />)}
              </div>
            )}
          </>
        )}

        {tab === 'applications' && (
          <div className="space-y-4">
            {applications.length === 0 ? (
              <p className="text-center text-gray-500 py-12">No applications yet. Start browsing jobs!</p>
            ) : applications.map(app => (
              <div key={app._id} className="bg-white rounded-xl border p-5 flex justify-between items-center">
                <div>
                  <h3 className="font-semibold text-gray-900">{app.job?.title}</h3>
                  <p className="text-gray-500 text-sm">{app.job?.company} · {app.job?.location}</p>
                  <p className="text-xs text-gray-400 mt-1">Applied {new Date(app.createdAt).toLocaleDateString()}</p>
                </div>
                <span className={'text-sm font-medium px-3 py-1 rounded-full capitalize ' + statusColors[app.status]}>
                  {app.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}