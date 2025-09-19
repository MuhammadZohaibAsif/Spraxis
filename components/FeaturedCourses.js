import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import React from 'react';

import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../src/utilis/responsive';

const FeaturedCourses = () => {
  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />
      <View style={styles.contentcontainer}>
        <View style={styles.headercontainer}>
          <TouchableOpacity>
            <Icon
              style={styles.icon}
              name="chevron-left"
              size={26}
              color="#fff"
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Progress.Bar
              progress={1 / 5} // yahan se progress calculate ho rahi hai
              width={220} // screen width le lega
              height={13}
              color="#5A67D8"
              unfilledColor="#E2E8F0"
              borderWidth={1}
              borderRadius={8}
            />
            <Text style={styles.stepText}>1/5</Text>
          </View>

          {/* Step Text */}

          <TouchableOpacity>
            <Icon style={styles.icon} name="cross" size={26} color="#fff" />
          </TouchableOpacity>
        </View>

        <View style={styles.computercontainer}>
          <Image
            style={styles.computer}
            source={require('../assets/computer.png')}
          />

          <Text style={styles.boldtext}>Grammar Quiz:</Text>
          <Text style={styles.boldtext}>Present Tense</Text>
          <Text style={styles.fillthegaps}>Fill in the gaps</Text>
        </View>

        <View style={styles.completethesentencecontainer}>
          <Text style={styles.completethesentence}>Complete The Sentence</Text>
          <Text style={styles.fillthegaps2}>
            Fill in the blanks with an appropriate present tence form.
          </Text>
          <View style={styles.questioncontainer}>
            <Text style={styles.questiontext}>
              I will follow you wherever you .................................
            </Text>
          </View>
        </View>
        <View style={styles.mainoptionscontainer}>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>will go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>are going</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>can go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>is going</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>going to</Text>
          </TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default FeaturedCourses;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
    // backgroundColor:"green"
  },
  contentcontainer: {
    flex: 1,
    // backgroundColor:"green"
  },
  container: {
    marginTop: hp('2.4%'),
    alignItems: 'center',
  },
  stepText: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    paddingTop: wp('1.5%'),
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#410FA3',
    height: hp('15%'),
    paddingTop: hp('4.8%'),
  },

  icon: {
    paddingHorizontal: wp('5.7%'),
    marginBottom: hp('0.8%'),
  },
  computercontainer: {
    alignItems: 'center',
    marginTop: hp('3.8%'),
  },
  computer: {
    height: hp('7%'),
    width: wp('18%'),
    marginBottom: hp('1.5%'),
  },
  boldtext: {
    fontFamily: 'Fredoka-Bold',
    fontSize: moderateScale(22),
  },
  fillthegaps: {
    fontFamily: 'fredoka-Medium',
    marginTop: hp('2%'),
    opacity: 0.6,
  },

  completethesentencecontainer: {
    paddingHorizontal: wp('8%'),
    marginTop: hp('2.5%'),
  },
  completethesentence: {
    fontFamily: 'fredoka-Medium',
    marginTop: hp('2%'),
    fontSize: moderateScale(17),
    marginBottom: hp('1.3%'),
  },
  fillthegaps2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.6,
  },
  questioncontainer: {
    backgroundColor: '#e0e5e7',
    borderRadius: 14,
    width: wp('85%'),
    // paddingHorizontal: wp('5%'),
    marginTop: hp('3%'),
  },
  questiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    paddingVertical: wp('5%'),
    paddingHorizontal: wp('5%'),
  },
  mainoptionscontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp('8%'),
    marginTop: hp('2%'),
  },
  suboptionscontainer: {
    padding: wp('3%'),
    borderColor: 'rgba(0, 0, 0, 0.37)',
    borderWidth: 1,
    borderRadius: 14,
    marginRight: wp('4%'),
    marginTop: hp('2%'),
    opacity: 0.6,
  },
  optiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.65,
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
