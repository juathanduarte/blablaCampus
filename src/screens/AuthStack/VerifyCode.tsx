import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Alert,
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

import { useRegisterStore } from '../../stores/register';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const { register, handleSubmit, setValue } = useForm();

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null, null]);
  const [countdown, setCountdown] = useState(30);
  const [focusedInput, setFocusedInput] = useState(-1);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (countdown >= 0) {
      timer = setTimeout(() => {
        setCountdown((prevCountdown) => prevCountdown - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [countdown]);

  const handleInputChange = (text: string, index: number) => {
    const updatedCode = [...verificationCode];
    updatedCode[index] = text;
    setVerificationCode(updatedCode);

    if (text && index < 4) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (!updatedCode.includes('')) {
      Keyboard.dismiss();
    }
  };

  const handleCopyPaste = async ({ nativeEvent: { text } }: { nativeEvent: { text: string } }) => {
    if (text.length === 1) {
      return;
    }

    const cleanedContent = text.replace(/\D/g, '');
    const codeToPaste = cleanedContent.slice(0, 5);

    const startIndex = verificationCode.findIndex((digit) => digit === '');
    if (startIndex !== -1) {
      const updatedCode = [...verificationCode];
      for (let i = 0; i < codeToPaste.length; i++) {
        updatedCode[startIndex + i] = codeToPaste.charAt(i);
      }
      setVerificationCode(updatedCode);
      inputRefs.current[startIndex]?.focus();
    }
  };

  const handleInputFocus = (index: number) => {
    setFocusedInput(index);
  };

  const handleInputBlur = () => {
    setFocusedInput(-1);
  };

  const formattedCountdown = countdown < 10 ? `0${countdown}` : countdown;
  const { user } = useRegisterStore();

  const handleVerify = () => {
    const code = verificationCode.join('');
    console.log('Código de verificação:', code);
    setVerificationCode(['', '', '', '', '']);
    inputRefs.current[0]?.focus();

    if (!code) {
      Alert.alert('Erro', 'Por favor, digite o código de verificação.');
    } else {
      navigation.navigate('ChangePassword');
    }
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResend = () => {
    setCountdown(30);
  };

  const handeDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  useEffect(() => {
    register('email');
  }, [register]);

  const isEmailValid = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const onSubmit = (data: any) => {
    if (!isEmailValid(data.email)) {
      Alert.alert('Erro', 'Por favor, digite um e-mail válido.');
    } else {
      console.log('Email:', data.email);
      navigation.navigate('VerifyCode');
    }
  };

  return (
    <TouchableWithoutFeedback onPress={handeDismissKeyboard}>
      <SafeAreaView style={styles.container}>
        <TouchableOpacity style={styles.backArrow} onPress={handleGoBack}>
          <Ionicons name="arrow-back-outline" size={24} color={colors.title} />
        </TouchableOpacity>
        <View style={styles.content}>
          <Text style={styles.textTitle}>Verificação</Text>
          <Text style={styles.subtitle}>
            Enviamos um código de verificação para o email:
            <Text style={styles.textEmail}>seu@email.com</Text>
          </Text>
        </View>
        <View style={styles.codeContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              style={[
                styles.codeInput,
                focusedInput === index && { borderColor: colors.primary, borderWidth: 2 },
              ]}
              value={digit}
              onChangeText={(text) => handleInputChange(text, index)}
              keyboardType="numeric"
              maxLength={1}
              ref={(ref) => (inputRefs.current[index] = ref)}
              onFocus={() => handleInputFocus(index)}
              onBlur={handleInputBlur}
              textAlign="center"
              onChange={handleCopyPaste}
            />
          ))}
        </View>

        <View style={styles.button}>
          <Button label="Continuar" onClick={handleVerify} variant="primary" size="large" />
        </View>
        {countdown >= 0 ? (
          <Text style={styles.textResend}>
            Reenviar código em
            <Text style={styles.textEmail}> 00:{formattedCountdown}</Text>
          </Text>
        ) : (
          <TouchableOpacity onPress={handleResend}>
            <Text style={[styles.textResend, { color: colors.primary }]}>Reenviar código</Text>
          </TouchableOpacity>
        )}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 34,
  },
  backArrow: {
    alignSelf: 'flex-start',
    marginTop: 20,
    marginLeft: 2,
  },
  content: {
    alignSelf: 'flex-start',
    width: '85%',
  },
  textTitle: {
    color: colors.title,
    fontSize: 24,
    fontFamily: fonts.text_medium,
    marginTop: 20,
  },
  subtitle: {
    fontSize: 15,
    fontFamily: fonts.text_regular,
    marginTop: 30,
  },
  textEmail: {
    color: colors.primary,
  },
  codeContainer: {
    flexDirection: 'row',
    marginTop: 25,
  },
  codeInput: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 48,
    width: 48,
    marginHorizontal: 8,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.quinary,
  },
  button: {
    marginTop: 30,
  },
  textResend: {
    fontSize: 15,
    color: colors.title,
    marginTop: 30,
    marginBottom: 8,
    alignSelf: 'center',
  },
});
