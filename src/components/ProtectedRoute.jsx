import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { isAuthenticated } from '../utils/authHelpers';

const ProtectedRoute = ({ children }) => {
  const location = useLocation();

  // Check if user is authenticated
  if (!isAuthenticated()) {
    // Redirect to login with return URL
    return (
      <Navigate 
        to="/login" 
        state={{ from: location.pathname }} 
        replace 
      />
    );
  }

  // If authenticated, render children
  return children;
};

export default ProtectedRoute;
