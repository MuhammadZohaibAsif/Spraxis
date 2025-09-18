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

const SetGoal3 = () => {
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
        <Text style={styles.headertext}>Set Goal</Text>
      </View>
      <View style={styles.maincontainer}>
        <View style={styles.createacctext}>
          <Text style={styles.protext}>Your Dutch Goal:</Text>
        </View>
        <View style={styles.contentcontainer}>
          <View style={styles.subcontentcontainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../assets/icons/basic.png')}
              />
            </View>
            <Text style={styles.itemstext}>Basic Level</Text>
          </View>
          <View style={styles.subcontentcontainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../assets/icons/months.png')}
              />
            </View>
            <Text style={styles.itemstext}>1 - 3 Months</Text>
          </View>
        </View>
        <Text style={styles.protext2}>Your Dutch Goal:</Text>
        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../assets/icons//5mints.png')}
            />
          </View>
          <Text style={styles.itemstext2}>5min/Day</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal3;

export const styles = StyleSheet.create({
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
  maincontainer: {
    flex: 1,
  },
  createacctext: {
    alignItems: 'center',
  },
  protext: {
    marginTop: hp('4.5%'),
    marginBottom: hp('2.8%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
  },
  protext2: {
    marginTop: hp('4.5%'),
    marginBottom: hp('2.8%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
    marginLeft: wp('7%'),
  },

  contentcontainer: {
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
    marginLeft: wp('4%'),
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },

    imagestyling2: {
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext: {
    marginTop: hp('1.5%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
  },
  itemstext2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    paddingLeft: wp('4%'),
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
