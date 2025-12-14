import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

const SetGoal1 = () => {
  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />
      <View style={styles.headercontainer}>
        <TouchableOpacity>
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


      <View style={styles.listcontainer}>
        <View style={styles.listitemcontainer}>
          <Text style={styles.itemstext}>Basic</Text>
          <Text style={styles.subitemstext}>
            Use familiar everyday expressions, such as introductions,details
            about yourself and your family
          </Text>
        </View>


        <View style={styles.listitemcontainer}>
          <Text style={styles.itemstext}>Independent</Text>
          <Text style={styles.subitemstext}>
     Understand the main points when communications in everyday situations and can share your options.
          </Text>
        </View>


        <View style={styles.listitemcontainer}>
          <Text style={styles.itemstext}>Proficient</Text>
          <Text style={styles.subitemstext}>
            Communicate effectively and flexibly in most social, academic and professional contexts and understand indirect meaning.
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.nextbutton}>
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
