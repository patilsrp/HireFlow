import { Link } from 'react-router-dom';
import { MapPin, Briefcase } from 'lucide-react';

const typeColors = {
  'Full-time': 'bg-green-100 text-green-700',
  'Part-time': 'bg-yellow-100 text-yellow-700',
  'Contract': 'bg-purple-100 text-purple-700',
  'Internship': 'bg-blue-100 text-blue-700',
  'Remote': 'bg-teal-100 text-teal-700'
};

export default function JobCard({ job }) {
  return (
    <Link to={'/jobs/' + job._id}
      className="block bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md hover:border-blue-300 transition-all">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-semibold text-gray-900 text-lg">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
        </div>
        <span className={'text-xs font-medium px-3 py-1 rounded-full ' + (typeColors[job.type] || 'bg-gray-100 text-gray-600')}>
          {job.type}
        </span>
      </div>
      <div className="flex gap-4 text-sm text-gray-500 mb-3">
        <span className="flex items-center gap-1"><MapPin size={14} />{job.location}</span>
        <span className="flex items-center gap-1"><Briefcase size={14} />{job.applicantCount} applicants</span>
      </div>
      {job.requirements?.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {job.requirements.slice(0, 4).map((req, i) => (
            <span key={i} className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-md">{req}</span>
          ))}
        </div>
      )}
    </Link>
  );
}