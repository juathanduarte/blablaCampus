import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import colors from '../styles/colors';
import Welcome from '../screens/Welcome';

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
    </Stack.Navigator>
  );
};

export default AppRoutes;
