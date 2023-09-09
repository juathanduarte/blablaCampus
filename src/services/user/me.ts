import { api } from '../api';

export async function me() {
  const { data } = await api.get('/users/me');
  return data;
}
