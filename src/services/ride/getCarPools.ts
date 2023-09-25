import { Ride } from '../../types/Ride';
import { api } from '../api';

export async function getCarPools(registration: any) {
  const { data } = await api.get(`/carpool/${registration}`);

  console.log(data);

  return data.data as Ride[];
}
