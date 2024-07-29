import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const AuthPage = () => {
  const [code, setCode] = useState(null); // 인가 코드 상태 변수
  const [provider, setProvider] = useState(null); // 로그인 사용자 상태 변수
  const [accessToken, setAccessToken] = useState(null); // accessToken 상태 변수

  useEffect(() => {
    // URL에서 인가 코드와 로그인 제공자 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const provider = urlParams.get('provider');

    setCode(code);
    setProvider(provider);

    if (code && provider) {
      fetchAccessToken(code, provider);
    }
  }, []);

  // Access Token 요청 함수
  const fetchAccessToken = async (authorizationCode, provider) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/oauth/${provider}`,
        {
          code: authorizationCode,
        }
      );
      // 백엔드 응답 데이터
      const data = response.data;
      // Access Token 상태에 저장
      setAccessToken(data.access_token); // 백엔드에서 받은 액세스 토큰 저장
      console.log('Access Token:', data.access_token);
    } catch (error) {
      console.error('Error fetching access token', error);
    }
  };

  return (
    <div>
      <h1>Auth Page</h1>
      {code && <p>Authorization Code: {code}</p>}
      {provider && <p>Provider: {provider}</p>}
      {accessToken && <p>Access Token: {accessToken}</p>}
    </div>
  );
};
export default AuthPage;
