import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { isAuthenticated, isAdmin, isInstructor } from '../services/authHelper';

const PrivateRoute = () => {
  if (!isAuthenticated()) {
    // If the user is not authenticated, redirect to the login page
    return <Navigate to="/login" />;
  }

  if (isAdmin() || isInstructor()) {
    // If the user is an admin or instructor, redirect to the admin dashboard
    return <Navigate to="/admin/dashboard" replace />;
  }

  // If the user is authenticated and not an admin, allow access to the user dashboard
  return <Outlet />;
};

export default PrivateRoute;