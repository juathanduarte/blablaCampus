import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import Checkbox from 'expo-checkbox';

interface MyCheckboxProps {
  onChange: () => void;
  isChecked: boolean;
  label: string;
}

// TODO: Não achei o componente no figma mais
// quando achar termino a estilização

export default function MyCheckbox({ isChecked, label, onChange }: MyCheckboxProps) {
  return (
    <View style={styles({}).container}>
      <Checkbox style={styles({}).checkbox} value={isChecked} onValueChange={onChange} />
      <Text style={styles({}).label}>{label}</Text>
    </View>
  );
}

interface StylesProps {}

const styles = ({}: StylesProps) => {
  return StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'row',
      gap: 8,
    },
    checkbox: {},
    label: {},
  });
};
