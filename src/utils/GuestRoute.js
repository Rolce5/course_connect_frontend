import { Navigate, Outlet } from 'react-router-dom';
import {
  isAuthenticated,
  isAdmin,
  isInstructor,
  isStudent,
} from "../services/authHelper"; // Import the functions directly

const GuestRoute = () => {
  if (isAuthenticated()) {
    // If authenticated, redirect based on role
    if (!isStudent()) {
      return <Navigate to="/student/learning" replace />;
    }
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If not authenticated, render the login or registration page
  return <Outlet />;
};

export default GuestRoute;
