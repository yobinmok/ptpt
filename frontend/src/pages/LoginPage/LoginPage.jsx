import React from 'react';
import LoginForm from '../../components/organisms/LoginForm';
import LoginContextProvider from '../../contexts/LoginContext'
import Navbar from '../../components/organisms/Navbar';

const LoginPage = () => (
    <LoginContextProvider>
        <Navbar />
        <LoginForm />
    </LoginContextProvider>
);

export default LoginPage;
