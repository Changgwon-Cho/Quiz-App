import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <nav className="bg-white p-4 rounded shadow mb-8 flex space-x-4">
          <button
            onClick={() => navigate("/quiz")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Take a Quiz
          </button>
          <button
            onClick={() => navigate("/logs")}
            className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
          >
            View Past Records
          </button>
        </nav>

        <h2 className="text-2xl font-bold mb-4">User Dashboard</h2>
        <p>
          Welcome! Here, you can take quizzes and review your past results.
        </p>
      </div>
    </div>
  );
}