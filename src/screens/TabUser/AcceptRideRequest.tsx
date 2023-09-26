import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RequestRideCard from '../../components/RequestRideCard';
import { useQuery } from '@tanstack/react-query';
import { getMyRequests } from '../../services/ride';

export default function AcceptRideRequest() {
  const { data: rideRequests, isLoading } = useQuery({
    queryKey: ['myRequests'],
    queryFn: getMyRequests,
    cacheTime: 0,
  });

  return (
    <ScrollView style={styles.container}>
      {rideRequests?.map((request, index) => (
        <View
          key={request.passenger_registration}
          style={[styles.cardContainer, index !== 0 && { marginTop: 16 }]}
        >
          <RequestRideCard
            passengerRegistration={request.passenger_registration}
            dateTime={request.carpool_departure_date}
            destinyPoint={request.carpool.destination_campus_name}
            name={request.passenger.name}
            rating={request.passenger.review_average}
            // role={}
            startPoint={request.carpool.origin_campus_name}
            urlImage={'https://avatars.githubusercontent.com/u/60272913?v=4'}
          />
        </View>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 7,
  },
  cardContainer: {
    marginTop: 10,
  },
});
