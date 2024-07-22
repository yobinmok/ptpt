import React from 'react';
import LoginTemplate from '../templates/LoginTemplate';
import LoginContextProvider from '../../contexts/LoginContext';
import Navbar from '../organisms/Navbar';

const LoginPage = () => (
    <LoginContextProvider>
        <Navbar />
        <LoginTemplate />
    </LoginContextProvider>
);

export default LoginPage;
