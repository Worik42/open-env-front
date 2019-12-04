import { configureStore } from 'redux-starter-kit';
import { createHashHistory } from 'history';

import { createMiddleware, createReducer } from './redux';
import { configureHttp } from './http';

const history = createHashHistory();
const reducer = createReducer(history);
const middleware = createMiddleware(history);

const store = configureStore({
  reducer,
  middleware
});

const http = configureHttp(store);
export { store, http, history };
