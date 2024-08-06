import { combineReducers } from 'redux';
import user from './userReducer.js';
import room from './roomReducer.js';
import solo from './soloReducer.js';
import authReducer from './authReducer';
import { persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';

// persistConfig를 통해 저장할 상태 설정
const persistConfig = {
  key: 'root',
  storage: storageSession,
  whitelist: ['auth', 'user', 'room'], // 저장할 상태만 선택
};

// persistReducer를 적용한 리듀서
const rootReducer = combineReducers({
  auth: authReducer,
  user,
  room,
  solo, // solo는 persistReducer로 감싸지 않음
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

// combinedReducer는 persistReducer를 적용한 리듀서를 반환하도록 수정
export default function combinedReducer(state, action) {
  return persistedReducer(state, action);
}
