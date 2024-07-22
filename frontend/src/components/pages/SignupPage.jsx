import React from 'react';
import SignupTemplate from '../templates/SignupTemplate';
import LoginContextProvider from '../../contexts/LoginContext';
import Navbar from '../organisms/Navbar';

const SignupPage = () => (
    <LoginContextProvider>
        <Navbar />
        <SignupTemplate />
    </LoginContextProvider>
);

export default SignupPage;
