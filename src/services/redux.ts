import { getDefaultMiddleware, combineReducers } from 'redux-starter-kit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { History } from 'history';

import auth from '../features/auth/reducer';

function createReducer(history: History) {
  return combineReducers({ auth, router: connectRouter(history) });
}

function createMiddleware(history: History) {
  return [...getDefaultMiddleware(), routerMiddleware(history)];
}

export { createReducer, createMiddleware };
