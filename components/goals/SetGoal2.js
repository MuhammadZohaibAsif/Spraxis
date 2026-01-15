import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
  Alert,
} from 'react-native';
import React, { useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';
import { useGoal } from '../../src/context/GoalContext';

const SetGoal2 = () => {
  const navigation = useNavigation();
  const { goalData, updateGoal } = useGoal();
  const selectedOption = goalData.duration;

  const options = [
    { key: '1-3', title: '1 - 3 Months' },
    { key: '3-6', title: '3 - 6 Months' },
    { key: '6-12', title: '6 - 12 Months' },
    { key: '12+', title: 'More than 12 months' },
  ];

  const handleNext = () => {
    if (!selectedOption) {
      Alert.alert('Select duration', 'Please select a duration to continue');
      return;
    }

    navigation.navigate('SetGoal3');
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
        <Text style={styles.headertext}>Set Goal</Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>
          By when do you want to reach basic level?
        </Text>
      </View>

      <ScrollView style={styles.listcontainer}>
        {options.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.listitemcontainer,
              {
                backgroundColor:
                  selectedOption === item.key ? '#5BA890' : '#e0e5e7',
              },
            ]}
            onPress={() => updateGoal({ duration: item.key })}
          >
            <Text
              style={[
                styles.itemstext,
                {
                  color: selectedOption === item.key ? '#ffffff' : '#000000',
                },
              ]}
            >
              {item.title}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal2;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },

  headercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: '#410FA3',
    height: hp('12%'),
    paddingBottom: hp('1.8%'),
    paddingRight: wp('30%'),
  },
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingRight: wp('10%'),
  },
  createacctext: {
    alignItems: 'center',
  },
  protext: {
    marginTop: hp('4.5%'),
    marginBottom: hp('3%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
    color: '#000000',
  },
  listcontainer: {
    flex: 1,
  },
  listitemcontainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('7%'),
    borderRadius: 18,
    height: hp('8%'),
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('4%'),
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    opacity: 0.85,
    paddingLeft: wp('4%'),
    color: '#000000',
  },
  nextbutton: {
    alignItems: 'center',
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
