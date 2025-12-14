import React, { useContext, useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { View, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../context/AuthContext';
import { UserAnswersProvider } from '../context/UserAnswersContext';

import SplashScreen from '../../components/main/splashscreen';
import OnBoarding1 from '../../components/onboarding/OnBoarding1';
import OnBoarding2 from '../../components/onboarding/OnBoarding2';
import OnBoarding3 from '../../components/onboarding/OnBoarding3';
import LogIn from '../../components/auth/LogIn';
import SignUp from '../../components/auth/SignUp';
import SignUp2 from '../../components/auth/SignUp2';
import HomePage from '../../components/main/HomePage';


import Complete1 from '../../components/complete/Complete1';
import Complete1o from '../../components/complete/Complete1o'; 

import Complete2 from '../../components/complete/Complete2';
import Complete3 from '../../components/complete/Complete3';
import Complete4 from '../../components/complete/Complete4';
import Complete5 from '../../components/complete/Complete5';
import Complete6 from '../../components/complete/Complete6';
import Complete7 from '../../components/complete/Complete7';
import Congratulations from '../../components/supportedscreens/Congratulations'; 


const Stack = createNativeStackNavigator();

const AuthStack = () => (
  <Stack.Navigator
    initialRouteName="OnBoarding1"
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  >
    <Stack.Screen name="OnBoarding1" component={OnBoarding1} />
    <Stack.Screen name="OnBoarding2" component={OnBoarding2} />
    <Stack.Screen name="OnBoarding3" component={OnBoarding3} />
    <Stack.Screen name="SignUp" component={SignUp} />
    <Stack.Screen name="SignUp2" component={SignUp2} />
    <Stack.Screen name="Login" component={LogIn} />

    <Stack.Screen name="Complete1" component={Complete1} />
    <Stack.Screen name="Complete1o" component={Complete1o} />
    <Stack.Screen name="Complete2" component={Complete2} />
    <Stack.Screen name="Complete3" component={Complete3} />
    <Stack.Screen name="Complete4" component={Complete4} />
    <Stack.Screen name="Complete5" component={Complete5} />
    <Stack.Screen name="Complete6" component={Complete6} />
    <Stack.Screen name="Complete7" component={Complete7} />
    <Stack.Screen name="Congratulations" component={Congratulations} /> 
  </Stack.Navigator>
);

const HomeStack = () => (
  <Stack.Navigator
    initialRouteName="HomePage"
    screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
  >
    <Stack.Screen name="HomePage" component={HomePage} />
  </Stack.Navigator>
);

const AppNavigator = () => {
  const { user, initializing } = useContext(AuthContext);
  const [showSplash, setShowSplash] = useState(true);
  const [hasSeenOnboarding, setHasSeenOnboarding] = useState(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const checkOnboardingStatus = async () => {
      const seen = await AsyncStorage.getItem('hasSeenOnboarding');
      setHasSeenOnboarding(seen === 'false');
    };
    checkOnboardingStatus();
  }, []);

  if (initializing || hasSeenOnboarding === null) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#4F6EF7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <UserAnswersProvider>
        {showSplash ? (
          <SplashScreen />
        ) : user ? (
          <HomeStack />
        ) : hasSeenOnboarding ? (
          <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Login" component={LogIn} />
            <Stack.Screen name="SignUp" component={SignUp} />
            <Stack.Screen name="SignUp2" component={SignUp2} />
          </Stack.Navigator>
        ) : (
          <AuthStack />
        )}
      </UserAnswersProvider>
    </NavigationContainer>
  );
};

export default AppNavigator;
