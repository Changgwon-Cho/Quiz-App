import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function AdminDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6">📁 Administration Panel</h2>
        <div className="space-y-4 max-w-md mx-auto">
          <button
            onClick={() => navigate('/admin/questions')}
            className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700"
          >
            🔧 Manage Questions
          </button>
          <button
            onClick={() => navigate('/admin/users')}
            className="w-full bg-green-600 text-white py-3 rounded hover:bg-green-700"
          >
            👤 See User Ratings
          </button>
        </div>
      </div>
    </div>
  );
}

