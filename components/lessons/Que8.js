import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';

import * as Progress from 'react-native-progress';
import { hp, moderateScale, wp } from '../src/utilis/responsive';
const Que8 = () => {
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
        <View style={styles.container12}>
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
      <View style={styles.contentcontainer}>
        <Text style={styles.toptext}>Convert this text into German</Text>
        <View style={styles.imagecontainer}>
          <Image
            style={styles.boyimage}
            source={require('../assets/boy.png')}
          />
          <Text style={styles.questiontext}>hey Zohaib, Good Morning!</Text>
        </View>
        <TextInput
          keyboardType="visible-password"
          multiline={true}
          style={styles.textinput}
        />
      </View>
      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Que8;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
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
  container12: {
    marginTop: hp('2.4%'),
    alignItems: 'center',
  },
  stepText: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    paddingTop: wp('1.5%'),
  },
  contentcontainer: {
    flex: 1,
  },
  toptext: {
    marginHorizontal: wp('8%'),
    marginTop: wp('8%'),
    marginBottom: wp('5%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(19),
  },
  imagecontainer: {
    marginTop: hp('1.5%'),
    marginHorizontal: wp('8%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  boyimage: {
    height: hp('8.5%'),
    width: wp('16%'),
    marginRight: wp('4%'),
  },

  questiontext: {
    backgroundColor: '#1f9be32f',
    width: wp('60%'),
    padding: wp('3.5%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    borderTopLeftRadius: 14,
    borderTopRightRadius: 14,
    borderBottomRightRadius: 14,
  },
  textinput: {
    height: hp('15%'),
    width: wp('85%'),
    backgroundColor: '#e0e5e7a5',
    borderRadius: 14,
    marginHorizontal: wp('8%'),
    marginTop: hp('8%'),
    textAlignVertical: 'top',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    color: '#000000c9',
    padding: wp('5%'),
  },
  nextbutton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginTop: hp('4.3%'),
    marginBottom: hp('4.3%'),
  },
  nexttext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
});
