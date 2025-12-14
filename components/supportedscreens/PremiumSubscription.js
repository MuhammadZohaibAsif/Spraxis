import {
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  Image,
  View,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../src/utilis/responsive';
import Icon1 from 'react-native-vector-icons/MaterialIcons';

const PremiumSubscription = () => {
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
          <Text style={styles.headertext}>Subscription</Text>
        </View>
        <View style={styles.subscriptioncontainer}>
          <Image
            style={styles.subscription}
            source={require('../assets/subscription.png')}
          />
          <Text style={styles.selectingtext}>
            To continue, please select a subscription
          </Text>
        </View>
        <View style={styles.row}>
          <View style={styles.subrow}>
            <Icon1 name="check-circle" size={20} color="#4a90e2" />
            <Text style={styles.text}>
              There are hundreds of lessons from beginner to advanced.
            </Text>
          </View>
          <View style={styles.subrow}>
            <Icon1 name="check-circle" size={20} color="#4a90e2" />
            <Text style={styles.text}>
              There are hundreds of lessons from beginner to advanced.
            </Text>
          </View>
        </View>
        <View style={styles.mainpricecontainer1}>
          <View style={styles.insidepricecontainer}>
            <Text style={styles.durationtext1}>Monthly</Text>
            <TouchableOpacity style={styles.trialsbutton}>
              <Text style={styles.trialstext}>1 week free trial</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.pricetext1}>$12.12/Month</Text>
            <Text style={styles.cancelationdetails1}>
              then $124.12 per month cancel anytime
            </Text>
          </View>
        </View>
        <View style={styles.mainpricecontainer2}>
          <View style={styles.insidepricecontainer}>
            <Text style={styles.durationtext2}>Annually</Text>
            <TouchableOpacity style={styles.trialsbutton}>
              <Text style={styles.trialstext}>1 week free trial</Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={styles.pricetext2}>$124.12/Month</Text>
            <Text style={styles.cancelationdetails2}>
              then $124.12 per month cancel anytime
            </Text>
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Update Plan</Text>
      </TouchableOpacity>
    </View>
  );
};

export default PremiumSubscription;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },
  contentcontainer: {
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
  subscriptioncontainer: {
    alignItems: 'center',
    marginTop: hp('3.8%'),
  },
  subscription: {
    height: hp('11%'),
    width: wp('20%'),
    marginBottom: hp('1.5%'),
  },
  selectingtext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    width: wp('73%'),
  },
  row: {
    marginVertical: hp('3%'),
  },
  subrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: wp('8%'),
  },
  text: {
    fontSize: 14,
    marginLeft: 10,
    color: '#333',
  },
  mainpricecontainer1: {
    backgroundColor: '#5BA890',
    borderRadius: 14,
    padding: wp('4%'),
    marginHorizontal: wp('8%'),
    marginBottom: hp('2.5%'),
  },
  mainpricecontainer2: {
    backgroundColor: '#e0e5e7',
    borderRadius: 14,
    padding: wp('4%'),
    marginHorizontal: wp('8%'),
  },
  insidepricecontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    // alignItems: 'center',
  },
  trialsbutton: {
    backgroundColor: '#f76300eb',
    borderRadius: 12,
    padding: wp('2%'),
    opacity: 0.95,
  },
  trialstext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
  },
  durationtext1: {
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
    opacity: 0.8,
  },
  durationtext2: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.8,
  },

  pricetext1: {
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
    fontSize: moderateScale(18),
    marginBottom: hp('1.5%'),
  },
  pricetext2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    marginBottom: hp('1.5%'),
  },
  cancelationdetails1: {
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
    opacity: 0.7,
    width: wp('50%'),
    fontSize: moderateScale(12),
  },
  cancelationdetails2: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.7,
    width: wp('50%'),
    fontSize: moderateScale(12),
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
