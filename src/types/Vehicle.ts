import { User } from './User';

export interface Vehicle {
  plate: string;
  brand: string;
  model: string;
  color: string;
  reindeer: string;
  chassis: string;
  year: number;
  seats: number;
  created_at: Date;
  updated_at: Date;
  user: User;
  user_registration: string;
}
