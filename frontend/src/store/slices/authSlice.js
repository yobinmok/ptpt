import { createSlice } from '@reduxjs/toolkit';

// 초기 상태에는 사용자 인증 상태(isAuthenticated), OAuth 고유 ID(oauth_id), 사용자 정보(user)를 포함합니다.
const initialState = {
  isAuthenticated: false, // 사용자가 인증되었는지 여부
  oauth_id: null, // OAuth 고유 ID (Google 또는 Kakao)
  user: null, // 사용자 정보 (예: 이름, 프로필 사진 등)
};

// createSlice 함수 = 슬라이스 정의, 'auth' 슬라이스 정의
const authSlice = createSlice({
  name: 'auth', // 슬라이스 이름, 액션 타입 생성할 때 사용
  initialState, // 슬라이스 초기 상태
  reducers: {
    // 로그인 액션
    // 로그인 시 호출되며, 인증 상태를 true로 설정하고, oauth_id와 사용자 정보를 상태에 저장합니다.
    login(state, action) {
      state.isAuthenticated = true; // 사용자가 인증되었음을 설정
      state.oauth_id = action.payload.oauth_id; // OAuth 고유 ID를 상태에 저장
      state.user = action.payload.user; // 사용자 정보를 상태에 저장
    },
    // 로그아웃 액션
    // 로그아웃 시 호출되며, 인증 상태를 false로 설정하고, oauth_id와 사용자 정보를 초기화합니다.
    logout(state) {
      state.isAuthenticated = false; // 인증 상태를 해제
      state.oauth_id = null; // OAuth 고유 ID를 초기화
      state.user = null; // 사용자 정보를 초기화
    },
  },
});

// 액션 생성자를 내보냅니다. 컴포넌트에서 로그인과 로그아웃을 처리할 때 사용됩니다.
export const { login, logout } = authSlice.actions;

// 리듀서 export. 루트 리듀서에 추가하여 사용
export default authSlice.reducer;
