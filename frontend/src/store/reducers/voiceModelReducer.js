// store/reducers/voiceModelReducer.js

/**
 * 음성 모델 리듀서
 * 초기 상태를 정의하고, 액션 타입에 따라 상태를 업데이트합니다.
 * SET_VOICE_MODEL, FETCH_VOICE_MODEL_ERROR, UPLOAD_VOICE_MODEL_SUCCESS, UPLOAD_VOICE_MODEL_ERROR 액션을 처리합니다.
 */

import {
  SET_VOICE_MODEL,
  FETCH_VOICE_MODEL_ERROR,
  UPLOAD_VOICE_MODEL_SUCCESS,
  UPLOAD_VOICE_MODEL_ERROR,
} from '../types/voiceModelTypes';

// 초기 상태 정의
const initialState = {
  data: null, // 음성 모델 데이터를 저장합니다.
  error: null, // 에러 정보를 저장합니다.
};

// 음성 모델 리듀서 정의
const voiceModelReducer = (state = initialState, action) => {
  switch (action.type) {
    // 음성 모델 데이터 설정 액션 처리
    case SET_VOICE_MODEL:
      return {
        ...state, // 기존 상태를 복사
        data: action.data, // 새로운 음성 모델 데이터로 업데이트
        error: null, // 에러 상태 초기화
      };
    // 음성 모델 데이터 가져오기 에러 처리
    case FETCH_VOICE_MODEL_ERROR:
    case UPLOAD_VOICE_MODEL_ERROR:
      return {
        ...state, // 기존 상태를 복사
        error: action.error, // 에러 상태 업데이트
      };
    case UPLOAD_VOICE_MODEL_SUCCESS:
      return {
        ...state, // 기존 상태를 복사
        data: action.data, // 새로운 음성 모델 데이터로 업데이트
        error: null, // 에러 상태 초기화
      };
    // 기본적으로 기존 상태를 반환
    default:
      return state;
  }
};

export default voiceModelReducer;
