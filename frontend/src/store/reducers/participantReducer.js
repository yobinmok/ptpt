const initialState = {
  participants: [],
  isUseParticipants: false,
  isParticipantsEval: [],
};

const participantReducer = (state = initialState, action) => {
  console.log('Action received:', action); // 액션 로그
  switch (action.type) {
    case 'USE_PARTICIPANTS':
      return {
        ...state,
        isUseParticipants: !state.isUseParticipants,
      };
    case 'SET_PARTICIPANTS':
      return {
        ...state,
        participants: action.payload,
      };

    case 'EVAL_PARTICIPANTS':
      return {
        ...state,
        isParticipantsEval: { ...action.payload },
      };
    default:
      return state;
  }
};

export default participantReducer;
