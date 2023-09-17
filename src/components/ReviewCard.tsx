import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import Rating from './Rating';
import fonts from '../styles/fonts';
import colors from '../styles/colors';

interface ReviewCardProps {
  image: string;
  name: string;
  type: string;
  rating: number;
  reviewText: string;
}

export default function ReviewCard({ image, name, type, rating, reviewText }: ReviewCardProps) {
  return (
    <View style={styles.cardContainer}>
      <View style={styles.cardContent}>
        <View style={styles.header}>
          <Image source={{ uri: image }} style={styles.profileImage} />
          <View style={styles.userInfo}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.type}>{type}</Text>
          </View>
          <View style={styles.ratingContainer}>
            <Rating rating={rating} />
          </View>
        </View>
        <Text style={styles.reviewText}>{reviewText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    backgroundColor: 'transparent',
    borderRadius: 16,
    margin: 8,
    overflow: 'hidden',
    elevation: 2,
  },

  cardContent: {
    backgroundColor: 'white',
    padding: 16,
  },

  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 10,
  },

  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },

  userInfo: {
    flex: 1,
  },

  name: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingTop: 4,
  },

  type: {
    fontFamily: fonts.text_extra_light,
    color: colors.gray,
  },

  ratingContainer: {
    alignItems: 'flex-end',
    paddingTop: 8,
  },

  reviewText: {
    fontSize: 14,
    color: colors.gray,
    fontFamily: fonts.text_medium,
  },
});
