import React from 'react';

import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import HeaderNav from '../../components/HeaderNav';
import { CollegeSpot } from '../../types/CollegeSpot';
import { collegeSpotSchema } from '../../schemas/collegeSpot';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createCollegeSpot, isNameAvailable } from '../../services/collegespot';
import { useNavigation } from '@react-navigation/native';

export default function CreatePoint() {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    // navigation.navigate('Detail');
    console.log('Detail');
  };

  const handleAdd = () => {
    console.log('Add');
    navigation.navigate('Admin');
  };

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<CollegeSpot>({
    mode: 'onBlur',
    resolver: zodResolver(collegeSpotSchema),
  });

  // Verifica se nome está disponível
  const { mutateAsync: mutateIsNameAvailable } = useMutation({
    mutationFn: isNameAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('name', { message: 'Nome já cadastrado' });
      if (!exists && errors.name) clearErrors('name');
    },
  });
  function checkIsNameAvailable() {
    if (!errors.name) return;
    mutateIsNameAvailable(getValues('name'));
  }

  const { mutateAsync } = useMutation({
    mutationFn: createCollegeSpot,
    onSuccess: () => {
      // TODO: Invalidate query spots
      queryClient.invalidateQueries({
        queryKey: ['points'],
      });
      navigation.goBack();
    },
    onError: (error: any) => {
      console.log(error?.response);
    },
  });

  function onsubmit() {
    const spot = getValues();
    mutateAsync(spot);
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="Novo Ponto" navigation={navigation} />
      {/* <ScrollView> */}
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 20, marginBottom: 30 }}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Nome"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
              onblur={() => {
                onBlur();
                if (isDirty) checkIsNameAvailable();
              }}
            />
          )}
        />
        <Controller
          control={control}
          name="cep"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="CEP"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="state"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Estado"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="city"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Cidade"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="neighborhood"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Bairro"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="street"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Loradouro"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="number"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Número"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Controller
          control={control}
          name="complement"
          rules={{ required: true }}
          defaultValue=""
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              label="Complemento"
              onChange={(value) => {
                onChange(value);
              }}
              value={value}
              error={error?.message}
            />
          )}
        />
        <Button onClick={handleSubmit(onsubmit)} label="Cadastrar" variant="primary" size="large" />
      </ScrollView>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: 24,
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
    flexDirection: 'column',
    paddingBottom: 20,
    gap: 20,
  },
});
