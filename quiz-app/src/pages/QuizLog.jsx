import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import Navbar from '../components/Navbar';

export default function QuizLog() {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();
  const location = useLocation(); // 현재 위치를 감지

  useEffect(() => {
    const stored = localStorage.getItem('quizHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, [location]); // 페이지 방문(라우트 변경) 시마다 실행됨

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Quiz History</h2>
            <button
              onClick={() => navigate('/user')}
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
                  <th className="border px-4 py-2">Total Questions</th>
                  <th className="border px-4 py-2">Correct Answers</th>
                </tr>
              </thead>
              <tbody>
                {history.map((item, idx) => (
                  <tr key={idx}>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.total}</td>
                    <td className="border px-4 py-2">{item.score}</td>
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