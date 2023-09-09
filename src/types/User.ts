export interface User {
  registration: string;
  email: string;
  name: string;
  password: string;
  type: string;
  isBlocked: boolean;
  createdAt: Date
  updatedAt: Date
  vehicles: string;
}
