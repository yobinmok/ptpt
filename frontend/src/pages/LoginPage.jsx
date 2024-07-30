import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import LoginContextProvider from '../contexts/LoginContext'

const LoginPage = () => (
    <LoginContextProvider>
        <LoginForm />
    </LoginContextProvider>
);

export default LoginPage;

