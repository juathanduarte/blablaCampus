import { Vehicle } from '../../types/Vehicle';
import { api } from '../api';

export async function getVehicles() {
  const { data } = await api.get('/vehicle');
  return data.data as Vehicle[];
}
