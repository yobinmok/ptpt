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
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  // 카카오 로그인 URL 생성
  //   - prompt: 로그인 화면을 강제로 표시하도록 설정
  //     - "login": 기존 세션이 있더라도 사용자에게 카카오 계정 로그인 화면을 보여줍니다.
  //        이 옵션을 사용하면 사용자가 매번 로그인을 하도록 유도할 수 있습니다.
  //     -  (기본값: "none"): 기본적으로 사용자에게 로그인 화면을 표시하지 않고 인가 코드를 발급받습니다.
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code&prompt=login`;

  // 구글 로그인 URL 생성
  const googleLink = `https://accounts.google.com/o/oauth2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile`;

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
