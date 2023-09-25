import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import fonts from '../../styles/fonts';
export default function Messages() {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderNav title="Mensagens" navigation={navigation} />
      </View>
      <View style={styles.containerBody}>
        <Text style={styles.text}>EM CONSTRUÇÃO</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerHeader: {
    paddingHorizontal: 24,
  },
  containerBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontFamily: fonts.text_bold,
  },
});
