import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
} from 'react-native';
import React from 'react';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';

const OnBoardingScreens = ({
  illustration,
  slider,
  title,
  subtitle,
  onNext,
  nextScreen,
}) => {
  const navigation = useNavigation(); 

  const handleNext = () => {
    if (onNext) {
      onNext(); 
    } else if (nextScreen && navigation) {
      navigation.navigate(nextScreen); 
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar hidden={true} />
      <Image style={styles.illustration1} source={illustration} />
      <Image style={styles.slider} source={slider} />

      <View style={styles.middleConatiner}>
        <Text style={styles.middletext1}>{title}</Text>
        <Text style={styles.middletext2}>{subtitle}</Text>
      </View>

      <View style={styles.buttoncontainer}>
        <TouchableOpacity style={styles.buttonstyle} onPress={handleNext}>
          <Text style={styles.buttontext}>Next</Text>
        </TouchableOpacity>

        <View style={styles.afterbuttoncontainer}>
          <Text style={styles.afterbutton}>Already a spraxis user?</Text>
          <TouchableOpacity
            onPress={() => navigation?.replace?.('Login')} 
          >
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
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    paddingBottom: hp('1.5%'),
  },
  middletext2: {
    fontFamily: 'fredoka-Medium',
    width: wp('63%'),
    textAlign: 'center',
    color: '#000000',
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
    paddingHorizontal: wp('30%'),
    borderRadius: 12,
    marginBottom: hp('4%'),
  },
  buttontext: {
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
    fontSize: moderateScale(18.5),
  },
  afterbuttoncontainer: {
    flexDirection: 'row',
  },
  afterbutton: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    opacity: 0.5,
  },
  logintext: {
    color: '#5B7BFE',
    fontFamily: 'fredoka-Medium',
  },
});
