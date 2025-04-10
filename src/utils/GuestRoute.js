import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isAdmin, isInstructor } from '../services/authHelper'; // Import the functions directly

const GuestRoute = () => {
  if (isAuthenticated()) {
    // If authenticated, redirect based on role
    if (isAdmin() || isInstructor()) {
      return <Navigate to="/admin/dashboard" replace />;
    }
    return <Navigate to="/dashboard" replace />;
  }

  // If not authenticated, render the login or registration page
  return <Outlet />;
};

export default GuestRoute;
