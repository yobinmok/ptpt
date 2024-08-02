import { combineReducers } from 'redux';
import user from './userReducer.js';
import room from './roomReducer.js';
import solo from './soloReducer.js';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

const persistConfig = {
  key: 'uInfo',
  storage: storageSession,
};
const reducer = combineReducers({
  user,
  room,
  solo,
});

// export default reducer;
export default persistReducer(persistConfig, reducer);
