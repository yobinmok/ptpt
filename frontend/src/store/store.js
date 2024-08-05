// store/store.js
import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk'; // ES6 방식으로 redux-thunk 가져오기
import rootReducer from './reducers';
import { persistStore } from 'redux-persist';

const store = createStore(rootReducer, applyMiddleware(thunk)); // Redux Thunk 미들웨어 추가
export const persistor = persistStore(store);
export default store;
