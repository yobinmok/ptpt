import axios from 'axios';

// Axios 인스턴스를 생성하여 기본 설정 지정
const instance = axios.create({
  baseURL: 'http://localhost:8080', // 백엔드 서버 주소
  headers: {
    'Content-Type': 'application/json',
  },
});

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
