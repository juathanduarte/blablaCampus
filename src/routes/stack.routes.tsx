import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import Admin from '../screens/Admin';
import AdminLogin from '../screens/AdminLogin';
import ChangePassword from '../screens/ChangePassword';
import CreatePoint from '../screens/CreatePoint';
import ForgotPassword from '../screens/ForgotPassword';
import Login from '../screens/Login';
import Register from '../screens/Register';
import VerifyCode from '../screens/VerifyCode';
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
      <Stack.Screen name="AdminLogin" component={AdminLogin} />
      <Stack.Screen name="CreatePoint" component={CreatePoint} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="VerifyCode" component={VerifyCode} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};

export default AppRoutes;
