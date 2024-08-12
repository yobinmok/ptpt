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
  const KAKAO_LINK = import.meta.env.VITE_KAKAO_LINK;
  const GOOGLE_LINK = import.meta.env.VITE_GOOGLE_LINK;


  console.log("KAKAO_LINK IS " + KAKAO_LINK);
  // 카카오 로그인 URL 생성
  //   - prompt: 로그인 화면을 강제로 표시하도록 설정
  //     - "login": 기존 세션이 있더라도 사용자에게 카카오 계정 로그인 화면을 보여줍니다.
  //        이 옵션을 사용하면 사용자가 매번 로그인을 하도록 유도할 수 있습니다.
  //     -  (기본값: "none"): 기본적으로 사용자에게 로그인 화면을 표시하지 않고 인가 코드를 발급받습니다.


  // 카카오 로그인 핸들러 함수
  const kakaoLoginHandler = () => {
    window.location.href = KAKAO_LINK;
  };

  // 구글 로그인 핸들러 함수
  const googleLoginHandler = () => {
    window.location.href = GOOGLE_LINK;
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
