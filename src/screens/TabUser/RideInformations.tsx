import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import RideUserCard from '../../components/RideUserCard';
import Button from '../../components/Button';
import { User } from '../../types/User';
import { useUserStore } from '../../stores/user';
import { useQuery } from '@tanstack/react-query';
import { getRideInfo } from '../../services/ride/getRideInfo';
import { Ride } from '../../types/Ride';

interface RouteProp<T> {
  route: {
    params: {
      data: T;
    };
  };
}

export default function RideInformations({ route }: RouteProp<Ride>) {
  const user = useUserStore((state) => state.user);

  const navigate = useNavigation();

  const ride = route?.params?.data;

  const { data: rideData, isLoading } = useQuery({
    queryKey: ['rideInfo'],
    queryFn: () =>
      getRideInfo({
        registration: ride.driver_registration,
        departureDate: ride.departure_date,
      }),
  });

  console.log(rideData?.driver);

  if (isLoading) return <View></View>;

  return (
    <View style={styles.header}>
      <View style={styles.HeaderNav}>
        <HeaderNav title="Informações da Carona" navigation={navigate} />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Motorista</Text>
        <View style={styles.cardSection} key={user?.registration}>
          <RideUserCard user={rideData!.driver} showButtons={true} />
        </View>
        <Text style={styles.text}>Passageiros</Text>
        {/* TODO: Map com repsonse da API */}
        {rideData?.passengers.map((passenger) => (
          <View style={styles.cardSection} key={passenger.passenger_registration}>
            <RideUserCard user={passenger.passenger} showButtons={true} />
          </View>
        ))}

        <View style={styles.rideInformation}>
          <Text style={styles.title}>Início:</Text>
          <Text style={styles.subtitle}>{rideData?.origin_campus_name}</Text>
          <Text style={styles.title}>Destino:</Text>
          <Text style={styles.subtitle}>{rideData?.destination_campus_name}</Text>
          <Text style={styles.title}>Data:</Text>
          <Text style={styles.subtitle}>
            {Intl.DateTimeFormat('pt-BR', {
              day: 'numeric',
              month: 'numeric',
              year: 'numeric',
            }).format(new Date(rideData?.departure_date!))}
          </Text>
          <Text style={styles.title}>Horário:</Text>
          <Text style={styles.subtitle}>
            {Intl.DateTimeFormat('pt-BR', {
              hour: 'numeric',
              minute: 'numeric',
            }).format(new Date(rideData?.departure_date!))}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  HeaderNav: {
    paddingHorizontal: 24,
    paddingTop: 7,
  },
  container: {
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingBottom: 4,
    paddingTop: 1,
  },
  rideInformation: {
    margin: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingTop: 3,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    color: colors.primary,
    paddingBottom: 3,
  },
  cardSection: {
    marginVertical: 10,
  },
});
