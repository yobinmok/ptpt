import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import LoginContextProvider from '../contexts/LoginContext';

const SignupPage = () => (
  <LoginContextProvider>
    <LoginForm />
  </LoginContextProvider>
);

export default SignupPage;
