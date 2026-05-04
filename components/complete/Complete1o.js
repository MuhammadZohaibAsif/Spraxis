import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import CountryFlag from 'react-native-country-flag';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';
import firestore from '@react-native-firebase/firestore';
import { addLanguageToUser } from '../../src/services/languageService';
import auth from '@react-native-firebase/auth';
const Complete1o = () => {
  const navigation = useNavigation();
  const { updateAnswer } = useContext(UserAnswersContext);
  const [selected, setSelected] = useState(null);
  const [languages, setLanguages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('languages')
      .onSnapshot(snapshot => {
        const langs = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setLanguages(langs);
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const handleSelect = lang => setSelected(lang);

  // const handleNext = () => {
  //   if (!selected) return;
  //   updateAnswer('learningLanguage', selected);
  //   navigation.navigate('Complete2');
  // };
  // const handleNext = () => {
  //   if (!selected) return;

  //   // Save selected language in context for later (after account creation)
  //   updateAnswer('learningLanguages', [selected]); // store as array

  //   // Navigate to next screen
  //   navigation.navigate('Complete2');
  // };
  const handleNext = () => {
    if (!selected) return;

    updateAnswer('learningLanguages', [selected]);
    navigation.navigate('Complete2');
  };
  if (loading) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#fff',
        }}
      >
        <ActivityIndicator size="large" color="#00B5AE" />
      </View>
    );
  }

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
        <Text style={styles.protext}>Which language do you want to learn?</Text>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {languages.map(lang => (
          <TouchableOpacity
            key={lang.id}
            style={[
              styles.flagcontainer,
              selected === lang.name && { backgroundColor: '#00B5AE' },
            ]}
            onPress={() => handleSelect(lang.name)}
          >
            <View style={styles.subflagcontainer}>
              <View style={styles.flagWraper}>
                <CountryFlag isoCode={lang.flag || lang.code} size={45.5} />
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

export default Complete1o;

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
    width: wp('85%'),
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
