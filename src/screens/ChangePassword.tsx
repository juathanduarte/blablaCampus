import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
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
import Input from '../components/Input';
import Button from '../components/Button';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function ForgotPassword() {
  const { register, handleSubmit, setValue } = useForm();

  const navigation = useNavigation();

  useEffect(() => {
    register('password');
    register('password2');
  }, [register]);

  const onSubmit = (data: any) => {
    if (data.password !== data.password2) {
      Alert.alert('As senhas não coincidem.');
    } else if (!data.password || !data.password2) {
      Alert.alert('Por favor, preencha todos os campos.');
    } else {
      console.log('Password:', data.password);
      console.log('Password2:', data.password2);
      navigation.navigate('Login');
    }
  };

  const handeDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handeDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backArrow} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={colors.title} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.title}>Definir senha</Text>
          <Text style={styles.subtitle}>Digite sua nova senha.</Text>
        </View>
        <View style={styles.input}>
          <Input
            label="Senha"
            iconInput="lock"
            iconSize={20}
            variant="password"
            onChange={(text) => setValue('password', text)}
          />
        </View>
        <View style={styles.input}>
          <Input
            label="Confirme sua senha"
            iconInput="lock"
            iconSize={20}
            variant="password"
            onChange={(text) => setValue('password2', text)}
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
