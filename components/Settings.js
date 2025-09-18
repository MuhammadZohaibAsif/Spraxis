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
import CountryFlag from 'react-native-country-flag';

import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../src/utilis/responsive';

const Settings = () => {
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
        <Text style={styles.headertext}>Settings</Text>
      </View>

      <View style={styles.listcontainer}>
        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/editprofile.png')}
            />
          </View>
          <Text style={styles.itemstext}>Edit Profile</Text>
        </View>

        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/settings.png')}
            />
          </View>
          <Text style={styles.itemstext}>Settings</Text>
        </View>
        {/* ////////////////////////////////////////////// */}

        {/* ////////////////////////////////////////////// */}
        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/mylanguage.png')}
            />
          </View>
          <Text style={styles.itemstext}>My Language</Text>
        </View>

        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/invitefriends.png')}
            />
          </View>
          <Text style={styles.itemstext}>Invite Friend</Text>
        </View>
        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/help.png')}
            />
          </View>
          <Text style={styles.itemstext}>Help</Text>
        </View>

        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/getaccess.png')}
            />
          </View>
          <Text style={styles.itemstext}>Get Access</Text>
        </View>
      </View>
    </View>
  );
};

export default Settings;

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
    marginBottom: wp('6%'),
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
    fontFamily: 'fredoka-Medium',
    textAlign: 'center',
    fontSize: moderateScale(21),
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
    // backgroundColor:"green"
  },
  itemstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    opacity: 0.85,
    paddingLeft: wp('4%'),
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
