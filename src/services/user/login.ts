import { api } from '../api';

export async function login({ email, password }: { email: string; password: string }) {
  const { data } = await api.post('/auth/signin', { email, password });
  return data;
}
