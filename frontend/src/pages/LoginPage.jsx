import React from 'react';
import styled from 'styled-components';
import KakaoButton from '../components/atoms/KakaoButton'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  padding: 20px;
`;

const LoginPage = () => {
    // .env 파일에서 관리할 key , uri
    // const Rest_api_key = process.env.REACT_APP_KAKAO_REST_API_KEY;
    // const redirect_uri = process.env.REACT_APP_KAKAO_REDIRECT_URI;
    const REST_API_KEY = '5ecb22966f2e7ecdd957524875aea32e';
    
    // 로그인 성공하면 이동할 REDIRECT URI
    const REDIRECT_URI = 'http://localhost:5173/auth';
    const link = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

    const loginHandler = () => {
        window.location.href = link;
    }

    return (
        <Container>
          <h1>Login Page</h1>
          <KakaoButton onClick={loginHandler} symbolSize="24px" symbolMargin="8px">
            카카오 로그인
          </KakaoButton>
        </Container>
      );
}

export default LoginPage;
