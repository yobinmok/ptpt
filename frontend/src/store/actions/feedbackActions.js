import { Axios } from '../../util/http-commons';
import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';

const instance = Axios();

// export const fetchFeedback = (oauthId, page) => async (dispatch) => {
//   dispatch({ type: FEEDBACK_REQUEST });

//   try {
//     // oauthId 로그 확인
//     console.log('Using OAuth ID:', oauthId);

//     // 1. 스터디룸 정보를 가져옵니다.
//     const studyRoomResponse = await instance.post(
//       '/studyRoom/search',
//       { oauthId },
//       {
//         params: {
//           page: page,
//           size: 10,
//           sort: 'studyRoomId',
//         },
//       }
//     );
//     console.log('Study Room Response:', studyRoomResponse.data);

//     const studyRooms = studyRoomResponse.data.content;

//     // 2. 스터디룸 정보를 바탕으로 각 스터디룸의 피드백을 가져옵니다.
//     const feedbackPromises = studyRooms.map((room) =>
//       instance
//         .post('/evaluation/feedBack', {
//           oauthId,
//           studyRoomId: room.studyRoomId,
//         })
//         .then((response) => ({
//           ...response.data[0],
//           studyRoomTitle: room.studyRoomTitle,
//           subject: room.subject,
//           studyRoomId: room.studyRoomId,
//         }))
//     );

//     const responses = await Promise.all(feedbackPromises);

//     // 3. 피드백 데이터를 모두 합쳐서 관리합니다.
//     const allFeedback = responses.flatMap((response) => response);

//     console.log('All Feedback:', allFeedback);

//     dispatch({ type: FEEDBACK_SUCCESS, payload: allFeedback });
//   } catch (error) {
//     dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
//     console.error('Failed to fetch feedback:', error);
//   }
// };

export const fetchFeedbackDetail =
  (oauthId, studyRoomId) => async (dispatch) => {
    dispatch({ type: FEEDBACK_REQUEST });

    try {
      const response = await instance.post('/evaluation/feedBack', {
        oauthId,
        studyRoomId,
      });

      console.log('Feedback Detail Response:', response.data); // 서버로부터의 응답 데이터 확인

      dispatch({ type: FEEDBACK_SUCCESS, payload: response.data });
    } catch (error) {
      dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
      console.error('Failed to fetch feedback details:', error);
    }
  };

export const fetchFeedback = (oauthId, page) => async (dispatch) => {
  dispatch({ type: FEEDBACK_REQUEST });

  try {
    const studyRoomResponse = await instance.post(
      '/studyRoom/search',
      { oauthId },
      {
        params: {
          page: page,
          size: 10,
          sort: 'studyRoomId',
        },
      }
    );

    const studyRooms = studyRoomResponse.data.content;
    console.log('Study Room Response:', studyRooms);

    if (studyRooms.length === 0) {
      dispatch({ type: FEEDBACK_SUCCESS, payload: [] });
      return;
    }

    const feedbackPromises = studyRooms.map(async (room) => {
      const feedbackResponse = await instance.post('/evaluation/feedBack', {
        oauthId,
        studyRoomId: room.studyRoomId,
      });

      console.log(
        'Feedback Response for StudyRoomId:',
        room.studyRoomId,
        feedbackResponse.data
      );

      const feedbackData = feedbackResponse.data.map((feedback) => ({
        ...feedback,
        studyRoomTitle: room.studyRoomTitle,
        subject: room.subject,
      }));

      return feedbackData;
    });

    const allFeedback = (await Promise.all(feedbackPromises)).flat();
    console.log('All Feedback:', allFeedback);

    dispatch({ type: FEEDBACK_SUCCESS, payload: allFeedback });
  } catch (error) {
    console.error('Failed to fetch feedback:', error);
    dispatch({ type: FEEDBACK_FAILURE, payload: error.message });
  }
};
