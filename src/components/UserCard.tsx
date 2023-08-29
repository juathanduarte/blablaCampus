import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Button from './Button';

interface userProps {
  user: {
    id: string;
    name: string;
    urlImage: string;
    status: 'active' | 'inactive';
  };
  onPressPerfil?: () => void;
  onPressStatusBtn?: () => void;
}

//todo: check on press status btn and on press perfil

export default function UserCard({ user, onPressPerfil, onPressStatusBtn }: userProps) {
  return (
    <View style={styles.container}>
      <View style={styles.info}>
        <Avatar urlImage={user.urlImage} size="md" />
        <View>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{user.name}</Text>
            <Text style={styles.textId}>{user.id}</Text>
          </View>
        </View>
      </View>
      {user.status === 'active' ? (
        <Button variant="primary" size="medium" label="Bloquear" onClick={onPressStatusBtn} />
      ) : (
        <Button variant="secondary" size="medium" label="Desbloquear" onClick={onPressStatusBtn} />
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
