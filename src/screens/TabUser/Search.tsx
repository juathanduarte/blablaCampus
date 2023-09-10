import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Dimensions, FlatList, StyleSheet, Text, View } from 'react-native';
import { EdgeInsets, useSafeAreaInsets } from 'react-native-safe-area-context';
import Icon from '../../components/Icon';
import RideCard from '../../components/RideCard';
import Select from '../../components/Select';
import colors from '../../styles/colors';
import fonts from '../../styles/fonts';

export default function Search() {
  const insets = useSafeAreaInsets();
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState([
    {
      label: 'All',
      value: 'All',
    },
    {
      label: 'Restaurant',
      value: 'Restaurant',
    },
  ]);
  const [value, setValue] = React.useState('');

  return (
    <View>
      <StatusBar style="light" />
      <View style={styles({ insets }).headerContainer}>
        <View style={styles({}).headerUpperPart}>
          <Text style={styles({}).headerUpperText}>BlaBlaCampus</Text>
          {/* TODO: Change to Button Icon */}
          <Icon lib="FontAwesome" icon="bars" size={24} color="#fff" />
        </View>
        <Text style={styles({}).headerLowerPart}>Olá Gabriel!</Text>
      </View>

      <View style={styles({}).mainContainer}>
        <View style={styles({}).travelList}>
          <FlatList
            stickyHeaderHiddenOnScroll
            stickyHeaderIndices={[0]}
            ListHeaderComponent={() => {
              return (
                <View style={styles({}).selectContainer}>
                  <Select
                    onChange={(value, itemIndex) => {
                      console.log({ value, itemIndex });
                      setValue(value);
                    }}
                    values={items}
                    selectedValue={value}
                    placeholder="Escolha o local de Início"
                  />
                  <Select
                    onChange={(value, itemIndex) => {
                      console.log({ value, itemIndex });
                      setValue(value);
                    }}
                    values={items}
                    selectedValue={value}
                    placeholder="Escolha o local de Destino"
                  />
                </View>
              );
            }}
            style={styles({}).list}
            data={[1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6]}
            renderItem={({ item }) => (
              <RideCard
                dateTime="2021-08-20T18:00:00.000Z"
                destinyPoint="PUCRS"
                name="Gabriel"
                rating={4.5}
                role="Passageiro"
                startPoint="UFRGS"
                urlImage="https://avatars.githubusercontent.com/u/60005589?v=4"
              />
            )}
            keyExtractor={(item) => item.toString() + Math.random() * 10}
            CellRendererComponent={({ children, ...props }) => {
              return (
                <View {...props} style={styles({}).travelWrapper}>
                  {children}
                </View>
              );
            }}
          />
        </View>
      </View>
    </View>
  );
}

interface StylesProps {
  insets?: EdgeInsets;
}

const styles = ({ insets }: StylesProps) => {
  return StyleSheet.create({
    container: {},
    headerContainer: {
      backgroundColor: colors.primary,
      paddingTop: insets?.top,
      paddingBottom: 16,
      paddingHorizontal: 24,
      borderBottomLeftRadius: 24,
      borderBottomRightRadius: 24,
    },
    headerUpperPart: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12,
    },
    headerUpperText: {
      color: colors.white,
      fontFamily: fonts.text_bold,
      fontSize: 32,
    },
    headerLowerPart: {
      color: colors.white,
      fontFamily: fonts.text_bold,
      fontSize: 20,
    },
    mainContainer: {
      paddingTop: 16,
      paddingHorizontal: 24,
    },
    selectContainer: {
      gap: 16,
      backgroundColor: colors.white,
      marginBottom: 16,
      elevation: 5,
      padding: 0,
      shadowColor: '#110315',
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      borderRadius: 8,
    },
    travelList: {
      marginTop: 18,
      height: Dimensions.get('window').height - 200,
    },
    list: {},
    travelWrapper: {
      marginBottom: 16,
    },
  });
};
