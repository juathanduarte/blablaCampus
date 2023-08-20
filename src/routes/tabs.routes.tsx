import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Search from '../screens/Search';
import History from '../screens/History';
import CreateRide from '../screens/CreateRide';
import Messages from '../screens/Messages';
import Profile from '../screens/Profile';
import Icon from '../components/Icon';

const Tab = createBottomTabNavigator();

export default function TabRoutes() {
  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
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
