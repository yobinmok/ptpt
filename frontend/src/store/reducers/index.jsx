import { combineReducers } from 'redux';
import user from './user.jsx';
import room from './room.jsx';
import solo from './solo.jsx';
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
