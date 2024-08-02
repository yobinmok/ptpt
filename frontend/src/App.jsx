import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store/store';
import MainPage from './pages/MainPage';
import LoginPage from './pages/member/LoginPage';
import AuthPage from './pages/member/AuthPage';
import KakaoAuthPage from './pages/member/KakaoAuthPage';
import SignupPage from './pages/SignupPage';
import PracticePage from './pages/presentation/PracticePage';
import VoiceTestPage from './pages/VoiceTestPage';
import SoloPage from './pages/presentation/SoloPage';
import MultiPage from './pages/presentation/MultiPage';
import MyInfo from './pages/member/MyInfoPage';
import Nav from './components/organisms/Navbar';
// import VideoRoomComponent from './components/room/openVidu/VideoRoomComponent';
import CreateRoom from './pages/room/CreateRoom';
import VideoRoomComponent from './pages/room/openVidu/VideoRoomComponent';

function App() {
  return (
    <Provider store={store}>
      <div className='App' style={{ paddingTop: '64px' }}>
        <Nav />
        <Routes>
          <Route exact path='/' element={<MainPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/signup' element={<SignupPage />} />
          <Route path='/auth' element={<AuthPage />} />
          <Route path='/auth/kakao' element={<KakaoAuthPage />} />
          <Route path='/practice' element={<PracticePage />} />
          <Route path='/solo' element={<SoloPage />} />
          <Route path='/multi' element={<MultiPage />} />
          <Route path='/myinfo/*' element={<MyInfo />} />
          <Route path='/createroom' element={<CreateRoom />} />
          <Route path='/room/detail' element={<VideoRoomComponent />} />
        </Routes>
      </div>
    </Provider>
  );
}

export default App;
