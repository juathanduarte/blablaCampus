import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import RequestRideCard from '../components/RequestRideCard';

const AcceptRideRequest = () => {
  // Create an array with 10 elements (you can change the number if needed)
  const rideRequests = Array.from({ length: 10 }, (_, index) => ({
    id: index, // You can add a unique ID for each card if needed
    dateTime: '2021-08-01T10:00:00',
    destinyPoint: 'Praça da Sé',
    name: 'João',
    rating: 4.5,
    role: 'Motorista',
    startPoint: 'Praça da Sé',
    urlImage: 'https://avatars.githubusercontent.com/u/60005589?v=4',
  }));

  return (
    <ScrollView style={styles.container}>
      {rideRequests.map((request, index) => (
        <View key={request.id} style={[styles.cardContainer, index !== 0 && { marginTop: 16 }]}>
          <RequestRideCard
            dateTime={request.dateTime}
            destinyPoint={request.destinyPoint}
            name={request.name}
            rating={request.rating}
            role={request.role}
            startPoint={request.startPoint}
            urlImage={request.urlImage}
          />
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
  },
  cardContainer: {
    marginTop: 10, // Add a marginTop of 10 to create the gap
  },
});

export default AcceptRideRequest;
