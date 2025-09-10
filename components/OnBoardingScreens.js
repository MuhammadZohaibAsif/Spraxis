import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { hp, moderateScale, wp } from '../src/utilis/responsive';

const OnBoardingScreens = ({ illustration, slider, title, subtitle }) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.illustration1}
        source={illustration}
      ></Image>
      <Image
        style={styles.slider}
        source={slider}
      ></Image>
      <View style={styles.middleConatiner}>
        <Text style={styles.middletext1}>{title}</Text>
        <Text style={styles.middletext2}>
         {subtitle}
        </Text>
      </View>
      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.buttonstyle}>
          <Text style={styles.buttontext}>Choose a language</Text>
        </TouchableOpacity>
        <View style={styles.afterbuttoncontainer}>
          <Text style={styles.afterbutton}>Already a spraxis user?</Text>
          <TouchableOpacity>
            <Text style={styles.logintext}> Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OnBoardingScreens;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  illustration1: {
    marginTop: hp('10%'),
    marginBottom: hp('8%'),
    height: hp('28%'),
    width: wp('68%'),
    resizeMode: 'contain',
  },
  slider: {
    height: hp('1.2%'),
    width: wp('12.5%'),
  },
  middleConatiner: {
    alignItems: 'center',
  },
  middletext1: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    paddingBottom:hp("1.5%")
  },
  middletext2: {
    fontFamily: 'fredoka-Medium',
    width: wp('63%'),
    textAlign: 'center',
    fontSize: moderateScale(14),
    opacity: 0.5,
  },
  buttoncontainer: {
    // backgroundColor:"lightgreen",
    alignItems: 'center',
    justifyContent: 'space-between',
    // marginBottom:hp("3%")
  },
  buttonstyle: {
    backgroundColor: '#5B7BFE',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('22%'),
    borderRadius: 12,
    marginBottom: hp('4%'),
  },
  buttontext: {
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
    fontSize: moderateScale(17),
  },
  afterbuttoncontainer: {
    flexDirection: 'row',
  },
  afterbutton: {
    // paddingVertical:hp("4%"),
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    opacity:0.5
  },
  logintext: {
    fontFamily: 'fredoka-Medium',
  },
});
