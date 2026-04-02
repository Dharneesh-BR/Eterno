import { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function RequireAuth({ children }) {
  const location = useLocation();
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-[40vh] flex items-center justify-center text-gray-500 text-sm">
        Checking authentication...
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />;
  }

  return children;
}
