import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';
import { AuthProvider } from './src/context/AuthContext';
import { Button, Alert } from 'react-native';
import { uploadLesson } from './src/utilis/uploadLesson';
import { UserAnswersProvider } from './src/context/UserAnswersContext';

import AppNavigator from './src/navigation/AppNavigator';
import OnBoarding1 from './components/onboarding/OnBoarding1';
import OnBoarding2 from './components/onboarding/OnBoarding2';
import OnBoarding3 from './components/onboarding/OnBoarding3';
import SetGoal1 from './components/goals/SetGoal1';
import Complete1 from './components/complete/Complete1';
import Complete1o from './components/complete/Complete1o';
import LogIn from './components/auth/LogIn';
import SignUp from './components/auth/SignUp';
import SignUp2 from './components/auth/SignUp2';
import Complete2 from './components/complete/Complete2';
import Complete3 from './components/complete/Complete3';
import Complete4 from './components/complete/Complete4';
import Complete5 from './components/complete/Complete5';
import Complete6 from './components/complete/Complete6';
import Complete7 from './components/complete/Complete7';
import SetGoal2 from './components/goals/SetGoal2';
//////////////////////////////////////////////////

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
