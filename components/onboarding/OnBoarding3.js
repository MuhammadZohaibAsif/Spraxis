import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OnBoardingScreens from './OnBoardingScreens';

import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const OnBoarding3 = () => {
  const navigation = useNavigation();

  const handleNext = async () => {
    await AsyncStorage.setItem('hasSeenOnboarding', 'true');
    navigation.replace('Complete1'); 
  };
  return (
    <OnBoardingScreens
      illustration={require('../../assets/illustrations3.png')}
      slider={require('../../assets/Slider3.png')}
      title="The lessons you need to learn"
      subtitle="Using a variety of learning styles to learn and retain"
      onNext={handleNext} 
    />
  );
};

export default OnBoarding3;
