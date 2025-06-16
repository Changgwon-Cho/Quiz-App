import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import UserDashboard from './pages/UserDashboard';
import QuizPage from './pages/QuizPage';
import QuizResult from './pages/QuizResult';
import QuizLog from './pages/QuizLog';
import AdminDashboard from './pages/AdminDashboard';
import ManageQuestions from './pages/ManageQuestions';
import ManageUsers from './pages/ManageUsers';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user" element={<UserDashboard />} />
        <Route path="/quiz" element={<QuizPage />} />
        <Route path="/result" element={<QuizResult />} />
        <Route path="/logs" element={<QuizLog />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/questions" element={<ManageQuestions />} />
        <Route path="/admin/users" element={<ManageUsers />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;