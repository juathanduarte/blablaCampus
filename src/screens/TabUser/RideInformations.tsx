import React from 'react';
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import { useNavigation } from '@react-navigation/native';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import RideUserCard from '../../components/RideUserCard';
import Button from '../../components/Button';

interface User {
  id: string;
  name: string;
  urlImage: string;
  rating: number;
  status: 'active' | 'inactive';
  type: 'motorista' | 'passageiro';
}

interface Carona {
  inicio: string;
  destino: string;
  data: string;
  horario: string;
}

interface userProps {
  user: User;
  carona: Carona;
}

export default function RideInformations({ user, carona }: userProps) {
  const navigate = useNavigation();
  const [users, setUsers] = React.useState<User[]>([]);

  const caronaTeste = {
    inicio: 'Campus Anglo',
    destino: 'Campus Capão do Leão',
    data: '18/09/2023 - Segunda-Feira',
    horario: '12:00',
  };

  React.useEffect(() => {
    setUsers([
      {
        id: '20102119',
        name: 'Lucas Ferreira',
        urlImage: 'https://github.com/lcsferreira.png',
        status: 'active',
        rating: 5.0,
        type: 'passageiro',
      },
      {
        id: '20102118',
        name: 'Gabriel Timm',
        urlImage: 'https://github.com/gstimm.png',
        status: 'active',
        rating: 5.0,
        type: 'motorista',
      },
      {
        id: '20152149',
        name: 'Juathan Duarte',
        urlImage: 'https://github.com/juathanduarte.png',
        status: 'inactive',
        rating: 5.0,
        type: 'passageiro',
      },
    ]);
  }, []);

  return (
    <View style={styles.header}>
      <View style={styles.HeaderNav}>
        <HeaderNav title="Informações da Carona" navigation={navigate} />
      </View>
      <View style={styles.container}>
        <Text style={styles.text}>Motorista</Text>
        {users?.map((user: User) =>
          user.type === 'motorista' ? (
            <View style={styles.cardSection} key={user.id}>
              <RideUserCard key={user.id} user={user} showButtons={true} />
            </View>
          ) : null
        )}
        <Text style={styles.text}>Passageiros</Text>
        {users?.map((user: User) =>
          user.type === 'passageiro' ? (
            <View style={styles.cardSection} key={user.id}>
              <RideUserCard key={user.id} user={user} showButtons={true} />
            </View>
          ) : null
        )}
        <View style={styles.rideInformation}>
          <Text style={styles.title}>Início:</Text>
          <Text style={styles.subtitle}>{caronaTeste.inicio}</Text>
          <Text style={styles.title}>Destino:</Text>
          <Text style={styles.subtitle}>{caronaTeste.destino}</Text>
          <Text style={styles.title}>Data:</Text>
          <Text style={styles.subtitle}>{caronaTeste.data}</Text>
          <Text style={styles.title}>Horário:</Text>
          <Text style={styles.subtitle}>{caronaTeste.horario}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flex: 1,
  },
  HeaderNav: {
    paddingHorizontal: 24,
    paddingTop: 7,
  },
  container: {
    paddingHorizontal: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingBottom: 4,
    paddingTop: 1,
  },
  rideInformation: {
    margin: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingTop: 3,
  },
  subtitle: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    color: colors.primary,
    paddingBottom: 3,
  },
  cardSection: {
    marginVertical: 10,
  },
});