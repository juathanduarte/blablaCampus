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
import { useMutation, useQuery } from '@tanstack/react-query';
import { getCollegeSpots } from '../../services/collegespot';
import { createRide } from '../../services/ride/createRide';

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

  const { mutateAsync } = useMutation({
    mutationFn: createRide,
    onSuccess: () => {
      console.log('success');
    },
  });

  function onSubmit() {
    mutateAsync(getValues());
  }

  useEffect(() => {
    setValue('time', new Date(new Date().getTime() + 1800000));
    setValue('day', new Date());
  }, []);

  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerNav}>
        <HeaderNav title="Oferecer Carona" navigation={navigation} />
      </View>
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
          <Input
            key={watch('day') && watch('day').toString()}
            label={Intl.DateTimeFormat('pt-BR').format(new Date(getValues('day') || new Date()))}
            disableEdit
          />

          {openDatePicker && (
            <DateTimePicker
              value={new Date()}
              mode="date"
              display="default"
              onChange={(event, selectedDate) => {
                setOpenDatePicker(false);
                selectedDate && setValue('day', selectedDate);
              }}
              timeZoneOffsetInMinutes={-180}
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
          <Input
            key={watch('time') && watch('time').toString()}
            label={Intl.DateTimeFormat('pt-BR', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(getValues('time') || new Date()))}
            disableEdit
          />
          {openTimePicker && (
            <DateTimePicker
              value={new Date()}
              mode="time"
              display="default"
              onChange={(event, selectedDate) => {
                setOpenTimePicker(false);
                const time = selectedDate?.toLocaleTimeString() || '';
                selectedDate && setValue('time', selectedDate);
              }}
              // -3 hours
              timeZoneOffsetInMinutes={-180}
              is24Hour
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
            marginVertical: 24,
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
  headerNav: {
    paddingTop: 10,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingVertical: 4,
  },
  datePicker: {
    alignSelf: 'center', 
  },
});
