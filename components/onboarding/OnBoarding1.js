import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OnBoardingScreens from './OnBoardingScreens';
const OnBoarding1 = () => {
  return (
    <OnBoardingScreens
      illustration={require('../../assets/illustrations1.png')}
      slider={require('../../assets/Slider1.png')}
      title="Confidence in your words"
      subtitle="With conversation-based learning, you'll be talking from lesson one"
      nextScreen="OnBoarding2"
    />
  );
};

export default OnBoarding1;
