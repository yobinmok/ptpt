import axios from 'axios';
import {
  SET_SAVED_ROOMS,
  FETCH_SAVED_ROOMS_ERROR,
} from '../types/savedRoomsTypes';

// 저장한 스터디룸 데이터 설정 액션 생성자
export const setSavedRooms = (data) => ({
  type: SET_SAVED_ROOMS,
  data,
});

// 저장한 스터디룸 데이터 가져오기 비동기 액션 생성자
export const fetchSavedRooms = (oauthId) => async (dispatch) => {
  try {
    // 사용자 프로필을 조회하여 studyRoomId
    const profileResponse = await axios.get(`/member/profile/${oauthId}`);
    const { studyRoomId } = profileResponse.data;

    // studyRoomId를 통해 저장한 스터디룸 데이터 조회
    if (studyRoomId) {
      const roomsResponse = await axios.get(`/study-room/${studyRoomId}`);
      dispatch(setSavedRooms(roomsResponse.data));
    } else {
      dispatch(setSavedRooms([]));
    }
  } catch (error) {
    dispatch({
      type: FETCH_SAVED_ROOMS_ERROR,
      error,
    });
    console.error('Error fetching saved rooms:', error);
  }
};
