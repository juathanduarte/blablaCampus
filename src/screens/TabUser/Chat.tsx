import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import ChatItem from '../../components/ChatItem';
import HeaderNav from '../../components/HeaderNav';
import Input from '../../components/Input';

export default function Chat() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.HeaderNav}>
        <HeaderNav
          title="Alex lee"
          navigation={navigation}
          profileImage="https://avatars.githubusercontent.com/u/60272913?v=4"
        />
      </View>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'} // Comportamento do KeyboardAvoidingView
        style={styles.flexOne} // Adicionado estilo flexOne
      >
        <ScrollView style={styles.content}>
          <ChatItem
            text="Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? Olá, tudo bem? "
            date="12:30"
            type="received"
          />
          <ChatItem text="Olá! Tudo bem?" date="12:30" type="sent" />
        </ScrollView>
        <View style={styles.sendMessage}>
          <View style={styles.input}>
            <Input label="Digite sua mensagem" iconSize={20} />
          </View>
          <View style={styles.button}>
            <Button variant="primary" size="inputsize" icon={'paper-plane-outline'} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  HeaderNav: {
    paddingHorizontal: 24,
  },
  content: {
    paddingHorizontal: 24,
    paddingTop: 7,
  },
  sendMessage: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    alignItems: 'center',
    flexDirection: 'row',
  },
  input: {
    width: '85%',
  },
  button: {
    width: '15%',
    marginLeft: 6,
  },
  flexOne: {
    flex: 1,
  },
});
