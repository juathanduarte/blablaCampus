import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';
import Icon, { IconProps } from './Icon';

interface ButtonProps extends StyleProps {
  label?: string;
  onClick: () => void;
  IconProps?: IconProps;
}

export default function Button({
  variant,
  size,
  label,
  IconProps,
  onClick,
  labelWeight,
}: ButtonProps) {
  const handlePress = () => {
    onClick();
  };
  const { icon, lib, size: IconSize, color } = IconProps || {};
  const iconHasProps = icon && lib && IconSize && color;

  return (
    <TouchableOpacity style={styles({ variant, size }).container} onPress={handlePress}>
      {label && <Text style={styles({ variant, size, labelWeight }).text}>{label}</Text>}
      {iconHasProps && (
        // @ts-ignore
        <Icon
          icon={icon}
          lib={lib}
          size={IconSize}
          color={variant === 'primary' ? colors.secondary : colors.primary}
        />
      )}
    </TouchableOpacity>
  );
}

interface StyleProps {
  labelWeight?: 'regular' | 'medium' | 'bold';
  variant: 'primary' | 'secondary';
  size: 'small' | 'medium' | 'large';
}

const styles = ({ variant, size, labelWeight }: StyleProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: variant === 'primary' ? colors.primary : colors.tertiary,
      paddingVertical: size === 'large' ? 18 : size === 'medium' ? 13 : size === 'small' ? 6 : 0,
      paddingHorizontal: size === 'large' ? 18 : size === 'medium' ? 13 : size === 'small' ? 6 : 0,
      borderRadius: 8,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 10,
    },
    text: {
      fontSize: size === 'small' ? 12 : 16,
      lineHeight: size === 'small' ? 16 : 24,
      color: variant === 'primary' ? colors.secondary : colors.primary,
      fontFamily: getFontWeight(labelWeight || 'regular'),
      textTransform: size === 'large' ? 'uppercase' : 'none',
    },
  });

function getFontWeight(labelWeight: StyleProps['labelWeight']) {
  switch (labelWeight) {
    case 'regular':
      return fonts.text_regular;
    case 'medium':
      return fonts.text_medium;
    case 'bold':
      return fonts.text_bold;
    default:
      return fonts.text_regular;
  }
}
