import React from 'react';
import LoginForm from '../components/organisms/LoginForm';
import LoginContextProvider from '../contexts/LoginContext'
import styled from 'styled-components';

// 버튼 디자인 대충 만들기
const Button = styled.button`
  background-color: #fee500;
  border: none;
  padding: 10px 20px;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;
  color: #3c1e1e;
  margin-top: 160px; /* 상단 여백 추가 */
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
        <Button type='button' onClick={loginHandler}>
            카카오로그인버튼컴포넌트
        </Button>
    )
}

export default LoginPage;
