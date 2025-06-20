import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function QuizPage() {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState('');
  const navigate = useNavigate();

  const startQuiz = async () => {
    // 유효성 검사 추가
    if (!category) {
      alert('Please select a category.');
      return;
    }

    const parsedAmount = parseInt(amount);
    if (!parsedAmount || parsedAmount < 1 || parsedAmount > 50) {
      alert('The number of questions must be between 1 and 50.');
      return;
    }

    try {
      const url = `https://opentdb.com/api.php?amount=${parsedAmount}&category=${category}`;
      const response = await axios.get(url);

      if (response.data.response_code === 0) {
        const rawQuestions = response.data.results;

        const questionsWithChoices = rawQuestions.map((q) => {
          const allChoices = [...q.incorrect_answers, q.correct_answer];
          const shuffledChoices = allChoices.sort(() => Math.random() - 0.5);
          return {
            ...q,
            shuffledChoices,
          };
        });

        localStorage.setItem('currentQuiz', JSON.stringify(questionsWithChoices));
        navigate('/quiz/start');
      } else {
        alert('Failed to fetch quiz data.');
      }
    } catch (error) {
      console.error(error);
      alert('Error occurred: ' + error.message);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
        <h2 className="text-2xl font-bold mb-6 text-center">Quiz Settings</h2>

        <div className="mb-4">
          <label className="block mb-1 font-medium">Number of Questions</label>
          <input
            type="number"
            min="1"
            max="50"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-medium">Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">Select a category</option>
            <option value="9">General Knowledge</option>
            <option value="10">Entertainment: Books</option>
            <option value="11">Entertainment: Film</option>
            <option value="12">Entertainment: Music</option>
            <option value="13">Entertainment: Musicals & Theatres</option>
            <option value="14">Entertainment: Television</option>
            <option value="15">Entertainment: Video Games</option>
            <option value="16">Entertainment: Board Games</option>
            <option value="17">Science & Nature</option>
            <option value="18">Science: Computers</option>
            <option value="19">Science: Mathematics</option>
            <option value="20">Mythology</option>
            <option value="21">Sports</option>
            <option value="22">Geography</option>
            <option value="23">History</option>
            <option value="24">Politics</option>
            <option value="25">Art</option>
            <option value="26">Celebrities</option>
            <option value="27">Animals</option>
            <option value="28">Vehicles</option>
            <option value="29">Entertainment: Comics</option>
            <option value="30">Science: Gadgets</option>
            <option value="31">Entertainment: Japanese Anime & Manga</option>
            <option value="32">Entertainment: Cartoon & Animations</option>
          </select>
        </div>

        <button
          onClick={startQuiz}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}