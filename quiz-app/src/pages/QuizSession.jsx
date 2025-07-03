import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Open Trivia API는 HTML 특수문자 형식으로 질문을 반환하므로 textarea 요소를 사용해 실제 텍스트로 디코딩
function decodeHTMLEntities(text) {
  const textarea = document.createElement("textarea");
  textarea.innerHTML = text;
  return textarea.value;
}

export default function QuizSession() {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]); // 전체 퀴즈 문제 리스트
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // 현재 보고 있는 문제 인덱스
  const [selectedOption, setSelectedOption] = useState(null); // 사용자가 선택한 보기
  const [correctCount, setCorrectCount] = useState(0); // 현재까지 맞춘 문제 수
  const [categoryName, setCategoryName] = useState(""); // 퀴즈 카테고리 이름

  // 사용자 구분용 로컬스토리지 키
  const currentUser = JSON.parse(localStorage.getItem("currentUser"));
  const userKey = currentUser
    ? `quizHistory_${currentUser.username}`
    : "quizHistory_guest";

  // 퀴즈 데이터 불러오기
  useEffect(() => {
    const loaded = JSON.parse(localStorage.getItem("currentQuiz")) || [];
    setQuestions(loaded); // 로딩한 문제 배열 저장, 추후 퀴즈 문항 렌더링에 사용됨
    // 퀴즈 문제 배열에서 첫 번째 문제 객체 가져옴(카테고리 포함)
    const first = loaded[0];
    // first가 존재할 경우에만 .categoryName에 접근하고, categoryName이 비어있거나 없으면 Unkown
    const name = first?.categoryName || "Unknown";
    setCategoryName(name); // 위에서 구한 카테고리 이름을 저장
  }, []); // 의존성 배열로 useEffect가 컴포넌트가 처음 마운트될 때 단 한 번만 실행되도록 함, 의존성으로 추적할 값이 없음(오직 localStorage 읽기만 함)

  const currentQuestion = questions[currentQuestionIndex]; // 현재 보고있는 문제 1개를 questions 배열에서 가져옴
  const choices = currentQuestion?.shuffledChoices || []; // 해당 문제의 보기를 담은 배열 (기본값:[])

  // 정답 체크 및 기록 저장
  const handleSubmit = () => {
    if (!selectedOption) {
      alert("Please select an answer");
      return;
    }
    // 현재 질문 객체에 사용자의 선택 저장
    const updatedQuestions = [...questions]; // 현재까지 불러온 전체 퀴즈 질문들의 복사본 배열 생성, 상태 직접 변경x, 불변성 유지
    // 현재 보고 있는 문제의 인덱스 객체에 사용자의 응답이 반영된 새로운 객체 생성
    updatedQuestions[currentQuestionIndex] = {
      ...currentQuestion, // 기존 질문 내용(문제, 선택지, 정답 등) 그대로 복사
      user_answer: selectedOption, // selectedOption을 덧붙여 사용자가 고른 답을 추가
    };
    setQuestions(updatedQuestions);

    // 정답 판별 및 상태 갱신
    const isCorrect = selectedOption === currentQuestion.correct_answer; // 사용자가 정답 맞췄는지 여부 판단
    if (isCorrect) {
      setCorrectCount((prev) => prev + 1); // 이전 값을 기반으로 증가시키는 함수형 업데이트 방식
    }

    const isLast = currentQuestionIndex + 1 === questions.length; // 현재 문제가 퀴즈의 마지막 문제인지 여부 판단

    // 퀴즈 히스토리 저장
    if (isLast) {
      const finalScore = correctCount + (isCorrect ? 1 : 0); // 최종 점수 계산 (마지막문제까지 추가)
      const now = new Date().toLocaleString(); // 현재 날짜/시간을 문자열로 저장, 사용자 지역 포맷에 맞게

      // 퀴즈 기록에 넣기 위해 문제 1번에 저장된 categoryName 불러옴
      const savedCategoryName = updatedQuestions[0]?.categoryName || "Unknown";

      // 사용자별 히스토리 저장
      const history = JSON.parse(localStorage.getItem(userKey)) || [];
      // 새 퀴즈 기록 객체 생성
      const newRecord = {
        date: now,
        category: savedCategoryName,
        total: updatedQuestions.length,
        score: finalScore,
        questions: updatedQuestions.map((q) => ({
          question: q.question,
          correct_answer: q.correct_answer,
          shuffledChoices: q.shuffledChoices,
          user_answer: q.user_answer || null,
        })),
      };
      // 기존 히스토리에 newRecord를 추가한 뒤 다시 저장, 전개 연산자로 새 배열을 만들어 기존 히스토리를 덮어씀
      localStorage.setItem(userKey, JSON.stringify([...history, newRecord]));

      // 마지막 결과는 전체 사용자와 관계 없이 공통 키(lastResult)로 저장해서 결과 화면에서 바로 사용
      localStorage.setItem(
        "lastResult",
        JSON.stringify({
          score: finalScore,
          total: updatedQuestions.length,
        })
      );
      navigate("/result");
    } else {
      setSelectedOption(null); // 선택지(보기) 초기화
      setCurrentQuestionIndex((prev) => prev + 1); // 다음 문제로 이동
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
          {choices.map((choice, index) => ( // choices 배열의 각 항목(선택지)을 .map()으로 반복 렌더링
            <button // 각 보기 항목마다 하나의 버튼 생성
              key={index} // 각 항목 고유하게 식별하기 위한 키
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
