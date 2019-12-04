
import { ACCESS_TOKEN, REFRESH_TOKEN } from './config';

export function retrieveToken(type: 'access' | 'refresh') {
  return localStorage.getItem(
    type === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN
  );
}

export function saveToken(type: 'access' | 'refresh', token: string) {
  return localStorage.setItem(
    type === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN,
    token
  );
}

export function clearToken(type: 'access' | 'refresh') {
  return localStorage.removeItem(
    type === 'access' ? ACCESS_TOKEN : REFRESH_TOKEN
  );
}
