import { Navigate } from 'react-router-dom';
import { AuthManager } from './AuthManager';

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