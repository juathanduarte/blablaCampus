import React, { useEffect } from 'react';

import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';

import Button from '../../components/Button';
import Input from '../../components/Input';

import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Controller, useForm } from 'react-hook-form';
import HeaderNav from '../../components/HeaderNav';
import { collegeSpotSchema } from '../../schemas/collegeSpot';
import {
  createCollegeSpot,
  editCollegeSpot,
  getSpotInfoByCEP,
  isNameAvailable,
} from '../../services/collegespot';
import { CollegeSpot } from '../../types/CollegeSpot';

interface RouteProp<T> {
  route: {
    params: {
      data: T;
    };
  };
}

export default function CreatePoint(route: RouteProp<CollegeSpot>) {
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const editSpot = route?.route?.params?.data;

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CollegeSpot>({
    defaultValues: editSpot,
    mode: 'onBlur',
    resolver: zodResolver(collegeSpotSchema),
  });

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

  const { mutateAsync: mutateEditCollegeSpot } = useMutation({
    mutationFn: editCollegeSpot,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spots'],
      });
      navigation.goBack();
    },
    onError: (error: any) => {
      console.log(error?.response);
    },
  });

  const { mutateAsync, isLoading: isLoadingCreate } = useMutation({
    mutationFn: createCollegeSpot,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['spots'],
      });
      navigation.goBack();
    },
    onError: (error: any) => {
      console.log(error?.response);
    },
  });

  const { mutateAsync: mutateGetCepInfo, isLoading: isLoadingCEP } = useMutation({
    mutationFn: getSpotInfoByCEP,
    onSuccess: (data) => {
      const { bairro, localidade, logradouro, uf } = data;
      setValue('state', uf);
      setValue('city', localidade);
      setValue('neighborhood', bairro);
      setValue('street', logradouro);
    },
    onError: (error: any) => {
      console.log(error?.response);
    },
  });

  useEffect(() => {
    if (watch('cep').length == 8) {
      mutateGetCepInfo(getValues('cep'));
    }
  }, [watch('cep')]);

  function onsubmit() {
    const newSpot = getValues();

    if (editSpot) {
      return mutateEditCollegeSpot({
        collegeSpot: newSpot,
        previousName: editSpot.name,
      });
    }
    mutateAsync(newSpot);
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderNav title="Cadastrar / Editar ponto" navigation={navigation} />
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ flexGrow: 1, gap: 20, marginBottom: 30 }}
      >
        <Controller
          control={control}
          name="name"
          rules={{ required: true }}
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => {
            return (
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
                defaultValue={editSpot?.name || value || ''}
              />
            );
          }}
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
              defaultValue={editSpot?.cep || value || ''}
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
              defaultValue={editSpot?.state || value || ''}
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
              defaultValue={editSpot?.city || value || ''}
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
              defaultValue={editSpot?.neighborhood || value || ''}
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
              defaultValue={editSpot?.street || value || ''}
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
              defaultValue={editSpot?.number || value || ''}
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
              defaultValue={editSpot?.complement || value || ''}
            />
          )}
        />
        <Button
          onClick={handleSubmit(onsubmit)}
          label="Cadastrar"
          variant="primary"
          size="large"
          disabled={!isDirty || Object.keys(errors).length > 0 || isLoadingCreate || isLoadingCEP}
          isLoading={isLoadingCreate || isLoadingCEP}
        />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    paddingHorizontal: 24,
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
    padding: 24,
  },
});
