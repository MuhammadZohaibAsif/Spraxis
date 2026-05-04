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

const SetGoal3 = () => {
  const navigation = useNavigation();
  const { goalData, updateGoal } = useGoal();
  const selectedOption = goalData.dailyMinutes; 
  const options = [
    {
      key: '5',
      label: '5 min / Day',
      icon: require('../../assets/icons/5mints.png'),
    },
    {
      key: '15',
      label: '15 min / Day',
      icon: require('../../assets/icons/15mints.png'),
    },
    {
      key: '30',
      label: '30 min / Day',
      icon: require('../../assets/icons/30mints.png'),
    },
    {
      key: '60',
      label: '60 min / Day',
      icon: require('../../assets/icons/60mints.png'),
    },
  ];

  const handleNext = () => {
    if (!selectedOption) {
      Alert.alert(
        'Select learning time',
        'Please select a daily learning goal',
      );
      return;
    }
    navigation.navigate('SetGoal4'); // params nahi chahiye, context already update ho chuka
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
      <View style={styles.maincontainer}>
        <View style={styles.createacctext}>
          <Text style={styles.protext}>Your Dutch Goal:</Text>
        </View>
        <View style={styles.contentcontainer}>
          <View style={styles.subcontentcontainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/basic.png')}
              />
            </View>
            <Text style={styles.itemstext}>Basic Level</Text>
          </View>
          <View style={styles.subcontentcontainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/months.png')}
              />
            </View>
            <Text style={styles.itemstext}>1 - 3 Months</Text>
          </View>
        </View>
        <ScrollView contentContainerStyle={{ paddingBottom: hp('3%') }}>
          <View style={styles.createacctext}>
            <Text style={styles.protext2}>Your Learning Goal:</Text>
          </View>

          {/* Options */}
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
              onPress={() => updateGoal({ dailyMinutes: item.key })}
            >
              <View style={styles.imagecontainer}>
                <Image style={styles.imagestyling} source={item.icon} />
              </View>

              <Text
                style={[
                  styles.itemstext2,
                  {
                    color: selectedOption === item.key ? '#ffffff' : '#000000',
                  },
                ]}
              >
                {item.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal3;

export const styles = StyleSheet.create({
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
  maincontainer: {
    flex: 1,
  },
  createacctext: {
    alignItems: 'center',
  },
  protext: {
    marginTop: hp('4.5%'),
    marginBottom: hp('2.8%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
    color: '#000000',
  },
  protext2: {
    marginTop: hp('3.3%'),
    marginBottom: hp('1%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
    color: '#000000',
  },

  contentcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subcontentcontainer: {
    width: wp('40%'),
    height: hp('17%'),
    backgroundColor: '#e0e5e7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginHorizontal: wp('2%'),
    opacity: 0.8,
  },

  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    justifyContent: 'space-evenly',
    marginLeft: wp('4%'),
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },

  imagestyling2: {
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext: {
    marginTop: hp('1.5%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    color: '#000000',
  },
  itemstext2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    paddingLeft: wp('4%'),
    color: '#000000',
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
