import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Button from './Button';

interface userProps {
  name: string;
  id: string;
  urlImage: string;
  size: 'lg' | 'md' | 'sm' | 'xs';
  status: 'active' | 'inactive';
}

//todo: add onclick to button

export default function UserCard({ name, id, urlImage, size, status }: userProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Avatar urlImage={urlImage} size={size} />
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textId}>{id}</Text>
          </View>
        </View>
      </View>
      {status === 'active' ? (
        <Button variant="primary" size="medium" label="Bloquear" />
      ) : (
        <Button variant="secondary" size="medium" label="Desbloquear" />
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
    fontWeight: 'bold',
    color: colors.title,
  },
  textId: {
    fontSize: 13,
    color: colors.detail,
    fontWeight: 'normal',
  },
});
