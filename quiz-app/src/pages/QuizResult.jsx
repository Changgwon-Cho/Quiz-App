import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function QuizResult() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => { // 컴포넌트가 처음 렌더링될 때(마운트될 때) 실행
    const stored = localStorage.getItem("lastResult"); // lastResult는 퀴즈 제출 후 QuizSession.jsx에서 저장한 공통 결과
    if (stored) {
      setResult(JSON.parse(stored)); // result 상태에 저장
    } else {
      navigate("/");
    }
  }, [navigate]); // navigate 같은 외부 함수를 사용함으로 명시(경고 방지 및 추적)

  if (!result) return null;

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white p-8 rounded shadow-md max-w-lg w-full text-center">
        <h2 className="text-2xl font-bold mb-6">Quiz Result</h2>

        <p className="mb-2">Total Questions: {result.total}</p>
        <p className="mb-2">Correct Answers: {result.score}</p>

        <div className="flex justify-center">
          <button
            onClick={() => navigate("/user")}
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}