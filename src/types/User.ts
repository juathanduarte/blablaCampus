export interface User {
  registration: string;
  email: string;
  name: string;
  type: string;
  isBlocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  vehicles: string;
}
