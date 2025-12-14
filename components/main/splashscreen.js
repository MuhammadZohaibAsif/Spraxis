import {
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { wp, hp, moderateScale } from '../../src/utilis/responsive';

const SplashScreen = () => {
  return (
    <View style={styles.hallocontainer}>
      <StatusBar hidden={true} />

      <Image
        source={require('../../assets/HALLO1.png')}
        style={styles.halloimage}
      />
      <Text style={styles.text}>SPRAXIS</Text>
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  hallocontainer: {
    flex: 1,
    backgroundColor: '#410FA3',
    justifyContent: 'center',
    alignItems: 'center',
  },
  halloimage: {
    height: hp('30%'),
    width: wp('90%'),
  },
  text: {
    color: 'white',
    fontSize: moderateScale(40),
    // fontFamily: 'Fredoka-Light',
    fontFamily: 'fredoka-Medium',
    // fontFamily: 'Fredoka-Bold',
  },
});
