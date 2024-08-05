import axios from 'axios';
import { SET_AUTH, LOG_OUT } from '../types/authTypes';

// 인증 상태 설정 액션 생성자
export const setAuth = (token) => ({
  type: SET_AUTH,
  token,
});

// 로그아웃 액션 생성자
export const logOut = () => ({
  type: LOG_OUT,
});

// 로그인 비동기 액션 생성자
export const login = (credentials) => async (dispatch) => {
  try {
    const response = await axios.post('/member/signin', credentials); // 로그인 엔드포인트 수정
    dispatch(setAuth(response.data.token));
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

// 로그아웃 비동기 액션 생성자
export const logout = () => async (dispatch) => {
  try {
    await axios.put('/member/signout'); // 로그아웃 엔드포인트 수정
    dispatch(logOut());
  } catch (error) {
    console.error('Error logging out:', error);
  }
};

// Demo 로그인 액션 생성자
export const demoLogin = () => (dispatch) => {
  dispatch(setAuth('demo-token'));
};

// Demo 로그아웃 액션 생성자
export const demoLogout = () => (dispatch) => {
  dispatch(logOut());
};
