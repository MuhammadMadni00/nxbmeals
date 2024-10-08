import React from 'react';
import { Navigate } from 'react-router-dom';
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}
const isAuthenticated = () => {
  return getCookie('auth_token');; 
};

const PrivateLogin = ({ element: Component }) => {

  return isAuthenticated() ?  <Navigate to="/" />:<Component /> ;
};

export default PrivateLogin;