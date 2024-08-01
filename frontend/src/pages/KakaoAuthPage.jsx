import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { setAccessToken } from './authSlice'; // 액세스 토큰을 저장할 슬라이스
import { kakaoLogin } from './auth'; // 카카오 로그인 API 요청 함수

const KakaoAuthPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [authCode, setAuthCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get('code');

    if (code) {
      setAuthCode(code);
      kakaoLogin(code)
        .then((response) => {
          const token = response.data.accessToken;
          setAccessToken(token);
          dispatch(setAccessToken(token));
          navigate('/home'); // 로그인 성공 후 이동할 페이지
        })
        .catch((error) => {
          console.error('Kakao login error:', error);
        });
    } else {
      console.error('Invalid authorization code');
    }
  }, [dispatch, location, navigate]);

  return (
    <div>
      <h1>Authenticating Kakao...</h1>
      {authCode && (
        <p>
          <strong>Authorization Code:</strong> {authCode}
        </p>
      )}
      {accessToken && (
        <p>
          <strong>Access Token:</strong> {accessToken}
        </p>
      )}
    </div>
  );
};

export default KakaoAuthPage;
