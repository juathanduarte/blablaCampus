import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  AcceptRideRequest,
  CreateRide,
  History,
  Messages,
  Profile,
  Search,
} from '../screens/TabUser';

import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

const TabUserRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.white },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="CreateRide" component={CreateRide} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="Solicitações de carona" component={AcceptRideRequest} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="History" component={History} />
    </Stack.Navigator>
  );
};

export default TabUserRoutes;
