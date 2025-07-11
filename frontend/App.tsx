import React, { useEffect, useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {
  HomeScreen,
  OnboardingScreen,
  ProductsDetailsScreen,
} from './src/screens';
import SplashScreen from 'react-native-splash-screen';
import { getItem } from './src/utils/AsyncStorage';
import { ActivityIndicator, View } from 'react-native';
import { GlobalContextProvider } from './src/lib/GlobalContext/GlobalContext';
import ThemeWrapper from './src/components/ThemeWrapper/ThemeWrapper';
import Navbar from './src/components/Navbar/Navbar';

export type RouteStackParamList = {
  Onboarding: undefined;
  HomeScreen: undefined;
  ProductDetails: { productId: string } | undefined;
};

const App = () => {
  const Stack = createNativeStackNavigator<RouteStackParamList>();
  const [showOnboarded, setShowOnboarded] = useState<boolean | null>(null);

  useEffect(() => {
    SplashScreen.hide();
    checkIfAlreadyOnboarded();
  }, []);

  const checkIfAlreadyOnboarded = async () => {
    const onboarded = await getItem('onboarded');
    if (onboarded === 200) {
      // successfully onboarded, don't show onboarding screen again
      setShowOnboarded(false);
      console.log(`it's value should be 200:`, onboarded);
    } else {
      // didn't onboard, show onboarding screen
      setShowOnboarded(true);
      console.log(`it's value is:`, onboarded);
    }
  };

  if (showOnboarded === null) {
    return (
      <View className="flex flex-1 justify-center items-center">
        <ActivityIndicator size={'large'} color={'#F3F3F3'} />
      </View>
    );
  }
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <GlobalContextProvider>
        <ThemeWrapper>
          <NavigationContainer>
            <Navbar />
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName={showOnboarded ? 'Onboarding' : 'HomeScreen'}>
              <Stack.Screen name="HomeScreen" component={HomeScreen} />
              <Stack.Screen name="Onboarding" component={OnboardingScreen} />
              <Stack.Screen
                name="ProductDetails"
                component={ProductsDetailsScreen}

              />
            </Stack.Navigator>
          </NavigationContainer>
        </ThemeWrapper>
      </GlobalContextProvider>
    </GestureHandlerRootView>
  );
};

export default App;
