import { View, Text } from 'react-native';
import React from 'react';
import { StyleSheet } from 'react-native';
import Icon from './Icon';
import colors from '../styles/colors';

interface RatingProps {
  rating: number;
}

export default function Rating({ rating }: RatingProps) {
  return (
    <View style={styles.container}>
      <Icon icon="star" size={15} color={colors.primary} />
      <Text style={styles.text}>{rating.toFixed(1)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
  },
  icon: {},
  text: {
    fontSize: 12,
  },
});
