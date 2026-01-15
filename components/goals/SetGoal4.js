import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import Icon2 from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import React, { useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { Alert } from 'react-native';
import { useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import { useGoal } from '../../src/context/GoalContext';

const SetGoal4 = () => {
  const navigation = useNavigation();

  // const [selectedTime, setSelectedTime] = useState(null);
  // const [selectedDays, setSelectedDays] = useState([]);
  const [languages, setLanguages] = useState([]);
  // const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);
  const { goalData, updateGoal } = useGoal();

  // Initialize selections from context
  const selectedTime = goalData.time;
  const selectedDays = goalData.days || [];
  const selectedLanguage = goalData.language
    ? { name: goalData.language }
    : null;

  useEffect(() => {
    const unsubscribe = auth().onAuthStateChanged(async user => {
      if (!user) return;

      try {
        const userDoc = await firestore()
          .collection('users')
          .doc(user.uid)
          .get();

        if (userDoc.exists) {
          const data = userDoc.data();
          // console.log('Learning Languages:', data.learningLanguages);
          console.log('FULL USER DOC:', data);

          setLanguages(data.profile?.learningLanguages || []);
        }
      } catch (error) {
        console.log('Error fetching languages:', error);
      }
    });

    return unsubscribe;
  }, []);

  const generateTimes = period => {
    return Array.from({ length: 12 }, (_, i) => {
      const hour = i === 0 ? 12 : i;
      return `${hour}:00 ${period}`;
    });
  };

  const amTimes = generateTimes('AM');
  const pmTimes = generateTimes('PM');

  const days = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  const toggleDay = day => {
    let newDays = selectedDays.includes(day)
      ? selectedDays.filter(d => d !== day)
      : [...selectedDays, day];

    updateGoal({ days: newDays });
  };

  const handleNext = () => {
    if (!selectedTime || selectedDays.length === 0 || !selectedLanguage) {
      Alert.alert(
        'Incomplete Selection',
        'Please select time, days, and a language',
      );
      return;
    }

    navigation.navigate('SetGoal5');
  };

  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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

      <Text style={styles.timeLabel}>Morning (AM)</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {amTimes.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeBox,
              selectedTime === time && styles.selectedBox,
            ]}
            onPress={() => updateGoal({ time: time })}
          >
            <Text
              style={[
                styles.timetext,
                selectedTime === time && styles.selectedText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* ---------- PM TIMES ---------- */}
      <Text style={styles.timeLabel}>Evening (PM)</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.scrollRow}
      >
        {pmTimes.map(time => (
          <TouchableOpacity
            key={time}
            style={[
              styles.timeBox,
              selectedTime === time && styles.selectedBox,
            ]}
            onPress={() => updateGoal({ time: time })}
          >
            <Text
              style={[
                styles.timetext,
                selectedTime === time && styles.selectedText,
              ]}
            >
              {time}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Days */}
      <View style={styles.weekscontainer}>
        <Text style={styles.daystext}>How often?</Text>
        <Text style={styles.subdaystext}>
          {selectedDays.length} days / week
        </Text>
      </View>

      <View style={styles.dayscontainer}>
        {days.map((day, index) => {
          const isSelected = selectedDays.includes(day + index);
          return (
            <TouchableOpacity
              key={day + index}
              style={[
                styles.subdayscontainer,
                {
                  backgroundColor: isSelected ? '#5BA890' : '#e0e5e7',
                },
              ]}
              onPress={() => toggleDay(day + index)}
            >
              <Text
                style={[
                  styles.chartext,
                  { color: isSelected ? '#ffffff' : '#000000' },
                ]}
              >
                {day}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
      {/* ---------- LANGUAGE DROPDOWN ---------- */}
      <View style={styles.languageSection}>
        <Text style={styles.daystext}>Select language</Text>

        <TouchableOpacity
          style={styles.dropdownHeader}
          onPress={() => setShowDropdown(!showDropdown)}
        >
          <Text style={styles.dropdownText}>
            {selectedLanguage ? selectedLanguage.name : 'Choose language'}
          </Text>
          <Icon2
            name={showDropdown ? 'chevron-up' : 'chevron-down'}
            size={20}
            color="#000"
          />
        </TouchableOpacity>

        {showDropdown && (
          <View style={styles.dropdownList}>
            {languages.map((lang, index) => (
              <TouchableOpacity
                key={index}
                style={styles.dropdownItem}
                onPress={() => {
                  updateGoal({ language: lang.name });
                  setShowDropdown(false);
                }}
              >
                <Text style={styles.dropdownItemText}>{lang.name}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </View>

      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
        <Text style={styles.nexttext}>Got it</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SetGoal4;

const styles = StyleSheet.create({
  parentcontainer: {
    // flex: 1,
    // justifyContent:""
  },
  subparentcontainer: {
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
  timeLabel: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    marginLeft: wp('6%'),
    marginTop: hp('1.5%'),
    marginBottom: hp('1%'),
    color: '#000000',
  },
  scrollRow: {
    paddingHorizontal: wp('4%'),
  },
  timeBox: {
    backgroundColor: '#e0e5e7',
    borderRadius: 10,
    paddingHorizontal: wp('2%'),
    paddingVertical: hp('0.5%'),
    marginRight: wp('3%'),
    marginVertical: hp('2%'),
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
    color: '#000000',
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
    // opacity: 0.6,
  },
  protext: {
    marginTop: hp('4.5%'),
    marginBottom: hp('3%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(21),
    color: '#000000',
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
    color: '#000000',
  },
  nextbutton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginTop: hp('17.6%'),
  },
  nexttext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
  selectedBox: {
    backgroundColor: '#5BA890',
  },

  selectedText: {
    color: '#ffffff',
  },

  //////////////////////////////////////////////////////

  languageSection: {
    marginTop: hp(2),
    paddingHorizontal: wp(5),
  },

  dropdownHeader: {
    marginTop: hp(1),
    backgroundColor: '#e0e5e7',
    paddingVertical: hp(1.8),
    paddingHorizontal: wp(4),
    borderRadius: moderateScale(12),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  dropdownText: {
    fontSize: moderateScale(14),
    color: '#000',
  },

  dropdownList: {
    marginTop: hp(1),
    backgroundColor: '#fff',
    borderRadius: moderateScale(12),
    elevation: 3,
    overflow: 'hidden',
  },

  dropdownItem: {
    paddingVertical: hp(1.6),
    paddingHorizontal: wp(4),
    borderBottomWidth: 0.5,
    borderColor: '#ddd',
  },

  dropdownItemText: {
    fontSize: moderateScale(14),
    color: '#000',
  },
});
