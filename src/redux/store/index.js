import { createStore, applyMiddleware, compose } from 'redux';
import rootReducer from '../reducers';

const tool = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(rootReducer, tool(applyMiddleware()));

export default store;
