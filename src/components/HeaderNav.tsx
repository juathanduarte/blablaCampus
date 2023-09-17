import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import Icon from './Icon';

interface HeaderProps {
  title?: string;
  navigation: any;
  toggleModal?: () => void;
  profileImage?: string;
}

export default function HeaderNav({ title, navigation, toggleModal, profileImage }: HeaderProps) {
  const handleGoBack = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.header}>
      <View style={styles.titleHeader}>
        <TouchableOpacity onPress={handleGoBack}>
          <Icon lib="IonIcons" icon="arrow-back-outline" size={22} />
        </TouchableOpacity>
        {profileImage ? <Image source={{ uri: profileImage }} style={styles.image} /> : null}

        <Text style={styles.textHeader}>{title}</Text>
      </View>
      <TouchableOpacity onPress={toggleModal}>
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
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
  },
});
