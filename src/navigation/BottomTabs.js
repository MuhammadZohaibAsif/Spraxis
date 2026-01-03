import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, View, Text, StyleSheet } from 'react-native';

import HomePage from '../../components/main/HomePage';
import Task from '../../components/main/Task';
import Progress from '../../components/progress/Progress';
import Profile from '../../components/main/Profile';
//
import homeFill from '../../assets/icons/homeFill.png';
import homeOutline from '../../assets/icons/homeOutline.png';
//
import userfill from '../../assets/icons/userfill.png';
import userOutline from '../../assets/icons/userOutline.png';
//
import piechartFill from '../../assets/icons/pie-chartFill.png';
import piechartOutline from '../../assets/icons/pie-chartOutline.png';
//
import checklistoutline from '../../assets/icons/checklistoutline.png';
import checklistFill from '../../assets/icons/checklistFill.png';

const Tab = createBottomTabNavigator();

const getIcon = (routeName, focused) => {
  switch (routeName) {
    case 'Home':
      return focused ? homeFill : homeOutline;
    case 'Task':
      return focused ? checklistFill : checklistoutline;
    case 'Stats':
      return focused ? piechartFill : piechartOutline;
    case 'Profile':
      return focused ? userfill : userOutline;
  }
};

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowLabel: false,

        tabBarStyle: {
          height: 84,
          paddingBottom: 12,
          paddingTop: 14,
          paddingHorizontal: 18,
        },

        tabBarItemStyle: {
          justifyContent: 'center',
          alignItems: 'center',
        },

        tabBarIcon: ({ focused }) => {
          const iconSource = getIcon(route.name, focused);

          if (focused) {
            return (
              <View style={styles.activeTab}>
                <Image source={iconSource} style={styles.activeIcon} />
                <Text style={styles.activeText}>{route.name}</Text>
              </View>
            );
          }

          return (
            <Image
              source={iconSource}
              style={styles.inactiveIcon}
              resizeMode="contain"
            />
          );
        },
      })}
    >
      <Tab.Screen name="Home" component={HomePage} />
      <Tab.Screen name="Task" component={Task} />
      <Tab.Screen name="Stats" component={Progress} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
};

export default BottomTabs;
const styles = StyleSheet.create({
  activeTab: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#5B7BFE',
    paddingHorizontal: 18,
    paddingVertical: 10,
    minWidth: 100,
    height: 44, // ⭐ fixes vertical jump
    borderRadius: 14,
    alignSelf: 'center',
    elevation:3
  },

  activeIcon: {
    width: 26,
    height: 26,
    tintColor: '#FFFFFF',
    marginRight: 6,
    elevation:3
  },

  activeText: {
    color: '#FFFFFF',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 1,
  },

  inactiveIcon: {
    width: 24,
    height: 24,
  },
});
