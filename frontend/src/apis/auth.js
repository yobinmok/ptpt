import axios from 'axios';
import { Axios } from '../util/http-commons';
const { VITE_API_URL } = import.meta.env;

const instance = Axios();

// authorization code를 사용하여 백엔드에서 access token과 id token을 요청
// 구글 로그인 요청 함수
export const googleSignin = async (code) => {
  try {
    const response = await instance.post('/member/signin/google', {
      authorizationCode: code,
    });
    return response.data;
  } catch (error) {
    console.error('Error during Google sign-in:', error);
    throw error;
  }
};

// 구글 액세스 토큰을 검증하는 함수
export const verifyGoogleAccessToken = async (accessToken) => {
  try {
    const response = await instance.post('/member/auth/google', {
      accessToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error during Google access token verification:', error);
    throw error;
  }
};

// 카카오 로그인 요청 함수
export const kakaoSignin = async (code) => {
  try {
    const response = await instance.post('/member/signin/kakao', {
      authorizationCode: code,
    });
    return response.data;
  } catch (error) {
    console.error('Error during Kakao sign-in:', error);
    throw error;
  }
};

// 카카오 액세스 토큰을 검증하는 함수
export const verifyKakaoAccessToken = async (accessToken) => {
  try {
    const response = await instance.post('/member/auth/kakao', {
      accessToken,
    });
    return response.data;
  } catch (error) {
    console.error('Error during Kakao access token verification:', error);
    throw error;
  }
};

// 프로필 조회 함수
export const getProfile = async (oauthId) => {
  try {
    const response = await instance.get('/member/profile', {
      params: {
        oauthId,
      },
    });
    console.log('Profile response:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error fetching profile:', error);
    throw error;
  }
};

// 회원 정보 수정 함수
export const updateProfile = async (profileData) => {
  try {
    const response = await instance.put('/member/modify', profileData);
    return response.data;
  } catch (error) {
    console.error('업데이트 프로필 에러', error);
    throw error;
  }
};
