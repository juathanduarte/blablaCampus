import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Icon from './Icon';

interface RideProps {
  urlImage: string;
  name: string;
  rating: number;
  dateTime: string;
  role: string;
  startPoint: string;
  destinyPoint: string;
  onClick?: () => void;
  //todo add onClick
}

export default function RideCard({
  urlImage,
  name,
  rating,
  dateTime,
  role,
  startPoint,
  destinyPoint,
}: RideProps) {
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
          <Text style={styles.infoTextRide}>{formatDate(dateTime)}</Text>
          <Text style={styles.infoTextRide}>{role}</Text>
        </View>
      </View>
      <View>
        <Text>
          <Text style={styles.textPointTitle}>Saída: </Text>
          {startPoint}
        </Text>
        <Text>
          <Text style={styles.textPointTitle}>Chegada: </Text>
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
    flexDirection: 'column',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
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
