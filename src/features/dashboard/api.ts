import { http } from '../../services';
import { API_BASE_URL } from '../../services/http';

export const createOrganisation = async (
  name: string,
  positionLat: number,
  positionLon: number,
  description: string,
) => {
  try {
    const data = await http(`${API_BASE_URL}/api/admin`, {
      method: 'PUT',
      body: JSON.stringify({
        name,
        position: [{latitude: Number(positionLat) , longitude: Number(positionLon) }],
        description: [ description ],
      })
    });

    return data;
  } catch (error) {
    throw error;
  }
};
