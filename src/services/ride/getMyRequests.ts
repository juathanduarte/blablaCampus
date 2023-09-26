import { Ride } from '../../types/Ride';
import { api } from '../api';

export async function getCarPools(registration: string) {
  const { data } = await api.get(`/carpool/requests/${registration}`);

  return data.data as Ride[];
}
