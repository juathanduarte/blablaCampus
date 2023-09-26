import { Vehicle } from '../../types/Vehicle';
import { api } from '../api';

export async function getVehicles(registration?: string) {
  if (!registration) throw new Error('Registration is required');

  console.log('getVehicles', registration);

  const { data } = await api.get(`/vehicle/user/${registration}`);
  return data.data as Vehicle[];
}
