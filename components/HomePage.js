import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';

import { AnimatedCircularProgress } from 'react-native-circular-progress';

import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/FontAwesome5';

import { hp, moderateScale, wp } from '../src/utilis/responsive';
import FeaturedCourses from './FeaturedCourses';

const HomePage = () => {
  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />
      <View style={styles.headercontainer}>
        <View style={styles.firstheadercontainer}>
          <View style={styles.imagecontainer}>
            <View style={styles.imagestyling}>
              <Icon1 name="person" size={24} color="#000000ab" />
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={24} color="#ffffff" />
            <View style={styles.notificationdot}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.usernamecontainer}>
          <Text style={styles.nametext}>Hello, Zohaib</Text>
          <Text style={styles.learntodaytext}>
            What would you like to learn today?
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.highlightedtext}>Continue course</Text>
        <View style={styles.parentprogresscontainer}>
          <View style={styles.progresscontainer}>
            <View style={styles.container}>
              <View style={{ transform: [{ rotate: '-90deg' }] }}>
                <AnimatedCircularProgress
                  size={95}
                  width={10}
                  fill={(15 * 100) / 30}
                  tintColor="#3adbd5ff"
                  backgroundColor="#ffffff"
                  lineCap="round"
                  delay={500}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>15/20</Text>
              </View>
            </View>
            <View style={styles.languagetextcontainer}>
              <Text style={styles.languagetext}>German</Text>
              <Text style={styles.languagetext}>Language</Text>
              <Text style={styles.bottomtext}>20 Classes . Easy</Text>
            </View>
          </View>
          <View style={styles.progresscontainer1}>
            <View style={styles.container}>
              <View style={{ transform: [{ rotate: '-90deg' }] }}>
                <AnimatedCircularProgress
                  size={95}
                  width={10}
                  fill={(10 * 100) / 30}
                  tintColor="#F76400"
                  backgroundColor="#f7b58946"
                  lineCap="round"
                  delay={500}
                />
              </View>

              {/* Center Text */}
              <View style={styles.textContainer}>
                <Text style={styles.text1}>10/30</Text>
              </View>
            </View>
            <View style={styles.languagetextcontainer1}>
              <Text style={styles.languagetext1}>Spanish</Text>
              <Text style={styles.languagetext1}>Language</Text>
              <Text style={styles.bottomtext1}>20 Classes . Easy</Text>
            </View>
          </View>
        </View>
        <Text style={styles.FeaturedCourses}>Featured courses</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: wp('6%') }}
        >
          <View style={styles.parentgrammerquizcontainer}>
            <View style={styles.grammerquizcontainer}>
              <View style={styles.subgrammerquizcontainer}>
                <View>
                  <Text style={styles.languagetext1}>Grammer</Text>
                  <Text style={styles.languagetext1}>Quiz</Text>
                  <Text style={styles.businessenglish}>Business English</Text>
                </View>
                <Image
                  style={styles.grammerquizimage}
                  source={require('../assets/grammerquiz.png')}
                />
              </View>
              <View style={styles.watchcontainer}>
                <Icon2 name="stopwatch" size={18} color="#5BA890" />

                <Text style={styles.twohours}>2 hours</Text>
              </View>
            </View>

            <View style={styles.grammerquizcontainer1}>
              <View style={styles.subgrammerquizcontainer}>
                <View>
                  <Text style={styles.languagetext1}>Online</Text>
                  <Text style={styles.languagetext1}>Phrases</Text>
                  <Text style={styles.businessenglish}>Business English</Text>
                </View>
                <Image
                  style={styles.grammerquizimage1}
                  source={require('../assets/GoalSet.png')}
                />
              </View>
              <View style={styles.watchcontainer}>
                <Icon2 name="stopwatch" size={18} color="#5BA890" />

                <Text style={styles.twohours}>2 hours</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <View style={styles.weeklygoalscontainer}>
          <View style={styles.goalview}>
            <Image
              style={styles.goalimage}
              source={require('../assets/icons/goal.png')}
            />
          </View>
          <View style={styles.goalcontainer}>
            <Text style={styles.setweeklygoaltext}>Set Weekly Goal!</Text>
            <Text style={styles.motivationtext}>
              Who set a weekly goal are more likely to stay motivated.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },
  headercontainer: {
    backgroundColor: '#410FA3',
    height: hp('26%'),
  },
  firstheadercontainer: {
    marginTop: hp('4.5%'),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('8%'),
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyling: {
    backgroundColor: '#f3be0fff',
    width: wp('10.8%'),
    height: hp('5.3%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    //     paddingLeft:wp("2.3%"),
    // marginTop:wp("10.3%"),
    borderRadius: 20,
  },

  notificationdot: {
    position: 'absolute',
    marginTop: 1,
    marginLeft: 14,
    backgroundColor: '#D6185D',
    width: wp('1.8%'),
    height: hp('0.9%'),
    borderRadius: 12,
  },
  usernamecontainer: {
    marginHorizontal: wp('8%'),
  },
  nametext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(25),
  },
  learntodaytext: {
    marginTop: hp('1.5%'),

    marginBottom: hp('2.5%'),
    color: '#ffffffce',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
  },
  highlightedtext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    marginHorizontal: wp('7%'),
    marginVertical: hp('1.6%'),
  },
  FeaturedCourses: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    marginHorizontal: wp('7%'),
    marginVertical: hp('2%'),
  },
  parentprogresscontainer: {
    marginHorizontal: wp('5%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  progresscontainer: {
    backgroundColor: '#5B7BFE',
    height: hp('28%'),
    width: wp('42%'),
    borderRadius: 15,
  },
  container: {
    marginVertical: hp('2.3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: moderateScale(19),
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
  },
  languagetextcontainer: {
    marginHorizontal: wp('4%'),
  },
  languagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
    color: '#ffffff',
  },
  bottomtext: {
    marginTop: hp('1.8%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#ffffffb7',
  },
  languagetextcontainer1: {
    marginHorizontal: wp('4%'),
  },
  text1: {
    fontSize: moderateScale(19),
    color: '#000000',
    fontFamily: 'fredoka-Medium',
  },
  languagetext1: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
  bottomtext1: {
    marginTop: hp('1.9%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#0000008e',
  },
  businessenglish: {
    marginTop: hp('0.8%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#0000008e',
  },
  twohours: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#00000077',
    marginHorizontal: wp('2%'),
  },
  progresscontainer1: {
    backgroundColor: '#f8eadacd',
    height: hp('28%'),
    width: wp('42%'),
    borderRadius: 15,
  },
  parentgrammerquizcontainer: {
    flexDirection: 'row',
  },
  grammerquizcontainer: {
    height: hp('17%'),
    padding: wp('4%'),
    marginRight: wp('5%'),
    width: wp('70%'),
    backgroundColor: '#dbf6ff',
    borderRadius: 18,
  },
  subgrammerquizcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grammerquizcontainer1: {
    height: hp('17%'),
    backgroundColor: '#f8eadacd',
    borderRadius: 18,
    padding: wp('4%'),
    width: wp('70%'),
  },
  grammerquizimage: {
    width: wp('26%'),
    height: hp('11.4%'),
  },
  grammerquizimage1: {
    width: wp('18%'),
    height: hp('11%'),
  },
  watchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklygoalscontainer: {
    borderRadius: 16,
    backgroundColor: '#f8eadacd',
    marginHorizontal: wp('7%'),
    marginVertical: hp('2%'),
    flexDirection: 'row',
    padding: wp('4%'),
    height: hp('13.5%'),
    alignItems: 'center',
  },
  goalview: {
    backgroundColor: '#ffffff',
    width: wp('13.5%'),
    height: hp('6.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  goalimage: {
    width: wp('7%'),
    height: hp('3.5%'),
  },
  goalcontainer: {
    marginLeft: wp('4%'),
  },
  setweeklygoaltext: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  motivationtext: {
    marginTop: hp('0.8%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#0000008e',
    width: wp('55%'),
  },
});
