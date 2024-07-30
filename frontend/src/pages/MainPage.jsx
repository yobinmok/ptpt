import React from 'react';
import styled from 'styled-components';
import ThreeDImage from '../assets/images/new_main.png'; // 3D 이미지 파일 경로
import { useNavigate } from 'react-router';
import Button from '../components/atoms/Button';

// 컨테이너 스타일 정의
const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 20px;
  background: url(${ThreeDImage}) no-repeat center center fixed;
  background-size: cover; /* 이미지를 화면에 맞게 조정 */
`;

// 흰색 그라디언트 오버레이 정의
const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    180deg,
    white 0%,
    white 49px,
    rgba(255, 255, 255, 0) 200px
  );
  pointer-events: none; /* 오버레이가 클릭 등의 이벤트를 차단하지 않도록 설정 */
`;

// 콘텐츠 스타일 정의
const Content = styled.div`
  position: relative;
  z-index: 1; /* 오버레이 위에 위치하도록 설정 */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

const MainPage = () => {
  const navigate = useNavigate();
  const isLoggedIn = false; // 임의로 로그인 상태를 설정

  const MoveCreateRoom = () => {
    navigate('/createroom');
  };

  return (
    <Container>
      <Overlay /> {/* 흰색 그라디언트 오버레이 추가 */}
      <Content>
        <h1>Main Page</h1>

        <h2>{isLoggedIn ? 'Welcome, User!' : 'Welcome to Our Site'}</h2>
        <p>
          {isLoggedIn
            ? 'This is your main page content for logged in users.'
            : 'Please log in to access more features.'}
        </p>
      </Content>
      <Content>
        <Button onClick={MoveCreateRoom}>방 생성하기</Button>
      </Content>
    </Container>
  );
};

export default MainPage;
