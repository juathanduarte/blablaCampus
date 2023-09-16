import React from 'react';

import { zodResolver } from '@hookform/resolvers/zod';
import { Controller, useForm } from 'react-hook-form';
import { SafeAreaView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import HeaderNav from '../../components/HeaderNav';
import Input from '../../components/Input';
import { CreateCarSchema, createCarSchema } from '../../schemas';

export default function CreateCar({ navigation }: any) {
  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<CreateCarSchema>({
    resolver: zodResolver(createCarSchema),
  });

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

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="Cadastrar Veículo" navigation={navigation} />
      {/* <ScrollView> */}
      <View style={styles.content}>
        <Controller
          control={control}
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
          name="marca"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
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
          name="modelo"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
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
          name="placa"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
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
          name="renavam"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
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
          name="ano"
          rules={{ required: true }}
          defaultValue=""
        />

        <Controller
          control={control}
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
          name="cor"
          rules={{ required: true }}
          defaultValue=""
        />

        <Button onClick={handleAdd} label="Cadastrar" variant="primary" size="large" />
      </View>
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
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
