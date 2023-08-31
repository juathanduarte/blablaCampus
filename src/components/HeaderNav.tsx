import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import Icon from './Icon';

interface HeaderProps {
  title?: string;
  navigation: any;
}

export default function HeaderNav({ title, navigation }: HeaderProps) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    console.log('open detail');
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon lib="IonIcons" icon="arrow-back-outline" size={22} />
        </TouchableOpacity>
        <Text style={styles.textHeader}>{title}</Text>
      </View>
      <TouchableOpacity onPress={handleOpenDetail}>
        <Icon lib="IonIcons" icon="ellipsis-vertical" size={22} />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 24,
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
});
