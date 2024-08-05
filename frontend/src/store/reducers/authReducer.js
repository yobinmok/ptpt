/**
 * 인증 리듀서
 * 초기 상태를 정의하고, 액션 타입에 따라 상태를 업데이트합니다.
 * SET_AUTH, LOG_OUT 액션을 처리합니다.
 */

import { SET_AUTH, LOG_OUT } from '../types/authTypes';

// 초기 상태 정의
const initialState = {
  isAuthenticated: false, // 사용자 인증 상태를 나타냅니다.
  token: null, // 인증 토큰을 저장합니다.
};

// 인증 리듀서 정의
const authReducer = (state = initialState, action) => {
  switch (action.type) {
    // 인증 상태 설정 액션 처리
    case SET_AUTH:
      return {
        ...state, // 기존 상태를 복사
        isAuthenticated: true, // 인증 상태를 true로 변경
        token: action.token, // 새로운 토큰으로 업데이트
      };
    // 로그아웃 액션 처리
    case LOG_OUT:
      return {
        ...state, // 기존 상태를 복사
        isAuthenticated: false, // 인증 상태를 false로 변경
        token: null, // 토큰을 초기화
      };
    // 기본적으로 기존 상태를 반환
    default:
      return state;
  }
};

export default authReducer;
