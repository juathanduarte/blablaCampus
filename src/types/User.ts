import { z } from 'zod';
import { Vehicle } from './Vehicle';

export interface User {
  registration: string;
  email: string;
  name: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  vehicles: Vehicle[];
  type: 'USER' | 'ADMIN';
}
