import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react';
import Icon from '../components/Icon';
import AcceptRideRequest from '../screens/TabUser/AcceptRideRequest';
import CreateRide from '../screens/TabUser/CreateRide';
import Messages from '../screens/TabUser/Messages';
import Profile from '../screens/TabUser/Profile';
import Search from '../screens/TabUser/Search';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useAuthContext } from '../contexts/AuthContext';
import Button from '../components/Button';
import fonts from '../styles/fonts';
import ModalMoreActions from '../components/ModalMoreActions';
import UserRoutes from './UserRoutes';

const Tab = createBottomTabNavigator();

export default function UserTabRoutes() {
  const { signOut } = useAuthContext();

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
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
        }}
      />
      <Tab.Screen
        name="Messages"
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
          headerRight: () => (
            <>
              <TouchableOpacity onPress={toggleModal} style={styles.menuButton}>
                <Icon lib="IonIcons" icon="ellipsis-vertical" size={22} />
              </TouchableOpacity>
              <ModalMoreActions isVisible={isModalVisible} toggleModal={toggleModal} />
            </>
          ),
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
