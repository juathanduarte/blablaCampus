import React, { createContext, ReactNode, useCallback, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { User } from '../types/User';
import { api } from '../services/api';
import {
  BLABLACAMPUS_ACCESS_TOKEN_KEY,
  BLABLACAMPUS_REFRESH_TOKEN_KEY,
  BLABLACAMPUS_VIEW_AS,
} from '../constants/keys';
import { me } from '../services/user';

export type AuthContextData = {
  user?: User;
  signedIn: boolean;
  signIn: (accessToken: string, refreshToken: string) => void;
  signOut: () => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const queryClient = useQueryClient();

  const [signedIn, setSignedIn] = useState<boolean>(() => {
    const storedAccessToken = localStorage.getItem(BLABLACAMPUS_ACCESS_TOKEN_KEY);
    return !!storedAccessToken;
  });

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: me,
    staleTime: Infinity,
    enabled: signedIn,
  });

  const signIn = useCallback((accessToken: string, refreshToken: string) => {
    localStorage.setItem(BLABLACAMPUS_ACCESS_TOKEN_KEY, accessToken);
    localStorage.setItem(BLABLACAMPUS_REFRESH_TOKEN_KEY, refreshToken);

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    setSignedIn(true);
  }, []);

  const signOut = useCallback(() => {
    localStorage.removeItem(BLABLACAMPUS_ACCESS_TOKEN_KEY);
    localStorage.removeItem(BLABLACAMPUS_REFRESH_TOKEN_KEY);

    api.defaults.headers.common.Authorization = undefined;

    setSignedIn(false);
    queryClient.removeQueries();
    sessionStorage.removeItem(BLABLACAMPUS_VIEW_AS);
  }, [queryClient]);

  const contextValues = useMemo(
    () => ({
      user: data,
      signedIn: isSuccess && signedIn,
      signIn,
      signOut,
    }),

    [data, isSuccess, signedIn, signIn, signOut]
  );
  return (
    <AuthContext.Provider value={contextValues}>{!isFetching && children}</AuthContext.Provider>
  );
}
