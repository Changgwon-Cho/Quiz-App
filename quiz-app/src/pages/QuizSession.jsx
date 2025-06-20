import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// HTML 특수문자 디코딩
function decodeHTMLEntities(text) {
  const textarea = document.createElement('textarea');
  textarea.innerHTML = text;
  return textarea.value;
}

export default function QuizSession() {
  const navigate = useNavigate();
  const questions = JSON.parse(localStorage.getItem('currentQuiz')) || [];

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);

  const currentQuestion = questions[currentQuestionIndex];
  const choices = currentQuestion?.shuffledChoices || [];

  const handleSubmit = () => {
    if (!selectedOption) {
      alert('Please select an answer');
      return;
    }

    const isCorrect = selectedOption === currentQuestion.correct_answer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    const isLast = currentQuestionIndex + 1 === questions.length;

    if (isLast) {
      const finalScore = correctCount + (isCorrect ? 1 : 0);

      // quizHistory에 기록 추가
      const history = JSON.parse(localStorage.getItem('quizHistory')) || [];
      const now = new Date().toLocaleString();
      const newRecord = {
        date: now,
        total: questions.length,
        score: finalScore,
      };
      localStorage.setItem('quizHistory', JSON.stringify([...history, newRecord]));

      // 마지막 결과 저장
      localStorage.setItem('lastResult', JSON.stringify({
        score: finalScore,
        total: questions.length,
      }));

      navigate('/result');
    } else {
      setSelectedOption(null);
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  if (!currentQuestion) {
    return <p>No quiz data available</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-5xl bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">
          Question {currentQuestionIndex + 1} / {questions.length}
        </h2>
        <p className="mb-6 text-lg font-medium break-words whitespace-pre-wrap">
          {decodeHTMLEntities(currentQuestion.question)}
        </p>

        <div className="space-y-2">
          {choices.map((choice, index) => (
            <button
              key={index}
              onClick={() => setSelectedOption(choice)}
              className={`border p-2 rounded w-full text-left break-words whitespace-pre-wrap ${
                selectedOption === choice ? 'bg-blue-100' : 'bg-white'
              } hover:bg-blue-50`}
            >
              {decodeHTMLEntities(choice)}
            </button>
          ))}
        </div>

        <button
          onClick={handleSubmit}
          className="mt-6 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
        >
          {currentQuestionIndex + 1 === questions.length ? 'Submit' : 'Next'}
        </button>
      </div>
    </div>
  );
}