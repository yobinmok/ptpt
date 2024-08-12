import { Axios } from '../../util/http-commons';
import { SET_AUTH, LOG_OUT, SET_OAUTH_ID } from '../types/authTypes';

const instance = Axios();

// 인증 상태 설정 액션 생성자
export const setAuth = (token, user) => ({
  type: SET_AUTH,
  token,
  user,
});

// oauthId 설정 액션 생성자
export const setOauthId = (oauthId) => ({
  type: SET_OAUTH_ID,
  oauthId,
});

// 로그아웃 액션 생성자
export const logOut = () => ({
  type: LOG_OUT,
});

// 로그인 비동기 액션 생성자
export const login = (credentials) => async (dispatch) => {
  try {
    // 로그인 요청 및 응답으로 토큰과 사용자 정보를 받음
    const response = await instance.post('/member/signin', credentials); // 로그인 엔드포인트 호출
    console.log('Login response:'); // 응답 데이터 확인

    const { token, user } = response.data;

    // 토큰과 사용자 정보가 존재하는지 확인
    if (token && user) {
      dispatch(setAuth(token, user));
    } else {
      console.error('User data or token is missing in the response.');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// 로그아웃 비동기 액션 생성자
export const logout = () => async (dispatch) => {
  try {
    await instance.post('/member/signout'); // 로그아웃 엔드포인트 호출
    dispatch(logOut()); // Redux 상태에서 사용자 정보 제거
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
