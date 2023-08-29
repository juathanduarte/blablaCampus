import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Admin from '../screens/Admin';

import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import colors from '../styles/colors';

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.white },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
