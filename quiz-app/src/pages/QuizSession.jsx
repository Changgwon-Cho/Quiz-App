import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { categoryMap } from "../utils/categoryMap";

// HTML 특수문자 디코딩
function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export default function QuizSession() {
  const navigate = useNavigate();

  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [categoryName, setCategoryName] = useState("");

  // 퀴즈 데이터 로딩 + shuffledChoices 없으면 섞어서 저장
  useEffect(() => {
    const raw = JSON.parse(localStorage.getItem("currentQuiz")) || [];

    const prepared = raw.map((q) => {
      if (q.shuffledChoices) return q; // 이미 있음
      const choices = [...q.incorrect_answers, q.correct_answer];
      const shuffled = choices.sort(() => Math.random() - 0.5);
      return {
        ...q,
        shuffledChoices: shuffled,
      };
    });

    setQuestions(prepared);

    // 첫 문제에서 category 추출해서 이름 매핑
    const categoryId = raw[0]?.category;
    const name = categoryId || "Unknown";
    setCategoryName(name);
  }, []);

  const currentQuestion = questions[currentQuestionIndex];
  const choices = currentQuestion?.shuffledChoices || [];

  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an answer");
      return;
    }

    // 선택한 답을 questions 배열에 저장
    const updatedQuestions = [...questions];
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion,
      user_answer: selectedOption,
    };
    setQuestions(updatedQuestions);

    const isCorrect = selectedOption === currentQuestion.correct_answer;
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1);
    }

    const isLast = currentQuestionIndex + 1 === questions.length;

    if (isLast) {
      const finalScore = correctCount + (isCorrect ? 1 : 0);
      const now = new Date().toLocaleString();

      // 카테고리 코드 → 이름 변환
      const rawCategory = updatedQuestions[0]?.category;
      const categoryName = categoryMap[rawCategory] || rawCategory || "Unknown";

      // quizHistory에 상세 문제 정보 저장
      const history = JSON.parse(localStorage.getItem("quizHistory")) || [];
      const newRecord = {
        date: now,
        category: categoryName,
        total: updatedQuestions.length,
        score: finalScore,
        questions: updatedQuestions.map((q) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          shuffledChoices: q.shuffledChoices,
          user_answer: q.user_answer || null,
        })),
      };
      localStorage.setItem(
        "quizHistory",
        JSON.stringify([...history, newRecord])
      );

      // 마지막 결과 저장
      localStorage.setItem(
        "lastResult",
        JSON.stringify({
          score: finalScore,
          total: updatedQuestions.length,
        })
      );

      navigate("/result");
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
        <h2 className="text-xl font-bold mb-2">Category: {categoryName}</h2>
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
                selectedOption === choice ? "bg-blue-100" : "bg-white"
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
          {currentQuestionIndex + 1 === questions.length ? "Submit" : "Next"}
        </button>
      </div>
    </div>
  );
}
