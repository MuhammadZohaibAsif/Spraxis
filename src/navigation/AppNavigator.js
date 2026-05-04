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

import BottomTabs from './BottomTabs';
import Complete1 from '../../components/complete/Complete1';
import Complete1o from '../../components/complete/Complete1o';

import Complete2 from '../../components/complete/Complete2';
import Complete3 from '../../components/complete/Complete3';
import Complete4 from '../../components/complete/Complete4';
import Complete5 from '../../components/complete/Complete5';
import Complete6 from '../../components/complete/Complete6';
import Complete7 from '../../components/complete/Complete7';
import Congratulations from '../../components/supportedscreens/Congratulations';
import LearningStack from './LearningStack';
//////////////////

import SetGoal1 from '../../components/goals/SetGoal1';
import SetGoal2 from '../../components/goals/SetGoal2';
import SetGoal3 from '../../components/goals/SetGoal3';
import SetGoal4 from '../../components/goals/SetGoal4';
import SetGoal5 from '../../components/goals/SetGoal5';
import Settings from '../../components/main/Settings';
import Activity from '../../components/main/Activity';
import InviteFriend from '../../components/supportedscreens/InviteFriend';
import ChatBotScreen from '../../components/main/ChatBotScreen';
import PronunciationScreen from '../../components/main/PronunciationScreen';
import TestObjectRecognition from '../screens/TestObjectRecognition';

const Stack = createNativeStackNavigator();

const GoalsStack = () => {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SetGoal1" component={SetGoal1} />
      <Stack.Screen name="SetGoal2" component={SetGoal2} />
      <Stack.Screen name="SetGoal3" component={SetGoal3} />
      <Stack.Screen name="SetGoal4" component={SetGoal4} />
      <Stack.Screen name="SetGoal5" component={SetGoal5} />
    </Stack.Navigator>
  );
};

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

// const HomeStack = () => (
//   <Stack.Navigator
//     initialRouteName="HomePage"
//     screenOptions={{ headerShown: false, animation: 'slide_from_right' }}
//   >
//     <Stack.Screen name="HomePage" component={HomePage} />
//   </Stack.Navigator>
// );

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
      // setHasSeenOnboarding(seen === 'true');
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
      {/* <UserAnswersProvider> */}
      {showSplash ? (
        <SplashScreen />
      ) : user ? (
        // <BottomTabs/>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          {/* Main App */}
          <Stack.Screen name="BottomTabs" component={BottomTabs} />
          <Stack.Screen name="Settings" component={Settings} />
          <Stack.Screen name="InviteFriend" component={InviteFriend} />
          {/* Activity Screen */}
          <Stack.Screen name="Activity" component={Activity} />
          {/* Learning Flow */}
          <Stack.Screen name="LearningStack" component={LearningStack} />
          {/* Goals Flow */}
          <Stack.Screen name="GoalsStack" component={GoalsStack} />
          <Stack.Screen name="ChatBotScreen" component={ChatBotScreen} />
          <Stack.Screen
            name="PronunciationScreen"
            component={PronunciationScreen}
          />
          <Stack.Screen
            name="TestObjectRecognition"
            component={TestObjectRecognition}
          />
        </Stack.Navigator>
      ) : hasSeenOnboarding ? (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LogIn} />
          <Stack.Screen name="SignUp" component={SignUp} />
          <Stack.Screen name="SignUp2" component={SignUp2} />
        </Stack.Navigator>
      ) : (
        <AuthStack />
      )}
      {/* </UserAnswersProvider> */}
    </NavigationContainer>
  );
};

export default AppNavigator;
