import { CollegeSpot } from './CollegeSpot';
import { Passenger } from './Passengers';
import { Review } from './Review';
import { User } from './User';
import { Vehicle } from './Vehicle';

export interface Ride {
  available_seats: string;
  created_at: string;
  departure_date: string;
  destination_campus_name: string;
  driver_registration: string;
  origin_campus_name: string;
  vehicle_plate: string;

  origin_campus: CollegeSpot;
  destination_campus: CollegeSpot;
  driver: User;
  vehicle: Vehicle;
  passengers: Passenger[];
  reviews: Review[];
  updated_at: string;
}
