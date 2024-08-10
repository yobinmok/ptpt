import { React } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  login,
  logout,
  setAuth,
  demoLogin,
  demoLogout,
  kakaoLogout,
  googleLogout,
} from '../../store/actions/authActions';

import {
  StyledNavbar,
  LeftContainer,
  RightContainer,
  NavLink,
  ProfileImage,
} from '../styles/NavbarStyles';

function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated); // ?. 연산자를 사용하여 null 체크
  const user = useSelector((state) => state.auth?.user);
  const accessToken = useSelector((state) => state.auth.token);

  console.log('isAuthenticated:', isAuthenticated); // 상태가 변경될 때마다 출력 확인
  console.log('user:', user); // 상태가 변경될 때마다 출력 확인

  // 로그인 핸들러: 로그인 액션을 디스패치하여 상태를 변경합니다.
  const handleLogin = () => {
    console.log('Login button clicked');
    dispatch(login({ username: 'testuser', password: 'password' })); // 로그인 예시 데이터
  };

  // 로그아웃 핸들러: 로그아웃 액션을 디스패치하여 상태를 변경합니다.
  const handleLogout = async () => {
    try {
      await axios.put('/member/signout'); // 서버에 로그아웃 요청
      dispatch(logout());
      navigate('/'); // 메인 페이지로 리디렉션
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  // Demo 로그인 핸들러: 상태를 로그인 상태로 변경합니다.
  const handleDemoLogin = () => {
    console.log('Demo login button clicked');
    dispatch(demoLogin()); // Demo 로그인 액션 생성자 호출
  };

  // Demo 로그아웃 핸들러: 상태를 로그아웃 상태로 변경합니다.
  const handleDemoLogout = () => {
    console.log('Demo logout button clicked');
    dispatch(demoLogout()); // Demo 로그아웃 액션 생성자 호출
  };

  // Kakao 로그아웃 핸들러
  const handleKakaoLogout = () => {
    if (accessToken) {
      dispatch(kakaoLogout(accessToken));
    }
  };
  return (
    <StyledNavbar>
      <LeftContainer>
        {/* 홈 링크 */}
        <Link to='/'>홈</Link>
      </LeftContainer>
      <div>
        {isAuthenticated
          ? `현재 로그인 상태입니다. 닉네임: ${user.nickname}`
          : '현재 로그아웃 상태입니다.'}
      </div>
      <RightContainer>
        {/* 사용자가 인증되었는지 여부에 따라 다른 링크를 표시 */}
        {isAuthenticated ? (
          <>
            {/* 인증된 사용자에게는 내 정보 링크와 프로필 이미지를 표시 */}
            <NavLink to='/myinfo'>
              <ProfileImage
                src={user?.profilePicture || 'default-profile.png'} // 사용자 프로필 사진 또는 기본 이미지
                alt='Profile'
              />
            </NavLink>
            {/* 로그아웃 버튼 */}
            <NavLink to='/practice'>Start</NavLink>
            <button onClick={handleLogout}>Logout</button>
            {/* Demo 로그아웃 버튼 */}
            <button onClick={handleDemoLogout}>Demo Logout</button>
            {/* Kakao 로그아웃 버튼 */}
            <button onClick={handleKakaoLogout}>Kakao Logout</button>
          </>
        ) : (
          <>
            {/* 인증되지 않은 사용자에게는 로그인 링크를 표시 */}
            <NavLink to='/login'>Login</NavLink>
            {/* 로그인 버튼 */}
            <button onClick={handleLogin}>Login</button>
            {/* Demo 로그인 버튼 */}
            <button onClick={handleDemoLogin}>Demo Login</button>
          </>
        )}
        {/* 로그인 상태 안내문 */}
      </RightContainer>
    </StyledNavbar>
  );
}

export default Navbar;
