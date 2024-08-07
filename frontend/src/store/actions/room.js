import { SET_ROOM_SESSION, CLEAR_ROOM_SESSION } from '../types/room';
import {
  TOGGLE_SIDEBAR,
  SELECT_TAB,
  CLEAR_TAB,
  TOGGLE_SCRIPT_SELECT,
  EVALUATE_ANONYMOUS,
  IS_START_PRESANTATION,
  PRESENTATION_TIME,
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

const isStartPresantation = (flag) => {
  return {
    type: IS_START_PRESANTATION,
    flag,
  };
};

const setPresentationTime = (time) => {
  return {
    type: PRESENTATION_TIME,
    payload: time,
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
  isStartPresantation,
  setPresentationTime,
};
