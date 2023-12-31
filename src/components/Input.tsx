import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon from './Icon';

interface InputProps {
  variant?: 'login' | 'password';
  label: string;
  iconInput?: any;
  iconSize?: any;
  onChange?: (value: string) => void;
  value?: string;
  error?: string;
  onblur?: () => void;
  defaultValue?: string;
  inputNumber?: boolean;
  disableEdit?: boolean;
  maxLength?: number;
}

export default function Input({
  variant,
  iconInput,
  label,
  iconSize,
  onChange,
  value,
  error,
  onblur,
  defaultValue,
  inputNumber,
  disableEdit,
  maxLength,
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={[styles.container, error ? { borderColor: 'red', borderWidth: 1 } : null]}>
      {iconInput && (
        <View style={styles.containerIcon}>
          <Icon icon={iconInput} size={iconSize} color={colors.quaternary} lib="FontAwesome" />
          <TextInput
            {...(maxLength && { maxLength })}
            editable={!disableEdit}
            onBlur={onblur}
            placeholder={label}
            secureTextEntry={variant === 'password' && !showPassword}
            style={styles.textInput}
            placeholderTextColor={colors.quaternary}
            onChangeText={(value) => {
              const onlyNumber = value.replace(/[^0-9]/g, '');
              onChange && onChange(inputNumber ? onlyNumber : value);
            }}
            defaultValue={defaultValue}
            keyboardType={inputNumber ? 'numeric' : 'default'}
          />
          {variant === 'password' && (
            <TouchableOpacity onPress={togglePasswordVisibility}>
              <Ionicons
                name={showPassword ? 'eye-off' : 'eye'}
                size={iconSize}
                color={colors.quaternary}
              />
            </TouchableOpacity>
          )}
        </View>
      )}

      {!iconInput && (
        <View style={styles.containerDefault}>
          <TextInput
            editable={!disableEdit}
            onBlur={onblur}
            placeholder={label}
            style={[styles.textInput]}
            placeholderTextColor={colors.quaternary}
            onChangeText={(value) => {
              const onlyNumber = value.replace(/[^0-9]/g, '');
              onChange && onChange(inputNumber ? onlyNumber : value);
            }}
            defaultValue={defaultValue}
            keyboardType={inputNumber ? 'numeric' : 'default'}
          />
        </View>
      )}

      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    height: 56,
    backgroundColor: '#fff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.quinary,
    paddingHorizontal: 20,
  },

  containerIcon: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    gap: 15,
    height: '100%',
  },

  containerDefault: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    height: '100%',
  },

  textInput: {
    flex: 1,
    fontSize: 14,
    fontFamily: fonts.text_medium,
    color: colors.quaternary,
    borderColor: 'transparent',
    borderWidth: 1,
  },

  errorText: {
    color: 'red',
    fontSize: 12,
    marginTop: 5,
  },
});
