import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from '../components/Icon';
import { useAuthContext } from '../contexts/AuthContext';
import UserRoutes from './UserRoutes';

const Tab = createBottomTabNavigator();

export default function UserTabRoutes() {
  const { signOut } = useAuthContext();

  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  function handleBackToSearch() {
    navigation.goBack();
  }

  return (
    <Tab.Navigator backBehavior="history">
      <Tab.Screen
        name="Procurar Carona"
        component={UserRoutes}
        initialParams={{ initialRouteName: 'Search' }}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="search" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
      <Tab.Screen
        name="Oferecer Carona"
        component={UserRoutes}
        initialParams={{ initialRouteName: 'CreateRide' }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="plus-square-o" color={color} size={size} lib="FontAwesome" />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Mensagens"
        component={UserRoutes}
        initialParams={{ initialRouteName: 'Messages' }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="chatbox-outline" color={color} size={size} lib="IonIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="Solicitações de carona"
        component={UserRoutes}
        initialParams={{ initialRouteName: 'AskForRide' }}
        options={{
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="thumbs-up" color={color} size={size} lib="IonIcons" />
          ),
        }}
      />
      <Tab.Screen
        name="Perfil"
        component={UserRoutes}
        initialParams={{ initialRouteName: 'Profile' }}
        options={{
          headerShown: false,
          tabBarLabel: () => null,
          tabBarIcon: ({ color, size }) => (
            <Icon icon="user-o" color={color} size={size} lib="FontAwesome" />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  menuButton: {
    marginRight: 16,
  },
});
