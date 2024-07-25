import React from 'react';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage/LoginPage'
import SignupPage from './pages/SignupPage'

function App() {
  return (
    <div>
      <BrowserRouter>
        <div>
          <LoginPage />
        </div>
        <div>
          <SignupPage />
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
