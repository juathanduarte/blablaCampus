import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Button from '../components/Button';
import ButtonIcon from '../components/ButtonIcon';

const Search = () => {
  return (
    <View>
      <Text>Search</Text>
      <View
        style={{
          marginHorizontal: 'auto',
          width: 50,
          height: 50,
          marginBottom: 20,
          marginLeft: 20,
        }}
      >
        <ButtonIcon
          variant="primary"
          IconProps={{ icon: 'add', lib: 'IonIcons', size: 48, color: 'white' }}
          onClick={() => console.log('clicou')}
        />
      </View>

      <View style={{ flexDirection: 'column', gap: 10 }}>
        <Button
          size="small"
          variant="primary"
          label="Small"
          // IconProps={{ icon: 'chatbox', lib: 'IonIcons', size: 24, color: 'white' }}
        />
        <Button
          size="small"
          variant="primary"
          label="Small IconIcon"
          IconProps={{ icon: 'chatbox', lib: 'IonIcons', size: 12, color: 'white' }}
        />
        <Button
          size="large"
          variant="primary"
          label="Large"
          labelWeight="bold"
          // IconProps={{ icon: 'chatbox', lib: 'IonIcons', size: 24, color: 'white' }}
        />
        <Button
          size="large"
          variant="primary"
          label="Large icon"
          labelWeight="bold"
          IconProps={{ icon: 'chatbox', lib: 'IonIcons', size: 24, color: 'white' }}
        />
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  teste: {
    backgroundColor: 'red',
    padding: 20,
    display: 'flex',
    flexDirection: 'row',
    gap: 20,
  },
});
