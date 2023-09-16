import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import HeaderNav from '../../components/HeaderNav';
import Input from '../../components/Input';
import { CreateCarSchema, createCarSchema } from '../../schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  createVehicle,
  isChassesAvailable,
  isPlateAvailable,
  isReindeerAvailable,
} from '../../services/vehicles/createVehicle';
import { useNavigation } from '@react-navigation/native';

export default function CreateCar() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<CreateCarSchema>({
    mode: 'onBlur',
    resolver: zodResolver(createCarSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: createVehicle,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['users', 'me'],
      });
      navigation.goBack();
    },
    onError: (error: any) => {},
  });

  const onSubmit = async () => {
    const vehicle = {
      brand: getValues('brand'),
      model: getValues('model'),
      plate: getValues('plate'),
      chassis: getValues('chassis'),
      reindeer: getValues('reindeer'),
      color: getValues('color'),
      year: Number(getValues('year')),
      seats: Number(getValues('seats')),
    };

    await mutateAsync(vehicle);
  };

  // Verifica placa disponível
  const { mutateAsync: mutateIsPlateAvailable } = useMutation({
    mutationFn: isPlateAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('plate', { message: 'Placa já cadastrada' });
      if (!exists && errors.plate) setError('plate', { message: '' });
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
      if (!exists && errors.chassis) setError('chassis', { message: '' });
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
    <SafeAreaView style={styles.container}>
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
            />
          )}
        />

        <Controller
          control={control}
          name="year"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Ano"
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
              onblur={onBlur}
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
            />
          )}
        />
        <Controller
          control={control}
          name="seats"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Lugares"
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
              onblur={onBlur}
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    paddingHorizontal: 32,
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
