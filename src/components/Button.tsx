import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps {
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large' | 'personalized' | 'inputsize';
  label?: string;
  icon?: any;
  onClick?: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}

export default function Button({
  variant,
  size,
  label,
  icon,
  onClick,
  disabled,
  isLoading,
}: ButtonProps) {
  const handlePress = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <TouchableOpacity
      disabled={disabled}
      style={styles({ variant, size, disabled }).container}
      onPress={handlePress}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={colors.secondary} />
      ) : (size === 'small' || size === 'inputsize') && icon ? (
        <Ionicons name={icon} size={24} color={colors.secondary} />
      ) : (
        <Text style={styles({ variant, size }).text}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = ({ variant, size, disabled }: ButtonProps) =>
  StyleSheet.create({
    container: {
      opacity: disabled ? 0.5 : 1,
      backgroundColor: variant === 'primary' ? colors.primary : colors.tertiary,
      width:
        size === 'large'
          ? '100%'
          : size === 'medium'
          ? '46%'
          : size === 'small'
          ? 36
          : size === 'personalized'
          ? 80
          : size === 'inputsize'
          ? 50
          : 'auto',
      paddingVertical: size === 'large' ? 18 : size === 'medium' ? 12 : 0,
      height:
        size === 'large'
          ? 58
          : size === 'medium'
          ? 48
          : size === 'small'
          ? 36
          : size === 'personalized'
          ? 36
          : size === 'inputsize'
          ? 50
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
          : size === 'inputsize'
          ? fonts.text_regular
          : fonts.text_semi_bold,

      textTransform: size === 'large' ? 'uppercase' : 'none',
    },
  });
