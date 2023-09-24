import React from 'react';
import { useEffect } from 'react';
import { StyleSheet, ScrollView, View, Keyboard, TouchableWithoutFeedback } from 'react-native';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Message from '../../components/Message';

export default function Messages() {
  const mensagens = [
    {
      text: 'Olá, tudo bem?',
      date: '2023-09-24T10:00:00',
      user: {
        name: 'João',
        avatar_url: 'https://avatars.githubusercontent.com/u/60005589?v=4',
      },
    },
    {
      text: 'Eai fei',
      date: '2023-09-24T10:40:00',
      user: {
        name: 'João',
        avatar_url: 'https://avatars.githubusercontent.com/u/60005589?v=4',
      },
    },
    {
      text: 'O scroll ta mei bugado!!!!!',
      date: '2023-09-24T9:00:00',
      user: {
        name: 'João',
        avatar_url: 'https://avatars.githubusercontent.com/u/60005589?v=4',
      },
    },
    {
      text: 'O scroll desbugou ihuuuul',
      date: '2023-09-24T9:00:00',
      user: {
        name: 'João',
        avatar_url: 'https://avatars.githubusercontent.com/u/60005589?v=4',
      },
    },
  ];

  const { register, handleSubmit, setValue } = useForm();

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    register('searchtext');
  }, [register]);

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
        <View style={styles.inputContainer}>
          <Input
            label="Pesquisar"
            iconInput="search"
            iconSize={20}
            onChange={(text) => setValue('searchtext', text)}
          />
        </View>
      </TouchableWithoutFeedback>
      <View>
        <ScrollView>
          {mensagens.map((mensagem, index) => (
            <View key={index} style={styles.messagesContainer}>
              <Message text={mensagem.text} date={mensagem.date} user={mensagem.user} />
            </View>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  inputContainer: {
    paddingVertical: 12,
  },
  messagesContainer: {
    paddingVertical: 5,
  },
});
