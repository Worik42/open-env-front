import {http} from '../../services';
import {API_BASE_URL} from '../../services/http';

export const createOrganisation = async (
    name: string,
    positionLat: number,
    positionLon: number,
    description: string,
) => {
  try {
    const data = await http(`${API_BASE_URL}/api/admin`, {
      method: 'POST',
      body: JSON.stringify({
        name,
        position: [{latitude: positionLat , longitude: positionLon }],
        description: [ description ],
      })
    });

    return data;
  } catch (error) {
    throw error;
  }
};

export const getPositions = async () => {
  try {
    const data = await http(`${API_BASE_URL}/api/map`)
    return data;
  } catch (error) {
    throw error;
  }
}