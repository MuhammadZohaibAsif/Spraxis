import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React, { useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { useGoal } from '../../src/context/GoalContext';

const SetGoal5 = () => {
  const { goalData, resetGoal } = useGoal();
  const navigation = useNavigation();
  const handleGotIt = async () => {
    if (
      !goalData ||
      !goalData.language ||
      !goalData.time ||
      !goalData.days?.length
    ) {
      Alert.alert('Incomplete Goal', 'Please select time, days, and language.');
      return;
    }

    const user = auth().currentUser;
    if (!user) return;

    try {
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set(
          {
            profile: {
              goals: firestore.FieldValue.arrayUnion({
                ...goalData,
                createdAt: new Date().toISOString(), // use client-side timestamp
              }),
            },
          },
          { merge: true },
        );

      console.log('Goal saved successfully!');

      // reset context for new goal
      resetGoal();

      // Navigate to Task tab
      navigation.reset({
        index: 0,
        routes: [{ name: 'BottomTabs', params: { screen: 'Task' } }],
      });
    } catch (error) {
      console.log('Error saving goal:', error);
    }
  };

  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />

      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            style={styles.icon}
            name="chevron-left"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.congratsView}>
        <Image
          style={styles.congratsimage}
          source={require('../../assets/GoalSet.png')}
        />
        <Text style={styles.congratstext}>Goal Set</Text>
        <Text style={styles.subcongratstext}>
          You'll complete 5 activities per week
        </Text>
      </View>
      <TouchableOpacity style={styles.nextbutton} onPress={handleGotIt}>
        <Text style={styles.nexttext}>Got it</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal5;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },

  headercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#410FA3',
    height: hp('12%'),
    paddingBottom: hp('1.8%'),
  },

  icon: {
    paddingHorizontal: wp('5.7%'),
  },

  congratsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsimage: {
    width: wp('53%'),
    height: hp('32%'),
  },
  congratstext: {
    marginTop: hp('3%'),
    fontSize: moderateScale(24),
    fontFamily: 'Fredoka-Bold',
  },
  subcongratstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    textAlign: 'center',
    width: wp('70%'),
    opacity: 0.5,
    marginTop: hp('0.7%'),
  },
  nextbutton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginTop: hp('2.3%'),
    marginBottom: hp('4.3%'),
  },
  nexttext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
});
