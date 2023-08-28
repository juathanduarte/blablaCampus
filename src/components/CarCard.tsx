import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import colors from '../styles/colors';

interface CarProps {
  brand: string;
  model: string;
  year: number;
  plate: string;
  color: string;
}

export default function CarCard({ brand, model, year, plate, color }: CarProps) {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.title}>Marca / Modelo:</Text>
        <Text style={styles.content}>
          {brand} {model}
        </Text>
      </View>
      <View style={styles.detail}>
        <View>
          <Text style={styles.title}>Ano:</Text>
          <Text style={styles.content}>{year}</Text>
        </View>
        <View>
          <Text style={styles.title}>Placa:</Text>
          <Text style={styles.content}>{plate}</Text>
        </View>
        <View>
          <Text style={styles.title}>Cor:</Text>
          <Text style={styles.content}>{color}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '80%',
    borderRadius: 8,
    backgroundColor: colors.white,
    padding: 24,
    boxShadow: '0px 8px 25px 0px rgba(83, 89, 144, 0.07)',
    display: 'flex',
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 12,
    color: colors.primary,
    fontWeight: '500',
  },
  content: {
    fontSize: 16,
    color: colors.title,
    fontWeight: '500',
  },
  detail: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
