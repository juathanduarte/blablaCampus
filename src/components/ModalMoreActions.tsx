import React from 'react';
import { Modal, TouchableWithoutFeedback, View, StyleSheet } from 'react-native';
import fonts from '../styles/fonts';
import Button from './Button';
import { useAuthContext } from '../contexts/AuthContext';

interface ModalMoreActionsProps {
  isVisible: boolean;
  toggleModal: () => void;
}

const ModalMoreActions = ({ isVisible, toggleModal }: ModalMoreActionsProps) => {
  const { signOut } = useAuthContext();

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      transparent={true}
      onRequestClose={toggleModal}
    >
      <TouchableWithoutFeedback onPress={toggleModal}>
        <View style={styles.modalContainer}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContent}>
              <View style={styles.buttonContainer}>
                <Button variant="secondary" size="medium" label="Sair" onClick={signOut} />
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ModalMoreActions;

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
