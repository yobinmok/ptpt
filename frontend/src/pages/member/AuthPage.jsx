import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  googleSignin,
  verifyGoogleAccessToken,
  getProfile,
  updateProfile,
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

          if (data.message === 'Existing Member') {
            try {
              const profile = await getProfile(data.memberId);
              console.log('Profile data:', profile);

              if (profile) {
                // 기존 회원인 경우
                console.log('기존회원입니다. 메인페이지로 이동');
                dispatch(setAuth(data.accessToken, profile));
                navigate('/');
              }
            } catch (error) {
              console.error('Error fetching profile:', error);
              console.log('신규 회원입니다. 정보 입력 모달');
              setShowModal(true); // 프로필 조회 실패 시에도 모달을 띄움
            }
          } else {
            console.log('신규 회원입니다. 정보 입력 모달');
            setShowModal(true); // 신규 회원인 경우
          }
        })
        .catch((error) => {
          console.error('Error during Google sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]);

  const handleSubmit = async (nickname, profilePicture) => {
    try {
      const profileData = {
        oauthId: token.memberId,
        nickName: nickname,
        memberPicture: profilePicture || 'default-profile.png',
      };

      console.log('Sending profile data:', profileData); // 데이터 확인

      await updateProfile(profileData);
      dispatch(setAuth(token.accessToken, profileData));
      console.log('회원가입 성공');
      navigate('/');
    } catch (error) {
      console.error('회원가입 에러', error);
    }
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
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default AuthPage;
