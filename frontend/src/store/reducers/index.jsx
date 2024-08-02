import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
import user from './user.jsx';
import room from './room.jsx';
import solo from './solo.jsx';
import authReducer from './authReducer';

const persistConfig = {
  key: 'uInfo',
  storage: storageSession,
};
const reducer = combineReducers({
  user,
  room,
  solo,
  auth: authReducer,
});

export default persistReducer(persistConfig, reducer);
