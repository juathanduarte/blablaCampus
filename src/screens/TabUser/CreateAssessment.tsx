import React from 'react';
import {
  StyleSheet,
  View,
  Keyboard,
  Text,
  TouchableOpacity,
  TextInput,
  TouchableWithoutFeedback,
} from 'react-native';
import HeaderNav from '../../components/HeaderNav';
import { useNavigation } from '@react-navigation/native';
import Icon from '../../components/Icon';
import fonts from '../../styles/fonts';
import colors from '../../styles/colors';
import Button from '../../components/Button';

export default function CreateAssessment() {
  const navigate = useNavigation();
  const [rating, setRating] = React.useState(0);

  const handleStarClick = (star: number) => {
    setRating(star);
  };

  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <TouchableOpacity style={styles.star} key={i} onPress={() => handleStarClick(i)}>
          <Icon
            lib="FontAwesome"
            icon={'star'}
            size={30}
            color={i <= rating ? colors.primary : colors.gray}
          />
        </TouchableOpacity>
      );
    }
    return stars;
  };

  const handleDismissKeyboard = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={handleDismissKeyboard}>
      <View style={styles.header}>
        <View style={styles.HeaderNav}>
          <HeaderNav
            title="Alex lee"
            navigation={navigate}
            profileImage="https://avatars.githubusercontent.com/u/60272913?v=4"
          />
        </View>
        <View style={styles.container}>
          <Text style={styles.text}>Deixe um comentário</Text>
          <View style={styles.input}>
            <TextInput style={styles.inputField} multiline numberOfLines={5} />
          </View>
          <View style={styles.ratingContainer}>
            <Text style={styles.text}>Qual nota você da para esta carona?</Text>
            <View style={styles.starsContainer}>{renderStars()}</View>
          </View>
          <View style={styles.button}>
            <Button variant="primary" size="large" label="Avaliar" />
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
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
  ratingContainer: {
    paddingTop: 24,
  },
  text: {
    fontSize: 16,
    fontFamily: fonts.text_medium,
    paddingBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 8,
    minHeight: 125,
  },
  inputField: {
    flex: 1,
    fontSize: 16,
    fontFamily: fonts.text_medium,
  },
  star: {
    paddingHorizontal: 5,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  button: {
    paddingTop: 32,
  },
});
