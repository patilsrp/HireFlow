import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { Plus, Users, Edit, Trash2, LogOut } from 'lucide-react';

export default function RecruiterDashboard() {
  const { user, logout } = useAuth();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => { loadJobs(); }, []);

  async function loadJobs() {
    try {
      const { data } = await api.get('/jobs/recruiter/my-jobs');
      setJobs(data);
    } finally { setLoading(false); }
  }

  async function handleDelete(jobId) {
    if (confirm('Delete this job posting?')) {
      await api.delete('/jobs/' + jobId);
      setJobs(jobs.filter(j => j._id !== jobId));
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
        <div>
          <h1 className="text-xl font-bold text-blue-600">HireFlow Recruiter</h1>
          <p className="text-sm text-gray-500">{user?.company} · {user?.name}</p>
        </div>
        <button onClick={logout} className="flex items-center gap-2 text-gray-500 hover:text-red-500">
          <LogOut size={18} /> Logout
        </button>
      </header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">My Job Postings</h2>
          <Link to="/recruiter/post-job"
            className="flex items-center gap-2 bg-blue-600 text-white px-5 py-2.5 rounded-lg font-medium hover:bg-blue-700">
            <Plus size={18} /> Post New Job
          </Link>
        </div>

        {loading ? (
          <p className="text-center text-gray-500 py-12">Loading jobs...</p>
        ) : jobs.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-xl border">
            <p className="text-gray-500 mb-4">No job postings yet</p>
            <Link to="/recruiter/post-job" className="text-blue-600 font-medium hover:underline">
              Post your first job →
            </Link>
          </div>
        ) : (
          <div className="grid gap-4">
            {jobs.map(job => (
              <div key={job._id} className="bg-white rounded-xl border p-6">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">{job.title}</h3>
                    <p className="text-gray-500">{job.location} · {job.type}</p>
                    <div className="flex gap-6 mt-3 text-sm text-gray-600">
                      <span className="flex items-center gap-1">
                        <Users size={14} /> {job.applicantCount || 0} applicants
                      </span>
                      <span>Posted {new Date(job.createdAt).toLocaleDateString()}</span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Link to={`/jobs/${job._id}/applications`}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                      <Users size={18} />
                    </Link>
                    <button className="p-2 text-gray-500 hover:bg-gray-50 rounded-lg">
                      <Edit size={18} />
                    </button>
                    <button onClick={() => handleDelete(job._id)}
                      className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}