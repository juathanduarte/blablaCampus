import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Button from './Button';
import Icon from './Icon';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { acceptRide } from '../services/ride/acceptRide';
import { useUserStore } from '../stores/user';
import { rejectRide } from '../services/ride';

interface RideProps {
  urlImage: string;
  name: string;
  rating: number;
  dateTime: string;
  startPoint: string;
  destinyPoint: string;
  onClick?: () => void;
  passengerRegistration: string;
  //todo add onClick
}

export default function RequestRideCard({
  urlImage,
  name,
  rating,
  dateTime,
  startPoint,
  destinyPoint,
  onClick,
  passengerRegistration,
}: RideProps) {
  const queryClient = useQueryClient();
  const user = useUserStore((state) => state.user);

  function formatDate(date: string) {
    //return date with hour and minutes;
    const dateObj = new Date(date);
    const day = dateObj.getDate().toString().padStart(2, '0');
    //month starts at 0
    const month = (dateObj.getMonth() + 1).toString().padStart(2, '0');
    const year = dateObj.getFullYear();
    //hour and minutes with 2 digits
    const hour = dateObj.getHours().toString().padStart(2, '0');
    const minutes = dateObj.getMinutes().toString().padStart(2, '0');

    return `${hour}:${minutes} - ${day}/${month}/${year}`;
  }

  const { mutateAsync: mutateAcceptPassenger } = useMutation({
    mutationFn: acceptRide,
    onSuccess: () => {
      queryClient.invalidateQueries(['myRequests']);
    },
  });

  function handleAccept() {
    mutateAcceptPassenger({
      departureDate: dateTime,
      driverRegistration: user!.registration,
      passengerRegistration: passengerRegistration,
    });
  }

  const { mutateAsync: mutateRejectPassenger } = useMutation({
    mutationFn: rejectRide,
    onSuccess: () => {
      queryClient.invalidateQueries(['myRequests']);
    },
  });

  const handleDecline = () => {
    mutateRejectPassenger({
      departureDate: dateTime,
      driverRegistration: user!.registration,
      passengerRegistration: passengerRegistration,
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.infoUserContainer}>
        <View style={styles.infoUser}>
          <Avatar urlImage={urlImage} size="sm" />
          <View style={styles.infoUserText}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textRating}>
              <Icon icon="star" size={15} color={colors.primary} lib="FontAwesome" />
              {rating}
            </Text>
          </View>
        </View>
        <View style={styles.infoRide}>
          <Button variant="secondary" size="small" icon={'close'} onClick={handleDecline} />
          <Button variant="primary" size="small" icon={'add'} onClick={handleAccept} />
        </View>
      </View>
      <View>
        <Text style={styles.infoTextRide}>{formatDate(dateTime)}</Text>
        <Text>
          <Text style={styles.textPointTitle}>Saída: </Text>
          {startPoint}
        </Text>
        <Text>
          <Text style={styles.textPointTitle}>Destino: </Text>
          {destinyPoint}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 24,
    boxShadow: '0px 8px 25px 0px rgba(83, 89, 144, 0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: 16,
    justifyContent: 'space-between',
  },
  infoUserContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  infoUser: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  infoUserText: {
    display: 'flex',
    flexDirection: 'column',
    gap: 4,
  },
  textName: {
    fontSize: 14,
    color: colors.title,
    fontWeight: '500',
  },
  textRating: {
    fontSize: 12,
    color: colors.quaternary,
    fontWeight: '500',
  },
  infoRide: {
    display: 'flex',
    flexDirection: 'row',
    gap: 16,
  },
  infoTextRide: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  // infoPoints: {},
  textPointTitle: {
    fontSize: 14,
    color: colors.primary,
    fontWeight: '500',
  },
  // textPoint: {},
});
