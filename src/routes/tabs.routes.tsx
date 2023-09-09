import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from '../components/Icon';
import AcceptRideRequest from '../screens/TabUser/AcceptRideRequest';
import CreateRide from '../screens/TabUser/CreateRide';
import Messages from '../screens/TabUser/Messages';
import Profile from '../screens/TabUser/Profile';
import Search from '../screens/TabUser/Search';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="search" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
      <Tab.Screen
        name="CreateRide"
        component={CreateRide}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="plus-square-o" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
      <Tab.Screen
        name="Messages"
        component={Messages}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="chatbox-outline" color={color} size={size} lib="IonIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="Solicitações de carona"
        component={AcceptRideRequest}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="thumbs-up" color={color} size={size} lib="IonIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="user-o" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
