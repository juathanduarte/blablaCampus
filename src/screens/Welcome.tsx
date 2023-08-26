import * as React from 'react';
import { Image, SafeAreaView, StyleSheet, View } from 'react-native';

import colors from '../styles/colors';

import blablaCampusLogo from '../assets/blablaCampusLogo.png';
import ufpelLogo from '../assets/ufpelLogo.png';

const Welcome = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={blablaCampusLogo} />
        <Image source={ufpelLogo} style={styles.ufpelLogo} />
      </View>
    </SafeAreaView>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.white,
  },
  imageContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  ufpelLogo: {
    marginLeft: 'auto',
  },
});
