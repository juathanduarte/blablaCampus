import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import colors from '../styles/colors';
import fonts from '../styles/fonts';

interface DropdownProps {
  open: boolean;
  label: string;
  type: string;
  items: { label: string; type: string }[];
  setOpen: (open: any) => void;
  setValue: (value: any) => void;
  setItems: (items: { label: string; value: string }[]) => void;
}

const Dropdown = ({ open, label, type, items, setOpen, setValue, setItems }: DropdownProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{type}</Text>
      <DropDownPicker
        open={open}
        value={type}
        items={items}
        setOpen={setOpen}
        setValue={setValue}
        setItems={setItems}
        placeholder={`${label} ${type}`}
        placeholderStyle={styles.placeholder}
        style={styles.dropdown}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  dropdown: {
    borderColor: colors.quinary,
  },
  text: {
    color: colors.title,
    fontFamily: fonts.text_medium,
    fontSize: 22,
    marginBottom: 12,
  },
  placeholder: {
    color: colors.quaternary,
    fontFamily: fonts.text_medium,
    fontSize: 16,
  },
});

export default Dropdown;
