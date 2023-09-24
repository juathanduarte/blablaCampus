import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ChatMessageProps {
  text: string;
  date: string;
  type: 'sent' | 'received';
}

export default function ChatItem({ text, date, type }: ChatMessageProps) {
  return (
    <View style={type === 'sent' ? styles.containerSent : styles.containerReceived}>
      {/* Se o tipo for sent, utilizar styles.contentSent, se for tipo received utilizar styles.contentReceived */}
      <View style={type === 'sent' ? styles.contentSent : styles.contentReceived}>
        <Text style={styles.messageText}>{text}</Text>
        <Text style={styles.dateText}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  containerSent: {
    alignSelf: 'flex-end',
    marginBottom: 15, // Adicionando um espaço entre as mensagens
    maxWidth: '80%', // Limitando o tamanho da mensagem
    minWidth: '20%', // Limitando o tamanho da mensagem
  },
  containerReceived: {
    marginBottom: 10, // Adicionando um espaço entre as mensagens
    maxWidth: '80%', // Limitando o tamanho da mensagem
    minWidth: '20%', // Limitando o tamanho da mensagem
  },
  contentSent: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 10,
  },
  contentReceived: {
    backgroundColor: colors.primary,
    opacity: 0.8,
    padding: 10,
    borderRadius: 10,
  },
  messageText: {
    color: colors.white,
    fontSize: 13,
    fontFamily: fonts.text_medium,
  },
  dateText: {
    color: colors.white,
    fontSize: 9,
    textAlign: 'right', // Alinha o texto à direita
    fontFamily: fonts.text_medium,
  },
});
