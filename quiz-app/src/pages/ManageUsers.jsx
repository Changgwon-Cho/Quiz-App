
import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

export default function ManageUsers() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const stored = localStorage.getItem('quizHistory');
    if (stored) {
      setHistory(JSON.parse(stored));
    }
  }, []);

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-8">
        <h2 className="text-2xl font-bold mb-6">📊 Score History</h2>

        {history.length === 0 ? (
          <p>There are no score records.</p>
        ) : (
          <table className="w-full border">
            <thead>
              <tr className="bg-gray-200">
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Total Questions</th>
                <th className="border px-4 py-2">Hits</th>
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
  );
}





