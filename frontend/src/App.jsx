import React from 'react';
import { Route, Routes } from 'react-router-dom';
import store from './store/store';
import MainPage from './pages/MainPage';
import LoginPage from './pages/member/LoginPage';
import AuthPage from './pages/member/AuthPage';
import KakaoAuthPage from './pages/member/KakaoAuthPage';
import UserInfoPage from './pages/member/UserInfoPage';
import PracticePage from './pages/presentation/PracticePage';
import VoiceTestPage from './pages/VoiceTestPage';
import SoloPage from './pages/presentation/SoloPage';
import MultiPage from './pages/presentation/MultiPage';
import MyInfoPage from './pages/member/MyInfoPage';
import StatisticsPage from './components/organisms/myInfo/StatisticsPage';
import FeedbackDetail from './components/organisms/myInfo/FeedbackDetail'; // 피드백 상세 페이지 추가
import Nav from './components/organisms/Navbar';
// import VideoRoomComponent from './components/room/openVidu/VideoRoomComponent';
import CreateRoom from './pages/room/CreateRoom';
import VideoRoomComponent from './pages/room/openVidu/VideoRoomComponent';
import RoomListPage from './pages/RoomListPage';
import RoomDetail from './pages/room/RoomDetail';
import PrivateRoute from './routes/PrivateRoute';

function App() {
  return (
    <div className='App' style={{ paddingTop: '64px' }}>
      <Nav />
      <Routes>
        <Route exact path='/' element={<MainPage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/auth' element={<AuthPage />} />
        <Route path='/auth/kakao' element={<KakaoAuthPage />} />
        <Route
          path='/userinfo'
          element={<PrivateRoute compoenent={<UserInfoPage />} />}
        />
        <Route
          path='/practice'
          element={<PrivateRoute compoenent={<PracticePage />} />}
        />
        <Route
          path='/solo'
          element={<PrivateRoute compoenent={<SoloPage />} />}
        />
        <Route
          path='/multi/:roomId'
          element={<PrivateRoute compoenent={<MultiPage />} />}
        />
        <Route
          path='/myinfo/*'
          element={<PrivateRoute compoenent={<MyInfoPage />} />}
        />
        <Route
          path='/createroom'
          element={<PrivateRoute compoenent={<CreateRoom />} />}
        />
        <Route
          path='/room/detail'
          element={<PrivateRoute compoenent={<VideoRoomComponent />} />}
        />
        <Route
          path='room/list'
          element={<PrivateRoute compoenent={<RoomListPage />} />}
        />
        <Route
          path='/room/:roomId'
          element={<PrivateRoute compoenent={<RoomDetail />} />}
        />
        <Route
          path='/test'
          element={<PrivateRoute compoenent={<VoiceTestPage />} />}
        />
        <Route
          path='/myinfo/statistics/evaluation/feedBack/:roomId'
          element={<PrivateRoute compoenent={<FeedbackDetail />} />}
        />
        {/* 피드백 상세 페이지 라우트 */}
      </Routes>
    </div>
  );
}

export default App;
