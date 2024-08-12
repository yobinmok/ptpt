import {
  CHECK_PARTICIPANTS,
  SET_PARTICIPANTS,
  USE_PARTICIPANTS,
  EVAL_PARTICIPANTS,
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

const isParticipantsEval = (nickname) => {
  return {
    type: EVAL_PARTICIPANTS,
    payload: nickname,
  };
};

export { setParticipants, useParticipants, isParticipantsEval };
