import { Ride } from './Ride';

export interface CollegeSpot {
  name: string;
  cep: string;
  state: string;
  city: string;
  neighborhood: string;
  street: string;
  number: string;
  complement: string;
  created_at: string;
  updated_at: string;
  carpool_origin: Ride;
  carpool_destination: Ride;
}
