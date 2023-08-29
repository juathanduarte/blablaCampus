import React from 'react';

import { StyleSheet, Text, TouchableOpacity, View, SafeAreaView } from 'react-native';

import Icon from '../components/Icon';
import TabHeader from '../components/TabHeader';
import UserCard from '../components/UserCard';

interface User {
  id: string;
  name: string;
  urlImage: string;
  status: 'active' | 'inactive';
}

const Admin = ({ navigation }: any) => {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const [users, setUsers] = React.useState<User[]>([]);
  const [points, setPoints] = React.useState([]);

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
        status: 'active',
      },
      {
        id: '20152149',
        name: 'Juathan Duarte',
        urlImage: 'https://github.com/juathanduarte.png',
        status: 'active',
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

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleHeader}>
          <TouchableOpacity onPress={handleGoBack}>
            <Icon lib="IonIcons" icon="arrow-back-outline" size={22} />
          </TouchableOpacity>
          <Text style={styles.textHeader}>Bem vindo Admin</Text>
        </View>
        <TouchableOpacity onPress={handleOpenDetail}>
          <Icon lib="IonIcons" icon="ellipsis-vertical" size={22} />
        </TouchableOpacity>
      </View>
      <TabHeader
        labels={['Usuários', 'Pontos']}
        handleTabChange={handleTabChange}
        activeTab={selectedTab}
      />
      {/* todo : SearchInput */}
      <View style={{ flex: 1, width: '100%' }}>
        {selectedTab === 0 ? (
          <View style={styles.content}>
            {users?.map((user: any) => <UserCard key={user.id} user={user} />)}
          </View>
        ) : (
          <View>
            <Text>Pontos</Text>
          </View>
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
    paddingHorizontal: 24,
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 50,
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
    width: '100%',
    marginTop: 20,
    gap: 20,
  },
});

export default Admin;
