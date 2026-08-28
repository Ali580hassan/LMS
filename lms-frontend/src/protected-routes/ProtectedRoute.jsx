import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';

export default function ProtectedRoute({ children, role }) {
  const { user, token } = useAuth();

  // 1. Agar token nahi hai to Login par bhejo
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // 2. Role Check (Case sensitivity handle karne ke liye lowercase kar liya hai)
  if (role && user?.role?.toLowerCase() !== role.toLowerCase()) {
    return <Navigate to="/" replace />; // Unauthorized hone par home page ya dashboard bhej do
  }

  // 3. Agar component wrapper ke tarah use hua ho to children return karega, 
  // nahi to Outlet (nested routes) render karega.
  return children ? children : <Outlet />;
}