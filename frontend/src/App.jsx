import React from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage'
import AuthPage from './pages/AuthPage'
import SignupPage from './pages/SignupPage'
import PracticePage from './pages/PracticePage'
import SoloPage from './pages/SoloPage'
import Nav from './components/organisms/Nav';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App' style={{ marginTop: '80px' }}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/practice' element={<PracticePage />} />
        <Route path='/solo' element={<SoloPage />} />
      </Routes>
    </div>
  );
}

export default App;
