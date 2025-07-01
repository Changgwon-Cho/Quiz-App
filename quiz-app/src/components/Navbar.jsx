import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate(); // 함수형 컴포넌트에서 프로그래밍적으로 페이지 이동을 가능케 함

  const user = JSON.parse(localStorage.getItem("currentUser"));
  const isLoggedIn = !!user;

  const handleLogout = () => {
    localStorage.removeItem("currentUser");
    navigate("/");
  };

  return (
    <nav className="bg-white shadow p-4 flex justify-between items-center">
      <div className="text-xl font-bold">Quiz App</div>
      {isLoggedIn && (
        <div className="flex items-center space-x-4">
          <span className="text-gray-600">Current User : {user.username}</span>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}
    </nav>
  );
}
