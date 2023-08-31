import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
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
  TouchableWithoutFeedback,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import blablaCampusLogo from '../assets/blablaCampusLogo.png';
import adminLogo from '../assets/adminLogo.png';
import Button from '../components/Button';
import Input from '../components/Input';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

export default function AdminLogin() {
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { register, setValue, handleSubmit } = useForm();

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

  useEffect(() => {
    register('email');
    register('password');
  }, [register]);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (data: any) => {
    if (!isEmailValid(data.email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
    } else if (!data.password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      Alert.alert(data.email, data.password);
      navigation.navigate('Admin');
    }
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.containerAvoiding}
        >
          <View style={styles.imageContainer}>
            <Image source={blablaCampusLogo} />
            <Image source={adminLogo} style={styles.ufpelLogo} />
          </View>
          <View style={styles.loginContainer}>
            <Input
              label="Email"
              iconInput="envelope"
              iconSize={20}
              onChange={(text) => setValue('email', text)}
            />
            <Input
              label="Senha"
              iconInput="lock"
              iconSize={20}
              variant="password"
              onChange={(text) => setValue('password', text)}
            />
            <TouchableOpacity
              style={styles.forgotPassword}
              onPress={() => navigation.navigate('ForgotPassword')}
            >
              <Text style={styles.text}>Esqueceu sua senha?</Text>
            </TouchableOpacity>
            <Button
              variant="primary"
              size="large"
              label="Entrar"
              onClick={handleSubmit(onSubmit)}
            />
          </View>
          <View style={[styles.footerContainer, { marginBottom: keyboardOpen ? 15 : 86 }]}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={[styles.text, { color: colors.primary }]}>Acesse como usuário</Text>
            </TouchableOpacity>
          </View>
        </KeyboardAvoidingView>

        <StatusBar style="auto" />
      </SafeAreaView>
    </TouchableWithoutFeedback>
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
});
