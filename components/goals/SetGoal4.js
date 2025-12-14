import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';

import { hp, moderateScale, wp } from '../src/utilis/responsive';
import React from 'react';

const SetGoal4 = () => {
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
      <View style={styles.createacctext}>
        <Text style={styles.protext}>When would you like to learn?</Text>
      </View>

      <View style={styles.listitemcontainer}>
        <View style={styles.sublistitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../assets/icons//breakfast.png')}
            />
          </View>
          <Text style={styles.itemstext2}>5min/Day</Text>
        </View>

        <Icon2
          style={styles.icon2}
          name="checkmark-circle-outline"
          size={26}
          color="#656872"
        />
      </View>

      <View style={styles.listitemcontainer}>
        <View style={styles.sublistitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../assets/icons//onthego.png')}
            />
          </View>
          <Text style={styles.itemstext2}>5min/Day</Text>
        </View>

        <Icon2
          style={styles.icon2}
          name="checkmark-circle-outline"
          size={26}
          color="#656872"
        />
      </View>

      <View style={styles.listitemcontainer}>
        <View style={styles.sublistitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../assets/icons//lunch.png')}
            />
          </View>
          <Text style={styles.itemstext2}>5min/Day</Text>
        </View>

        <Icon2
          style={styles.icon2}
          name="checkmark-circle-outline"
          size={26}
          color="#656872"
        />
      </View>
      

      <View style={styles.listitemcontainer}>
        <View style={styles.sublistitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../assets/icons//dinner.png')}
            />
          </View>
          <Text style={styles.itemstext2}>5min/Day</Text>
        </View>

        <Icon2
          style={styles.icon2}
          name="checkmark-circle-outline"
          size={26}
          color="#656872"
        />
      </View>
      <View style={styles.createacctext}>
        <Text style={styles.protext}>What time?</Text>
      </View>
      <View style={styles.timecontainer}>
        <View style={styles.subtimecontainer}>
          <Text style={styles.timetext}>08:00 Am</Text>
        </View>
        <View style={styles.subtimecontainer}>
          <Text style={styles.timetext}>09:00 Am</Text>
        </View>
        <View style={styles.subtimecontainer}>
          <Text style={styles.timetext}>10:00 Am</Text>
        </View>
      </View>
      <View style={styles.weekscontainer}>
        <Text style={styles.daystext}>How often?</Text>
        <Text style={styles.subdaystext}>2 Weeks a day</Text>
      </View>
      <View style={styles.dayscontainer}>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}>S</Text>
        </View>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}>M</Text>
        </View>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}>T</Text>
        </View>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}> W</Text>
        </View>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}>T</Text>
        </View>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}>F</Text>
        </View>
        <View style={styles.subdayscontainer}>
          <Text style={styles.chartext}>S</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Got it</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal4;

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
  icon2: {
    opacity: 0.7,
  },
  createacctext: {
    alignItems: 'center',
  },
  weekscontainer: {
    paddingHorizontal: wp('8.5%'),
    marginTop: hp('2.5%'),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  daystext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
  },
  subdaystext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.7,
  },
  dayscontainer: {
    marginHorizontal: wp('1.5%'),

    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: hp('2%'),
  },
  subdayscontainer: {
    backgroundColor: '#e0e5e7',
    borderRadius: 8,
    width: wp('8%'),
    height: hp('4.5%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  chartext: {
    fontSize: moderateScale(16),
    fontFamily: 'fredoka-Medium',
    opacity: 0.6,
  },
  protext: {
    marginTop: hp('4.5%'),
    marginBottom: hp('3%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
  },

  listitemcontainer: {
    marginTop: hp('2%'),
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('7%'),
    borderRadius: 18,
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
  },
  sublistitemcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    justifyContent: 'space-evenly',
  },
  imagestyling2: {
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    paddingLeft: wp('4%'),
  },
  timecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  subtimecontainer: {
    backgroundColor: '#e0e5e7',
    borderRadius: 10,
    paddingHorizontal: wp('2%'),
    alignItems: 'center',
  },
  timetext: {
    fontSize: moderateScale(15),
    fontFamily: 'fredoka-Medium',
    padding: wp('2.5%'),
  },
  nextbutton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginTop: hp('4.3%'),
    // marginBottom: hp('4.3%'),
  },
  nexttext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
});
