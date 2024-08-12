import React, { Component } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router';
import LoginPage from '../pages/member/LoginPage';

const PrivateRoute = ({ component: Component }) => {
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  return isAuth ? Component : <Navigate to='/login' />;
};

export default PrivateRoute;
