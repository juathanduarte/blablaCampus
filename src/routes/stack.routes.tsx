import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Admin from '../screens/Admin';
import CreatePoint from '../screens/CreatePoint';
import Login from '../screens/Login';
import Welcome from '../screens/Welcome';
import VerifyCode from '../screens/VerifyCode';
import colors from '../styles/colors';
import ChangePassword from '../screens/ChangePassword';
import ForgotPassword from '../screens/ForgotPassword';

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
      <Stack.Screen name="CreatePoint" component={CreatePoint} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
