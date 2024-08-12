import { Axios } from '../../util/http-commons';
import { SET_AUTH, LOG_OUT } from '../types/authTypes';

const instance = Axios();

// 인증 상태 설정 액션 생성자
export const setAuth = (token, user) => ({
  type: SET_AUTH,
  token,
  user,
});

// 로그아웃 액션 생성자
export const logOut = () => ({
  type: LOG_OUT,
});

// -------------------- 추가된 코드 시작 --------------------

// // 쿠키에서 JWT 토큰을 가져오는 함수
// const getJwtTokenFromCookie = () => {
//   const cookieValue = document.cookie
//     .split('; ')
//     .find(row => row.startsWith('Authorization='))
//     ?.split('=')[1];
//   return cookieValue || null;
// };

// // 로그인 비동기 액션 생성자
// export const login = (credentials) => async (dispatch) => {
//   try {
//     const response = await instance.post('/member/signin', credentials); // 로그인 엔드포인트 호출

//     // 로그인 후 쿠키에서 JWT 토큰 가져오기
//     const token = getJwtTokenFromCookie(); // 쿠키에서 토큰 가져오기

//     if (token) {
//       const userInfoResponse = await instance.get('/member/me'); // 사용자 정보 요청
//       const user = userInfoResponse.data;
//       dispatch(setAuth(token, user));
//     } else {
//       console.error('JWT 토큰이 쿠키에 없습니다.');
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//   }
// };

// -------------------- 추가된 코드 끝 --------------------

// 로그인 비동기 액션 생성자
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await instance.post('/member/signin', credentials); // 로그인 엔드포인트 수정
    // const token = getJwtTokenFromCookie(); // 쿠키에서 토큰 가져오기
    const { token, user } = response.data;
    dispatch(setAuth(token, user));
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// 로그아웃 비동기 액션 생성자
export const logout = () => async (dispatch) => {
  try {
    await instance.put('/member/signout'); // 로그아웃 엔드포인트 수정
    dispatch(logOut());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Demo 로그인 액션 생성자
export const demoLogin = () => (dispatch) => {
  const demoUser = { oauthId: 'demo-oauth-id', nickname: 'Demo User' };
  dispatch(setAuth('demo-token', demoUser));
};

// Demo 로그아웃 액션 생성자
export const demoLogout = () => (dispatch) => {
  dispatch(logOut());
};

// kakao 로그아웃 비동기 액션 생성자
export const kakaoLogout = (accessToken) => async (dispatch) => {
  try {
    await instance.post('/member/signout/kakao', { accessToken }); // 엔드포인트
    dispatch(logOut());
  } catch (error) {
    console.error('Error kakao logout', error);
  }
};

// Google 로그아웃 비동기 액션 생성자
export const googleLogout = () => async (dispatch) => {
  try {
    dispatch(logOut());
    console.log('Google logout');
  } catch (error) {
    console.error('Google logout error', error);
  }
};
