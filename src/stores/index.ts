import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';
import reducer from './reducer';
const store = createStore(reducer, applyMiddleware(reduxThunk));
export type RootState = ReturnType<typeof reducer>;
export default store;
