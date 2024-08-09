import { Axios } from '../../util/http-commons';
import {
  SET_SAVED_STUDY_ROOMS,
  SAVED_STUDY_ROOMS_SUCCESS,
  SAVED_STUDY_ROOMS_FAILURE,
} from '../types/savedStudyRoomsTypes';
const instance = Axios();

// 저장한 스터디룸 데이터 설정 액션 생성자
export const fetchSavedStudyRooms = (oauthId) => async (dispatch) => {
  dispatch({ type: SET_SAVED_STUDY_ROOMS });

  try {
    const response = await instance.post('/studyRoom/search', { oauthId });
    dispatch({
      type: SAVED_STUDY_ROOMS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    dispatch({
      type: SAVED_STUDY_ROOMS_FAILURE,
      payload: error.message,
    });
  }
};

export const setSavedStudyRooms = (rooms) => ({
  type: SET_SAVED_STUDY_ROOMS,
  payload: rooms,
});
