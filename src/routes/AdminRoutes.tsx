import React from 'react';
import colors from '../styles/colors';
import Admin from '../screens/TabAdmin/Admin';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePoint from '../screens/TabAdmin/CreatePoint';

const Stack = createNativeStackNavigator();

export default function AdminRoutes() {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.white },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Admin} />
      <Stack.Screen name="CreatePoint" component={CreatePoint} />
    </Stack.Navigator>
  );
}
