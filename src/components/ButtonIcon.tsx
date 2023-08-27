import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import colors from '../styles/colors';
import Icon, { IconProps } from './Icon';

interface ButtonProps extends StyleProps {
  variant: 'primary' | 'secondary';
  onClick: () => void;
  IconProps: IconProps;
}

export default function ButtonIcon({ variant, IconProps, onClick }: ButtonProps) {
  const handlePress = () => {
    onClick();
  };
  const { icon, lib, size: IconSize, color } = IconProps || {};

  return (
    <TouchableOpacity style={styles({ variant }).container} onPress={handlePress}>
      {/* @ts-ignore */}
      <Icon
        icon={icon}
        lib={lib}
        size={IconSize}
        color={variant === 'primary' ? colors.secondary : colors.primary}
      />
    </TouchableOpacity>
  );
}

interface StyleProps {
  variant: 'primary' | 'secondary';
}

const styles = ({ variant }: StyleProps) =>
  StyleSheet.create({
    container: {
      backgroundColor: variant === 'primary' ? colors.primary : colors.tertiary,
      width: 50,
      height: 50,
      borderRadius: 8,
      position: 'relative',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 3,
    },
  });
