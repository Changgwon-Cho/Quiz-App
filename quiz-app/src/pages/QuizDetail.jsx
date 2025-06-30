import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export default function QuizDetail() {
  const { index } = useParams(); // 주의: useParams로 받아오는 값은 string
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
    const selected = history[Number(index)];
    if (selected) {
      setQuiz(selected);
    }
  }, [index]);

  if (!quiz) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading quiz details...
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-50 px-4 py-8">
        <div className="max-w-4xl mx-auto bg-white p-8 rounded shadow-md">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Quiz Details</h2>
            <button
              onClick={() => navigate('/logs')}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Records List
            </button>
          </div>

          <p className="mb-4 font-semibold">Date Taken: {quiz.date}</p>
          <p className="mb-4 font-semibold">Category: {quiz.category || 'N/A'}</p>
          <p className="mb-6 font-semibold">
            Score: {quiz.score} / {quiz.total}
          </p>

          {quiz.questions && Array.isArray(quiz.questions) ? (
            quiz.questions.map((q, idx) => {
              const isCorrect = q.user_answer === q.correct_answer;
              return (
                <div key={idx} className="mb-6 border-b pb-4">
                  <p className="font-medium mb-2">
                    Q{idx + 1}. {decodeHTMLEntities(q.question)}
                  </p>
                  <ul className="mb-2 space-y-1">
                    {q.shuffledChoices.map((choice, i) => (
                      <li
                        key={i}
                        className={`px-2 py-1 rounded ${
                          choice === q.correct_answer
                            ? 'bg-green-100'
                            : choice === q.user_answer
                            ? 'bg-red-100'
                            : ''
                        }`}
                      >
                        {decodeHTMLEntities(choice)}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600">
                    {isCorrect ? '✅ Correct Answer.' : '❌ Incorrect Answer.'}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-red-500">Failed to load question data..</p>
          )}
        </div>
      </div>
    </div>
  );
}