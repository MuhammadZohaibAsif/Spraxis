import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';
import { AuthProvider } from './src/context/AuthContext';
import { UserAnswersProvider } from './src/context/UserAnswersContext';

import AppNavigator from './src/navigation/AppNavigator';
import { GoalProvider } from './src/context/GoalContext';
//////////////////////////////////////////////////

const App = () => {
  useEffect(() => {
    Settings.initializeSDK();
    AppEventsLogger.logEvent('App Launched');
  }, []);

  return (
    <UserAnswersProvider>
      <GoalProvider>
        <AuthProvider>
          <AppNavigator />
        </AuthProvider>
      </GoalProvider>
    </UserAnswersProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
