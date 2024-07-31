import { createStore } from "redux";

const initialState = {
  sessionName: null,
  roomId: null,
  isSidebarOpen: false,
  selectedTab: null,
};

const roomReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ROOM_SESSION":
      return {
        // ...state,
        ...action.data,
      };
    case "CLEAR_ROOM_SESSION":
      return {
        // ...state,
        sessionName: null,
        roomId: null,
      };
    case "TOGGLE_SIDEBAR":
      return {
        ...state,
        isSidebarOpen: !state.isSidebarOpen,
      };
    case "SELECT_TAB":
      return {
        ...state,
        selectedTab: action.payload,
      };
    case "CLEAR_TAB":
      return {
        ...state,
        selectedTab: null,
      };
    default:
      return{
        ...state,
      };
  };
};

// export const store = createStore

export default roomReducer;
