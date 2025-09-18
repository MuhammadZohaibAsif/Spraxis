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
import { hp, moderateScale, wp } from '../src/utilis/responsive';

const Complete7 = () => {
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
        <Text style={styles.headertext}>Complete 7/7</Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>Course Overview</Text>
        <Text style={styles.subcourseoverview}>
          Learn listening, speaking, reading and writing in german
        </Text>
      </View>
      <View style={styles.createacctext}>
        <Text style={styles.protext}>Course Content :</Text>
      </View>
      <View style={styles.contentcontainer}>
        <View style={styles.subcontentcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/word.png')}
            />
          </View>
          <Text style={styles.itemstext}>9000+</Text>
          <Text style={styles.itemsubtext}>Words</Text>
        </View>
        <View style={styles.subcontentcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/sentences.png')}
            />
          </View>
          <Text style={styles.itemstext}>2100+</Text>
          <Text style={styles.itemsubtext}>Sentences</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Complete7;

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
    marginBottom: hp('1.5%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
  },
  subcourseoverview: {
    marginBottom: hp('2%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    opacity: 0.65,
  },
  contentcontainer: {
    flex: 1,
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
    alignSelf: 'center',
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },

  itemstext: {
    marginTop: hp('1.5%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
  },
  itemsubtext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.75,
    paddingTop: hp('0.3%'),
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
