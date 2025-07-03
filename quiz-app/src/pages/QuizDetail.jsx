import { useEffect, useState } from "react";
// 현재 URL에 포함된 동적 파라미터를 가져오는데 사용됨
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

// Open Trivia API는 HTML 특수문자 형식으로 질문을 반환하므로 textarea 요소를 사용해 실제 텍스트로 디코딩
function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export default function QuizDetail() {
  const { index } = useParams(); // index 값을 문자열로 받아옴
  const navigate = useNavigate();
  const [quiz, setQuiz] = useState(null);

  useEffect(() => {
    // 사용자별 key로 퀴즈 기록 로딩
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const userKey = currentUser
      ? `quizHistory_${currentUser.username}`
      : "quizHistory_guest";

    const history = JSON.parse(localStorage.getItem(userKey)) || [];
    const selected = history[Number(index)]; // index는 문자열이므로 숫자로 변환 후 해당 인덱스의 퀴즈 데이터 저장
    if (selected) {
      setQuiz(selected);
    }
  }, [index]); 
  // index가 변경될 때마다 useEffect가 다시 실행되어 새로운 퀴즈를 다시 불러와 컴포넌트를 정확히 업데이트

  if (!quiz) {
    return (
      <div className="text-center mt-10 text-gray-500">
        Loading quiz details..
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
              onClick={() => navigate("/logs")}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Back to Records List
            </button>
          </div>

          <p className="mb-4 font-semibold">Date Taken: {quiz.date}</p>
          <p className="mb-4 font-semibold">
            Category: {quiz.category || "N/A"}
          </p>
          <p className="mb-6 font-semibold">
            Score: {quiz.score} / {quiz.total}
          </p>

          {quiz.questions && Array.isArray(quiz.questions) ? (
            // map을 사용해 문제들을 하나씩 출력
            quiz.questions.map((q, idx) => { // 현재 퀴즈 문제 객체 / 해당 문제의 순서 인덱스
              const isCorrect = q.user_answer === q.correct_answer;
              return (
                <div key={idx} className="mb-6 border-b pb-4">
                  <p className="font-medium mb-2">
                    Q{idx + 1}. {decodeHTMLEntities(q.question)}
                  </p>
                  <ul className="mb-2 space-y-1">
                    {q.shuffledChoices.map((choice, i) => ( // 선택지 목록 하나씩 출력
                      <li
                        key={i}
                        className={`px-2 py-1 rounded ${
                          choice === q.correct_answer
                            ? "bg-green-100"
                            : choice === q.user_answer
                            ? "bg-red-100"
                            : ""
                        }`}
                      >
                        {decodeHTMLEntities(choice)}
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-gray-600">
                    {isCorrect ? "✅ Correct Answer." : "❌ Incorrect Answer."}
                  </p>
                </div>
              );
            })
          ) : (
            <p className="text-center text-red-500">
              Failed to load question data..
            </p>
          )}
        </div>
      </div>
    </div>
  );
}