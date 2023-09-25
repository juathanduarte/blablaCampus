import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useState } from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { blockUser } from '../services/user';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Avatar from './Avatar';
import Button from './Button';

interface User {
  registration: string;
  name: string;
  urlImage?: string;
  is_blocked?: boolean;
}
interface userProps {
  user: User;
}

//todo: check on press status btn and on press perfil

export default function UserCard({ user }: userProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const queryClient = useQueryClient();

  console.log(user);

  const { mutateAsync } = useMutation({
    mutationFn: blockUser,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users'],
      });
    },
  });

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const onPressPerfil = () => {
    console.log('open perfil');
  };

  const handleUpdateIsBlocked = async () => {
    mutateAsync(user.registration);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressPerfil}>
        <View style={styles.info}>
          <Avatar
            urlImage={
              'https://thumbs.dreamstime.com/b/%C3%ADcone-do-perfil-do-placeholder-do-defeito-90197957.jpg'
            }
            size="md"
          />
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{user.name}</Text>
              <Text style={styles.textId}>{user.registration}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {user.is_blocked ? (
        <Button variant="secondary" size="medium" label="Desbloquear" onClick={toggleModal} />
      ) : (
        <Button variant="primary" size="medium" label="Bloquear" onClick={toggleModal} />
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
                  {user.is_blocked ? 'Desbloquear ' : 'Bloquear '}
                  {user.name}
                </Text>
                <View style={styles.buttonContainer}>
                  <Button
                    variant="secondary"
                    size="medium"
                    label="Cancelar"
                    onClick={toggleModal}
                  />
                  <Button
                    variant="primary"
                    size="medium"
                    label="Confirmar"
                    onClick={() => {
                      handleUpdateIsBlocked();
                    }}
                  />
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
