import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Fisher–Yates Shuffle 알고리즘을 사용해 공정하게 배열을 랜덤하게 섞음
function shuffle(array) {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function QuizPage() {
  const [amount, setAmount] = useState(10);
  const [category, setCategory] = useState("");
  const navigate = useNavigate();

  const startQuiz = async () => {
    if (!category) {
      alert("Please select a category.");
      return;
    }

    const parsedAmount = parseInt(amount);
    if (!parsedAmount || parsedAmount < 1 || parsedAmount > 50) {
      alert("The number of questions must be between 1 and 50.");
      return;
    }

    try {
      const response = await axios.get(
        `https://opentdb.com/api.php?amount=${parsedAmount}&category=${category}`
      );

      // Open Trivia API는 response_code를 통해 성공 여부를 알려주는데, 0이면 문제를 성공적으로 받아온 상태임
      // 성공 시 API 응답의 results 속성에 들어있는 실제 퀴즈 문제 배열을 rawQuestions 변수에 저장
      if (response.data.response_code === 0) {
        const rawQuestions = response.data.results;

        // 사용자가 선택한 옵션의 텍스트인 카테고리 이름을 가져옴
        const categoryText =
          document.querySelector("select").selectedOptions[0].text;

        // 전체 퀴즈 데이터를 사용자 퀴즈 풀이에 적합하게 변환하는 과정 / 각 퀴즈 질문(q)를 받아서
        const questionsWithChoices = rawQuestions.map((q) => {
          // 정답 문자열과 오답 목록 배열을 하나의 배열로 합쳐서 저장
          const allChoices = [...q.incorrect_answers, q.correct_answer];
          // 위 배열을 랜덤으로 섞음
          const shuffledChoices = shuffle(allChoices);
          // 기존 문제 객체(q)에 섞은 문제 변수와 카테고리 이름을 추가한 새 객체 반환
          return {
            ...q,
            shuffledChoices,
            categoryName: categoryText,
          };
        });

        localStorage.setItem(
          "currentQuiz",
          JSON.stringify(questionsWithChoices) // 저장
        );
        navigate("/quiz/start");
      } else {
        alert("Failed to fetch quiz data.");
      }
    } catch (error) {
      console.error(error);
      alert("Error occurred: " + error.message);
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

        <div className="space-y-3">
          <button
            onClick={startQuiz}
            className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
          >
            Start Quiz
          </button>

          <button
            onClick={() => navigate("/user")}
            className="w-full bg-gray-300 text-gray-800 py-2 rounded hover:bg-gray-400 mt-2"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    </div>
  );
}
