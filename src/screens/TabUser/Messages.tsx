import React from 'react';
import { useEffect } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Keyboard,
  Text,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm } from 'react-hook-form';
import Input from '../../components/Input';
import Message from '../../components/Message';
import HeaderNav from '../../components/HeaderNav';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import { Ionicons } from '@expo/vector-icons';

export default function Messages() {
  const mensagens = [
    {
      text: 'Olá, tudo bem?',
      date: '2023-09-24T10:00:00',
      user: {
        name: 'Gabriel',
        avatar_url: 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png',
      },
    },
    {
      text: 'Clique para um preview do chat!',
      date: '2023-09-24T10:40:00',
      user: {
        name: 'Lucas',
        avatar_url: 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png',
      },
    },
  ];

  const { register, setValue } = useForm();

  const navigation = useNavigation();

  const handleNavigation = (screen: string) => {
    // @ts-ignore
    navigation.navigate(screen);
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    register('searchtext');
  }, [register]);

  return (
    <View style={styles.container}>
      <View style={styles.headerNav}>
        <HeaderNav title="Mensagens" navigation={navigation} />
      </View>

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
            <TouchableOpacity
              key={index}
              style={styles.messagesContainer}
              onPress={() => handleNavigation('Chat')}
            >
              <Message text={mensagem.text} date={mensagem.date} user={mensagem.user} />
            </TouchableOpacity>
          ))}
        </ScrollView>
        <View style={styles.emConstrucao}>
          <Ionicons name="construct-outline" size={35} color={colors.gray} />
          <Text style={styles.textConstrucao}>
            Estamos trabalhando duro para trazer um novo e incrível recurso de chat na próxima
            versão!
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  headerNav: {
    paddingTop: 10,
  },
  inputContainer: {
    paddingBottom: 12,
  },
  messagesContainer: {
    paddingVertical: 5,
  },
  emConstrucao: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    color: colors.gray,
    paddingTop: 55,
  },
  textConstrucao: {
    fontFamily: fonts.text_light,
    fontSize: 16,
    color: colors.gray,
    paddingBottom: 10,
    textAlign: 'center',
  },
});
