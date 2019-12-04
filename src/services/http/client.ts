import {
  configureRefreshFetch,
  fetchJSON,
  IResponseError,
  IResponse
} from 'refresh-fetch';

import { API_BASE_URL } from './config';
import { setAuth } from './actions';
import { retrieveToken, saveToken, clearToken } from './storage';
import { Store } from 'redux';

export async function fetchWithToken<T>(
  url: RequestInfo,
  config?: RequestInit
): Promise<IResponse<T>> {
  const token = retrieveToken('access');

  let configWithToken: RequestInit = config || {};

  if (token !== null) {
    configWithToken = Object.assign({}, config, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  }

  return fetchJSON<T>(url, configWithToken).catch(error => {
    if (error.message === 'Network request failed') {
      console.error(error);
    }

    throw error;
  });
}

function shouldRefreshToken(error: IResponseError) {
  if (error.response === undefined || error.status === undefined) {
    return false;
  }

  return error.status === 401;
}

function refreshToken(store: Store) {
  return async function() {
    const refreshToken = retrieveToken('refresh');
    try {
      const response = await fetchJSON(`${API_BASE_URL}/user/access`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json; charset=utf-8'
        },
        body: JSON.stringify({
          refresh_token: refreshToken
        })
      });
      saveToken('access', response.body.token);
    } catch (error) {
      clearToken('access');
      store.dispatch(setAuth(false));
      throw error;
    }
  };
}

export function configureHttp(store: any) {
  return configureRefreshFetch({
    fetch: fetchWithToken,
    shouldRefreshToken,
    refreshToken: refreshToken(store)
  });
}
