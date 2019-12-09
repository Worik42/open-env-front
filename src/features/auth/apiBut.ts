import { http } from '../../services';
import { API_BASE_URL, saveToken } from '../../services/http';

export const login = async (name: string, position : double, description : string) => {
  try {
    const data = await http(`${API_BASE_URL}/api/dashboard`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        position,
        description,
      })
    });

    await saveToken('access', data.body.token);

    return data;
  } catch (error) {
    throw error;
  }
};

export const createOrganisation = async (
  name: string,
  position: double,
  description: string,
) => {
  try {
    const data = await http(`${API_BASE_URL}/api/signup`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        position,
        description,
      })
    });

    return data;
  } catch (error) {
    throw error;
  }
};
