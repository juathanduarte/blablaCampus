import { Ride } from '../../types/Ride';
import { api } from '../api';

export async function getCarPoolsRequests(registration: string) {
  const { data } = await api.get(`/carpool/requests/${registration}`);
  return data.data as Ride[];
}
