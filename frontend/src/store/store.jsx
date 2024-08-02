import { createStore, applyMiddleware } from 'redux';
// import { composeWithDevTools } from "redux-devtools-extension";
// import thunk from "redux-thunk";
import reducer from './reducers';
import { persistStore } from 'redux-persist';

// const enhancer = composeWithDevTools(applyMiddleware(thunk));
// const store = createStore(reducer, enhancer);
const store = createStore(reducer);
export const persistor = persistStore(store);
export default store;
