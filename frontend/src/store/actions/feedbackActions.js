import { Axios } from '../../util/http-commons';
import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';

const instance = Axios();

export const fetchFeedback = (oauthId) => async (dispatch) => {
  dispatch({ type: FEEDBACK_REQUEST });

  try {
    // 1. 스터디룸 정보를 가져옵니다.
    const studyRoomResponse = await instance.post('/studyRoom/search', {
      oauthId,
    });

    const studyRooms = studyRoomResponse.data;

    // 2. 스터디룸 정보를 바탕으로 각 스터디룸의 피드백을 가져옵니다.
    const feedbackPromises = studyRooms.map((room) =>
      instance
        .post('/evaluation/feedBack', {
          oauthId,
          studyRoomId: room.studyRoomId,
        })
        .then((response) => ({
          ...response.data[0],
          studyRoomTitle: room.studyRoomTitle,
          subject: room.subject,
        }))
    );

    const responses = await Promise.all(feedbackPromises);

    // 3. 피드백 데이터를 모두 합쳐서 관리합니다.
    const allFeedback = responses.flatMap((response) => response);

    console.log('All Feedback:', allFeedback);

    dispatch({ type: FEEDBACK_SUCCESS, payload: allFeedback });
  } catch (error) {
    dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
    console.error('Failed to fetch feedback:', error);
  }
};

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
