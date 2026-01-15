import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
} from 'react-native';
import React, { useState, useContext } from 'react';
import { useNavigation } from '@react-navigation/native';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

const Complete5 = () => {
  const navigation = useNavigation();
  const { updateAnswer, answers } = useContext(UserAnswersContext);
  const [selected, setSelected] = useState(null);

  // const selectedLanguage = answers.learningLanguage || 'German';
  const selectedLanguage = answers.learningLanguages?.[0] || 'German';

  const options = [
    { label: '5min/Day', icon: require('../../assets/icons/5mints.png') },
    { label: '15min/Day', icon: require('../../assets/icons/15mints.png') },
    { label: '30min/Day', icon: require('../../assets/icons/30mints.png') },
    { label: '60min/Day', icon: require('../../assets/icons/60mints.png') },
  ];

  const handleSelect = item => setSelected(item.label);

  const handleNext = () => {
    if (!selected) return;
    // store learning time dynamically
    updateAnswer(`${selectedLanguage.toLowerCase()}LearningTime`, selected);
    navigation.navigate('Complete6');
  };

  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />

      {/* Header */}
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Icon
            name="chevron-left"
            size={26}
            color="#fff"
            style={styles.icon}
          />
        </TouchableOpacity>
        <Text style={styles.headertext}>Complete 5/7</Text>
      </View>

      {/* Title */}
      <View style={styles.createacctext}>
        <Text style={styles.protext}>
          How much time do you want to learn {selectedLanguage}?
        </Text>
      </View>

      {/* Options */}
      <View style={styles.listcontainer}>
        {options.map(item => (
          <TouchableOpacity
            key={item.label}
            style={[
              styles.listitemcontainer,
              selected === item.label && { backgroundColor: '#00B5AE' },
            ]}
            onPress={() => handleSelect(item)}
          >
            <View style={styles.imagecontainer}>
              <Image style={styles.imagestyling} source={item.icon} />
            </View>
            <Text
              style={[
                styles.itemstext,
                selected === item.label && { color: '#fff' },
              ]}
            >
              {item.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Next Button */}
      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Complete5;

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
    width: wp('84%'),
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
    // backgroundColor: '#D6185D',
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('4%'),
  },
  imagestyling: {
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    opacity: 0.85,
    color: '#000000',
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
