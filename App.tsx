import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import SplashScreen from './components/splashscreen';
import OnBoarding from './components/onBoarding1';

const App = () => {
  return (
    <>
      {/* <SplashScreen /> */}
      <OnBoarding />
    </>
  );
};

export default App;

const styles = StyleSheet.create({});
