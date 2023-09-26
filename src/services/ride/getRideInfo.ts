import { CollegeSpot } from '../../types/CollegeSpot';
import { Passenger } from '../../types/Passengers';
import { Ride } from '../../types/Ride';
import { User } from '../../types/User';
import { Vehicle } from '../../types/Vehicle';
import { api } from '../api';

export interface IRideInfo {
  driver: User;
  origin_campus: CollegeSpot;
  destination_campus: CollegeSpot;
  passengers: Passenger[];
  vehicle: Vehicle;
  departure_date: string;
  destination_campus_name: string;
  driver_registration: string;
  origin_campus_name: string;
  vehicle_plate: string;
}

export async function getRideInfo({
  registration,
  departureDate,
}: {
  registration: string;
  departureDate: string;
}): Promise<IRideInfo> {
  const { data } = await api.get(`/carpool/${registration}/${departureDate}`);
  return data;
}
