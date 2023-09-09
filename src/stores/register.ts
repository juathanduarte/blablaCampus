import { create } from 'zustand';
import { User } from '../types/User';

type RegisterUser = Pick<User, 'name' | 'email' | 'registration'> & { password: string };

type RegisterStore = {
  user: RegisterUser;
  setUser: (user: RegisterUser) => void;
};

export const useRegisterStore = create<RegisterStore>((set) => ({
  user: { name: '', email: '', registration: '', password: '' },
  setUser: (user: RegisterUser) => set({ user }),
}));
