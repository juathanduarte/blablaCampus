import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigation } from '@react-navigation/native';
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
import { registerTemporarilyUser } from '../../services/user/register';
import { useRegisterStore } from '../../stores/register';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

const Register = () => {
  const navigation = useNavigation();
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const { setUser } = useRegisterStore();
  async function onSubmit(data: RegisterSchema) {
    try {
      const response = await registerTemporarilyUser(data);
      console.log({ response });

      setUser(data);
      navigation.navigate('VerifyCode');
    } catch (e: any) {
      console.log(e);
    }
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
              name="registration"
              control={control}
              render={({
                field: { value = '', onChange },
                fieldState: { invalid, error, isDirty },
              }) => (
                <Input
                  variant={'login'}
                  iconInput="id-card"
                  label="Número de Matricula"
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
