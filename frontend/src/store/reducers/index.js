import { combineReducers } from 'redux';
import userReducer from './userReducer';
import authReducer from './authReducer';
// import roomReducer from './roomReducer';
// import soloReducer from './soloReducer';
import room from './roomReducer.js';
import solo from './soloReducer.js';
import evaluationReducer from './evaluationReducer';
import savedRoomsReducer from './savedRoomsReducer';
import voiceModelReducer from './voiceModelReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'uInfo',
  storage: storageSession,
};

const reducer = combineReducers({
  auth: authReducer,
  user: userReducer,
  room: room,
  solo: solo,
  evaluation: evaluationReducer,
  savedRooms: savedRoomsReducer,
  voiceModel: voiceModelReducer,
});

export default persistReducer(persistConfig, reducer);
