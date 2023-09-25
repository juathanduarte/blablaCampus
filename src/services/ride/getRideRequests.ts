import { Passenger } from '../../types/Passengers';
import { Ride } from '../../types/Ride';
import { api } from '../api';

export async function getMyRequests(): Promise<Passenger[]> {
  const { data, config } = await api.get('/carpool/requests');
  return data.data;
}
