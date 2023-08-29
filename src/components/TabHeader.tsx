import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import colors from '../styles/colors';

interface TabHeaderProps {
  labels: string[];
}

const TabHeader: React.FC<TabHeaderProps> = ({ labels }) => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabPress = (index: number) => {
    setActiveTab(index);
  };

  return (
    <View style={styles.container}>
      {labels.map((label, index) => (
        <TouchableOpacity
          key={index}
          style={[
            styles.tab,
            { width: `${100 / labels.length}%` },
            activeTab === index && styles.activeTab,
          ]}
          onPress={() => handleTabPress(index)}
        >
          <Text style={[styles.tabText, activeTab === index && styles.activeTabText]}>{label}</Text>
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
    borderBottomWidth: 5,
    borderBottomColor: '#fafafa',
  },
  activeTab: {
    borderBottomColor: colors.primary,
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
