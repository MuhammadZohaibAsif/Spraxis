import { StyleSheet, Text, View, SafeAreaView } from 'react-native';
import React from 'react';
import { useEffect } from 'react';
import { AppEventsLogger, Settings } from 'react-native-fbsdk-next';
import { AuthProvider } from './src/context/AuthContext';
import { UserAnswersProvider } from './src/context/UserAnswersContext';
import Toast from 'react-native-toast-message';
import AppNavigator from './src/navigation/AppNavigator';
import { GoalProvider } from './src/context/GoalContext';
import ChatBotScreen from './components/main/ChatBotScreen';
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
          <Toast />
        </AuthProvider>
      </GoalProvider>
    </UserAnswersProvider>
    // <ChatBotScreen />
  );
};

export default App;

const styles = StyleSheet.create({});
