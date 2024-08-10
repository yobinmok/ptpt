import axios from 'axios';
import {
  SET_VOICE_MODEL,
  FETCH_VOICE_MODEL_ERROR,
  UPLOAD_VOICE_MODEL_SUCCESS,
  UPLOAD_VOICE_MODEL_ERROR,
} from '../types/voiceModelTypes';

// 음성 모델 데이터 설정 액션 생성자
export const setVoiceModel = (data) => ({
  type: SET_VOICE_MODEL,
  data,
});

// 음성 모델 데이터 가져오기 비동기 액션 생성자
export const fetchVoiceModel = (oauthId) => async (dispatch) => {
  try {
    // 사용자 프로필을 조회하여 voiceModelId를 가져옵니다.
    const profileResponse = await axios.get(`/member/profile/${oauthId}`);
    const { voiceModelId } = profileResponse.data;

    // voiceModelId를 통해 음성 모델 데이터를 조회합니다.
    if (voiceModelId) {
      const voiceModelResponse = await axios.get(`/voiceModel/${voiceModelId}`);
      dispatch(setVoiceModel(voiceModelResponse.data));
    } else {
      dispatch(setVoiceModel(null));
    }
  } catch (error) {
    dispatch({
      type: FETCH_VOICE_MODEL_ERROR,
      error,
    });
    console.error('Error fetching voice model:', error);
  }
};

// 음성 모델 등록 비동기 액션 생성자
export const uploadVoiceModel = (oauthId, file) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append('file', file);

    const response = await axios.post(`/voiceModel`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    dispatch({
      type: UPLOAD_VOICE_MODEL_SUCCESS,
      data: response.data,
    });

    // 업로드 후 다시 음성 모델 데이터를 가져옵니다.
    dispatch(fetchVoiceModel(oauthId));
  } catch (error) {
    dispatch({
      type: UPLOAD_VOICE_MODEL_ERROR,
      error,
    });
    console.error('Error uploading voice model:', error);
  }
};
