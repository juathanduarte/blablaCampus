import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  Alert,
  Image,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import blablaCampusLogo from '../../assets/blablaCampusLogo.png';
import ufpelLogo from '../../assets/ufpelLogo.png';
import Input from '../../components/Input';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';
import Button from '../../components/Button';
import { LoginSchema, loginSchema } from '../../schemas';
import { zodResolver } from '@hookform/resolvers/zod';

export default function Login() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const navigation = useNavigation();

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardOpen(true);
    });

    const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardOpen(false);
    });

    return () => {
      keyboardDidShowListener.remove();
      keyboardDidHideListener.remove();
    };
  }, []);

  const onSubmit = (data: any) => {
    Alert.alert('Error');
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.containerAvoiding}
      >
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
                variant={'login'}
                iconInput="lock"
                label="Senha"
                iconSize={20}
                error={error?.message}
                value={value}
                onChange={onChange}
              />
            )}
          />
          <TouchableOpacity
            style={styles.forgotPassword}
            onPress={() => navigation.navigate('ForgotPassword')}
          >
            <Text style={styles.text}>Esqueceu sua senha?</Text>
          </TouchableOpacity>
          <Button variant="primary" size="large" label="Entrar" onClick={handleSubmit(onSubmit)} />
        </View>
        <View style={[styles.footerContainer, { marginBottom: keyboardOpen ? 15 : 86 }]}>
          <View style={styles.registerContainer}>
            <Text style={styles.text}>Não tem uma conta?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Register')}>
              <Text style={[styles.text, { color: colors.primary, marginLeft: 3 }]}>
                Cadastre-se
              </Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.text}>Ou</Text>
          <TouchableOpacity onPress={() => navigation.navigate('AdminLogin')}>
            <Text style={[styles.text, { color: colors.primary }]}>Acesse como Administrador</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>

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
    width: '100%',
    alignItems: 'center',
    marginBottom: 86,
  },
  registerContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
});