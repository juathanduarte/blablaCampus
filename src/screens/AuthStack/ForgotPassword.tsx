import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Alert } from 'react-native';
import Button from '../../components/Button';
import Input from '../../components/Input';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function ForgotPassword() {
  const { register, handleSubmit, setValue } = useForm();

  const navigation = useNavigation();

  useEffect(() => {
    register('email');
  }, [register]);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handeDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const onSubmit = (data: any) => {
    if (!isEmailValid(data.email) || data.email === '') {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
    } else {
      navigation.navigate('VerifyCode');
    }
  };
  return (
    <TouchableWithoutFeedback onPress={handeDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.title} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>Alterar senha</Text>
          <Text style={styles.subtitle}>Digite seu email para solicitar uma nova senha.</Text>
        </View>
        <View style={styles.input}>
          <Input
            label="Email"
            iconInput="envelope"
            iconSize={20}
            onChange={(text) => setValue('email', text)}
          />
        </View>
        <View style={styles.button}>
          <Button
            variant="primary"
            size="large"
            label="Continuar"
            onClick={handleSubmit(onSubmit)}
          />
        </View>
        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 24,
  },
  backArrow: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 2,
  },
  content: {
    alignSelf: 'flex-start',
    width: '75%',
  },
  title: {
    color: colors.title,
    fontSize: 24,
    fontFamily: fonts.text_medium,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.text_regular,
    marginTop: 10,
  },
  input: {
    marginTop: 25,
  },
  button: {
    marginTop: 30,
  },
});
