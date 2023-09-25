import { Ride } from '../../types/Ride';
import { api } from '../api';

type RideResponse = Pick<
  Ride,
  | 'available_seats'
  | 'created_at'
  | 'departure_date'
  | 'destination_campus_name'
  | 'driver_registration'
  | 'origin_campus_name'
  | 'vehicle_plate'
>;

export async function getRides({
  origin,
  destination,
}: {
  origin: string;
  destination: string;
}): Promise<RideResponse[]> {
  const params = {
    origin,
    destination,
  };

  // encode to urlparms
  const urlParams = new URLSearchParams(params);
  const { data } = await api.get(`/carpool?${urlParams.toString()}`);

  return data.data;
}
