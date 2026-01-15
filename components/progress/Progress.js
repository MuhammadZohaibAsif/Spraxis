import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import React, { useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import Icon2 from 'react-native-vector-icons/MaterialIcons';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/Ionicons';

import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { BarChart } from 'react-native-gifted-charts';

const Progress = () => {
  const [timeline, setTimeline] = useState('week');
  const [courses, setCourses] = useState([]);
  const [value, setValue] = useState(null);
  const [lessons, setLessons] = useState([]);
  const [userProgress, setUserProgress] = useState({});

  const getWeekLabels = () => ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

  const getMonthLabels = days =>
    Array.from({ length: days }, (_, i) => `${i + 1}`);

  const getYearLabels = () => [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  //////////////////////////////////

  const buildBarData = () => {
    if (!userProgress) return [];

    const completedDates = Object.values(userProgress)
      .filter(p => p.completed && p.completedAt)
      .map(p => p.completedAt.toDate());

    if (timeline === 'week') {
      const counts = Array(7).fill(0);
      completedDates.forEach(date => {
        let day = date.getDay(); // Sun = 0
        day = day === 0 ? 6 : day - 1; // Convert to Mon=0
        counts[day]++;
      });

      return getWeekLabels().map((label, i) => ({
        label,
        value: counts[i],
        frontColor: '#d3d3d389',
      }));
    }

    if (timeline === 'month') {
      const daysInMonth = new Date(
        new Date().getFullYear(),
        new Date().getMonth() + 1,
        0,
      ).getDate();

      const counts = Array(daysInMonth).fill(0);

      completedDates.forEach(date => {
        if (date.getMonth() === new Date().getMonth()) {
          counts[date.getDate() - 1]++;
        }
      });

      return getMonthLabels(daysInMonth).map((label, i) => ({
        label,
        value: counts[i],
        frontColor: '#d3d3d389',
      }));
    }

    if (timeline === 'year') {
      const counts = Array(12).fill(0);

      completedDates.forEach(date => {
        if (date.getFullYear() === new Date().getFullYear()) {
          counts[date.getMonth()]++;
        }
      });

      return getYearLabels().map((label, i) => ({
        label,
        value: counts[i],
        frontColor: '#d3d3d389',
      }));
    }

    return [];
  };

  const barData = buildBarData();

  const MAX_VALUES = {
    week: 5, // max 5 lessons/day
    month: 20, // max 20 lessons/day
    year: 60, // max 60 lessons/month
  };

  // const maxValue = MAX_VALUES[timeline];
  const calculatedMax = Math.max(...barData.map(b => b.value), 1) + 2;

  const maxValue =
    calculatedMax > MAX_VALUES[timeline] ? calculatedMax : MAX_VALUES[timeline];

  ////////////////////////////////

  useEffect(() => {
    const fetchLearningLanguages = async () => {
      try {
        const uid = auth().currentUser.uid;

        const userDoc = await firestore().collection('users').doc(uid).get();

        if (!userDoc.exists) return;

        const profile = userDoc.data()?.profile;

        if (
          profile?.learningLanguages &&
          Array.isArray(profile.learningLanguages)
        ) {
          const dropdownData = profile.learningLanguages.map(item => ({
            label: `${item.name} Language`,
            value: item.name.toLowerCase(),
          }));

          setCourses(dropdownData);
          setValue(dropdownData[0]?.value ?? null);
        }
      } catch (error) {
        console.log('Error fetching learning languages:', error);
      }
    };

    fetchLearningLanguages();
  }, []);

  useEffect(() => {
    if (!value) return;

    const fetchLessonsAndProgress = async () => {
      try {
        const uid = auth().currentUser.uid;

        // 1. Get user progress for selected language
        const userDoc = await firestore().collection('users').doc(uid).get();
        const learningLanguages =
          userDoc.data()?.profile?.learningLanguages || [];

        const selectedLanguage = learningLanguages.find(
          l => l.name.toLowerCase() === value,
        );

        const progressMap = selectedLanguage?.progress || {};
        setUserProgress(progressMap);

        // 2. Fetch lessons from language collection
        const lessonSnap = await firestore()
          .collection('languages')
          .doc(value)
          .collection('lessons')
          .get();

        const lessonList = lessonSnap.docs.map(doc => ({
          id: doc.id,
          title: doc.data()?.sentence?.title ?? 'Untitled Lesson',
        }));

        setLessons(lessonList);
      } catch (err) {
        console.log('Error fetching lessons:', err);
      }
    };

    fetchLessonsAndProgress();
  }, [value]);

  const timelineData = [
    { label: 'This Week', value: 'week' },
    { label: 'This Month', value: 'month' },
    { label: 'This Year', value: 'year' },
  ];

  const highlightIndex =
    timeline === 'week'
      ? new Date().getDay() === 0
        ? 6
        : new Date().getDay() - 1
      : timeline === 'month'
      ? new Date().getDate() - 1
      : new Date().getMonth();

  barData[highlightIndex] && (barData[highlightIndex].frontColor = '#FF6600');

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
          data={courses}
          labelField="label"
          valueField="value"
          placeholder="Select Course"
          placeholderStyle={{ color: '#666' }}
          selectedTextStyle={{
            color: '#5B7BFE',
            fontFamily: 'fredoka-Medium',
            fontSize: moderateScale(16),
          }}
          itemTextStyle={{
            fontFamily: 'fredoka-Medium',
            color: '#000',
          }}
          value={value}
          onChange={item => {
            setValue(item.value);
          }}
          dropdownPosition="bottom"
          dropdownStyle={{
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
            noOfSections={5}
            maxValue={maxValue}
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
        {/* //////////// */}

        {lessons.map((lesson, index) => {
          const completed = userProgress?.[lesson.id]?.completed === true;

          return (
            <View key={lesson.id} style={styles.subcompletetaskview}>
              <View style={styles.innersubcompletetaskview}>
                <View style={styles.IconView}>
                  <Icon1 name="play-outline" size={32} color="#5B7BFE" />
                </View>

                <View>
                  <Text style={styles.lessonname}>{lesson.title}</Text>
                  <Text style={styles.lessonnumber}>Lesson {index + 1}</Text>
                </View>
              </View>

              <Icon2
                name="check-circle"
                size={25}
                color={completed ? '#4a90e2' : '#cfcfcf'}
              />
            </View>
          );
        })}
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
    color: '#000',
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
    color: '#000',
  },
  lessonnumber: {
    marginTop: hp('0.6%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    color: '#00000052',
  },
});
