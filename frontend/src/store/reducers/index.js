import { combineReducers } from 'redux';
import user from './userReducer.js';
import room from './roomReducer.js';
import solo from './soloReducer.js';
import participantReducer from './participantReducer.js';
import authReducer from './authReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

// persistConfig를 통해 저장할 상태 설정
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'user', 'room', 'participant'], // 저장할 상태만 선택
};

// persistReducer를 적용한 리듀서
const rootReducer = combineReducers({
  auth: authReducer,
  user,
  room,
  solo, // solo는 persistReducer로 감싸지 않음
  participant: participantReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

export default function combinedReducer(state, action) {
  // soloReducer는 persistReducer를 적용하지 않으므로
  // state와 action을 combinedReducer로 전달합니다.
  return rootReducer(state, action);
}
