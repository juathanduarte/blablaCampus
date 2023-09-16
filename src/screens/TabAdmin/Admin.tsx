import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView, ScrollView } from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import TabHeader from '../../components/TabHeader';
import TravelPointCard from '../../components/TravelPointCard';
import UserCard from '../../components/UserCard';
import Button from '../../components/Button';
import ModalMoreActions from '../../components/ModalMoreActions';
import { useNavigation } from '@react-navigation/native';

interface User {
  id: string;
  name: string;
  urlImage: string;
  status: 'active' | 'inactive';
}

interface Point {
  id: string;
  name: string;
  address: string;
}

const Admin = () => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = React.useState(0);
  const [users, setUsers] = React.useState<User[]>([]);
  const [points, setPoints] = React.useState<Point[]>([]);

  const [isModalVisible, setIsModalVisible] = React.useState(false);
  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  React.useEffect(() => {
    setUsers([
      {
        id: '20102119',
        name: 'Lucas Ferreira',
        urlImage: 'https://github.com/lcsferreira.png',
        status: 'active',
      },
      {
        id: '20102118',
        name: 'Gabriel Timm',
        urlImage: 'https://github.com/gstimm.png',
        status: 'inactive',
      },
      {
        id: '20152149',
        name: 'Juathan Duarte',
        urlImage: 'https://github.com/juathanduarte.png',
        status: 'active',
      },
    ]);
    setPoints([
      {
        id: '1',
        name: 'Ponto 1',
        address: 'Rua 1',
      },
      {
        id: '2',
        name: 'Ponto 2',
        address: 'Rua 2',
      },
      {
        id: '3',
        name: 'Ponto 3',
        address: 'Rua 3',
      },
    ]);
  }, []);

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    console.log('open detail');
  };

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const handleAddPoint = () => {
    // @ts-ignore
    navigation.navigate('CreatePoint');
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderNav title="Bem vindo Admin" navigation={navigation} toggleModal={toggleModal} />
      <ModalMoreActions isVisible={isModalVisible} toggleModal={toggleModal} />
      <TabHeader
        labels={['Usuários', 'Pontos']}
        handleTabChange={handleTabChange}
        activeTab={selectedTab}
      />
      {/* todo : SearchInput */}
      <View style={{ flex: 1, width: '100%' }}>
        {selectedTab === 0 ? (
          <ScrollView>
            <View style={styles.content}>
              {users?.map((user: User) => <UserCard key={user.id} user={user} />)}
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={styles.content}>
              {points?.map((point: any) => (
                <TravelPointCard key={point.id} name={point.name} address={point.address} />
              ))}
            </View>
            <Button variant="primary" size="small" icon="add" onClick={handleAddPoint} />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    // justifyContent: 'space-between',
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 32,
    marginBottom: 20,
  },
  titleHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  textHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    fontSize: 16,
  },
  content: {
    flex: 1,
    marginTop: 20,
    gap: 20,
    marginBottom: 20,
    paddingHorizontal: 24,
  },
});

export default Admin;
