import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuthenticated = () => {
  return localStorage.getItem('authToken'); 
};

const PrivateLogin = ({ element: Component }) => {

  return isAuthenticated() ?  <Navigate to="/" />:<Component /> ;
};

export default PrivateLogin;