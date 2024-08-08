import { SET_SAVED_ROOMS } from '../types/savedRoomsTypes';

// 저장한 스터디룸 데이터 설정 액션 생성자
export const setSavedRooms = (data) => ({
  type: SET_SAVED_ROOMS,
  payload: data,
});
