import { User } from '../../types/User';
import { api } from '../api';

export async function registerUser(user: User) {
  const { data } = await api.post<User>('/users', user);

  return data;
}

export async function registerTemporarilyUser(user: Pick<User, 'email' | 'name'>) {
  const JSONUser = JSON.stringify({
    email: user.email,
    name: user.name,
  });
  const { data } = await api.post('/users/create-user-register-code', JSONUser, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return data;
}
