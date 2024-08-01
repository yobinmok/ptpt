// 액션
import { REGISTER_GUIDELINE } from '../types/solo';

// 액션 생성자(dispatch 인수로 사용)
// 혼자 하기 프리셋 업데이트 관련
export const registerGuideline = (index, newVoiceSetting) => ({
  type: REGISTER_GUIDELINE,
  payload: { index, newVoiceSetting },
});

// 스크립트
