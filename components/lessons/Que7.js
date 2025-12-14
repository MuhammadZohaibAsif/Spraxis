import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';

import * as Progress from 'react-native-progress';
import { hp, moderateScale, wp } from '../src/utilis/responsive';

const Que7 = () => {
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
        <View style={styles.container}>
          <Progress.Bar
            progress={16 / 20} 
            width={220} 
            height={13}
            color="#5A67D8"
            unfilledColor="#E2E8F0"
            borderWidth={1}
            borderRadius={8}
          />
          <Text style={styles.stepText}>16/20</Text>
        </View>
        <TouchableOpacity>
          <Icon style={styles.icon} name="cross" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.topcontainer}>
        <Text style={styles.toptext}>Select the correct word</Text>
        <View style={styles.questioncontainer}>
          <View style={styles.soundiconview}>
            <Icon1 name="sound" color="#ffffff" size={24} />
          </View>
          <Text style={styles.questiontext}>Hoi</Text>
        </View>
      </View>
      <View style={styles.parentoptionsview}>
        <View style={styles.optionsview}>
          <Text style={styles.germantext}>Goedemorgen</Text>
          <View style={styles.lineview}>
            <TouchableOpacity>
              <Icon2
                style={styles.icon2}
                name="circle"
                size={26}
                color="#0000001e"
              />
            </TouchableOpacity>
            <View style={styles.linestyling}></View>
          </View>
          <Text style={styles.englishtext}>Good Morning!</Text>
        </View>
        <View style={styles.optionsviewans}>
          <Text style={styles.germantextans}>Hoi</Text>
          <View style={styles.lineviewans}>
            <TouchableOpacity>
              <Icon3
                style={styles.icon2}
                name="checkmark-circle-sharp"
                size={28}
                color="#5BA890"
              />
            </TouchableOpacity>
            <View style={styles.linestylingans}></View>
          </View>
          <Text style={styles.englishtextans}>Hello!</Text>
        </View>
        <View style={styles.optionsview}>
          <Text style={styles.germantext}>Tot ziens</Text>
          <View style={styles.lineview}>
            <TouchableOpacity>
              <Icon2
                style={styles.icon2}
                name="circle"
                size={26}
                color="#0000001e"
              />
            </TouchableOpacity>
            <View style={styles.linestyling}></View>
          </View>
          <Text style={styles.englishtext}>Good bye!</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Que7;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
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
    paddingTop: hp('3.5%'),
  },
  icon: {
    paddingHorizontal: wp('5.7%'),
    marginBottom: hp('0.8%'),
  },
  icon2: {
    paddingHorizontal: wp('3%'),
    // marginBottom: hp('0.8%'),
  },
  topcontainer: {
    marginHorizontal: wp('8%'),
    marginTop: hp('2.5%'),
  },
  toptext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  questioncontainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundiconview: {
    backgroundColor: '#000000',
    height: hp('5%'),
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: wp('2.5%'),
  },
  questiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(20),
    width: wp('70%'),
  },
  parentoptionsview: {
    flex: 1,
  },
  optionsview: {
    borderWidth: wp('0.35%'),
    borderColor: '#0000001e',
    borderRadius: 16,
    marginHorizontal: wp('8%'),
    marginTop: hp('5%'),
    paddingHorizontal: wp('8%'),
    paddingVertical: wp('4%'),

    alignItems: 'center',
  },
  lineview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linestyling: {
    backgroundColor: '#0000001e',
    height: hp('0.2%'),
    width: wp('58%'),
  },
  germantext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  englishtext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.5,
  },
  optionsviewans: {
    backgroundColor: '#5ba89034',
    borderWidth: wp('0.35%'),
    borderColor: '#5ba890a2',
    borderRadius: 16,
    marginHorizontal: wp('8%'),
    marginTop: hp('5%'),
    paddingHorizontal: wp('8%'),
    paddingVertical: wp('4%'),
    alignItems: 'center',
  },
  lineviewans: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linestylingans: {
    backgroundColor: '#5ba89090',
    height: hp('0.2%'),
    width: wp('58%'),
  },
  germantextans: {
    color: '#5ba890ff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  englishtextans: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.68,
    color: '#5ba890ff',
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
