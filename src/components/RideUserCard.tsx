import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Modal, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Button from './Button';
import fonts from '../styles/fonts';
import Rating from './Rating';

interface User {
  name: string;
  urlImage: string;
  rating: number;
  status: 'active' | 'inactive';
}
interface userProps {
  user: User;
  showButtons: boolean;
}

export default function RideUserCard({ user, showButtons }: userProps) {
  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    console.log({ screen });
    // @ts-ignore
    navigation.navigate(screen);
  };

  const onPressPerfil = () => {
    console.log('open perfil');
    console.log(user);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressPerfil}>
        <View style={styles.info}>
          <Avatar urlImage={user.urlImage} size="md" />
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{user.name}</Text>
              <Rating rating={user.rating} />
            </View>
          </View>
        </View>
      </TouchableOpacity>
      {showButtons && (
        <View style={styles.buttonContainer}>
          {user.status === 'active' ? (
            <View style={styles.button}>
              <Button
                variant="primary"
                size="personalized"
                label="Avaliar"
                onClick={() => handleNavigation('CreateAssessment')}
              />
            </View>
          ) : (
            <View style={styles.button}>
              <Button
                variant="secondary"
                size="personalized"
                label="Avaliado"
                onClick={() => handleNavigation('CreateAssessment')}
              />
            </View>
          )}
          <Button
            variant="primary"
            size="small"
            icon="chatbox-outline"
            onClick={() => console.log('click')}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  info: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 10,
  },
  textContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  textName: {
    fontSize: 14,
    fontFamily: fonts.text_medium,
    color: colors.title,
    paddingBottom: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  button: {
    marginHorizontal: 8,
  },
});
