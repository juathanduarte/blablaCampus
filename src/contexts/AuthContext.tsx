import React, { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';

import { User } from '../types/User';
import { api } from '../services/api';
import {
  BLABLACAMPUS_ACCESS_TOKEN_KEY,
  BLABLACAMPUS_REFRESH_TOKEN_KEY,
  BLABLACAMPUS_VIEW_AS,
} from '../constants/keys';
import { me } from '../services/user';
import { getAsyncStorage, removeAsyncStorage, setAsyncStorage } from '../utils/AsyncStorage';

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

  const [signedIn, setSignedIn] = useState<boolean>(false);

  useEffect(() => {
    async function getStoredData() {
      const storedAccessToken = await getAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY });
      setSignedIn(!!storedAccessToken);
    }
    getStoredData();
  }, []);

  const { data, isSuccess, isFetching } = useQuery({
    queryKey: ['users', 'me'],
    queryFn: me,
    staleTime: Infinity,
    enabled: signedIn,
  });

  const signIn = useCallback(async (accessToken: string, refreshToken: string) => {
    await setAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY, value: accessToken });
    await setAsyncStorage({ key: BLABLACAMPUS_REFRESH_TOKEN_KEY, value: refreshToken });

    api.defaults.headers.common.Authorization = `Bearer ${accessToken}`;

    setSignedIn(true);
  }, []);

  const signOut = useCallback(async () => {
    await removeAsyncStorage({ key: BLABLACAMPUS_ACCESS_TOKEN_KEY });
    await removeAsyncStorage({ key: BLABLACAMPUS_REFRESH_TOKEN_KEY });

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
