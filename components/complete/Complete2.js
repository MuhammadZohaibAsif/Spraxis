import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React, { useContext, useState } from 'react';
import CountryFlag from 'react-native-country-flag';
import { useNavigation } from '@react-navigation/native';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

const Complete2 = () => {
  const navigation = useNavigation();
  const { updateAnswer, answers } = useContext(UserAnswersContext);
  const [selected, setSelected] = useState(null);

  // const selectedLanguage = answers.learningLanguage || 'German';
  const selectedLanguage = answers.learningLanguages?.[0] || 'German';
  const options = [
    {
      id: 1,
      label: 'Travel',
      icon: require('../../assets/icons/airplane.png'),
    },
    { id: 2, label: 'School', icon: require('../../assets/icons/school.png') },
    {
      id: 3,
      label: 'Work',
      icon: require('../../assets/icons/work-from-home.png'),
    },
    {
      id: 4,
      label: 'Family/Friends',
      icon: require('../../assets/icons/family.png'),
    },
    {
      id: 5,
      label: 'Skill Improvement',
      icon: require('../../assets/icons/improve.png'),
    },
    { id: 6, label: 'Others', icon: require('../../assets/icons/other.png') },
  ];

  const handleSelect = option => setSelected(option);

  const handleNext = () => {
    if (!selected) return;
    updateAnswer('reasonToLearn', selected);
    navigation.navigate('Complete3');
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
        <Text style={styles.headertext}>Complete 2/7</Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>
          What is the main reason to learn {selectedLanguage}?
        </Text>
      </View>
      <View style={styles.listcontainer}>
        {options.map(opt => (
          <TouchableOpacity
            key={opt.id}
            style={[
              styles.listitemcontainer,
              selected === opt.label && { backgroundColor: '#00B5AE' },
            ]}
            onPress={() => handleSelect(opt.label)}
          >
            <View style={styles.imagecontainer}>
              <Image style={styles.imagestyling} source={opt.icon} />
            </View>
            <Text
              style={[
                styles.itemstext,
                selected === opt.label && { color: '#fff' },
              ]}
            >
              {opt.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
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
    color: '#000000',
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
    color: '#000000',
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
