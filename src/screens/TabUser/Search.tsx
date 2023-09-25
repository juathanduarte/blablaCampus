import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import RideCard from '../../components/RideCard';
import Select from '../../components/Select';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getCollegeSpots } from '../../services/collegespot';
import { getRides } from '../../services/ride';

export default function Search() {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const [startingSpot, setStartingSpot] = React.useState('');
  const [destinationSpot, setDestinationSpot] = React.useState('');

  const handleNavigation = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  const { data: collegeSpots, isLoading } = useQuery({
    queryKey: ['spots'],
    queryFn: getCollegeSpots,
  });

  const {
    data: rides,
    mutateAsync,
    isLoading: isLoadingRides,
  } = useMutation({
    mutationFn: getRides,
  });

  useEffect(() => {
    if (startingSpot && destinationSpot) {
      mutateAsync({ origin: startingSpot, destination: destinationSpot });
    }
  }, [startingSpot, destinationSpot]);

  return (
    <View>
      <StatusBar style="light" />
      <View style={styles({ insets }).headerContainer}>
        <View style={styles({}).headerUpperPart}>
          <Text style={styles({}).headerUpperText}>BlaBlaCampus</Text>
          {/* TODO: Change to Button Icon */}
          <Icon lib="FontAwesome" icon="bars" size={24} color="#fff" />
        </View>
        <Text style={styles({}).headerLowerPart}>Olá Gabriel!</Text>
      </View>
      <View style={styles({}).selectContainer}>
        <Select
          onChange={(value, itemIndex) => {
            setStartingSpot(value);
            queryClient.invalidateQueries(['rides']);
          }}
          values={
            collegeSpots?.map((spot) => ({
              label: spot.name,
              value: spot.name,
            })) || []
          }
          selectedValue={startingSpot}
          placeholder="Escolha o local de Início"
        />
        <Select
          onChange={(value, itemIndex) => {
            setDestinationSpot(value);
            queryClient.invalidateQueries(['rides']);
          }}
          values={
            collegeSpots?.map((spot) => ({
              label: spot.name,
              value: spot.name,
            })) || []
          }
          selectedValue={destinationSpot}
          placeholder="Escolha o local de Destino"
        />
      </View>

      {isLoadingRides && (
        <Text>
          Carregando... <ActivityIndicator />
        </Text>
      )}

      <View style={styles({}).mainContainer}>
        <View style={styles({}).travelList}>
          <FlatList
            style={styles({}).list}
            data={rides}
            renderItem={(ride) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('RequestRide', { data: ride.item })}
              >
                <RideCard
                  dateTime={ride.item.departure_date}
                  destinyPoint={ride.item.destination_campus_name}
                  name="Gabriel"
                  rating={4.5}
                  startPoint={ride.item.origin_campus_name}
                  urlImage="https://avatars.githubusercontent.com/u/60005589?v=4"
                />
              </TouchableOpacity>
            )}
            keyExtractor={(item) => item.toString() + Math.random() * 10}
            CellRendererComponent={({ children, ...props }) => {
              return (
                <View {...props} style={styles({}).travelWrapper}>
                  {children}
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

interface StylesProps {
  insets?: EdgeInsets;
}

const styles = ({ insets }: StylesProps) => {
  return StyleSheet.create({
    container: {},
    headerContainer: {
      backgroundColor: colors.primary,
      paddingTop: insets?.top,
      paddingBottom: 16,
      paddingHorizontal: 24,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerUpperPart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    headerUpperText: {
      color: colors.white,
      fontFamily: fonts.text_bold,
      fontSize: 32,
    },
    headerLowerPart: {
      color: colors.white,
      fontFamily: fonts.text_bold,
      fontSize: 20,
    },
    mainContainer: {
      paddingTop: 16,
      paddingHorizontal: 24,
    },
    selectContainer: {
      gap: 16,
      backgroundColor: colors.white,
      marginBottom: 16,
      elevation: 5,
      padding: 0,
      shadowColor: '#110315',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderRadius: 8,
    },
    travelList: {
      marginTop: 18,
      height: Dimensions.get('window').height - 200,
    },
    list: {},
    travelWrapper: {
      marginBottom: 16,
    },
  });
};
