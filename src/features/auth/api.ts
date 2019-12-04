import { http } from '../../services';
import { API_BASE_URL, saveToken } from '../../services/http';

export const login = async (username: string, password: string) => {
  try {
    const data = await http(`${API_BASE_URL}/api/auth`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    });

    await saveToken('access', data.body.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const createUser = async (
  username: string,
  password: string,
) => {
  try {
    const data = await http(`${API_BASE_URL}/api/signup`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      })
    });

    return data;
  } catch (error) {
    throw error;
  }
};
