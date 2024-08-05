import {
  CHECK_PARTICIPANTS,
  SET_PARTICIPANTS,
  USE_PARTICIPANTS,
} from '../types/participant';

const setParticipants = (data) => {
  return {
    type: SET_PARTICIPANTS,
    payload: data,
  };
};

const useParticipants = () => {
  return {
    type: USE_PARTICIPANTS,
  };
};

export { setParticipants, useParticipants };
