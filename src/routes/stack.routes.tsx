import React, { useEffect, useState } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";

import colors from "../styles/colors";

const Stack = createNativeStackNavigator();

const AppRoutes: React.FC = () => {

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.background },
        headerShown: false,
      }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      {/* <Stack.Screen name="Login" component={Login} /> */}
    </Stack.Navigator>
  );
};

export default AppRoutes;
