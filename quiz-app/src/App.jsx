import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UserDashboard from "./pages/UserDashboard";
import QuizPage from "./pages/QuizPage";
import QuizSession from "./pages/QuizSession";
import QuizResult from "./pages/QuizResult";
import QuizLog from "./pages/QuizLog";
import AdminDashboard from "./pages/AdminDashboard";
import ManageQuestions from "./pages/ManageQuestions";
import ManageUsers from "./pages/ManageUsers";
import PrivateRoute from "./auth/PrivateRoute";
import QuizDetail from "./pages/QuizDetail";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* for regular user page */}
        <Route
          path="/user"
          element={
            <PrivateRoute element={<UserDashboard />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/quiz"
          element={
            <PrivateRoute element={<QuizPage />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/quiz/start"
          element={
            <PrivateRoute element={<QuizSession />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/result"
          element={
            <PrivateRoute element={<QuizResult />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/logs"
          element={
            <PrivateRoute element={<QuizLog />} allowedRoles={["user"]} />
          }
        />
        <Route
          path="/quizlog/:index"
          element={
            <PrivateRoute element={<QuizDetail />} allowedRoles={["user"]} />
          }
        />
        {/* for admin page */}
        <Route
          path="/admin"
          element={
            <PrivateRoute
              element={<AdminDashboard />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/admin/questions"
          element={
            <PrivateRoute
              element={<ManageQuestions />}
              allowedRoles={["admin"]}
            />
          }
        />
        <Route
          path="/admin/users"
          element={
            <PrivateRoute element={<ManageUsers />} allowedRoles={["admin"]} />
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
