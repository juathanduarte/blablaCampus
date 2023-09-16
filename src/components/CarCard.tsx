import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  TouchableWithoutFeedback,
} from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from './Icon';
import Button from './Button';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { deleteVehicle } from '../services/vehicles';
import { Vehicle } from '../types/Vehicle';
import { useNavigation } from '@react-navigation/native';

interface CarProps {
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
  car: Vehicle;
  seats: number;
}

export default function CarCard({ brand, model, year, plate, color, car }: CarProps) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = React.useState(false);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  const { mutateAsync: mutationDelete } = useMutation({
    mutationFn: deleteVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries(['myVehicles']);
      toggleModal();
    },
    onError: (e) => {
      console.log(e);
    },
  });

  function handleDelete() {
    mutationDelete(plate);
  }

  function handleEdit() {
    // @ts-ignore
    navigation.navigate('CreateCar', { data: car });
  }

  return (
    <View style={styles.container}>
      <View style={styles.nav}>
        <View>
          <Text style={styles.title}>Marca / Modelo:</Text>
          <Text style={styles.content}>
            {brand} {model}
          </Text>
        </View>
        <TouchableOpacity onPress={toggleModal}>
          <Text>
            <Icon icon="ellipsis-vertical" lib="IonIcons" size={22} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detail}>
        <View>
          <Text style={styles.title}>Ano:</Text>
          <Text style={styles.content}>{year}</Text>
        </View>
        <View>
          <Text style={styles.title}>Placa:</Text>
          <Text style={styles.content}>{plate}</Text>
        </View>
        <View>
          <Text style={styles.title}>Cor:</Text>
          <Text style={styles.content}>{color}</Text>
        </View>
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
                <Text style={styles.modalTitle}>
                  {brand} - {model}
                </Text>
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
  container: {
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 24,
    boxShadow: '0px 8px 25px 0px rgba(83, 89, 144, 0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    color: colors.title,
    fontWeight: '500',
    fontFamily: fonts.text_medium,
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  nav: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
