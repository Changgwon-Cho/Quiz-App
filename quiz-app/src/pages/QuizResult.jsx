import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function QuizResult() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('lastResult');
    if (stored) {
      setResult(JSON.parse(stored));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!result) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Quiz Result</h2>

        <p className="mb-2">Total Questions: {result.total}</p>
        <p className="mb-2">Correct Answers: {result.score}</p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate('/user')}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Back to Dashboard
          </button>
          <button
            onClick={() => navigate('/quiz')}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Retry Quiz
          </button>
        </div>
      </div>
    </div>
  );
}