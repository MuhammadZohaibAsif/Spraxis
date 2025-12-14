import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';

import AppNavigator from './src/navigation/AppNavigator';
import { useEffect } from 'react';
import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';
import { AuthProvider } from './src/context/AuthContext';
import OnBoarding1 from './components/onboarding/OnBoarding1';
import OnBoarding2 from './components/onboarding/OnBoarding2';
import OnBoarding3 from './components/onboarding/OnBoarding3';
import SetGoal1 from './components/goals/SetGoal1';
import Complete1 from './components/complete/Complete1';
import { Button, Alert } from 'react-native';
import { uploadLesson } from './src/utilis/uploadLesson';
import Complete1o from './components/complete/Complete1o';
import { UserAnswersProvider } from './src/context/UserAnswersContext';
const App = () => {
  /////////////////////////////////

  // const handleUpload = async () => {
  //   try {
  //     await uploadLesson();
  //     Alert.alert('✅ Success', 'Lesson uploaded successfully!');
  //   } catch (error: any) {
  //     Alert.alert('❌ Error', error.message);
  //   }
  // };
  /////////////////////////////////

  useEffect(() => {
    Settings.initializeSDK();
    AppEventsLogger.logEvent('App Launched');
  }, []);

  return (
    <UserAnswersProvider>
      <AuthProvider>
        <AppNavigator />
      </AuthProvider>
    </UserAnswersProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
