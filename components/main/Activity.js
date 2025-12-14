import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Image,
  Text,
  View,
} from 'react-native';
import React, { useState } from 'react';
import Icon1 from 'react-native-vector-icons/Ionicons';

import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../src/utilis/responsive';
import WeeklyChartGifted from './WeeklyChartGifted';

const Activity = () => {
  const [selectedTab, setSelectedTab] = useState('Weekly');
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
        <Text style={styles.headertext}>Activity</Text>
        <TouchableOpacity>
          <Icon1
            style={styles.icon}
            name="settings-outline"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.buttonsview}>
        {['Daily', 'Weekly', 'Monthly'].map((tab, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.button, selectedTab === tab && styles.activeButton]}
            onPress={() => setSelectedTab(tab)}
          >
            <Text
              style={[
                styles.tabText,
                { color: selectedTab === tab ? '#fff' : '#000' },
              ]}
            >
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      <WeeklyChartGifted />
      <View style={styles.summarycontainer}>
        <Text style={styles.summarytext}>Summary</Text>
        <TouchableOpacity>
          <Image
            style={styles.dots}
            source={require('../assets/icons/dots.png')}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.parentcardcontainer}>
        <View style={styles.cardcontainertime}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons//clock.png')}
            />
          </View>
          <View>
            <Text style={styles.timetext}>Total time</Text>
            <Text style={styles.datetext}>13 jan 2023</Text>
          </View>
          <Text style={styles.summary2text}>10 hr 20mint</Text>
        </View>
        <View style={styles.cardcontainercourse}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling1}
              source={require('../assets/icons//star.png')}
            />
          </View>
          <View>
            <Text style={styles.timetext}>Course</Text>
            <Text style={styles.datetext}>13 jan 2023</Text>
          </View>
          <Text style={styles.summary2text}>4 Courses</Text>
        </View>
      </View>
    </View>
  );
};

export default Activity;

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
  buttonsview: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('8%'),
    marginVertical: hp('5%'),
    borderRadius: 14,
  },
  button: {
    flex: 1,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: hp('1.8%'),
  },
  activeButton: {
    backgroundColor: '#5B7BFE',
  },
  tabText: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
  },
  summarycontainer: {
    marginHorizontal: wp('8%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('0.5%'),
    marginBottom: hp('1.5%'),
  },
  summarytext: {
    fontSize: moderateScale(22),
    fontFamily: 'fredoka-Medium',
  },
  dots: {
    height: hp('2.5%'),
    width: wp('8%'),
    opacity: 0.3,
    marginTop: hp('0.5%'),
  },
  parentcardcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    // marginHorizontal: wp('8%'),
  },
  cardcontainertime: {
    backgroundColor: '#fc660215',
    borderRadius: 16,
    width: wp('40%'),
    height: hp('22.5%'),
    padding: wp('5%'),
  },
  cardcontainercourse: {
    backgroundColor: '#5b7cfe18',
    borderRadius: 16,
    width: wp('40%'),
    height: hp('22.5%'),
    padding: wp('5%'),
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('9%'),
    height: hp('4.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp('1%'),
  },
  imagestyling: {
    width: wp('6.15%'),
    height: hp('2.9%'),
    alignSelf: 'center',
  },
  imagestyling1: {
    width: wp('4.6%'),
    height: hp('2.2%'),
    alignSelf: 'center',
  },
  timetext: {
    fontSize: moderateScale(16),
    fontFamily: 'fredoka-Medium',
    marginBottom: hp('0.5%'),
  },
  datetext: {
    fontSize: moderateScale(12),
    fontFamily: 'fredoka-Medium',
    opacity: 0.55,
  },
  summary2text: {
    marginTop: hp('2.5%'),

    fontSize: moderateScale(17),
    fontFamily: 'fredoka-Medium',
  },
});
