import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
// import Icon2 from 'react-native-vector-icons/Octicons';
import CountryFlag from 'react-native-country-flag';

import Icon from 'react-native-vector-icons/Entypo';

import { hp, moderateScale, wp } from '../src/utilis/responsive';
const Task = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dates, setDates] = useState([]);

  //////////////////////////////////////////////

  const [tasks, setTasks] = useState([
    {
      id: '1',
      title: 'German Language',
      details: 'Remaining 5 Tasks',
      hour: 2,
      color: '#5BA890',
      date: new Date(2025, 8, 29).toDateString(), // 29 Sept 2025
      flag: 'de',
    },
    {
      id: '2',
      title: 'Spanish Language',
      details: 'Remaining 20 Tasks',
      hour: 5,
      color: '#F76400',
      date: new Date(2025, 8, 29).toDateString(),
      flag: 'es',
    },
  ]);

  ////////////

  const hours = Array.from({ length: 24 }, (_, i) => i);
  ///////////////////////////////////////

  const generateWeek = centerDate => {
    let arr = [];
    for (let i = -4; i <= 4; i++) {
      let d = new Date(centerDate);
      d.setDate(centerDate.getDate() + i);
      arr.push(d);
    }
    return arr;
  };

  useEffect(() => {
    setDates(generateWeek(new Date()));
  }, []);
  // Show picker
  const showDatePicker = () => setDatePickerVisibility(true);
  const hideDatePicker = () => setDatePickerVisibility(false);

  // Confirm selected date
  const handleConfirm = date => {
    setSelectedDate(date);
    setDates(generateWeek(date)); // ⭐ CHANGED → regenerate week
    hideDatePicker();
  };

  //////////////////////////////////////////////
  const handleDayPress = item => {
    setSelectedDate(item); // sirf select karega
  };
  //////////////////////////////////////////////
  const renderItem = ({ item }) => {
    const isActive = item.toDateString() === selectedDate.toDateString();
    return (
      <TouchableOpacity
        onPress={() => handleDayPress(item)}
        style={[styles.daybox, isActive && styles.activeDaybox]}
      >
        <Text style={[styles.daytext, isActive && styles.activeDaytext]}>
          {item.toLocaleDateString('en-US', { weekday: 'short' })}
        </Text>
        <Text style={[styles.datetextsmall, isActive && styles.activeDaytext]}>
          {item.getDate()}
        </Text>
      </TouchableOpacity>
    );
  };

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
        <Text style={styles.headertext}>Task</Text>
      </View>
      <View style={styles.datecontainer}>
        <View style={styles.topdatecontainer}>
          <Text style={styles.datetext}>
            {selectedDate.toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
          </Text>

          <TouchableOpacity onPress={showDatePicker}>
            <Image
              style={styles.calenderimage}
              source={require('../assets/icons/calendar.png')}
            />
          </TouchableOpacity>
        </View>

        {/* Calendar Modal */}
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />

        <FlatList
          horizontal
          data={dates}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.scrollcontent}
          initialScrollIndex={Math.floor(dates.length / 2)} // center pe current date
          getItemLayout={(data, index) => ({
            length: wp('13%') + wp('3%'), // box + margin
            offset: (wp('13%') + wp('3%')) * index,
            index,
          })}
        />
      </View>
      <FlatList
        data={hours}
        keyExtractor={item => item.toString()}
        renderItem={({ item }) => {
          const taskForThisHour = tasks.find(
            t => t.hour === item && t.date === selectedDate.toDateString(),
          );

          return (
            <View style={styles.hourRow}>
              {/* Hour Text */}
              <Text style={styles.hourText}>
                {item.toString().padStart(2, '0')}:00
              </Text>

              {/* Dotted Line (sirf jab task na ho) */}
              {!taskForThisHour && (
                <Text style={styles.dottedLineText}>
                  {'- '.repeat(27)}{' '}
                  {/* jitna lamba line chahiye utne minus repeat */}
                </Text>
              )}

              {/* Task Card (agar task hai) */}
              {taskForThisHour && (
                <View
                  style={[
                    styles.taskCard,
                    { backgroundColor: taskForThisHour.color },
                  ]}
                >
                  <View style={styles.taskHeader}>
                    {/* Flag Wrapper */}
                    <View style={styles.flagOuter}>
                      <View style={styles.flagInner}>
                        <CountryFlag
                          isoCode={taskForThisHour.flag}
                          size={32}
                          style={styles.flagImg}
                        />
                      </View>
                    </View>

                    {/* Title & Details */}
                    <View style={{ marginLeft: wp('3%') }}>
                      <Text style={styles.taskTitle}>
                        {taskForThisHour.title}
                      </Text>
                      <Text style={styles.taskDetails}>
                        {taskForThisHour.details}
                      </Text>
                    </View>
                  </View>
                </View>
              )}
            </View>
          );
        }}
      />
    </View>
  );
};

export default Task;

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
    paddingRight: wp('38%'),
  },
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingRight: wp('14%'),
  },

  /////////////////////////////////////////////

  datecontainer: {
    backgroundColor: '#d3d3d364',
    paddingVertical: hp('3.5%'),
    borderBottomLeftRadius: 18,
    borderBottomRightRadius: 18,
  },
  topdatecontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('6%'),
  },
  datetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    color: '#000',
  },
  calenderimage: {
    width: wp('8%'),
    height: hp('3.8%'),
    opacity: 0.5,
  },

  /////////////////////////////////////////////

  scrollcontent: {
    paddingHorizontal: wp('5%'),
    marginTop: hp('3.7%'),
  },
  daybox: {
    width: wp('13%'),
    height: hp('6.7%'),
    borderRadius: moderateScale(10),
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: wp('3%'),
  },
  activeDaybox: {
    backgroundColor: '#4C6EF5',
  },
  daytext: {
    fontFamily: 'fredoka-Regular',
    fontSize: moderateScale(13),
    color: '#000',
  },
  datetextsmall: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    color: '#000',
  },
  activeDaytext: {
    color: '#fff',
  },

  ///////////////////////////////////////////////////
  hourRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp('2%'),
    paddingHorizontal: wp('6%'),
  },

  hourText: {
    width: wp('15%'),
    fontSize: moderateScale(13),
    color: '#555',
    fontFamily: 'fredoka-Medium',
  },

  dottedLineText: {
    flex: 1,
    color: '#bbbbbbce',
    fontSize: moderateScale(18),
    marginLeft: wp('2%'),
  },

  taskCard: {
    flex: 1,
    borderRadius: 15,
    padding: wp('4%'),
    // paddingVertical: hp('1.2%'), // ⬅️ vertical kam
    // paddingHorizontal: wp('3%'),
    marginLeft: wp('2%'),
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 1,
  },

  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  flagWraper: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // ⭐ white background
    width: wp('11.5%'),
    height: hp('5.5%'),
    borderRadius: 25,
    overflow: 'hidden',
    opacity: 0.95,
  },
  flagOuter: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 25, // perfect circle
    backgroundColor: '#fff', // white background
  },

  flagInner: {
    width: 33,
    height: 33,
    borderRadius: 18, // again circle
    overflow: 'hidden', // cut everything outside circle
    justifyContent: 'center',
    alignItems: 'center',
  },

  flagImg: {
    width: '100%',
    height: '100%',
    borderRadius: 18, // inner flag bhi circle crop hoga
  },
  taskTitle: {
    fontSize: moderateScale(16),
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
  },
  taskDetails: {
    marginTop: hp('0.8%'),
    fontSize: moderateScale(13),
    fontFamily: 'fredoka-Medium',
    color: '#ffffff',
  },
});
