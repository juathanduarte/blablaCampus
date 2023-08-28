import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import Avatar from './Avatar';

interface MessageProps {
  text: string;
  date: string;
  user: {
    name: string;
    avatar_url: string;
  };
  onClick?: () => void;
  //todo: on click redirect to chat
}

export default function Message({ text, date, user }: MessageProps) {
  //calculate time ago
  function timeAgo(date: string) {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    let interval = Math.floor(seconds / 31536000);
    if (interval >= 1) {
      var formatDate = new Date(date);

      formatDate.setHours(formatDate.getHours() + 5);
      formatDate.setMinutes(formatDate.getMinutes() + 30);
      formatDate.setSeconds(formatDate.getSeconds() + 30);

      //format date pt-br
      const day = formatDate.getDate();
      const month = formatDate.getMonth() + 1;
      const year = formatDate.getFullYear();
      const weekDay = formatDate.getDay();

      const weekDayName = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];

      return weekDayName[weekDay] + ', ' + day + '/' + month + '/' + year;
    }
    interval = Math.floor(seconds / 2592000);
    if (interval >= 1) {
      return 'Há ' + interval + ' meses';
    }
    interval = Math.floor(seconds / 86400);
    if (interval >= 1) {
      return 'Há ' + interval + ' dias';
    }
    interval = Math.floor(seconds / 3600);
    if (interval >= 1) {
      return 'Há ' + interval + ' horas';
    }
    interval = Math.floor(seconds / 60);
    if (interval >= 1) {
      return 'Há ' + interval + ' minutos';
    }
    return 'Há' + Math.floor(seconds) + ' segundos';
  }

  return (
    <View style={styles.container}>
      <Avatar size="md" urlImage={user.avatar_url} />
      <View style={styles.content}>
        <View style={styles.textInfo}>
          <Text>{user.name}</Text>
          <Text style={styles.dateText}>{timeAgo(date)}</Text>
        </View>
        <Text style={styles.lastMessage}>{text}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    width: '100%',
  },
  content: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 40,
  },
  textInfo: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  dateText: {
    color: colors.blueGray,
    fontSize: 12,
  },

  lastMessage: {
    color: colors.gray,
    fontSize: 13,
  },
});
