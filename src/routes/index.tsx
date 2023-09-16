import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';

import { useAuthContext } from '../contexts/AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BLABLACAMPUS_ACCESS_TOKEN_KEY, BLABLACAMPUS_REFRESH_TOKEN_KEY } from '../constants/keys';
import { me } from '../services/user';
import UserTabRoutes from './user.tabs.routes';
import AdminRoutes from './AdminRoutes';
import StackLoginRoutes from './login.stack.routes';

const Routes = () => {
  const { signIn, signedIn, user } = useAuthContext();
  async function hasSignedUser() {
    const accessToken = await AsyncStorage.getItem(BLABLACAMPUS_ACCESS_TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(BLABLACAMPUS_REFRESH_TOKEN_KEY);
    if (!accessToken || !refreshToken) return;

    try {
      const user = await me();
      signIn(accessToken, refreshToken);
    } catch (e: any) {
      console.log('error');
    }
  }

  useEffect(() => {
    hasSignedUser();
  }, []);

  return (
    <NavigationContainer>
      {!signedIn ? (
        <StackLoginRoutes />
      ) : user?.type === 'ADMIN' ? (
        <AdminRoutes />
      ) : (
        <UserTabRoutes />
      )}
    </NavigationContainer>
  );
};

export default Routes;
