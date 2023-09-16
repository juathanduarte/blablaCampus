import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large' | 'personalized';
  label?: string;
  icon?: any;
  onClick?: () => void;
  disabled?: boolean;
}

export default function Button({ variant, size, label, icon, onClick, disabled }: ButtonProps) {
  const handlePress = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles({ variant, size }).container}
      onPress={handlePress}
    >
      {size === 'small' && icon ? (
        <Ionicons name={icon} size={42} color={colors.secondary} />
      ) : (
        <Text style={styles({ variant, size }).text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = ({ variant, size }: ButtonProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: variant === 'primary' ? colors.primary : colors.tertiary,
      width:
        size === 'large'
          ? '100%'
          : size === 'medium'
          ? '46%'
          : size === 'personalized'
          ? 92
          : 'auto',
      paddingVertical: size === 'large' ? 18 : size === 'medium' ? 12 : 0,
      height:
        size === 'large'
          ? 58
          : size === 'medium'
          ? 48
          : size === 'small'
          ? 42
          : size === 'personalized'
          ? 28
          : 0,
      borderRadius: 8,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontSize: size === 'large' ? 16 : size === 'medium' ? 14 : 12,
      color: variant === 'primary' ? colors.secondary : colors.primary,
      fontFamily:
        size === 'large'
          ? fonts.text_bold
          : size === 'medium'
          ? fonts.text_medium
          : size === 'personalized'
          ? fonts.text_regular
          : fonts.text_semi_bold,
      textTransform: size === 'large' ? 'uppercase' : 'none',
    },
  });
