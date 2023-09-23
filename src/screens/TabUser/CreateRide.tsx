import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Select from '../../components/Select';
import fonts from '../../styles/fonts';

const collegeSpots = [
  {
    label: 'All',
    value: 'All',
  },
  {
    label: 'Restaurant',
    value: 'Restaurant',
  },
];

const vehicles = [
  {
    label: 'Fiat Uno',
    value: 'Fiat Uno',
  },
  {
    label: 'Corsa',
    value: 'Corsa',
  },
];

// TODO: usar o headernav ?

export default function CreateRide() {
  const [startingSpot, setStartingSpot] = React.useState('');
  const [destinationSpot, setDestinationSpot] = React.useState('');
  const [date, setDate] = useState(new Date());
  const [openDatePicker, setOpenDatePicker] = useState(false);
  const [vehicle, setVehicle] = React.useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Partida</Text>
      <Select
        onChange={(value, itemIndex) => {
          setStartingSpot(value);
        }}
        values={collegeSpots}
        selectedValue={startingSpot}
        placeholder="Escolha o local de Partida"
      />
      <Text style={styles.title}>Destino</Text>
      <Select
        onChange={(value, itemIndex) => {
          setDestinationSpot(value);
        }}
        values={collegeSpots}
        selectedValue={destinationSpot}
        placeholder="Escolha o local de Destino"
      />
      <Text style={styles.title}>Data</Text>
      <DateTimePicker
        value={date}
        mode="datetime"
        display="default"
        onChange={(event, selectedDate) => {
          const currentDate = selectedDate || date;
          setOpenDatePicker(false);
          setDate(currentDate);
        }}
        timeZoneName="America/Sao_Paulo"
        locale="pt-BR"
        style={styles.datePicker}
        themeVariant="light"
      />
      <Text style={styles.title}>Veículo</Text>
      <Select
        onChange={(value, itemIndex) => {
          setVehicle(value);
        }}
        values={vehicles}
        selectedValue={vehicle}
        placeholder="Ecolha um veículo"
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'flex-end',
        }}
      >
        <Button
          size="large"
          variant="primary"
          label="Oferecer"
          onClick={() => {
            console.log('clicked');
          }}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 21,
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
