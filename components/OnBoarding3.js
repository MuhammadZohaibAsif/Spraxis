import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OnBoardingScreens from './OnBoardingScreens';
const OnBoarding3 = () => {
  return (
    <OnBoardingScreens
      illustration={require('../assets/illustrations3.png')}
      slider={require('../assets/Slider3.png')}
      title="The lessons you need to learn"
      subtitle="Using a variety of learning styles to learn and retain"
    />
  );
};

export default OnBoarding3;
