import { User } from '../../types/User';
import { api } from '../api';

export async function me(): Promise<User> {
  const { data } = await api.get<User>('/users/me');

  return data;
}
