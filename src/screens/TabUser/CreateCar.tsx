import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import HeaderNav from '../../components/HeaderNav';
import Input from '../../components/Input';
import { CreateCarSchema, createCarSchema } from '../../schemas';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createVehicle } from '../../services/vehicles/createVehicle';
import { useNavigation } from '@react-navigation/native';

export default function CreateCar() {
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const {
    handleSubmit,
    control,
    getValues,

    formState: { errors, isDirty },
  } = useForm<CreateCarSchema>({
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
    onError: (error: any) => {
      console.log(Object.keys(error));
      console.log(error?.response);
    },
  });

  const onSubmit = async () => {
    const vehicle = {
      brand: getValues('brand'),
      model: getValues('model'),
      plate: getValues('plate'),
      chassis: getValues('chassis'),
      reindeer: getValues('reindeer'),
      year: Number(getValues('year')),
      color: getValues('color'),
      seats: Number(getValues('seats')),
    };
    await mutateAsync(vehicle);
  };

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
              onChange={(value: string) => onChange(value)}
              value={value}
              error={error?.message}
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
              onChange={(value) => onChange(value)}
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
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
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
              onChange={(value) => onChange(value)}
              value={value}
              error={error?.message}
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
            />
          )}
        />

        <Button
          disabled={!isDirty || Object.keys(errors).length > 0}
          onClick={onSubmit}
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
