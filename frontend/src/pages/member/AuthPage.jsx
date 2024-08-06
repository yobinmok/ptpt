import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // useNavigate 추가
import { useDispatch } from 'react-redux'; // useDispatch 추가
import {
  googleSignin,
  verifyGoogleAccessToken,
  getProfile,
} from '../../apis/auth';
import { setAuth } from '../../store/actions/authActions';
import UserInfoModal from '../../components/organisms/UserInfoModal';

const AuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCode, setAuthCode] = useState(null); // 인가 코드 상태
  const [token, setToken] = useState(null); // 액세스 토큰 및 ID 토큰 상태
  const [tokenVerified, setTokenVerified] = useState(null); // 토큰 검증 상태
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    // URL에서 authorization code를 추출
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      console.log('Authorization code:', code);
      setAuthCode(code); // 인가 코드를 상태에 저장

      // authorization code를 사용하여 백엔드에서 access token과 id token을 요청
      googleSignin(code)
        .then(async (data) => {
          console.log('Token received:', data);
          setToken(data);

          const verificationResult = await verifyGoogleAccessToken(
            data.accessToken
          );
          console.log('Token verification result:', verificationResult);
          setTokenVerified(verificationResult.message === 'Valid Token');

          try {
            const profile = await getProfile(data.oauthId);
            if (!profile.nickname) {
              setShowModal(true);
            } else {
              dispatch(setAuth({ oauth_id: data.oauthId, user: profile }));
              navigate('/');
            }
          } catch (error) {
            console.error('Error fetching profile:', error);
          }
        })
        .catch((error) => {
          console.error('Error during Google sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]);

  const handleModalSubmit = (nickname, voiceModel) => {
    // 추가 사용자 정보를 백엔드로 전송하고 메인 페이지로 이동
    dispatch(
      setAuth({
        oauth_id: token.oauth_id,
        user: { ...token.user, nickname, voiceModel },
      })
    );
    navigate('/');
  };
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
      {showModal && (
        <UserInfoModal
          showModal={showModal}
          setShowModal={setShowModal}
          // handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AuthPage;
