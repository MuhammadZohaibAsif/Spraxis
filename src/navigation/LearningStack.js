import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LearningTip from '../../components/supportedscreens/LearningTip';
import Que7 from '../../components/lessons/Que7';
import Que5 from '../../components/lessons/Que5';
import Que8 from '../../components/lessons/Que8';
import FeaturedCourses from '../../components/lessons/FeaturedCourses';
import LessonCompleted from '../../components/supportedscreens/LessonCompleted';
import LearningLayout from '../../components/layout/LearningLayout';
// later you will add more screens here
// import LessonScreen from ...
// import QuizScreen from ...

const Stack = createNativeStackNavigator();

const LearningStack = () => {
  return (
    <Stack.Navigator
      initialRouteName="LearningTip"
      screenOptions={{ headerShown: false }}
    >
      {/* <Stack.Screen name="LearningTip" component={LearningTip} />
      <Stack.Screen name="Que5" component={Que5} />
      <Stack.Screen name="Que7" component={Que7} />
      <Stack.Screen name="Que8" component={Que8} />
      <Stack.Screen name="FeaturedCourses" component={FeaturedCourses} />
      <Stack.Screen name="LessonCompleted" component={LessonCompleted} /> */}

      <Stack.Screen
        name="LearningTip"
        component={props => (
          <LearningLayout>
            <LearningTip {...props} />
          </LearningLayout>
        )}
      />

      <Stack.Screen
        name="Que5"
        component={props => (
          <LearningLayout>
            <Que5 {...props} />
          </LearningLayout>
        )}
      />

      <Stack.Screen
        name="Que7"
        component={props => (
          <LearningLayout>
            <Que7 {...props} />
          </LearningLayout>
        )}
      />

      <Stack.Screen
        name="Que8"
        component={props => (
          <LearningLayout>
            <Que8 {...props} />
          </LearningLayout>
        )}
      />

      <Stack.Screen
        name="FeaturedCourses"
        component={props => (
          <LearningLayout>
            <FeaturedCourses {...props} />
          </LearningLayout>
        )}
      />

      <Stack.Screen
        name="LessonCompleted"
        component={props => (
          <LearningLayout>
            <LessonCompleted {...props} />
          </LearningLayout>
        )}
      />
    </Stack.Navigator>
  );
};

export default LearningStack;
