import React from 'react';
import { StyleSheet, TouchableOpacity, Text, TouchableOpacityProps } from 'react-native';

import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface ButtonProps extends TouchableOpacityProps {
  type: 'block_unlock' | 'primary' | 'add' | 'arrow';
  icon?: 'arrowleft';

  children?: string;
}

export function Button ({ type, icon, children, ...rest }: ButtonProps) {
  if (type === 'primary') {
    return (
      <TouchableOpacity style={styles.primary} activeOpacity={0.7} {...rest}>
        <Text style={styles.primaryText}>{children}</Text>
      </TouchableOpacity>
    );
  }

  //quando usado o block_unlock, é necessário usar o disabled para habilitar/desabilitar o botão
  if (type === 'block_unlock') {
    return (
      <TouchableOpacity
        style={[
          styles.block_unlock,
          { backgroundColor: rest.disabled ? colors.tertiary : colors.primary }
        ]}
        activeOpacity={0.7}
        {...rest}
      >
        <Text style={[
          styles.block_unlockText,
          { color: rest.disabled ? colors.primary : colors.secondary}
          ]}
        >
          {children}
        </Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  primary: {
    backgroundColor: colors.primary,
    height: 58,
    width: '100%',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },

  primaryText: {
    color: colors.secondary,
    fontFamily: fonts.text_bold,
    fontSize: 16,
  },

  block_unlock: {
    backgroundColor: colors.primary,
    height: 28,
    width: 92,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  block_unlockText: {
    color: colors.secondary,
    fontFamily: fonts.text_regular,
    fontSize: 12,
  },
});