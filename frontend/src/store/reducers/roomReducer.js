const initialState = {
  sessionName: null,
  roomId: null,
  isSidebarOpen: false,
  selectedTab: null,
  isSelectScriptTab: true,
  editFlag: null,
  isAnonymous: 0,
  isStart: false, // false : 진행 전 혹은 종료?, true : 진행 중
  presentationTime: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_ROOM_SESSION':
      return {
        ...state,
        ...action.data,
      };
    case 'CLEAR_ROOM_SESSION':
      return {
        // ...state,
        sessionName: null,
        roomId: null,
      };
    case 'TOGGLE_SIDEBAR':
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case 'SELECT_TAB':
      return {
        ...state,
        selectedTab: action.payload,
      };
    case 'CLEAR_TAB':
      return {
        ...state,
        selectedTab: null,
      };
    case 'TOGGLE_SCRIPT_SELECT':
      return {
        ...state,
        editFlag: action.flag,
        isSelectScriptTab: !state.isSelectScriptTab,
      };
    case 'EVALUATE_ANONYMOUS':
      return {
        ...state,
        isAnonymous: action.payload,
      };
    case 'IS_START_PRESANTATION':
      return {
        ...state,
        isStart: !state.isStart,
      };
    case 'PRESENTATION_TIME':
      return {
        ...state,
        presentationTime: action.payload,
      };
    default:
      return {
        ...state,
      };
  }
};

// export const store = createStore

export default roomReducer;
