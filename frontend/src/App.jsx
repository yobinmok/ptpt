import React from 'react';
import MainPage from './pages/MainPage';
import LoginPage from './pages/LoginPage';
import AuthPage from './pages/AuthPage';
import SignupPage from './pages/SignupPage';
import PracticePage from './pages/PracticePage';
import VoiceTestPage from './pages/VoiceTestPage';
import SoloPage from './pages/SoloPage';
import Nav from './components/organisms/Nav';
// import VideoRoomComponent from './components/room/openVidu/VideoRoomComponent';
import CreateRoom from './pages/room/CreateRoom';
import VideoRoomComponent from './pages/room/openVidu/VideoRoomComponent';
import { Route, Routes } from 'react-router-dom';

function App() {
  return (
    <div className='App' style={{ paddingTop: '64px' }}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/practice' element={<PracticePage />} />
        <Route path='/solo' element={<SoloPage />} />

        <Route path="/createroom" element={<CreateRoom />} />
        <Route path="/room/detail" element={<VideoRoomComponent />} />
      </Routes>
    </div>
  );
}

export default App;
