import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useDispatch } from 'react-redux'; // useDispatch 추가
import { googleSignin, verifyGoogleAccessToken } from '../../apis/auth';
import { login } from '../../store/reducers/authReducer';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCode, setAuthCode] = useState(null); // 인가 코드 상태
  const [token, setToken] = useState(null); // 액세스 토큰 및 ID 토큰 상태
  const [tokenVerified, setTokenVerified] = useState(null); // 토큰 검증 상태

  useEffect(() => {
    // URL에서 authorization code를 추출
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      console.log('Authorization code:', code);
      setAuthCode(code); // 인가 코드를 상태에 저장

      // authorization code를 사용하여 백엔드에서 access token과 id token을 요청
      googleSignin(code)
        .then((data) => {
          console.log('Token received:', data);
          setToken(data); // 받은 토큰 데이터를 상태에 저장

          // access token을 검증
          return verifyGoogleAccessToken(data.accessToken).then(
            (verificationResult) => {
              console.log('Token verification result:', verificationResult);
              setTokenVerified(verificationResult.message === 'Valid Token');

              // 로그인 성공 시 oauth_id와 사용자 정보를 Redux에 저장
              dispatch(login({ oauth_id: data.oauth_id, user: data.user }));
              navigate('/'); // 로그인 후 메인 페이지로 이동
            }
          );
        })
        .catch((error) => {
          console.error('Error during Google sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]); // navigate와 dispatch 추가

  return (
    <div>
      <h1>Google Processing Authentication...</h1>
      {authCode && (
        <div>
          <p>Authorization code: {authCode}</p>
        </div>
      )}
      {token && (
        <div>
          <p>Access Token: {token.accessToken}</p>
          <p>Member Id: {token.memberId}</p>
          <p>ID Token: {token.id_token}</p>
        </div>
      )}
      {tokenVerified !== null && (
        <div>
          <p>Token Verified: {tokenVerified ? 'Yes' : 'No'}</p>
        </div>
      )}
    </div>
  );
};

export default AuthPage;
