import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function QuizLog() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userKey = currentUser ? `quizHistory_${currentUser.username}` : "quizHistory_guest";

    const stored = localStorage.getItem(userKey);
    if (stored) {
      setHistory(JSON.parse(stored));
    } else {
      setHistory([]);
    }
  }, [location]);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Quiz History</h2>
            <button
              onClick={() => navigate("/user")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Dashboard
            </button>
          </div>

          {history.length === 0 ? (
            <p className="text-center">No records found</p>
          ) : (
            <table className="w-full border">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Category</th>
                  <th className="border px-4 py-2">Total Questions</th>
                  <th className="border px-4 py-2">Correct Answers</th>
                  <th className="border px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">
                      {item.category || "N/A"}
                    </td>
                    <td className="border px-4 py-2">{item.total}</td>
                    <td className="border px-4 py-2">{item.score}</td>
                    <td className="border px-4 py-2 text-center">
                      <button
                        onClick={() => navigate(`/quizlog/${idx}`)}
                        className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                      >
                        Detail
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}