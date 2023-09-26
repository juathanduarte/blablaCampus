import { useNavigation } from '@react-navigation/native';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect } from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Button from '../../components/Button';
import CarCard from '../../components/CarCard';
import HeaderNav from '../../components/HeaderNav';
import Rating from '../../components/Rating';
import RideCard from '../../components/RideCard';
import TabHeader from '../../components/TabHeader';
import { getCarPools, getCarPoolsRequests } from '../../services/ride';
import { getVehicles } from '../../services/vehicles/getVehicles';
import { useUserStore } from '../../stores/user';
import fonts from '../../styles/fonts';
import profileImage from '../../assets/profileImage.png';

const Profile = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const user = useUserStore((state) => state.user);

  const navigation = useNavigation();
  const queryClient = useQueryClient();

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const { data: vehicles, isLoading } = useQuery({
    queryKey: ['myVehicles'],
    queryFn: getVehicles,
  });

  useEffect(() => {
    if (selectedTab === 0) queryClient.invalidateQueries(['myHistory']);

    if (selectedTab === 1) queryClient.invalidateQueries(['myRequests']);
  }, [selectedTab]);

  const { data: carPools } = useQuery({
    queryKey: ['myHistory'],
    queryFn: () => getCarPools(user!.registration),
  });

  const { data: carPoolRequests } = useQuery({
    queryKey: ['myRequests'],
    queryFn: () => getCarPoolsRequests(user!.registration),
  });

  const handleNavigation = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  return (
    <View style={styles.container}>
      <View style={styles.HeaderNav}>
        <HeaderNav title="Perfil" navigation={navigation} icon={true} />
      </View>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <View style={styles.section}>
          <Image source={profileImage} style={styles.profileImage} />

          <Text style={styles.name}>{user?.name}</Text>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity
            style={styles.menu3Items}
            onPress={() => handleNavigation('Assessments')}
          >
            <Text style={styles.menuNumber}>{user?._count?.reviews_received || 0}</Text>
            <Text style={styles.menuText}>Avaliações</Text>
            <View style={styles.menuIcon}>
              <Rating rating={user!.review_average} />
            </View>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <View style={styles.menu2Items}>
            <Text style={styles.menuNumber}>{user?._count?.driver_carpools || 0}</Text>
            <Text style={styles.menuText}>Caronas Ofertadas</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menu2Items}>
            <Text style={styles.menuNumber}>{user?._count?.passengers_carpools || 0}</Text>
            <Text style={styles.menuText}>Caronas Recebidas</Text>
          </View>
        </View>
      </View>
      <View style={styles.tab}>
        <TabHeader
          labels={['Histórico', 'Solicitações', 'Veículos']}
          handleTabChange={handleTabChange}
          activeTab={selectedTab}
        />
      </View>

      {selectedTab === 0 ? (
        <View>
          <ScrollView>
            {carPools?.map((carPool, index) => (
              <TouchableOpacity
                style={styles.content}
                onPress={() =>
                  navigation.navigate('RideInformations', {
                    data: {
                      ride: carPool,
                    },
                  })
                }
                key={carPool.driver_registration + carPool.departure_date}
              >
                <RideCard
                  dateTime={carPool.departure_date}
                  startPoint={carPool.origin_campus_name}
                  destinyPoint={carPool.destination_campus_name}
                  name={carPool.driver.name}
                  rating={user!.review_average}
                  role={
                    user?.registration === carPool.driver_registration ? 'Motorista' : 'Passageiro'
                  }
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      ) : selectedTab === 1 ? (
        <View>
          <ScrollView>
            {carPoolRequests?.map((request) => {
              return (
                <TouchableOpacity
                  style={styles.content}
                  onPress={() => handleNavigation('RideInformations')}
                  key={request.driver_registration + request.departure_date}
                >
                  <RideCard
                    dateTime={request.departure_date}
                    destinyPoint={request.destination_campus_name}
                    name={request.driver.name}
                    rating={request.driver.review_average}
                    role={request?.passengers?.[0].is_accepted ? 'Aceita' : 'Pendente'}
                    startPoint={request.origin_campus_name}
                    // urlImage="https://avatars.githubusercontent.com/u/60005589?v=4"
                  />
                </TouchableOpacity>
              );
            })}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="small"
              icon={'add'}
              onClick={() => handleNavigation('CreateRide')}
            />
          </View>
        </View>
      ) : (
        <View>
          <ScrollView style={styles.content}>
            {vehicles?.map((vehicle) => (
              <CarCard
                car={vehicle}
                key={vehicle.plate}
                brand={vehicle.brand}
                model={vehicle.model}
                year={vehicle.year}
                color={vehicle.color}
                plate={vehicle.plate}
                seats={vehicle.seats}
              />
            ))}
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button
              variant="primary"
              size="small"
              icon={'add'}
              onClick={() => handleNavigation('CreateCar')}
            />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderNav: {
    paddingHorizontal: 24,
    paddingTop: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Fundo branco
    paddingHorizontal: 24,
  },
  section: {
    marginRight: 8,
  },
  profileImage: {
    marginLeft: 8,
    width: 92,
    height: 92,
    borderRadius: 48,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.text_bold,
    marginTop: 8,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    marginLeft: 16,
  },
  menu3Items: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 8,
  },
  menu2Items: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuNumber: {
    fontSize: 14,
    fontFamily: fonts.text_regular,
  },
  menuText: {
    fontSize: 12,
    fontFamily: fonts.text_regular,
    textAlign: 'center',
  },
  menuIcon: {
    paddingTop: 3,
  },
  separator: {
    height: 32,
    width: 1,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 8,
  },
  tab: {
    paddingTop: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  content: {
    paddingTop: 7,
    paddingHorizontal: 16,
  },
  buttonContainer: {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

export default Profile;
