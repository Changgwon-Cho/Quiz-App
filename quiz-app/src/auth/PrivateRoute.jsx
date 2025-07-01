import { Navigate } from "react-router-dom"; // 사용자를 다른 경로로 리디렉션 가능하게 함
import { AuthManager } from "./AuthManager";

export default function PrivateRoute({ element, allowedRoles }) {
  const user = AuthManager.getCurrentUser();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (!allowedRoles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return element;
}
