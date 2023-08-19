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
      width: size === 'lg' ? 96 : size === 'md' ? 45 : size === 'sm' ? 36 : 36,
      height: size === 'lg' ? 96 : size === 'md' ? 45 : size === 'sm' ? 36 : 36,
      borderRadius: 100,
      overflow: 'hidden',
    },
  });
