import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import {
  AcceptRideRequest,
  CreateCar,
  CreateRide,
  History,
  Messages,
  Profile,
  Search,
} from '../screens/TabUser';
import Chat from '../screens/TabUser/Chat';
import RideInformations from '../screens/TabUser/RideInformations';
import Assessments from '../screens/TabUser/Assessments';
import CreateAssessment from '../screens/TabUser/CreateAssessment';
import RequestRide from '../screens/TabUser/RequestRide';
import colors from '../styles/colors';
import { Screen } from 'react-native-screens';

const Stack = createNativeStackNavigator();

interface UserRoutesProps {
  initialRouteName: 'Search' | 'CreateRide' | 'Messages' | 'AskForRide' | 'Profile' | 'History';
  route?: {
    params: {
      initialRouteName: 'Search' | 'CreateRide' | 'Messages' | 'AskForRide' | 'Profile' | 'History';
    };
  };
}

const UserRoutes = ({ route }: any) => {
  const { initialRouteName } = route.params;

  return (
    <Stack.Navigator
      screenOptions={{
        contentStyle: { backgroundColor: colors.white },
        headerShown: false,
      }}
      initialRouteName={initialRouteName}
    >
      <Stack.Screen name="Search" component={Search} />
      <Stack.Screen name="CreateRide" component={CreateRide} />
      <Stack.Screen name="Messages" component={Messages} />
      <Stack.Screen name="AskForRide" component={AcceptRideRequest} />
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="CreateCar" component={CreateCar} />
      <Stack.Screen name="CreateAssessment" component={CreateAssessment} />
      <Stack.Screen name="Assessments" component={Assessments} />
      <Stack.Screen name="RideInformations" component={RideInformations} />
      <Stack.Screen name="RequestRide" component={RequestRide} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  );
};

export default UserRoutes;
