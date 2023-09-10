import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import CarCard from '../../components/CarCard';
import Rating from '../../components/Rating';
import RideCard from '../../components/RideCard';
import TabHeader from '../../components/TabHeader';
import fonts from '../../styles/fonts';
import Button from '../../components/Button';

const Profile = () => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [avaliações, setAvaliações] = React.useState(23);
  const [caronasOfertadas, setCaronasOfertadas] = React.useState(14);
  const [caronasRecebidas, setCaronasRecebidas] = React.useState(33);

  const navigation = useNavigation();

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const onSubmit = () => {};

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.section}>
          <Image
            source={{
              uri: 'https://avatars.githubusercontent.com/u/26155340?s=400&u=afa52086562394d1489670fa765628d480e2bfb9&v=4',
            }}
            style={styles.profileImage}
          />

          <Text style={styles.name}>Thiago Scholl</Text>
        </View>
        <View style={styles.menu}>
          <TouchableOpacity style={styles.menu3Items}>
            <Text style={styles.menuNumber}>{avaliações}</Text>
            <Text style={styles.menuText}>Avaliações</Text>
            <View style={styles.menuIcon}>
              <Rating rating={5} />
            </View>
          </TouchableOpacity>
          <View style={styles.separator}></View>
          <View style={styles.menu2Items}>
            <Text style={styles.menuNumber}>{caronasOfertadas}</Text>
            <Text style={styles.menuText}>Caronas Ofertadas</Text>
          </View>
          <View style={styles.separator}></View>
          <View style={styles.menu2Items}>
            <Text style={styles.menuNumber}>{caronasRecebidas}</Text>
            <Text style={styles.menuText}>Caronas Recebidas</Text>
          </View>
        </View>
      </View>
      <View style={styles.tab}>
        <TabHeader
          labels={['Histórico', 'Solicitações', 'Veículos']}
          handleTabChange={handleTabChange}
          activeTab={selectedTab}
        />
      </View>

      {/* Futuro Conteúdo da página */}

      {selectedTab === 0 ? (
        <View>
          <ScrollView>
            <View style={styles.content}>
              <RideCard
                dateTime="2021-08-20T18:00:00.000Z"
                destinyPoint="PUCRS"
                name="Gabriel"
                rating={4.5}
                role="Passageiro"
                startPoint="UFRGS"
                urlImage="https://avatars.githubusercontent.com/u/60005589?v=4"
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button variant="primary" size="small" icon={'add'} onClick={onSubmit} />
          </View>
        </View>
      ) : selectedTab === 1 ? (
        <View>
          <ScrollView>
            <View style={styles.content}>
              <RideCard
                dateTime="2021-08-20T18:00:00.000Z"
                destinyPoint="PUCRS"
                name="Gabriel"
                rating={4.5}
                role="Recusada"
                startPoint="UFRGS"
                urlImage="https://avatars.githubusercontent.com/u/60005589?v=4"
              />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button variant="primary" size="small" icon={'add'} onClick={onSubmit} />
          </View>
        </View>
      ) : (
        <View>
          <ScrollView>
            <View style={styles.content}>
              <CarCard brand="Ford" model="Belina" year={1983} color="Bege" plate="IEL-8120" />
            </View>
          </ScrollView>
          <View style={styles.buttonContainer}>
            <Button variant="primary" size="small" icon={'add'} onClick={onSubmit} />
          </View>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF', // Fundo branco
    paddingHorizontal: 24,
    paddingTop: 18,
  },
  section: {
    marginRight: 8,
  },
  profileImage: {
    marginLeft: 8,
    width: 92,
    height: 92,
    borderRadius: 48,
  },
  name: {
    fontSize: 16,
    fontFamily: fonts.text_bold,
    marginTop: 8,
  },
  menu: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '30%',
    marginLeft: 16,
  },
  menu3Items: {
    flexDirection: 'column',
    alignItems: 'center',
    paddingTop: 8,
  },
  menu2Items: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  menuNumber: {
    fontSize: 14,
    fontFamily: fonts.text_regular,
  },
  menuText: {
    fontSize: 12,
    fontFamily: fonts.text_regular,
    textAlign: 'center',
  },
  menuIcon: {
    paddingTop: 3,
  },
  separator: {
    height: 32,
    width: 1,
    backgroundColor: '#DDDDDD',
    marginHorizontal: 8,
  },
  tab: {
    paddingTop: 12,
    paddingHorizontal: 24,
    backgroundColor: '#FFF',
  },
  content: {
    paddingTop: 16,
    paddingHorizontal: 24,
  },
  buttonContainer: {
    margin: 16,
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'flex-end',
  },
});

export default Profile;
