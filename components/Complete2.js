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
import CountryFlag from 'react-native-country-flag';

import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../src/utilis/responsive';

const Complete2 = () => {
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
        <Text style={styles.headertext}>Complete 2/7</Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>
          What Is The Main Reason To Learn German?
        </Text>
      </View>
      <View style={styles.listcontainer}>
        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/airplane.png')}
            />
          </View>
          <Text style={styles.itemstext}>Travel</Text>
        </View>

        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/school.png')}
            />
          </View>
          <Text style={styles.itemstext}>school</Text>
        </View>
        {/* ////////////////////////////////////////////// */}

        {/* ////////////////////////////////////////////// */}
        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/work-from-home.png')}
            />
          </View>
          <Text style={styles.itemstext}>Work</Text>
        </View>

        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/family.png')}
            />
          </View>
          <Text style={styles.itemstext}>Family/Friends</Text>
        </View>
        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/improve.png')}
            />
          </View>
          <Text style={styles.itemstext}>Skill Improvement</Text>
        </View>

        {/* ////////////////////////////////////////////// */}

        <View style={styles.listitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../assets/icons/other.png')}
            />
          </View>
          <Text style={styles.itemstext}>Others</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.nextbutton}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Complete2;

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
    marginBottom: hp('3%'),
    fontFamily: 'fredoka-Medium',
    textAlign: 'center',
    fontSize: moderateScale(21),
  },
  listcontainer: {
    flex: 1,
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
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('4%'),
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    opacity: 0.85,
    paddingLeft: wp('4%'),
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
