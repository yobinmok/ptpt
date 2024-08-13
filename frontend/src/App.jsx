import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
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
import { setOauthId, setAuth } from './store/actions/authActions'; // 추가된 부분
import PrivateRoute from './routes/PrivateRoute';

function App() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    let user = null;
    let oauthId = null;

    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('Authorization='))
      ?.split('=')[1];

    console.log('Extracted JWT Token:', token);

    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const jsonPayload = decodeURIComponent(
          atob(base64)
            .split('')
            .map(function (c) {
              return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
            })
            .join('')
        );

        user = JSON.parse(jsonPayload);
        oauthId = user.oauthId; // OAuth ID 추출
        console.log('Decoded User Info:', user);
        console.log('OAuth ID:', oauthId); // OAuth ID 출력
      } catch (error) {
        console.error('Failed to decode JWT token:', error);
      }
    }

    if (oauthId) {
      console.log('Dispatching OAuth ID:', oauthId); // 추가된 로그
      dispatch(setOauthId(oauthId)); // 상태에 OAuth ID 저장
    }
    if (token) {
      dispatch(setAuth(token, user)); // 상태에 JWT 토큰과 사용자 정보 저장
    }

    // 인증 상태에 따라 리디렉션
    if (token && oauthId) {
      if (window.location.pathname === '/login') {
        navigate('/'); // 현재 위치가 로그인 페이지일 경우에만 메인 페이지로 이동
      }
    } else if (!token) {
      navigate('/login'); // 로그인 페이지로 이동
    }
  }, [dispatch, navigate]);

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
          element={<PrivateRoute component={<UserInfoPage />} />}
        />
        <Route
          path='/practice'
          element={<PrivateRoute component={<PracticePage />} />}
        />
        <Route
          path='/solo'
          element={<PrivateRoute component={<SoloPage />} />}
        />
        <Route
          path='/multi/:roomId'
          element={<PrivateRoute component={<MultiPage />} />}
        />
        <Route
          path='/myinfo/*'
          element={<PrivateRoute component={<MyInfoPage />} />}
        />
        <Route path='/myinfo' element={<MyInfoPage />} />

        <Route
          path='/createroom'
          element={<PrivateRoute component={<CreateRoom />} />}
        />
        <Route
          path='/room/detail'
          element={<PrivateRoute component={<VideoRoomComponent />} />}
        />
        <Route
          path='room/list'
          element={<PrivateRoute component={<RoomListPage />} />}
        />
        <Route
          path='/room/:roomId'
          element={<PrivateRoute component={<RoomDetail />} />}
        />
        <Route
          path='/test'
          element={<PrivateRoute component={<VoiceTestPage />} />}
        />
        <Route
          path='/myinfo/statistics/evaluation/feedBack/:roomId'
          element={<PrivateRoute component={<FeedbackDetail />} />}
        />
        {/* 피드백 상세 페이지 라우트 */}
      </Routes>
    </div>
  );
}

export default App;
