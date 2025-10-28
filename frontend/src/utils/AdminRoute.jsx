import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth(); // Assuming your context provides user and loading state

  if (loading) {
    return <div>Loading...</div>; // Or a spinner component
  }
  
  // Check if user exists and their userType is 'admin' (adjust if your role name is different)
  const isAdmin = user && (user.userType === 'admin' || user.userType === 'Admin');

  return isAdmin ? (children || <Outlet />) : <Navigate to="/login" replace />;
};

export default AdminRoute;