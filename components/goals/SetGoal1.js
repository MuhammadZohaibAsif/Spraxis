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

const SetGoal1 = () => {
  const { goalData, updateGoal } = useGoal();
  const selectedOption = goalData.level;
  const navigation = useNavigation();
  // const [selectedOption, setSelectedOption] = useState(null);

  const options = [
    {
      key: 'basic',
      title: 'Basic',
      description:
        'Use familiar everyday expressions, such as introductions, details about yourself and your family',
    },
    {
      key: 'independent',
      title: 'Independent',
      description:
        'Understand the main points when communications in everyday situations and can share your options.',
    },
    {
      key: 'proficient',
      title: 'Proficient',
      description:
        'Communicate effectively and flexibly in most social, academic and professional contexts and understand indirect meaning.',
    },
  ];

  const handleNext = () => {
    if (!selectedOption) {
      Alert.alert('Select an option', 'Please select a level to continue');
      return;
    }

    // Navigate to next goal screen
    navigation.navigate('SetGoal2');
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
        <Text style={styles.protext}>Which level do you want to reach?</Text>
      </View>

      <ScrollView style={styles.listcontainer}>
        {options.map(item => (
          <TouchableOpacity
            key={item.key}
            style={[
              styles.listitemcontainer,
              selectedOption === item.key && { backgroundColor: '#5BA890' },
            ]}
            onPress={() => updateGoal({ level: item.key })}
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
            <Text
              style={[
                styles.subitemstext,
                {
                  color: selectedOption === item.key ? '#ffffff' : '#000000',
                },
              ]}
            >
              {item.description}
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

export default SetGoal1;

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
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('7%'),
    borderRadius: 18,
    paddingVertical: wp('3%'),
  },

  itemstext: {
    marginBottom: hp('1%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    opacity: 0.85,
    paddingLeft: wp('4%'),
    color: '#000000',
  },
  subitemstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    opacity: 0.65,
    paddingHorizontal: wp('4%'),
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
