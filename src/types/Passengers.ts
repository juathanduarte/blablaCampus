import { Ride } from './Ride';
import { User } from './User';

export interface Passenger {
  carpool: Ride;
  carpool_departure_date: string;
  carpool_driver_registration: string;
  passenger: User;
  passenger_registration: string;
  is_accepted: boolean;
}
