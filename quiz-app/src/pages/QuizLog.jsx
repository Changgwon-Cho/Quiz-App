import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function QuizLog() {
  const [history, setHistory] = useState([]); // 사용자의 퀴즈 기록 배열
  const navigate = useNavigate();
  const location = useLocation(); // 현재 URL 정보를 가져옴, location이 바뀔 때마다 useEffect 재실행(뒤로가기 등)

  // 퀴즈 이력 불러오기
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
  // 페이지 이동(경로 변경) 시 useEffect를 재실행하여 최신 데이터를 불러오기 위함

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
                {history.map((item, idx) => ( // localStorage 배열 내 퀴즈 순서 인덱스
                  <tr key={idx}>
                    <td className="border px-4 py-2">{item.date}</td>
                    <td className="border px-4 py-2">{item.category || "N/A"}</td>
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