// store/reducers/savedRoomsReducer.js

/**
 * 저장한 스터디룸 리듀서
 * 초기 상태를 정의하고, 액션 타입에 따라 상태를 업데이트합니다.
 * SET_SAVED_ROOMS, FETCH_SAVED_ROOMS_ERROR 액션을 처리합니다.
 */

import { SET_SAVED_ROOMS } from '../types/savedRoomsTypes';

// 초기 상태 정의
const initialState = {
  data: [], // 저장한 스터디룸 데이터를 저장합니다.
  error: null, // 에러 정보를 저장합니다.
};

// 저장한 스터디룸 리듀서 정의
const savedRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    // 저장한 스터디룸 데이터 설정 액션 처리
    case SET_SAVED_ROOMS:
      return {
        ...state, // 기존 상태를 복사
        data: action.payload, // 새로운 저장한 스터디룸 데이터로 업데이트
        error: null, // 에러 상태 초기화
      };
    // 기본적으로 기존 상태를 반환
    default:
      return state;
  }
};

export default savedRoomsReducer;
