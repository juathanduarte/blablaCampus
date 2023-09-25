import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { zodResolver } from '@hookform/resolvers/zod';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useMutation } from '@tanstack/react-query';
import blablaCampusLogo from '../../assets/blablaCampusLogo.png';
import ufpelLogo from '../../assets/ufpelLogo.png';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { useAuthContext } from '../../contexts/AuthContext';
import { LoginSchema, loginSchema } from '../../schemas';
import { login } from '../../services/user';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Login() {
  const { signIn } = useAuthContext();

  const {
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: login,
    onError: (error) => {},
    onSuccess: (data) => {},
  });

  async function showAsyncStorage() {
    const keys = await AsyncStorage.getAllKeys();
    const items = await AsyncStorage.multiGet(keys);
  }

  const navigation = useNavigation();

  const onSubmit = async () => {
    const data = await mutateAsync({
      email: getValues('email'),
      password: getValues('password'),
    });
    await signIn(data.accessToken, data.refreshToken);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={blablaCampusLogo} />
        <Image source={ufpelLogo} style={styles.ufpelLogo} />
      </View>
      <View style={styles.loginContainer}>
        <Controller
          name="email"
          control={control}
          render={({
            field: { value = '', onChange },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              variant={'login'}
              iconInput="envelope"
              label="Email"
              iconSize={20}
              error={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />

        <Controller
          name="password"
          control={control}
          render={({
            field: { value = '', onChange },
            fieldState: { invalid, error, isDirty },
          }) => (
            <Input
              variant={'password'}
              iconInput="lock"
              label="Senha"
              iconSize={20}
              error={error?.message}
              value={value}
              onChange={onChange}
            />
          )}
        />
        <TouchableOpacity style={styles.forgotPassword} onPress={showAsyncStorage}>
          <Text style={styles.text}>Esqueceu sua senha?</Text>
        </TouchableOpacity>
        <Button variant="primary" size="large" label="Entrar" onClick={handleSubmit(onSubmit)} />
      </View>
      <View style={[styles.footerContainer]}>
        <View style={styles.registerContainer}>
          <Text style={styles.text}>Não tem uma conta?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={[styles.text, { color: colors.primary, marginLeft: 3 }]}>Cadastre-se</Text>
          </TouchableOpacity>
        </View>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  containerAvoiding: {
    flex: 1,
    width: '100%',
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: 50,
  },
  ufpelLogo: {
    marginLeft: 'auto',
    marginRight: 35,
  },
  loginContainer: {
    width: '100%',
    marginTop: 50,
    gap: 20,
    flex: 1,
  },
  forgotPassword: {
    alignSelf: 'center',
    marginVertical: 10,
  },
  text: {
    color: colors.title,
    fontSize: 14,
    fontFamily: fonts.text_medium,
  },
  footerContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    alignItems: 'center',
    marginBottom: 86,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});
