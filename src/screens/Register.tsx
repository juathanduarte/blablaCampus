import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Button from '../components/Button';
import Icon from '../components/Icon';
import Input from '../components/Input';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

type FormField = keyof FormValues;

interface FormValues {
  nomeCompleto: string;
  email: string;
  matricula: string;
  senha: string;
  confirmarSenha: string;
}

const inputFields: Array<{
  label: string;
  icon: string;
  key: FormField; // Usar o tipo correto aqui
  isPassword: boolean;
}> = [
  {
    label: 'Nome Completo',
    icon: 'user',
    key: 'nomeCompleto',
    isPassword: false,
  },
  {
    label: 'Email',
    icon: 'envelope',
    key: 'email',
    isPassword: false,
  },
  {
    label: 'Número de Matrícula',
    icon: 'id-card',
    key: 'matricula',
    isPassword: false,
  },
  {
    label: 'Senha',
    icon: 'lock',
    key: 'senha',
    isPassword: true,
  },
  {
    label: 'Confirme sua Senha',
    icon: 'lock',
    key: 'confirmarSenha',
    isPassword: true,
  },
];

const Register = () => {
  const navigation = useNavigation();
  const [formErrors, setFormErrors] = useState<Partial<FormValues>>({});
  const [formValues, setFormValues] = useState<FormValues>({
    nomeCompleto: '',
    email: '',
    matricula: '',
    senha: '',
    confirmarSenha: '',
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleInputChange = async (key: keyof FormValues, value: string) => {
    //TODO: Validar o campo
  };

  const handleContinue = async () => {
    //TODO: Validar os campos
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1, gap: 20 }}
      >
        <TouchableOpacity onPress={handleGoBack}>
          <Icon icon="arrow-left" size={24} color="black" lib="FontAwesome" />
        </TouchableOpacity>

        <Text style={styles.title}>Cadastro</Text>

        <View style={styles.containerInputs}>
          {inputFields.map((field) => (
            <Input
              key={field.key}
              variant={field.isPassword ? 'password' : 'login'}
              iconInput={field.icon}
              label={field.label}
              iconSize={20}
              value={formValues[field.key]}
              onChange={(text) => handleInputChange(field.key, text)}
              error={formErrors[field.key]}
            />
          ))}
        </View>

        <Button variant="primary" size="large" label="Continuar" onClick={handleContinue} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 25,
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
