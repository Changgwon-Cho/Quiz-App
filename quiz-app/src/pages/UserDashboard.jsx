import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useNavigate } from "react-router-dom";

export default function UserDashboard() {
  const navigate = useNavigate();
  const [latest, setLatest] = useState(null);
  const [totalQuizzes, setTotalQuizzes] = useState(0);
  const [totalCorrect, setTotalCorrect] = useState(0);
  const [averageScore, setAverageScore] = useState(0);
  const [mostFrequentCategory, setMostFrequentCategory] = useState("N/A");

  useEffect(() => {
    const history = JSON.parse(localStorage.getItem("quizHistory")) || [];

    if (history.length > 0) {
      // 최근 퀴즈
      setLatest(history[history.length - 1]);

      // 통계 계산
      setTotalQuizzes(history.length);

      const totalCorrectAnswers = history.reduce((sum, record) => sum + record.score, 0);
      const totalQuestions = history.reduce((sum, record) => sum + record.total, 0);

      setTotalCorrect(totalCorrectAnswers);
      setAverageScore(totalQuestions > 0 ? ((totalCorrectAnswers / totalQuestions) * 100).toFixed(1) : 0);

      const categoryCount = {};
      history.forEach((record) => {
        const cat = record.category || "Unknown";
        categoryCount[cat] = (categoryCount[cat] || 0) + 1;
      });

      const mostFrequent = Object.entries(categoryCount).sort((a, b) => b[1] - a[1])[0]?.[0];
      setMostFrequentCategory(mostFrequent || "N/A");
    }
  }, []);

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
        <p className="mb-8">Welcome! Here, you can take quizzes and review your past results.</p>

        {/* 최근 퀴즈 요약 */}
        <div className="bg-white shadow rounded p-6 max-w-lg mb-6">
          <h3 className="text-xl font-semibold mb-4">Recent Quiz Summary</h3>
          {latest ? (
            <div className="space-y-2">
              <p><span className="font-medium">Date:</span> {latest.date}</p>
              <p><span className="font-medium">Category:</span> {latest.category}</p>
              <p><span className="font-medium">Score:</span> {latest.score} / {latest.total}</p>
            </div>
          ) : (
            <p className="text-gray-500">There are no quiz records yet.</p>
          )}
        </div>

        {/* 전체 통계 */}
        <div className="bg-white shadow rounded p-6 max-w-lg">
          <h3 className="text-xl font-semibold mb-4">Overall Statistics</h3>
          {totalQuizzes > 0 ? (
            <ul className="space-y-2">
              <li><span className="font-medium">Total Quizzes Taken:</span> {totalQuizzes}</li>
              <li><span className="font-medium">Total Correct Answers:</span> {totalCorrect}</li>
              <li><span className="font-medium">Average Accuracy:</span> {averageScore}%</li>
              <li><span className="font-medium">Most Frequent Category:</span> {mostFrequentCategory}</li>
            </ul>
          ) : (
            <p className="text-gray-500">No statistics available yet.</p>
          )}
        </div>
      </div>
    </div>
  );
}