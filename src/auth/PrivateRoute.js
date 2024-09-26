import React from 'react';
import { Navigate } from 'react-router-dom';

// Simulate authentication status
const isAuthenticated = () => {
  return localStorage.getItem('authToken'); 
};

const PrivateRoute = ({ element: Component }) => {

  return isAuthenticated() ? <Component /> : <Navigate to="/login" />;
};

export default PrivateRoute;