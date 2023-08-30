import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';

import Button from '../components/Button';
import Input from '../components/Input';

import Icon from '../components/Icon';

export default function CreatePoint({ navigation }: any) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    navigation.navigate('Detail');
  };

  const handleAdd = () => {
    console.log('Add');
    navigation.navigate('Admin');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleHeader}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon lib="IonIcons" icon="arrow-back-outline" size={22} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Novo Ponto</Text>
        </View>
        <TouchableOpacity onPress={handleOpenDetail}>
          <Icon lib="IonIcons" icon="ellipsis-vertical" size={22} />
        </TouchableOpacity>
      </View>
      {/* <ScrollView> */}
      <View style={styles.content}>
        <Input label="Nome" />
        <Input label="CEP" />
        <Input label="Estado" />
        <Input label="Cidade" />
        <Input label="Logradouro" />
        <Input label="Número" />
        <Input label="Complemento" />
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
