import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
} from 'react-native';
import React, { useContext, useState } from 'react';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

import { useNavigation } from '@react-navigation/native';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';

const Complete1 = () => {
  const navigation = useNavigation();
  const { updateAnswer } = useContext(UserAnswersContext);
  const [selected, setSelected] = useState(null);

  const handleSelect = lang => setSelected(lang);

  const handleNext = () => {
    if (!selected) return;
    updateAnswer('motherLanguage', selected);
    navigation.navigate('Complete1o');
  };

  const languages = [
    { code: 'us', name: 'English' },
    { code: 'fr', name: 'French' },
    { code: 'de', name: 'German' },
    { code: 'in', name: 'Hindi' },
    { code: 'pk', name: 'Urdu' },
    { code: 'tr', name: 'Turkish' },
    { code: 'kr', name: 'Korean' },
    { code: 'bd', name: 'Bengali' },
    { code: 'it', name: 'Italian' },
    { code: 'sa', name: 'Arabic' },
  ];

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
        <Text style={styles.headertext}>Complete 1/7</Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>What Is Your Mother Language?</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.code}
            style={[
              styles.flagcontainer,
              selected === lang.name && { backgroundColor: '#00B5AE' },
            ]}
            onPress={() => handleSelect(lang.name)}
          >
            <View style={styles.subflagcontainer}>
              <View style={styles.flagWraper}>
                <CountryFlag isoCode={lang.code} size={46} />
              </View>
              <Text
                style={[
                  styles.languagetext,
                  selected === lang.name && { color: '#fff' }, 
                ]}
              >
                {lang.name}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
        <Text style={styles.nexttext}>Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Complete1;

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
    alignItems: 'center',
  },
  protext: {
    color: '#000000',
    marginTop: hp('4.5%'),
    marginBottom: hp('3%'),
    fontFamily: 'fredoka-Medium',
    textAlign: 'center',
    fontSize: moderateScale(21),
  },

  flagcontainer: {
    backgroundColor: '#e0e5e7', // width: wp('50%'),
    height: hp('8%'),
    width: wp('85%'),
    justifyContent: 'center',
    alignSelf: 'center',
    borderRadius: 18,
    paddingHorizontal: wp('4%'),
    marginVertical: hp('1.1%'),
  },
  subflagcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    // backgroundColor: 'green',
  },
  flagWraper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('11.5%'),
    height: hp('5.5%'),
    borderRadius: 25,
    overflow: 'hidden',
    opacity: 0.85,
  },
  languagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    opacity: 0.85,
    paddingLeft: wp('4%'),
    color:"#000000",
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
