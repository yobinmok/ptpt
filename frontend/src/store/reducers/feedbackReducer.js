import {
  FEEDBACK_REQUEST,
  FEEDBACK_SUCCESS,
  FEEDBACK_FAILURE,
} from '../types/feedbackTypes';

const initialState = {
  loading: false,
  feedback: [],
  error: null,
};

const feedbackReducer = (state = initialState, action) => {
  switch (action.type) {
    case FEEDBACK_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case FEEDBACK_SUCCESS:
      return {
        ...state,
        loading: false,
        feedback: action.payload,
      };
    case FEEDBACK_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default feedbackReducer;
