import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { kakaoSignin, verifyKakaoAccessToken } from '../../apis/auth';
import { setAuth } from '../../store/actions/authActions';
// import UserInfoModal from '../../components/organisms/UserInfoModal';

const KakaoAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCode, setAuthCode] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenVerified, setTokenVerified] = useState(null);
  // const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      console.log('Authorization code:', code);
      setAuthCode(code);

      kakaoSignin(code)
        .then((data) => {
          console.log('Token received:', data);
          setToken(data);

          // access token을 검증
          return verifyKakaoAccessToken(data.accessToken).then(
            (verificationResult) => {
              console.log('Token verification result:', verificationResult);
              setTokenVerified(verificationResult.message === 'Valid Token');

              if (verificationResult.message === 'Valid Token') {
                console.log('Dispatching setAuth with:', {
                  oauth_id: data.oauth_id,
                  user: data.user,
                });
                dispatch(setAuth({ oauth_id: data.oauth_id, user: data.user }));
                navigate('/'); // 로그인 후 메인 페이지로 이동
              }
            }
          );
        })
        .catch((error) => {
          console.error('Error during Kakao sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]);

  return (
    <div>
      <h1>Kakao Processing Authentication...</h1>
      {authCode && (
        <div>
          <p>Authorization code: {authCode}</p>
        </div>
      )}
      {token && (
        <div>
          <p>Access Token: {token.accessToken}</p>
          <p>Member Id: {token.memberId}</p>
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

export default KakaoAuthPage;
