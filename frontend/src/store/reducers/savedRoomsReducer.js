import {
  SET_SAVED_ROOMS,
  SAVED_ROOMS_SUCCESS,
  SAVED_ROOMS_FAILURE,
} from '../types/savedRoomsTypes';

// 초기 상태 정의
const initialState = {
  savedRooms: [],
  loading: false,
  error: null,
};

// 저장한 스터디룸 리듀서 정의
const savedRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAVED_ROOMS:
      return {
        ...state,
        loading: true,
      };
    case SAVED_ROOMS_SUCCESS:
      return {
        ...state,
        savedStudyRooms: action.payload,
        loading: false,
      };
    case SAVED_ROOMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default savedRoomsReducer;
