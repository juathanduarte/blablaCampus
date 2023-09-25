import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
import { useMutation } from '@tanstack/react-query';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../../components/Button';
import Icon from '../../components/Icon';
import Input from '../../components/Input';
import { RegisterSchema, registerSchema } from '../../schemas';
import {
  isEmailAvailable,
  isRegistrationAvailable,
  registerTemporarilyUser,
} from '../../services/user/register';
import { useRegisterStore } from '../../stores/register';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const Register = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    getValues,
    setError,
    clearErrors,
    formState: { errors, isDirty },
  } = useForm<RegisterSchema>({
    defaultValues: {},
    mode: 'onSubmit',
    resolver: zodResolver(registerSchema),
  });

  const { setUser } = useRegisterStore();
  async function onSubmit(data: RegisterSchema) {
    try {
      const response = await registerTemporarilyUser(data);

      setUser(data);
      navigation.navigate('VerifyCode');
    } catch (e: any) {
      console.log(e);
    }
  }

  const { mutateAsync: mutateIsEmailAvailable } = useMutation({
    mutationFn: isEmailAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('email', { message: 'Email já cadastrado' });
      if (!exists && errors.email) clearErrors('email');
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  async function isEmailAvailableHandler() {
    await mutateIsEmailAvailable(getValues('email'));
  }

  const { mutateAsync: mutateIsRegistrationAvailable } = useMutation({
    mutationFn: isRegistrationAvailable,
    onSuccess: ({ exists }) => {
      if (exists) setError('registration', { message: 'Matricula já cadastrada' });
      if (!exists && errors.registration) clearErrors('registration');
    },
    onError: (error: any) => {
      console.log(error);
    },
  });

  async function isRegistrationAvailableHandler() {
    await mutateIsRegistrationAvailable(getValues('registration'));
  }

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={{ flex: 1, gap: 20 }}
        >
          <TouchableOpacity onPress={handleGoBack}>
            <Icon icon="arrow-left" size={24} color="black" lib="FontAwesome" />
          </TouchableOpacity>

          <Text style={styles.title}>Cadastro</Text>

          <View style={styles.containerInputs}>
            <Controller
              name="name"
              control={control}
              render={({
                field: { value = '', onChange },
                fieldState: { invalid, error, isDirty },
              }) => (
                <Input
                  variant={'login'}
                  iconInput="user"
                  label="Nome completo"
                  iconSize={20}
                  error={error?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({
                field: { value = '', onChange, onBlur },
                fieldState: { invalid, error, isDirty },
              }) => (
                <Input
                  variant={'login'}
                  iconInput="envelope"
                  label="Email"
                  iconSize={20}
                  onChange={(value) => {
                    setError('email', { message: '' });
                    onChange(value);
                  }}
                  onblur={() => {
                    onBlur();
                    if (isDirty) isEmailAvailableHandler();
                  }}
                  value={value}
                  error={error?.message}
                />
              )}
            />
            <Controller
              name="registration"
              control={control}
              render={({
                field: { value = '', onChange, onBlur },
                fieldState: { invalid, error, isDirty },
              }) => (
                <Input
                  label="Número de Matricula"
                  onChange={(value) => {
                    setError('registration', { message: '' });
                    onChange(value);
                  }}
                  onblur={() => {
                    onBlur();
                    if (isDirty) isRegistrationAvailableHandler();
                  }}
                  value={value}
                  error={error?.message}
                  variant={'login'}
                  iconInput="id-card"
                  iconSize={20}
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
            <Controller
              name="passwordConfirmation"
              control={control}
              render={({
                field: { value = '', onChange },
                fieldState: { invalid, error, isDirty },
              }) => (
                <Input
                  variant={'password'}
                  iconInput="lock"
                  label="Confirme sua senha"
                  iconSize={20}
                  error={error?.message}
                  value={value}
                  onChange={onChange}
                />
              )}
            />
          </View>

          <Button
            variant="primary"
            size="large"
            label="Continuar"
            onClick={handleSubmit(onSubmit)}
          />
        </KeyboardAvoidingView>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    color: colors.title,
    fontFamily: fonts.text_medium,
  },
  containerInputs: {
    gap: 20,
  },
});

export default Register;
