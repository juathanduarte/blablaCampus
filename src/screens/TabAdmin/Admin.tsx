import React from 'react';

import { useNavigation } from '@react-navigation/native';
import { useQuery } from '@tanstack/react-query';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import Button from '../../components/Button';
import HeaderNav from '../../components/HeaderNav';
import ModalMoreActions from '../../components/ModalMoreActions';
import TabHeader from '../../components/TabHeader';
import TravelPointCard from '../../components/TravelPointCard';
import UserCard from '../../components/UserCard';
import { getCollegeSpots } from '../../services/collegespot';
import { getUsers } from '../../services/user';

const Admin = () => {
  const navigation = useNavigation();

  const [selectedTab, setSelectedTab] = React.useState(0);

  const [isModalVisible, setIsModalVisible] = React.useState(false);

  function toggleModal() {
    setIsModalVisible(!isModalVisible);
  }

  const { data: collegeSpots, isLoading } = useQuery({
    queryKey: ['spots'],
    queryFn: getCollegeSpots,
  });

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    console.log('open detail');
  };

  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers,
  });

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const handleAddPoint = () => {
    // @ts-ignore
    navigation.navigate('CreatePoint');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.containerHeader}>
        <HeaderNav title="Bem vindo Admin" toggleModal={toggleModal} icon />
      </View>
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
              {users?.map((user) => <UserCard key={user.registration} user={user} />)}
            </View>
          </ScrollView>
        ) : (
          <ScrollView>
            <View style={styles.content}>
              {collegeSpots?.map((point) => (
                <TravelPointCard
                  key={point.name}
                  name={point.name}
                  address={`${point.street}, ${point.number} - ${point.neighborhood}`}
                  spot={point}
                />
              ))}
              <Button
                variant="primary"
                size="large"
                icon="add"
                label="Adicionar"
                onClick={handleAddPoint}
              />
            </View>
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
  containerHeader: {
    width: '100%',
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
