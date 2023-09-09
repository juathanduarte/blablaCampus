import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';

import Button from '../components/Button';
import Input from '../components/Input';

import Icon from '../components/Icon';
import HeaderNav from '../components/HeaderNav';

export default function CreateCar({ navigation }: any) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    // navigation.navigate('Detail');
    console.log('Detail');
  };

  const handleAdd = () => {
    console.log('Add');
    navigation.navigate('Admin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="Cadastrar Veículo" navigation={navigation} />
      {/* <ScrollView> */}
      <View style={styles.content}>
        <Input label="Marca" />
        <Input label="Modelo" />
        <Input label="Placa" />
        <Input label="Renavam" />
        <Input label="Ano" />
        <Input label="Cor" />
        <Input label="Lugares Disponíveis" />
        <Button onClick={handleAdd} label="Cadastrar" variant="primary" size="large" />
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 32,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 20,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
  },
  content: {
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 20,
  },
});
