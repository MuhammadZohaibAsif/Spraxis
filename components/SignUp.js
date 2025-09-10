import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../src/utilis/responsive';
const SignUp = () => {
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
        <Text style={styles.headertext}>Signup</Text>
      </View>
      <View style={styles.createacctext}>
        <Text style={styles.protext}>Create an Account</Text>
      </View>
      <View style={styles.maininputcontainer}>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>First Name</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Your First Name"
            // placeholderTextColor="#000000"
          ></TextInput>
        </View>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Last Name</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Your Last Name"
            // placeholderTextColor="#000000"
          ></TextInput>
        </View>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Email Address</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Email-address"
            // placeholderTextColor="#000000"
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.loginbutton}>
        <Text style={styles.logintext}>Continue</Text>
      </TouchableOpacity>
      <View style={styles.orcontainer}>
        <Text style={styles.dottext}>
          - - - - - - - - - - - - - - - - - - - - -
        </Text>
        <Text style={styles.ortext}>Or</Text>
        <Text style={styles.dottext}>
          - - - - - - - - - - - - - - - - - - - - -
        </Text>
      </View>
      <View style={styles.linkingcontainer}>
        <TouchableOpacity>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../assets/icons/facebook.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../assets/icons/google.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.signupbuttoncontainer}>
        <Text style={styles.havingaccounttext}>Don't have an account? </Text>
        <TouchableOpacity>
          <Text style={styles.signuptext}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp;

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
    paddingRight: wp('38%'),
  },
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingRight: wp('20%'),
  },
  createacctext: {
    alignItems: 'center',
  },
  protext: {
    marginTop: hp('3.5%'),
    marginBottom: hp('3%'),

    fontFamily: 'fredoka-Medium',
    width: wp('65%'),
    textAlign: 'center',
    fontSize: moderateScale(22),
  },
  maininputcontainer: {
    paddingHorizontal: wp('7.5%'),
  },
  emailcontainer: {
    marginVertical: hp('1.5%'),
  },
  reftext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.65,
    marginVertical: hp('0.8%'),
    fontSize: moderateScale(14),
  },

  inputstyle: {
    backgroundColor: '#e0e5e7',
    fontFamily: 'fredoka-Medium',
    borderRadius: 15,
    paddingHorizontal: wp('4%'),
    height: hp('6.7%'),
    opacity: 0.75,
  },
  loginbutton: {
    alignItems: 'center',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginVertical: hp('2.3%'),
  },
  logintext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
  orcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('3%'),
  },
  ortext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.65,
    paddingHorizontal: wp('3%'),
  },
  dottext: {
    opacity: 0.3,
  },
  linkingcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sublinkingcontainer: {
    backgroundColor: '#E7E7E7',
    paddingVertical: hp('1.4%'),
    paddingHorizontal: wp('17%'),
    borderRadius: 12,
  },
  iconsimage: {
    height: hp('3.5%'),
    width: wp('7.39%'),
  },
  signupbuttoncontainer: {
    marginTop: hp('1%'),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  havingaccounttext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.6,
  },
  signuptext: {
    fontFamily: 'fredoka-Medium',
    color: '#5B7BFE',
  },
});
