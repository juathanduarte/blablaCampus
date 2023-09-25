import { User } from '../../types/User';
import { api } from '../api';

export async function blockUser(registration: string): Promise<void> {
  console.log('registration', registration);
  const { data } = await api.put(`/users/${registration}/update-is-blocked`, {
    registration: registration,
  });

  return data;
}

export async function getUsers(): Promise<User[]> {
  const { data } = await api.get('/users');

  return data.data;
}
