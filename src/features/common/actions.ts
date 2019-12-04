import { createAction } from 'redux-starter-kit';

export const setAuth = createAction<boolean>('Auth/SET_AUTH');

/**
 * Profile actions
 */
export const getListProfiles = createAction('Profile/GET_LIST_PFOFILES');
