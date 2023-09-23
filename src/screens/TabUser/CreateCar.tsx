import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import { ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import HeaderNav from '../../components/HeaderNav';
import Input from '../../components/Input';
import { CreateCarSchema, createCarSchema } from '../../schemas';
import { editVehicle } from '../../services/vehicles';
import {
  createVehicle,
  isChassesAvailable,
  isPlateAvailable,
  isReindeerAvailable,
} from '../../services/vehicles/createVehicle';
import { Vehicle } from '../../types/Vehicle';

interface RouteProp<T> {
  route: {
    params: {
      data: T;
    };
  };
}

export default function CreateCar(route: RouteProp<Vehicle>) {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const editCar = route?.route?.params?.data;

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<CreateCarSchema>({
    defaultValues: editCar,
    mode: 'onSubmit',
    resolver: zodResolver(createCarSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myVehicles'],
      });
      navigation.goBack();
    },
    onError: (error: any) => {},
  });

  const { mutateAsync: editMutate } = useMutation({
    mutationFn: editVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['myVehicles'],
      });
      navigation.goBack();
    },
  });

  const onSubmit = async () => {
    const vehicle = {
      brand: getValues('brand'),
      model: getValues('model'),
      plate: getValues('plate'),
      chassis: getValues('chassis'),
      reindeer: getValues('reindeer'),
      color: getValues('color'),
      year: getValues('year'),
      seats: getValues('seats'),
    };

    if (editCar) {
      await editMutate({ vehicle, oldPlate: editCar.plate });
      return;
    }

    await mutateAsync(vehicle);
  };

  // Verifica placa disponível
  const { mutateAsync: mutateIsPlateAvailable } = useMutation({
    mutationFn: isPlateAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('plate', { message: 'Placa já cadastrada' });
      if (!exists && errors.plate) clearErrors('plate');
    },
  });
  function isPlateAvailableHandler() {
    mutateIsPlateAvailable(getValues('plate'));
  }

  // Verifica chassi
  const { mutateAsync: mutateIsChassisAvailable } = useMutation({
    mutationFn: isChassesAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('chassis', { message: 'Chassi já cadastrado' });
      if (!exists && errors.chassis) clearErrors('chassis');
    },
  });
  function isChassisAvailableHandler() {
    mutateIsChassisAvailable(getValues('chassis'));
  }

  // Verifica reindeer
  const { mutateAsync: mutateIsReindeerAvailable } = useMutation({
    mutationFn: isReindeerAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('reindeer', { message: 'Renavam já cadastrado' });
      if (!exists && errors.reindeer) clearErrors('reindeer');
    },
  });
  function isReindeerAvailableHandler() {
    mutateIsReindeerAvailable(getValues('reindeer'));
  }

  return (
    <View style={styles.container}>
      <HeaderNav title="Cadastrar Veículo" navigation={navigation} />
      {/* <ScrollView> */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 20, marginBottom: 30 }}
      >
        <Controller
          control={control}
          name="brand"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Marca"
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
              onblur={onBlur}
              defaultValue={editCar?.brand || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="model"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Modelo"
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
              onblur={onBlur}
              defaultValue={editCar?.model || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="plate"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Placa"
              onChange={(value) => {
                setError('plate', { message: '' });
                onChange(value);
              }}
              onblur={() => {
                onBlur();
                if (isDirty) isPlateAvailableHandler();
              }}
              value={value}
              error={error?.message}
              defaultValue={editCar?.plate || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="chassis"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Chassi"
              onChange={(value) => {
                setError('chassis', { message: '' });
                onChange(value);
              }}
              value={value}
              error={error?.message}
              onblur={() => {
                onBlur();
                if (isDirty) isChassisAvailableHandler();
              }}
              defaultValue={editCar?.chassis || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="reindeer"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Renavam"
              onChange={(value) => {
                setError('reindeer', { message: '' });
                onChange(value);
              }}
              value={value}
              error={error?.message}
              onblur={() => {
                onBlur();
                if (isDirty) isReindeerAvailableHandler();
              }}
              defaultValue={editCar?.reindeer || ''}
            />
          )}
        />

        <Controller
          control={control}
          name="year"
          rules={{ required: true }}
          defaultValue={0}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Ano"
              onChange={(value) => onChange(Number(value))}
              value={String(value)}
              error={error?.message}
              onblur={onBlur}
              defaultValue={(editCar?.year && String(editCar?.year)) || ''}
              inputNumber
            />
          )}
        />

        <Controller
          control={control}
          name="color"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Cor"
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
              onblur={onBlur}
              defaultValue={editCar?.color || ''}
            />
          )}
        />
        <Controller
          control={control}
          name="seats"
          rules={{ required: true }}
          defaultValue={0}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Lugares"
              onChange={(value) => onChange(Number(value))}
              value={String(value)}
              error={error?.message}
              onblur={onBlur}
              defaultValue={(editCar?.seats && String(editCar?.seats)) || ''}
              inputNumber
            />
          )}
        />

        <Button
          // disabled={Object.keys(errors).length > 0}
          onClick={handleSubmit(onSubmit)}
          label="Cadastrar"
          variant="primary"
          size="large"
        />
      </ScrollView>
      {/* </ScrollView> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 7,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 20,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
  },
  content: {
    width: '100%',
    height: '100%',
  },
  input: {
    marginBottom: 25,
  },
});
