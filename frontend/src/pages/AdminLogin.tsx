
import React from 'react';
import AdminLoginComponent from '@/components/Admin/AdminLogin';
import { useAuth } from '@/contexts/AuthContext';
import { Navigate } from 'react-router-dom';

const AdminLogin: React.FC = () => {
  const { isAuthenticated } = useAuth();

  // Redirect to admin dashboard if already logged in
  if (isAuthenticated) {
    return <Navigate to="/admin" replace />;
  }

  return <AdminLoginComponent />;
};

export default AdminLogin;
