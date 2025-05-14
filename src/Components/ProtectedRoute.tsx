import React from 'react';
import { Navigate } from 'react-router-dom';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, allowedRoles }) => {
  const currentUser = localStorage.getItem('currentUser');
  const user = currentUser ? JSON.parse(currentUser) : null;

  if (!user || !user.isLoggedIn || !allowedRoles.includes(user.role)) {
    // Not logged in or not allowed
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
