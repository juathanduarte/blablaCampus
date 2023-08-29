import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';
import Button from './Button';

interface User {
  id: string;
  name: string;
  urlImage: string;
  status: 'active' | 'inactive';
}
interface userProps {
  user: User;
}

//todo: check on press status btn and on press perfil

export default function UserCard({ user }: userProps) {
  const onPressPerfil = () => {
    console.log('open perfil');
    console.log(user);
  };

  const onPressStatusBtn = () => {
    console.log('change status');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPressPerfil}>
        <View style={styles.info}>
          <Avatar urlImage={user.urlImage} size="md" />
          <View>
            <View style={styles.textContainer}>
              <Text style={styles.textName}>{user.name}</Text>
              <Text style={styles.textId}>{user.id}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
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
