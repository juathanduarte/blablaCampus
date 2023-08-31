import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';

interface TabHeaderProps {
  labels: string[];
  activeTab: number;
  handleTabChange: (index: number) => void;
}

const TabHeader: React.FC<TabHeaderProps> = ({ labels, handleTabChange, activeTab }) => {
  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[styles.tab, { width: `${100 / labels.length}%` }]}
          onPress={() => handleTabChange(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>{label}</Text>
          {activeTab === index && <View style={styles.activeTab} />}
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  tab: {
    paddingVertical: 10,
    alignItems: 'center',
    position: 'relative',
  },
  activeTab: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 5,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
  activeTabText: {
    color: colors.primary,
    fontWeight: 'bold',
  },
  tabText: {
    fontSize: 16,
    color: colors.gray,
  },
});

export default TabHeader;
