import { CollegeSpot } from './CollegeSpot';
import { Review } from './Review';
import { User } from './User';
import { Vehicle } from './Vehicle';

export interface Ride {
  origin_campus: CollegeSpot;
  origin_campus_name: string;
  destination_campus: CollegeSpot;
  destination_campus_name: string;
  departure_date: string;
  driver: User;
  driver_registration: string;
  vehicle: Vehicle;
  vehicle_plate: string;
  passengers: string;
  available_seats: string;
  reviews: Review[];
  created_at: string;
  updated_at: string;
}
