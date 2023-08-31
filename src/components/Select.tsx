import { Picker } from '@react-native-picker/picker';
import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import colors from '../styles/colors';

interface SelectProps {
  placeholder?: string;
  onChange: (value: string, itemIndex: number) => void;
  values: { label: string; value: string }[];
  selectedValue: string | undefined;
}

export default function Select({ selectedValue, onChange, placeholder, values }: SelectProps) {
  const pickerRef = useRef<any>();

  return (
    <View style={styles.selectContainer}>
      <Picker
        ref={pickerRef}
        selectedValue={selectedValue}
        mode="dropdown"
        onValueChange={(itemValue, itemIndex) => onChange(itemValue, itemIndex)}
        placeholder={placeholder}
      >
        {values?.map((value) => (
          <Picker.Item key={value.value} label={value.label} value={value.value} />
        ))}
      </Picker>
    </View>
  );
}

const styles = StyleSheet.create({
  selectContainer: {
    borderWidth: 1,
    borderColor: colors.quinary,
    borderRadius: 8,
    marginVertical: 8,
  },
});
