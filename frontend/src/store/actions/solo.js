// 액션
import {
  REGISTER_GUIDELINE,
  UPDATE_VOICESETTING,
  USE_TEMP_SCRIPT,
  UPDATE_SCRIPT,
  CREATE_SCRIPT,
  DELETE_SCRIPT,
} from '../types/solo';

// 액션 생성자(dispatch 인수로 사용)
// 혼자 하기 프리셋 업데이트 관련
export const registerGuideline = (index, guideline) => ({
  type: REGISTER_GUIDELINE,
  payload: { index, guideline },
});

export const updateVoiceSetting = (index, newVoiceSetting) => ({
  type: UPDATE_VOICESETTING,
  payload: { index, newVoiceSetting },
});

// 스크립트
export const useTempScript = (index, script) => ({
  type: USE_TEMP_SCRIPT,
  payload: { index, script },
});

export const updateScript = (index, script) => ({
  type: UPDATE_SCRIPT,
  payload: { index, script },
});

export const createScript = (index, script) => ({
  type: CREATE_SCRIPT,
  payload: { index, script },
});

export const deleteScript = (index) => ({
  type: DELETE_SCRIPT,
  index,
});
