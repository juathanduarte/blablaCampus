import { Passenger } from './Passengers';
import { Review } from './Review';
import { Ride } from './Ride';
import { Vehicle } from './Vehicle';

export interface User {
  registration: string;
  email: string;
  name: string;
  isBlocked: boolean;
  review_average: number;
  createdAt: Date;
  updatedAt: Date;
  vehicles: Vehicle[];
  type: 'USER' | 'ADMIN';
  driver_carpools: Ride[];
  passengers_carpools: Passenger[];
  reviews_made: Review[];
  reviews_received: Review[];
}
