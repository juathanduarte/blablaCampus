import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
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
import { useMutation } from '@tanstack/react-query';
import { registerUserWithCode } from '../../services/user';
import { zodResolver } from '@hookform/resolvers/zod';
import { VerifyCodeSchema, verifyCodeSchema } from '../../schemas/register';
import { useAuthContext } from '../../contexts/AuthContext';

export default function VerificationScreen() {
  const navigation = useNavigation();
  const { signIn } = useAuthContext();

  const [verificationCode, setVerificationCode] = useState(['', '', '', '', '', '']);
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

    if (text && index < 5) {
      inputRefs.current[index + 1]?.focus();
    } else if (!text && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }

    if (!updatedCode.includes('')) {
      Keyboard.dismiss();
    }
  };

  useEffect(() => {
    setValue('code', verificationCode.join(''));
  }, [verificationCode]);

  const handleCopyPaste = async ({ nativeEvent: { text } }: { nativeEvent: { text: string } }) => {
    if (text.length === 1) {
      return;
    }

    const cleanedContent = text.replace(/\D/g, '');
    const codeToPaste = cleanedContent.slice(0, 6);

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

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleResend = () => {
    setCountdown(30);
  };

  const handeDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  const {
    handleSubmit,
    control,
    getValues,
    setValue,
    watch,
    formState: { errors },
  } = useForm<VerifyCodeSchema>({
    resolver: zodResolver(verifyCodeSchema),
  });

  const { mutateAsync } = useMutation({
    mutationFn: registerUserWithCode,
    onSuccess: (data) => {
      signIn(data.accessToken, data.refreshToken);
    },
    onError: (error: any) => {
      console.log('Error:', error);
    },
  });

  async function onSubmit() {
    mutateAsync({
      code: getValues('code'),
      user: {
        ...user,
        passwordConfirmation: user.password,
      },
    });
  }

  useEffect(() => {
    if (getValues('code').length === 6) {
      handleSubmit(onSubmit)();
    }
  }, [watch('code')]);

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
            <Text style={styles.textEmail}>{user.email}</Text>
          </Text>
        </View>
        <View style={styles.codeContainer}>
          {verificationCode.map((digit, index) => (
            <TextInput
              key={index}
              // TODO: Add error style
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
          <Button
            label="Continuar"
            onClick={handleSubmit(onSubmit)}
            variant="primary"
            size="large"
          />
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
