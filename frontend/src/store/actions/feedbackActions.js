import axios from 'axios';
import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';
import { Axios } from '../../util/http-commons';

// 피드백 가져오기 액션 생성자
export const fetchFeedback = (studyRoomId, oauthId) => async (dispatch) => {
  dispatch({ type: FEEDBACK_REQUEST });

  try {
    const response = await Axios().post('/evaluation/feedBack', {
      studyRoomId,
      oauthId,
    });
    console.log('Fetched feedback:', response.data); // 요청 결과 확인
    dispatch({ type: FEEDBACK_SUCCESS, payload: response.data });
  } catch (error) {
    console.error('Error fetching feedback:', error.response || error); // 에러 로그 출력
    dispatch({ type: FEEDBACK_FAILURE, error: error.response.data });
  }
};
