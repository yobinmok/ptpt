import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducers'; // rootReducer 사용
import { persistStore } from 'redux-persist';

const store = createStore(rootReducer, applyMiddleware(thunk));
export const persistor = persistStore(store);
export default store;
