import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TouchableOpacity, Text } from 'react-native';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface CheckboxProps {
  checked: boolean;
  onChange: (newValue: boolean) => void;
}

export default function Checkbox({ checked, onChange }: CheckboxProps) {
  const toggleCheckbox = () => {
    onChange(!checked);
  };

  return (
    <TouchableOpacity style={styles.checkboxContainer} onPress={toggleCheckbox}>
      <Ionicons name={checked ? 'checkbox' : 'checkbox-outline'} size={24} color={colors.primary} />
      <Text style={styles.checkboxLabel}>Viagem Recorrente</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 56,
    paddingHorizontal: 20,
  },

  checkboxLabel: {
    fontSize: 14,
    fontFamily: fonts.text_medium,
    color: colors.quaternary,
    marginLeft: 10,
  },
});
