import DateTimePicker from '@react-native-community/datetimepicker';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import HeaderNav from '../../components/HeaderNav';
import Select from '../../components/Select';
import fonts from '../../styles/fonts';
import Input from '../../components/Input';
import { CreateCarpool, createCarpool } from '../../schemas/createRide';
import { createCarSchema } from '../../schemas';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { date } from 'zod';
import { getVehicles } from '../../services/vehicles';
import { useQuery } from '@tanstack/react-query';
import { getCollegeSpots } from '../../services/collegespot';

export default function CreateRide() {
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [openTimePicker, setOpenTimePicker] = useState(false);

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['myVehicles'],
    queryFn: getVehicles,
  });

  const { data: collegeSpots } = useQuery({
    queryKey: ['spots'],
    queryFn: getCollegeSpots,
  });

  const {
    handleSubmit,
    control,
    getValues,
    setError,
    watch,
    clearErrors,
    setValue,
    formState: { errors, isDirty },
  } = useForm<CreateCarpool>({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: zodResolver(createCarpool),
  });

  function onSubmit() {
    const values = getValues();

    console.log(values);
  }

  useEffect(() => {
    setValue('time', new Date(new Date().getTime() + 1800000));
    setValue('day', new Date());
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <HeaderNav title="Oferecer Carona" navigation={navigation} />
      <ScrollView
        style={{
          paddingBottom: 36,
        }}
      >
        <Text style={styles.title}>Partida</Text>
        <Select
          error={errors.originCampusName?.message}
          onChange={(value, itemIndex) => {
            setValue('originCampusName', value);
            clearErrors('originCampusName');
          }}
          values={
            collegeSpots?.map((spot) => {
              return {
                label: spot.name,
                value: spot.name,
              };
            }) || [
              {
                label: 'Nenhum local cadastrado',
                value: 'Nenhum local cadastrado',
              },
            ]
          }
          selectedValue={getValues('originCampusName')}
          placeholder="Escolha o local de Partida"
        />

        <Text style={styles.title}>Destino</Text>
        <Select
          error={errors.destinationCampusName?.message}
          onChange={(value, itemIndex) => {
            setValue('destinationCampusName', value);
            clearErrors('destinationCampusName');
          }}
          values={
            collegeSpots?.map((spot) => {
              return {
                label: spot.name,
                value: spot.name,
              };
            }) || [
              {
                label: 'Nenhum local cadastrado',
                value: 'Nenhum local cadastrado',
              },
            ]
          }
          selectedValue={getValues('destinationCampusName')}
          placeholder="Escolha o local de Destino"
        />

        <Text style={styles.title}>Data</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenDatePicker(true);
          }}
        >
          <Input label={new Date(getValues('day')).toLocaleDateString()} disableEdit />

          {openDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setOpenDatePicker(false);
                selectedDate && setValue('day', selectedDate);
              }}
              // timeZoneName="America/Sao_Paulo"
              locale="pt-BR"
              style={styles.datePicker}
              themeVariant="light"
            />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>Hora</Text>
        <TouchableOpacity
          onPress={() => {
            setOpenTimePicker(true);
          }}
        >
          {/* get time */}
          <Input label={new Date(getValues('time'))?.toLocaleTimeString() || ''} disableEdit />
          {openTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setOpenTimePicker(false);
                const time = selectedDate?.toLocaleTimeString() || '';
                console.log({ time });
                selectedDate && setValue('time', selectedDate);
              }}
              // timeZoneName="America/Sao_Paulo"
              locale="pt-BR"
              style={styles.datePicker}
              themeVariant="light"
            />
          )}
        </TouchableOpacity>

        <Text style={styles.title}>Veículo</Text>
        <Select
          error={errors.vehiclePlate?.message}
          onChange={(value, itemIndex) => {
            setValue('vehiclePlate', value);
            setValue(
              'availableSeats',
              vehicles?.find((vehicle) => vehicle.plate === value)?.seats || 0
            );
          }}
          values={
            vehicles?.map((vehicle) => {
              return {
                label: vehicle.model,
                value: vehicle.plate,
              };
            }) || [
              {
                label: 'Nenhum veículo cadastrado',
                value: 'Nenhum veículo cadastrado',
              },
            ]
          }
          selectedValue={getValues('vehiclePlate')}
          placeholder="Ecolha um veículo"
        />

        <Text style={styles.title}>Assentos Disponíveis</Text>
        <Controller
          control={control}
          name="availableSeats"
          rules={{ required: true }}
          defaultValue={
            vehicles?.find((vehicle) => vehicle.plate === getValues('vehiclePlate'))?.seats || 0
          }
          render={({
            field: { onChange, onBlur, value },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              key={watch('vehiclePlate')}
              onChange={(value) => onChange(Number(value))}
              label="Assentos Disponíveis"
              value={String(value)}
              error={error?.message}
              defaultValue={String(
                vehicles?.find((vehicle) => vehicle.plate === getValues('vehiclePlate'))?.seats || 0
              )}
            />
          )}
        />

        <View
          style={{
            flex: 1,
            justifyContent: 'flex-end',
            marginBottom: 36,
          }}
        >
          <Button
            size="large"
            variant="primary"
            label="Oferecer"
            onClick={handleSubmit(onSubmit)}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 21,
  },
  title: {
    fontSize: 21,
    fontFamily: fonts.text_medium,
    paddingBottom: 4,
    paddingTop: 1,
  },
  datePicker: {
    alignSelf: 'center',
  },
});
