import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
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
import { deleteCollegeSpot } from '../services/collegespot';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import { CollegeSpot } from '../types/CollegeSpot';
import Button from './Button';

interface TravelPointCardProps {
  name: string;
  address: string;
  spot: CollegeSpot;
}

export default function TravelPointCard({ name, address, spot }: TravelPointCardProps) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { mutateAsync } = useMutation({
    mutationFn: deleteCollegeSpot,
    onSuccess: () => {
      toggleModal();
      queryClient.invalidateQueries(['spots']);
    },
  });

  async function handleDelete() {
    await mutateAsync(name);
  }

  async function handleEdit() {
    // @ts-ignore
    navigation.navigate('CreatePoint', { data: spot });
  }

  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View>
          <Text style={styles.fieldLabel}>Nome:</Text>
          <Text style={styles.fieldValue}>{name}</Text>
        </View>
        <View>
          <Text style={styles.fieldLabel}>Endereço:</Text>
          <Text style={styles.fieldValue}>{address}</Text>
        </View>
        <TouchableOpacity style={styles.iconContainer} onPress={toggleModal}>
          <Ionicons name="ellipsis-vertical" size={24} color={colors.gray} />
        </TouchableOpacity>
      </View>

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
                <Text style={styles.modalTitle}>{name}</Text>
                <View style={styles.buttonContainer}>
                  <Button
                    variant="secondary"
                    size="medium"
                    label="Excluir"
                    onClick={handleDelete}
                  />
                  <Button variant="primary" size="medium" label="Editar" onClick={handleEdit} />
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
  cardContainer: {
    backgroundColor: 'transparent',
    borderRadius: 8,
  },

  cardContent: {
    backgroundColor: 'white',
    padding: 8,
    borderWidth: 1,
    borderColor: colors.primary,
    borderRadius: 8,
  },

  fieldLabel: {
    fontSize: 10,
    fontFamily: fonts.text_medium,
    color: colors.primary,
  },

  fieldValue: {
    fontSize: 14,
    fontFamily: fonts.text_medium,
  },

  iconContainer: {
    position: 'absolute',
    right: 16,
    top: 16,
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
