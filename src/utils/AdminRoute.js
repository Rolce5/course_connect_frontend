import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isAdmin, isInstructor } from '../services/authHelper'; // Import the functions directly

const AdminRoute = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" />;
  }
  if (!isAdmin() && !isInstructor()) {
    return <Navigate to="/not-authorised" />;
  }
  return <Outlet />;
};

export default AdminRoute;


