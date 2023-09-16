import { Ionicons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
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
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View style={styles.container}>
      {iconInput && (
        <View style={styles.containerIcon}>
          <Icon icon={iconInput} size={iconSize} color={colors.quaternary} lib="FontAwesome" />
          <TextInput
            onBlur={onblur}
            placeholder={label}
            secureTextEntry={variant === 'password' && !showPassword}
            style={[styles.textInput, error ? { borderColor: 'red', borderWidth: 1 } : null]}
            placeholderTextColor={colors.quaternary}
            onChangeText={(value) => onChange && onChange(value)}
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
            onBlur={onblur}
            placeholder={label}
            style={[styles.textInput, error ? { borderColor: 'red', borderWidth: 1 } : null]}
            placeholderTextColor={colors.quaternary}
            onChangeText={(value) => onChange && onChange(value)}
          />
        </View>
      )}
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
});
