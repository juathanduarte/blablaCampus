import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Keyboard,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';

import Button from '../components/Button';

import Icon from '../components/Icon';
import colors from '../styles/colors';

import fonts from '../styles/fonts';

const VerificationScreen: React.FC = ({ navigation, userEmail }: any) => {
  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '']);
  const inputRefs = useRef<Array<TextInput | null>>([null, null, null, null, null]);
  const [countdown, setCountdown] = useState(30);

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
      // Mova automaticamente o foco para o próximo campo
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      // Volte o foco para o campo anterior se o campo estiver vazio
      inputRefs.current[index - 1]?.focus();
    }

    if (!updatedCode.includes('')) {
      // Verifique se o código está completo e feche o teclado
      Keyboard.dismiss();
    }
  };

  const formattedCountdown = countdown < 10 ? `0${countdown}` : countdown;

  const handleVerify = () => {
    const code = verificationCode.join('');
    console.log('Código de verificação:', code);

    // Redefina os campos de entrada após a verificação (opcional)
    setVerificationCode(['', '', '', '', '']);
    inputRefs.current[0]?.focus();
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResend = () => {
    setCountdown(30);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon lib="IonIcons" icon="arrow-back-outline" size={22} />
        </TouchableOpacity>
      </View>
      <View style={{ width: '100%' }}>
        <Text style={styles.textTitle}>Verificação</Text>
        <Text style={styles.textInfo}>
          Enviamos um código de verificação para o email:
          <Text style={styles.textEmail}>seu@email.com</Text>
        </Text>
      </View>
      <View style={styles.codeContainer}>
        {verificationCode.map((digit, index) => (
          <TextInput
            key={index}
            style={styles.codeInput}
            value={digit}
            onChangeText={(text) => handleInputChange(text, index)}
            keyboardType="numeric"
            maxLength={1}
            ref={(ref) => (inputRefs.current[index] = ref)}
            blurOnSubmit={false} // Evita que o teclado seja fechado ao pressionar "Return"
          />
        ))}
      </View>
      <Button label="Continuar" onClick={handleVerify} variant="primary" size="large" />
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
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 20,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 32,
  },
  codeInput: {
    display: 'flex',
    alignItems: 'center',
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
    paddingHorizontal: 18,
  },
  textTitle: {
    fontSize: 24,
    color: colors.title,
    marginBottom: 8,
  },
  textInfo: {
    fontSize: 15,
    color: colors.title,
  },
  textEmail: {
    color: colors.primary,
  },
  textResend: {
    fontSize: 15,
    color: colors.title,
    marginTop: 32,
    marginBottom: 8,
  },
});

export default VerificationScreen;
