import { combineReducers } from 'redux';
import user from './userReducer.js';
import room from './roomReducer.js';
import solo from './soloReducer.js';
import authReducer from './authReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'uInfo',
  storage: storageSession,
};
const reducer = combineReducers({
  auth: authReducer,
  user,
  room,
  solo,
});

// export default reducer;
export default persistReducer(persistConfig, reducer);
