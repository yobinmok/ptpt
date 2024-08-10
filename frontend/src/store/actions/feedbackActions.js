import { Axios } from '../../util/http-commons';
import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';

const instance = Axios();

// 전체 피드백을 가져오는 액션
export const fetchFeedback = (oauthId, studyRoomIds) => async (dispatch) => {
  dispatch({ type: FEEDBACK_REQUEST });

  try {
    // studyRoomIds 배열에 있는 모든 스터디룸의 피드백을 가져오기
    const feedbackPromises = studyRoomIds.map((studyRoomId) =>
      instance.post('/evaluation/feedBack', {
        oauthId,
        studyRoomId,
      })
    );

    const responses = await Promise.all(feedbackPromises);

    const allFeedback = responses.flatMap((response) => response.data);

    console.log('All Feedback:', allFeedback);

    dispatch({ type: FEEDBACK_SUCCESS, payload: allFeedback });
  } catch (error) {
    dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
    console.error('Failed to fetch feedback:', error);
  }
};

// 특정 스터디룸의 상세 피드백을 가져오는 액션
export const fetchFeedbackDetail =
  (oauthId, studyRoomId) => async (dispatch) => {
    dispatch({ type: FEEDBACK_REQUEST });

    try {
      const response = await instance.post('/evaluation/feedBack', {
        oauthId,
        studyRoomId,
      });

      console.log('Feedback Detail:', response.data);

      dispatch({ type: FEEDBACK_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
      console.error('Failed to fetch feedback details:', error);
    }
  };
