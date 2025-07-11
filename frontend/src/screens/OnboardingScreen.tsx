import { View, Image } from 'react-native';
import React from 'react';
import Onboarding from 'react-native-onboarding-swiper';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { setItem } from '../utils/AsyncStorage';
import { RouteStackParamList } from '../../App';

type Props = {};
export type RootStackParamList = {
  Login: { id: number } | undefined;

};

const OnboardingScreen = (props: Props) => {
  const navigation = useNavigation<StackNavigationProp<RouteStackParamList>>();

  const handleDone = async () => {
    await setItem('onboarded', 200);
    navigation.navigate('HomeScreen'); // on press will navigate to HomeScreen
  };

  return (
    <View className="flex-1">
      <Onboarding
        onSkip={handleDone} // when skip or done go to home screen
        onDone={handleDone}
        pages={[
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{ uri: 'https://wallpapersok.com/images/high/sabrina-carpenter-playful-pose-7zgid16uwzlup7aw.jpg' }}
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
              />
            ),
            title: "Waka Waka",
            subtitle: "Onboarding screen 1, write whatever u like",
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{ uri: 'https://www.zastavki.com/pictures/originals/2024/_Cute_blonde_actress_Sabrina_Carpenter_with_expressive_eyes_176226_.jpg' }}
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
              />
            ),
            title: "Hola",
            subtitle: "Onboarding screen 2, write whatever u like",
          },
          {
            backgroundColor: '#fff',
            image: (
              <Image
                source={{ uri: 'https://www.zastavki.com/pictures/originals/2024/_Cute_blonde_actress_Sabrina_Carpenter_with_expressive_eyes_176226_.jpg' }}
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
              />
            ),
            title: "Heyy",
            subtitle: "Onboarding screen 3, write whatever u like",
          },
        ]}
      />
    </View>
  );
};

export default OnboardingScreen;
