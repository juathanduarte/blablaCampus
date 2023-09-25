import React, { useRef } from 'react';
import { StyleSheet, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import colors from '../styles/colors';

interface SelectProps {
  placeholder?: string;
  onChange: (value: string, itemIndex: number) => void;
  values: { label: string; value: string }[];
  selectedValue: string | undefined;
  error?: string;
}

export default function Select({
  selectedValue,
  onChange,
  placeholder,
  values,
  error,
}: SelectProps) {
  const pickerRef = useRef<any>();

  return (
    <View
      style={[
        styles.selectContainer,
        error ? { borderColor: '#f00', borderWidth: 1 } : { borderColor: colors.quinary },
      ]}
    >
      <RNPickerSelect
        placeholder={{
          label: placeholder,
          color: colors.quinary,
          value: null,
        }}
        style={{
          ...pickerSelectStyles,
          iconContainer: {
            top: 20,
            right: 10,
          },
          placeholder: {
            fontSize: 12,
            fontWeight: 'bold',
          },
        }}
        items={values}
        onValueChange={onChange}
        // style={pickerSelectStyles}
        value={selectedValue}
        ref={pickerRef}
      />
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

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 4,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: 'purple',
    borderRadius: 8,
    color: 'black',
    paddingRight: 30, // to ensure the text is never behind the icon
  },
});
