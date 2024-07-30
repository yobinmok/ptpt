import React from 'react';
import styled from 'styled-components';
import KakaoButton from '../components/atoms/KakaoButton';
import GoogleButton from '../components/atoms/GoogleButton';

// 컨테이너 스타일 정의
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 80vh;
  // vh (Viewport Height): 뷰포트의 높이를 기준으로 백분율을 나타냅니다. 예를 들어, 50vh는 뷰포트 높이의 50%를 의미
  padding: 20px;
  margin: 0; /* 기본 마진 제거 */
  box-sizing: border-box; /* 패딩과 테두리를 포함한 박스 크기 설정 */
`;

// 버튼
const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column; /* 버튼을 수직으로 배치 */
  gap: 20px; /* 버튼 사이의 간격 설정 */
`;

const LoginPage = () => {
  // 환경 변수에서 API 키와 리디렉트 URI를 가져옴
  const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;
  const KAKAO_REDIRECT_URI = import.meta.env.VITE_KAKAO_REDIRECT_URI;
  const GOOGLE_CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const GOOGLE_REDIRECT_URI = import.meta.env.VITE_GOOGLE_REDIRECT_URI;

  // 카카오 로그인 URL 생성
  const kakaoLink = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;
  // 구글 로그인 URL 생성
  const googleLink = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${GOOGLE_CLIENT_ID}&redirect_uri=${GOOGLE_REDIRECT_URI}&response_type=code&scope=email profile`;

  // 카카오 로그인 핸들러 함수
  const kakaoLoginHandler = () => {
    window.location.href = kakaoLink; // 카카오 로그인 페이지로 리디렉트
  };

  // 구글 로그인 핸들러 함수
  const googleLoginHandler = () => {
    window.location.href = googleLink; // 구글 로그인 페이지로 리디렉트
  };

  return (
    <Container>
      <h1>Login Page</h1>
      <ButtonGroup>
        {/* 구글 로그인 버튼 */}
        <GoogleButton
          onClick={googleLoginHandler}
          symbolSize='24px'
          symbolMargin='8px'
        >
          Sign in with Google
        </GoogleButton>

        {/* 카카오 로그인 버튼 */}
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
