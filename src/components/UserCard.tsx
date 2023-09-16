import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Button from './Button';
import fonts from '../styles/fonts';

interface User {
  id: string;
  name: string;
  urlImage: string;
  status: 'active' | 'inactive';
}
interface userProps {
  user: User;
}

//todo: check on press status btn and on press perfil

export default function UserCard({ user }: userProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onPressPerfil = () => {
    console.log('open perfil');
  };

  const onPressStatusBtn = () => {
    console.log('open modal');
    console.log('change status');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressPerfil}>
        <View style={styles.info}>
          <Avatar urlImage={user.urlImage} size="md" />
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{user.name}</Text>
              <Text style={styles.textId}>{user.id}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {user.status === 'active' ? (
        <Button variant="primary" size="medium" label="Bloquear" onClick={toggleModal} />
      ) : (
        <Button variant="secondary" size="medium" label="Desbloquear" onClick={toggleModal} />
      )}

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
                <Text style={styles.modalTitle}>
                  {user.status == 'active' ? 'Bloquear ' : 'Desbloquear '}
                  {user.name}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button variant="secondary" size="medium" label="Cancelar" />
                  <Button variant="primary" size="medium" label="Confirmar" />
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.title,
  },
  textId: {
    fontSize: 13,
    color: colors.detail,
    fontWeight: 'normal',
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
