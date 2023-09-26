import { User } from '../../types/User';
import { api } from '../api';

export async function getVisitUser(registration: string): Promise<User> {
  const { data } = await api.get(`/users/${registration}`);
  return data;
}
