import { RegisterSchema } from '../../schemas';
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

export async function registerUserWithCode({
  user,
  code,
}: {
  user: RegisterSchema;
  code: string;
}): Promise<{
  accessToken: string;
  refreshToken: string;
}> {
  const { data } = await api.post('/users', {
    ...user,
    code,
  });

  return data;
}

export const isEmailAvailable = async (email: string): Promise<{ exists: boolean }> => {
  const { data } = await api.post(`/users/is-email-available`, {
    email,
  });
  return { exists: Boolean(data?.exists) };
};

export const isRegistrationAvailable = async (
  registration: string
): Promise<{ exists: boolean }> => {
  console.log(registration);
  const { data } = await api.post(`/users/is-registration-available`, {
    registration,
  });
  console.log(data);
  return { exists: Boolean(data?.exists) };
};
