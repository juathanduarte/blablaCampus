import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';

interface AvatarProps extends StyleProps {
  urlImage: string;
}

export default function Avatar({ size, urlImage }: AvatarProps) {
  return (
    <View style={styles({ size }).avatar} key={size}>
      <Image source={{ uri: urlImage }} style={{ width: '100%', height: '100%' }} />
    </View>
  );
}

interface StyleProps {
  size: 'lg' | 'md' | 'sm' | 'xs';
}

const styles = ({ size }: StyleProps) =>
  StyleSheet.create({
    avatar: {
      width: getValue(size),
      height: getValue(size),
      borderRadius: 100,
      overflow: 'hidden',
    },
  });

function getValue(size: StyleProps['size']) {
  let value = 0;
  switch (size) {
    case 'lg':
      value = 96;
      break;
    case 'md':
      value = 45;
      break;
    case 'sm':
      value = 36;
      break;
    case 'xs':
      value = 32;
      break;
    default:
      value = 36;
      break;
  }
  return value;
}
