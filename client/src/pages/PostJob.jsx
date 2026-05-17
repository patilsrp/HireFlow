import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import toast from 'react-hot-toast';

const inp = "w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:border-blue-500";

export default function PostJob() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ title: '', location: '', type: 'Full-time', description: '', requirements: '', salaryMin: '', salaryMax: '' });

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post('/jobs', {
        ...form,
        requirements: form.requirements.split(',').map(s => s.trim()).filter(Boolean),
        salary: { min: Number(form.salaryMin), max: Number(form.salaryMax) }
      });
      toast.success('Job posted!');
      navigate('/recruiter');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Failed to post job');
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">
        <h1 className="text-2xl font-bold mb-6">Post a New Job</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input placeholder="Job Title *" value={form.title} onChange={e => setForm(p => ({...p, title: e.target.value}))} required className={inp} />
          <input placeholder="Location *" value={form.location} onChange={e => setForm(p => ({...p, location: e.target.value}))} required className={inp} />
          <select value={form.type} onChange={e => setForm(p => ({...p, type: e.target.value}))} className={inp}>
            {['Full-time','Part-time','Contract','Internship','Remote'].map(t => <option key={t}>{t}</option>)}
          </select>
          <textarea placeholder="Job Description *" rows={5} value={form.description} onChange={e => setForm(p => ({...p, description: e.target.value}))} required className={inp} />
          <input placeholder="Requirements (comma-separated: React, Node.js, MongoDB)" value={form.requirements} onChange={e => setForm(p => ({...p, requirements: e.target.value}))} className={inp} />
          <div className="grid grid-cols-2 gap-4">
            <input type="number" placeholder="Min Salary" value={form.salaryMin} onChange={e => setForm(p => ({...p, salaryMin: e.target.value}))} className={inp} />
            <input type="number" placeholder="Max Salary" value={form.salaryMax} onChange={e => setForm(p => ({...p, salaryMax: e.target.value}))} className={inp} />
          </div>
          <div className="flex gap-3 pt-2">
            <button type="button" onClick={() => navigate('/recruiter')} className="flex-1 py-3 border rounded-lg text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="flex-1 bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700">Post Job</button>
          </div>
        </form>
      </div>
    </div>
  );
}