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
        name="Oferecer Carona"
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
          headerRight: () => (
            <>
              <TouchableOpacity onPress={toggleModal} style={styles.menuButton}>
                <Icon lib="IonIcons" icon="ellipsis-vertical" size={22} />
              </TouchableOpacity>
              <Modal
                visible={isModalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={toggleModal}
              >
                <TouchableWithoutFeedback onPress={toggleModal}>
                  <View style={styles.modalContainer}>
                    <TouchableWithoutFeedback>
                      <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}></Text>
                        <View style={styles.buttonContainer}>
                          <Button
                            variant="secondary"
                            size="medium"
                            label="Sair"
                            onClick={signOut}
                          />
                        </View>
                      </View>
                    </TouchableWithoutFeedback>
                  </View>
                </TouchableWithoutFeedback>
              </Modal>
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
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },

  modalContent: {
    backgroundColor: 'white',
    padding: 32,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },

  modalTitle: {
    fontSize: 24,
    fontFamily: fonts.text_medium,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 32,
  },
});
