const initialState = {
  participants: [],
  isUseParticipants: false,
};

const participantReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'USE_PARTICIPANTS':
      return {
        ...state,
        isUseParticipants: !state.isUseParticipants,
      };
    case 'SET_PARTICIPANTS':
      return {
        ...state,
        ...action.data,
      };
    default:
      return {
        ...state,
      };
  }
};

export default participantReducer;
