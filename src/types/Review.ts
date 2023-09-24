import { Ride } from './Ride';
import { User } from './User';

export interface Review {
  reviewer: User;
  reviewer_registration: string;
  reviewed: User;
  reviewed_registration: string;
  carpool: Ride;
  carpool_departure_date: string;
  carpool_driver_registration: string;
  rating: string;
  comment: string;
  created_at: string;
  updated_at: string;
}
