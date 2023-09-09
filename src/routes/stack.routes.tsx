import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import Welcome from '../screens/Welcome';
import colors from '../styles/colors';
import {
  Login,
  AdminLogin,
  ForgotPassword,
  ChangePassword,
  VerifyCode,
  Register,
} from '../screens/AuthStack';
import { FormProvider, useForm } from 'react-hook-form';

const Stack = createNativeStackNavigator();

const StackLoginRoutes: React.FC = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.white },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
    </Stack.Navigator>
  );
};

export default StackLoginRoutes;
