import React from 'react';
import LoginContextProvider from '../contexts/LoginContext';
import SignupForm from '../components/organisms/SignupForm';

const SignupPage = () => (
  <LoginContextProvider>
    <SignupForm />
  </LoginContextProvider>
);

export default SignupPage;
