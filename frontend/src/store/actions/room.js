import { SET_ROOM_SESSION, CLEAR_ROOM_SESSION } from '../types/room';
import {
  TOGGLE_SIDEBAR,
  SELECT_TAB,
  CLEAR_TAB,
  TOGGLE_SCRIPT_SELECT,
  EVALUATE_ANONYMOUS,
} from '../types/room';

const toggleScriptSelect = (flag) => ({
  type: TOGGLE_SCRIPT_SELECT,
  flag,
});

const setRoomSession = (data) => {
  return {
    type: SET_ROOM_SESSION,
    data,
  };
};

const clearRoomSession = () => {
  return {
    type: CLEAR_ROOM_SESSION,
  };
};

const toggleSidebar = () => {
  return {
    type: TOGGLE_SIDEBAR,
  };
};

const selectTab = (index) => {
  return {
    type: SELECT_TAB,
    payload: index,
  };
};

const clearTab = () => {
  return {
    type: CLEAR_TAB,
  };
};

const setAnonymous = (isAnonymous) => {
  return {
    type: EVALUATE_ANONYMOUS,
    payload: isAnonymous,
  };
};

export {
  setRoomSession,
  clearRoomSession,
  toggleSidebar,
  selectTab,
  clearTab,
  toggleScriptSelect,
  setAnonymous,
};
