import { Ride } from '../../types/Ride';
import { api } from '../api';

export async function getRides({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}): Promise<Ride[]> {
  const params = {
    origin,
    destination,
  };

  // encode to urlparms
  const urlParams = new URLSearchParams(params);
  const { data } = await api.get(`/carpool?${urlParams.toString()}`);
  return data.data;
}
