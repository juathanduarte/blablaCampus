import { z } from 'zod';
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
  user: User;
  user_registration: string;
}
