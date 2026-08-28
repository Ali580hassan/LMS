import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, role, allowedRoles }) {
  const { user, token, loading } = useAuth(); // 1. Add loading state

  // 2. Wait until AuthContext finishes checking token/localStorage
  if (loading) {
    return <div>Loading...</div>; // or your Spinner component
  }

  // 3. Agar token nahi hai to Login par bhejo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 4. Role check
  const roles = allowedRoles ?? (role ? [role] : null);
  if (roles && !roles.some((r) => r.toLowerCase() === user?.role?.toLowerCase())) {
    return <Navigate to="/" replace />;
  }

  return children ? children : <Outlet />;
}