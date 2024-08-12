import React from 'react';
import styled from 'styled-components';
import KakaoButton from '../../components/atoms/KakaoButton';
import GoogleButton from '../../components/atoms/GoogleButton';

// 컨테이너 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  padding: 20px;
  margin: 0;
  box-sizing: border-box;
`;

// 버튼 그룹 스타일 정의
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

const LoginPage = () => {
  const VITE_API_URL = import.meta.env.VITE_API_URL;

  const kakaoLink = `${VITE_API_URL}/oauth2/authorization/kakao`;
  const googleLink = `${VITE_API_URL}/oauth2/authorization/google`;

  // 카카오 로그인 핸들러 함수
  const kakaoLoginHandler = () => {
    window.location.href = kakaoLink;
  };

  // 구글 로그인 핸들러 함수
  const googleLoginHandler = () => {
    window.location.href = googleLink;
  };

  return (
    <Container>
      <h1>Login Page</h1>
      <ButtonGroup>
        <GoogleButton
          onClick={googleLoginHandler}
          symbolSize='24px'
          symbolMargin='8px'
        >
          Sign in with Google
        </GoogleButton>
        <KakaoButton
          onClick={kakaoLoginHandler}
          symbolSize='24px'
          symbolMargin='8px'
        >
          Sign in with Kakao
        </KakaoButton>
      </ButtonGroup>
    </Container>
  );
};

export default LoginPage;
