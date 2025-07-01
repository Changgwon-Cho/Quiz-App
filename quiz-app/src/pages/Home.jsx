import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate(); // navigate 호출 시 URL이 변경되고 해당 경로의 컴포넌트로 전환

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <div className="text-center bg-white p-10 rounded shadow-md max-w-md w-full">
        <h1 className="text-3xl font-bold mb-4">Welcome to Quiz App</h1>
        <p className="text-gray-700 mb-8">
          This website is a simple Single Page Application where you can
          take quizzes and save your results.
        </p>

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/login")}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
          >
            Login
          </button>
          <button
            onClick={() => navigate("/register")}
            className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition"
          >
            Sign-Up
          </button>
        </div>
      </div>
    </div>
  );
}
