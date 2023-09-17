import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View } from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import { useNavigation } from '@react-navigation/native';
import TabHeader from '../../components/TabHeader';
import ReviewCard from '../../components/ReviewCard';

export default function Assessments() {
  const [selectedTab, setSelectedTab] = React.useState(0);
  const navigation = useNavigation();

  const handleTabChange = (index: number) => {
    setSelectedTab(index);
  };

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleOpenDetail = () => {
    console.log('Detail');
    // navigation.navigate('Detail');
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <HeaderNav title="Ver Avaliações" navigation={navigation} />
        <TabHeader
          labels={['Enviadas', 'Recebidas']}
          handleTabChange={handleTabChange}
          activeTab={selectedTab}
        />
      </View>
      <ScrollView style={styles.scrollContent}>
        <View style={styles.content}>
          {selectedTab === 0 ? (
            <View>
              <ReviewCard
                image="https://avatars.githubusercontent.com/u/26155340?s=400&u=afa52086562394d1489670fa765628d480e2bfb9&v=4"
                name="Thiago"
                type="Motorista"
                rating={5}
                reviewText="Muito bom asdas dasdasidhawudhewijdewuidjew odjewi hew dweiu weio dhewjio we"
              />
            </View>
          ) : (
            <View>
              <ReviewCard
                image="https://avatars.githubusercontent.com/u/26155340?s=400&u=afa52086562394d1489670fa765628d480e2bfb9&v=4"
                name="Thiago"
                type="Passageiro"
                rating={1}
                reviewText="Muito Ruim Ruim Ruim Ruim Ruim Ruim Ruim Ruim hew dweiu weio dhewjio we"
              />
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingTop: 7,
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 7,
  },
  scrollContent: {
    flexGrow: 1,
  },
});
