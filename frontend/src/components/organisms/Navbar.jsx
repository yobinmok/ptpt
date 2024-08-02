import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { login, logout } from '../../store/reducers/authReducer';

import {
  StyledNavbar,
  LeftContainer,
  RightContainer,
  NavLink,
  ProfileImage,
} from '../styles/NavbarStyles';

function Navbar() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth?.isAuthenticated); // ?. 연산자를 사용하여 null 체크
  const user = useSelector((state) => state.auth.user);

  console.log('isAuthenticated:', isAuthenticated); // 상태가 변경될 때마다 출력 확인
  console.log('user:', user); // 상태가 변경될 때마다 출력 확인

  // 로그인 핸들러: 로그인 액션을 디스패치하여 상태를 변경합니다.
  const handleLogin = () => {
    console.log('Login button clicked');
    dispatch(login({ name: 'User', profilePicture: 'default-profile.png' }));
  };

  // 로그아웃 핸들러: 로그아웃 액션을 디스패치하여 상태를 변경합니다.
  const handleLogout = () => {
    console.log('Logout button clicked');
    dispatch(logout());
  };

  return (
    <StyledNavbar>
      <LeftContainer>
        {/* 홈 링크 */}
        <Link to='/'>홈</Link>
      </LeftContainer>
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
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            {/* 인증되지 않은 사용자에게는 로그인, 시작하기, 내 정보 링크를 표시 */}
            <NavLink to='/login'>Login</NavLink>
            <NavLink to='/practice'>Start</NavLink>
            {/* 로그인 버튼 */}
            <button onClick={handleLogin}>Login (Demo)</button>
            {/* <NavLink to='/myinfo'>
              <ProfileImage
                // src={require('../assets/images/profile.png')} // 주석 처리된 기본 프로필 이미지 경로
                alt='Profile'
              />
            </NavLink> */}
          </>
        )}
      </RightContainer>
    </StyledNavbar>
  );
}

export default Navbar;
