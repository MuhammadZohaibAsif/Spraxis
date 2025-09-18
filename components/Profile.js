import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import { hp, moderateScale, wp } from '../src/utilis/responsive';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import CountryFlag from 'react-native-country-flag';

import Icon1 from 'react-native-vector-icons/Ionicons';

const Profile = () => {
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
        <Text style={styles.headertext}>Profile</Text>
        <TouchableOpacity>
          <Icon1
            style={styles.icon}
            name="settings-outline"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profilecontainer}>
        <View style={styles.profileimage}>
          <Icon1
            style={styles.icon1}
            name="settings-outline"
            size={56}
            color="#fff"
          />
        </View>
        <Text style={styles.usernametext}>Muhammad Zohaib Asif</Text>
        <Text style={styles.joiningdate}>joined march 2023</Text>
        <TouchableOpacity style={styles.addlanguagecontainer}>
          <Text style={styles.addlanguagetext}>Add Language +</Text>
        </TouchableOpacity>
        <Text style={styles.dottext}>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - -
        </Text>
      </View>
      <View style={styles.myactivitycontainer}>
        <Text style={styles.myactivitytext}>My Activity</Text>

        <TouchableOpacity>
          <Text style={styles.viewalltext}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listitemcontainer}>
        <View style={styles.sublistitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../assets/icons//clock.png')}
            />
          </View>
          <View>
            <Text style={styles.totalhourstext}>Total hours</Text>
            <Text style={styles.itemstext2}>8h : 20 min</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.thisweekcontainer}>
          <Text style={styles.thisweektext}>This week </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.myactivitycontainer}>
        <Text style={styles.myactivitytext}>Achievements</Text>

        <TouchableOpacity>
          <Text style={styles.viewalltext}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.parentlanguageContainer}>
        <View style={styles.languageContainer}>
          <View style={styles.flagWraper}>
            <CountryFlag isoCode="de" size={46} />
          </View>
          <Text style={styles.germanlanguagetext}>German Language</Text>
          <Text style={styles.leveltext}>Level 1</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

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
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingHorizontal: wp('5.7%'),
  },
  profilecontainer: {
    alignItems: 'center',
  },
  profileimage: {
    backgroundColor: '#5B7BFE',
    borderRadius: 50,
    width: wp('19%'),
    height: hp('9%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('4%'),
    marginTop: hp('4%'),
  },
  icon1: {
    alignItems: 'center',
  },
  usernametext: {
    textAlign: 'center',
    fontFamily: 'Fredoka-Bold',
    fontSize: moderateScale(20),
    marginTop: hp('2.5%'),
  },
  joiningdate: {
    textAlign: 'center',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    marginTop: hp('1%'),
    opacity: 0.6,
  },
  addlanguagecontainer: {
    backgroundColor: '#e0e5e7',
    borderColor: '#5B7BFE',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: wp('4.5%'),
    paddingVertical: wp('2.5%'),
    marginTop: hp('2%'),
    opacity: 0.6,
  },
  addlanguagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    color: '#5B7BFE',
  },
  dottext: {
    opacity: 0.35,
    marginTop: hp('2.5%'),
  },
  myactivitycontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4.5%'),
    alignItems: 'center',
    marginTop: hp('2.5%'),
    marginHorizontal: wp('3.5%'),
  },
  myactivitytext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    marginTop: hp('0.5%'),
  },
  viewalltext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    marginTop: hp('0.5%'),
    opacity: 0.5,
  },
  listitemcontainer: {
    marginTop: hp('3%'),
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('7%'),
    borderRadius: 18,
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
  },
  sublistitemcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    justifyContent: 'space-evenly',
  },
  imagestyling2: {
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    paddingLeft: wp('4%'),
  },
  icon2: {
    opacity: 0.7,
  },
  totalhourstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(12),
    paddingLeft: wp('4%'),
    opacity: 0.6,
  },
  thisweekcontainer: {
    backgroundColor: '#e0e5e7',
    borderColor: '#5B7BFE',
    borderWidth: 1,
    borderRadius: 6.5,
    paddingHorizontal: wp('4%'),
    paddingVertical: wp('1.5%'),
    opacity: 0.6,
    alignSelf: 'center',
  },
  thisweektext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(12),
    // color: '#5B7BFE',
    opacity: 0.6,
  },
  parentlanguageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  languageContainer: {
    marginVertical: hp('3%'),
    backgroundColor: '#e0e5e7',
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
    borderRadius: 15,
  },
  flagWraper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('11%'),
    height: hp('5.2%'),
    borderRadius: 25,
    overflow: 'hidden',
    opacity: 0.85,
    marginBottom: hp('1.5%'),
  },
  germanlanguagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    marginBottom: hp('0.8%'),
  },
  leveltext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    opacity: 0.6,
  },
});
