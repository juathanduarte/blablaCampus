import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import RideUserCard from '../../components/RideUserCard';
import Button from '../../components/Button';
import { Ride } from '../../types/Ride';
import { User } from '../../types/User';
import { useMutation, useQuery } from '@tanstack/react-query';
import { getRideInfo } from '../../services/ride/getRideInfo';
import { requestRide } from '../../services/ride';
import { useUserStore } from '../../stores/user';

// interface User {
//   id: string;
//   name: string;
//   urlImage: string;
//   rating: number;
//   status: 'active' | 'inactive';
//   type: 'motorista' | 'passageiro';
// }

interface Carona {
  inicio: string;
  destino: string;
  data: string;
  horario: string;
}

interface userProps {
  user: User;
  carona: Carona;
}

interface RouteProp<T> {
  route: {
    params: {
      data: T;
    };
  };
}

export default function RequestRide({
  route: {
    params: { data },
  },
}: RouteProp<Ride>) {
  const navigate = useNavigation();
  const user = useUserStore((state) => state.user);

  const [requestSucceeded, setRequestSucceeded] = React.useState(false);
  const [requestFailed, setRequestFailed] = React.useState(false);

  const { data: rideData, isLoading } = useQuery({
    queryKey: ['rideInfo'],
    queryFn: () =>
      getRideInfo({
        registration: data.driver_registration,
        departureDate: data.departure_date,
      }),
  });

  const {
    mutateAsync,

    isLoading: isRequestingRide,
  } = useMutation({
    mutationFn: requestRide,
    onSuccess: () => {
      setRequestSucceeded(true);
      setRequestFailed(false);
    },
    onError: () => {
      setRequestFailed(true);
      setRequestSucceeded(false);
    },
  });

  function handleRequestRide() {
    mutateAsync({
      driverRegistration: data.driver_registration,
      departureDate: data.departure_date,
    });
  }

  return (
    <View style={styles.header}>
      <View style={styles.HeaderNav}>
        <HeaderNav title="Informações da Carona" navigation={navigate} />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Motorista</Text>
        <View style={styles.cardSection} key={data.driver_registration}>
          <RideUserCard key={data.driver.registration} user={data.driver} showButtons={false} />
        </View>
        <Text style={styles.text}>Passageiros</Text>
        {rideData?.passengers?.map((user: User) => (
          <View style={styles.cardSection} key={user.registration}>
            <RideUserCard key={user.registration} user={user} showButtons={false} />
          </View>
        ))}
        <View style={styles.rideInformation}>
          <Text style={styles.title}>Início:</Text>
          <Text style={styles.subtitle}>{rideData?.origin_campus_name}</Text>
          <Text style={styles.title}>Destino:</Text>
          <Text style={styles.subtitle}>{rideData?.destination_campus_name}</Text>
          <Text style={styles.title}>Data:</Text>
          <Text style={styles.subtitle}>
            {rideData &&
              Intl.DateTimeFormat('pt-BR', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
              }).format(new Date(rideData.departure_date))}
          </Text>
          <Text style={styles.title}>Horário:</Text>
          <Text style={styles.subtitle}>
            {rideData &&
              Intl.DateTimeFormat('pt-BR', {
                hour: 'numeric',
                minute: 'numeric',
              }).format(new Date(rideData.departure_date))}
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            disabled={isRequestingRide || requestSucceeded || requestFailed || isLoading}
            variant="primary"
            size="large"
            label="Solicitar"
            onClick={handleRequestRide}
            success={requestSucceeded}
            failed={requestFailed}
          />
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
  buttonContainer: {
    paddingTop: 12,
  },
});
