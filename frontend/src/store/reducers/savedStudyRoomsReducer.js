import {
  SET_SAVED_STUDY_ROOMS,
  SAVED_STUDY_ROOMS_SUCCESS,
  SAVED_STUDY_ROOMS_FAILURE,
} from '../types/savedStudyRoomsTypes';

// 초기 상태 정의
const initialState = {
  savedStudyRooms: [],
  loading: false,
  error: null,
};

// 저장한 스터디룸 리듀서 정의
const savedStudyRoomsReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SAVED_STUDY_ROOMS:
      return {
        ...state,
        loading: true,
      };
    case SAVED_STUDY_ROOMS_SUCCESS:
      return {
        ...state,
        savedStudyRooms: action.payload,
        loading: false,
      };
    case SAVED_STUDY_ROOMS_FAILURE:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default savedStudyRoomsReducer;
