import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, { useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Icon2 from 'react-native-vector-icons/MaterialIcons';

import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/Ionicons';

import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { BarChart } from 'react-native-gifted-charts';

const Progress = () => {
  const [value, setValue] = useState('german');
  const [timeline, setTimeline] = useState('week');

  const data = [
    { label: 'German Language', value: 'german' },
    { label: 'Spanish Language', value: 'spanish' },
    { label: 'French Language', value: 'french' },
  ];
  const timelineData = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
  ];

  const barData = [
    { value: 15, label: 'Mon', frontColor: '#d3d3d389' },
    { value: 25, label: 'Tue', frontColor: '#d3d3d389' },
    { value: 10, label: 'Wed', frontColor: '#d3d3d389' },
    { value: 31, label: 'Thur', frontColor: '#FF6600' }, 
    { value: 12, label: 'Fri', frontColor: '#d3d3d389' },
    { value: 28, label: 'Sat', frontColor: '#d3d3d389' },
    { value: 18, label: 'Sun', frontColor: '#d3d3d389' },
  ];
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
        <Text style={styles.headertext}>Progress</Text>
      </View>
      <View style={styles.createacctext}>
        <Text style={styles.protext}>Course</Text>
      </View>
      <View style={styles.dropdowncontainer}>
        <Dropdown
          style={styles.coursedropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder="Select Course"
          placeholderStyle={{ color: '#666' }}
          selectedTextStyle={{
            color: '#5B7BFE',
            fontFamily: 'fredoka-Medium',
            fontSize: moderateScale(16),
          }}
          itemTextStyle={{ fontFamily: 'fredoka-Medium', color: '#000' }}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          dropdownPosition="bottom"
          dropdownStyle={{
            marginTop: 0, 
            borderRadius: 10,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#fff',
          }}
        />
      </View>
      <ScrollView style={styles.scrollview}>
        <View style={styles.createacctext1}>
          <Text style={styles.protext}>Progress</Text>
          <View style={styles.timelinedropdowncontainer}>
            <Dropdown
              style={styles.progressdropdown}
              data={timelineData}
              labelField="label"
              valueField="value"
              placeholder="This Week"
              dropdownPosition="bottom"
              dropdownStyle={{
                marginTop: 0, 
                borderRadius: 10,
                borderWidth: 1,
                borderColor: '#ccc',
                backgroundColor: '#fff',
              }}
              placeholderStyle={{ color: '#666' }}
              selectedTextStyle={{
                color: '#000',
                fontFamily: 'fredoka-Medium',
                fontSize: moderateScale(14),
              }}
              itemTextStyle={{
                fontFamily: 'fredoka-Medium',
                color: '#000',
              }}
              value={timeline}
              onChange={item => {
                setTimeline(item.value);
              }}
            />
          </View>
        </View>
        <View style={styles.barchartView}>
          <BarChart
            data={barData}
            barWidth={28}
            spacing={23}
            hideRules
            hideYAxisText
            yAxisThickness={0}
            xAxisThickness={0}
            noOfSections={3}
            barBorderRadius={8}
            xAxisLabelTextStyle={{
              fontFamily: 'fredoka-Medium',
              fontSize: moderateScale(15),
              color: '#000',
              opacity: 0.6, 
              marginTop: hp('0.3%'),
            }}
            renderTooltip={item => {
              return (
                <View style={{ alignItems: 'center' }}>
                  <View
                    style={{
                      backgroundColor: '#F76400',
                      paddingVertical: 6,
                      paddingHorizontal: 12,
                      borderRadius: 8,
                    }}
                  >
                    <Text
                      style={{
                        color: '#fff',
                        fontFamily: 'fredoka-Medium',
                        fontSize: moderateScale(13),
                      }}
                    >
                      {item.value}
                    </Text>
                  </View>

                  <View
                    style={{
                      width: 0,
                      height: 0,
                      borderLeftWidth: 6,
                      borderRightWidth: 6,
                      borderTopWidth: 8,
                      borderLeftColor: 'transparent',
                      borderRightColor: 'transparent',
                      borderTopColor: '#F76400',
                      marginTop: -2, 
                    }}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={styles.completetask}>
          <Text style={[styles.protext, { marginTop: hp('1.5%') }]}>
            Completed Tasks
          </Text>
        </View>
        <View style={styles.subcompletetaskview}>
          <View style={styles.innersubcompletetaskview}>
            <View style={styles.IconView}>
              <Icon1 name="play-outline" size={32} color="#5B7BFE" />
            </View>
            <View>
              <Text style={styles.lessonname}>Erater Tag in Berlin</Text>
              <Text style={styles.lessonnumber}>Lesson 1</Text>
            </View>
          </View>
          <Icon2 name="check-circle" size={25} color="#4a90e2" />
        </View>
        <View style={styles.subcompletetaskview}>
          <View style={styles.innersubcompletetaskview}>
            <View style={styles.IconView}>
              <Icon1 name="play-outline" size={32} color="#5B7BFE" />
            </View>
            <View>
              <Text style={styles.lessonname}>First Step</Text>
              <Text style={styles.lessonnumber}>Lesson 2</Text>
            </View>
          </View>
          <Icon2 name="check-circle" size={25} color="#4a90e2" />
        </View>
        <View style={styles.subcompletetaskview}>
          <View style={styles.innersubcompletetaskview}>
            <View style={styles.IconView}>
              <Icon1 name="play-outline" size={32} color="#5B7BFE" />
            </View>
            <View>
              <Text style={styles.lessonname}>Vocabulary</Text>
              <Text style={styles.lessonnumber}>Lesson 3</Text>
            </View>
          </View>
          <Icon2 name="check-circle" size={25} color="#4a90e2" />
        </View>
      </ScrollView>
    </View>
  );
};

export default Progress;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
    // alignItems:"center"
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
    marginHorizontal: wp('6%'),
    marginVertical: hp('2.4%'),
  },
  protext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
  },

  dropdowncontainer: {
    marginHorizontal: wp('6%'),
  },
  coursedropdown: {
    height: hp('7%'),
    borderColor: '#5b7cfece',
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 12,
    backgroundColor: '#f0f3ff',
  },
  scrollview: {
    marginVertical: hp('3%'),
  },
  createacctext1: {
    // marginTop: hp('3%'),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: wp('6%'),
  },
  timelinedropdowncontainer: {
    width: wp('30%'),
  },
  progressdropdown: {
    height: hp('4.5%'),
    borderColor: '#00000017',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
    backgroundColor: '#f2eded42',
  },
  barchartView: {
    alignItems: 'center',
  },
  completetask: {
    marginHorizontal: wp('6%'),
    marginVertical: hp('2%'),
  },

  subcompletetaskview: {
    marginVertical: hp('0.7%'),
    flexDirection: 'row',
    marginHorizontal: wp('6%'),
    borderWidth: 1.5,
    borderRadius: 18,
    padding: wp('2.5%'),
    borderColor: '#3b3a3a17',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  innersubcompletetaskview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  IconView: {
    backgroundColor: '#d3d3d389',
    width: wp('13.5%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    padding: wp('2%'),
    marginRight: wp('4%'),
  },
  lessonname: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
  },
  lessonnumber: {
    marginTop: hp('0.6%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    color: '#00000052',
  },
});
