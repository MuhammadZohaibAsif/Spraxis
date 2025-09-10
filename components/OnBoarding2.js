import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import OnBoardingScreens from './OnBoardingScreens';

const OnBoarding2 = () => {
  return (
    <OnBoardingScreens illustration={require('../assets/illustrations2.png')}
    slider={require("../assets/Slider2.png")}
    title="Take your time to learn"
    subtitle="Develop a habit of learning and make it a part of your daily routine"
    />
  );
};

export default OnBoarding2;


