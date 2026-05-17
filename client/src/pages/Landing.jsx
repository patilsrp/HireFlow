import { Link } from 'react-router-dom';
import { Briefcase, Users, CheckCircle } from 'lucide-react';

export default function Landing() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <header className="px-6 py-4 border-b bg-white">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-600">HireFlow</h1>
          <div className="flex gap-4">
            <Link to="/login" className="px-4 py-2 text-gray-600 hover:text-blue-600">Login</Link>
            <Link to="/register" className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">Get Started</Link>
          </div>
        </div>
      </header>
      
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">Find Your Dream Job or Perfect Candidate</h2>
          <p className="text-xl text-gray-600 mb-8">Connect talent with opportunity on our modern job portal platform</p>
          <Link to="/register" className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-blue-700 transition-colors">
            Start Your Journey
          </Link>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mt-20">
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <Briefcase className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">For Recruiters</h3>
            <p className="text-gray-600">Post jobs, manage applications, and find the perfect candidates for your team.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <Users className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">For Candidates</h3>
            <p className="text-gray-600">Browse opportunities, apply with one click, and track your application status.</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-sm border border-gray-100">
            <CheckCircle className="w-12 h-12 text-blue-600 mb-4" />
            <h3 className="text-xl font-semibold mb-3">Easy & Secure</h3>
            <p className="text-gray-600">JWT authentication ensures your data is safe while making the process seamless.</p>
          </div>
        </div>
      </main>
    </div>
  );
}