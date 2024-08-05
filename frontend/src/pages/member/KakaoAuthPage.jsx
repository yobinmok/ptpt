import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  kakaoSignin,
  verifyKakaoAccessToken,
  getProfile,
} from '../../apis/auth';
import { setAuth } from '../../store/actions/authActions';
import UserInfoModal from '../../components/organisms/UserInfoModal';

const KakaoAuthPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [authCode, setAuthCode] = useState(null);
  const [token, setToken] = useState(null);
  const [tokenVerified, setTokenVerified] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
                dispatch(setAuth({ oauth_id: data.oauth_id, user: data.user }));
                // 프로필 조회를 통해 기존 회원 여부 확인
                getProfile(data.oauth_id)
                  .then((profile) => {
                    if (profile) {
                      navigate('/'); // 기존 회원은 메인 페이지로 리디렉트
                    } else {
                      setShowModal(true); // 신규 회원은 모달창 띄우기
                    }
                  })
                  .catch((error) => {
                    console.error('Error fetching profile:', error);
                    setShowModal(true); // 오류가 발생해도 모달창 띄우기
                  });
              }
            }
          );
        })
        .catch((error) => {
          console.error('Error during Kakao sign-in:', error);
        });
    }
  }, [location, dispatch, navigate]);

  const handleModalSubmit = (nickname, voiceModel) => {
    // 여기에 추가 정보를 서버로 전송하는 로직을 추가합니다.
    // axios.post('/api/userinfo', { nickname, voiceModel })
    //   .then(response => {
    //     navigate('/'); // 정보 입력 후 메인 페이지로 리디렉트
    //   })
    //   .catch(error => {
    //     console.error('Error submitting user info:', error);
    //   });

    navigate('/'); // 임시로 메인 페이지로 이동하도록 설정
  };

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
      <UserInfoModal
        showModal={showModal}
        setShowModal={setShowModal}
        handleSubmit={handleModalSubmit}
      />
    </div>
  );
};

export default KakaoAuthPage;
