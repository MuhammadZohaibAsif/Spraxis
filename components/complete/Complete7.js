import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Image,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';

const Complete7 = () => {
  const navigation = useNavigation();
  const { answers } = useContext(UserAnswersContext);
  const selectedLanguage = answers.learningLanguage || 'German';

  const [totalWords, setTotalWords] = useState(0);
  const [totalSentences, setTotalSentences] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourseContent = async () => {
      try {
        const lessonsRef = firestore()
          .collection('languages')
          .doc(selectedLanguage.toLowerCase())
          .collection('lessons');

        const lessonsSnapshot = await lessonsRef.get();

        let wordsCount = 0;
        let sentencesCount = 0;

        for (const lessonDoc of lessonsSnapshot.docs) {
          const data = lessonDoc.data();

          if (Array.isArray(data.words)) {
            wordsCount += data.words.length;
          } else if (typeof data.words === 'object' && data.words !== null) {
            wordsCount += Object.keys(data.words).length;
          }

          if (Array.isArray(data.sentence)) {
            sentencesCount += data.sentence.length;
          } else if (
            typeof data.sentence === 'object' &&
            data.sentence !== null
          ) {
            sentencesCount += 1;
          }
        }

        setTotalWords(wordsCount);
        setTotalSentences(sentencesCount);
      } catch (error) {
        console.error('Error fetching course content:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseContent();
  }, [selectedLanguage]);

  const handleNext = () => {
    navigation.navigate('Congratulations');
  };

  if (loading) {
    return (
      <View
        style={[
          styles.parentcontainer,
          { justifyContent: 'center', alignItems: 'center' },
        ]}
      >
        <ActivityIndicator size="large" color="#fff" />
        <Text style={{ color: '#fff', marginTop: 10 }}>
          Loading Course Content...
        </Text>
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
        <Text style={styles.headertext}>Complete 7/7</Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>Course Overview</Text>
        <Text style={styles.subcourseoverview}>
          Learn listening, speaking, reading and writing in {selectedLanguage}
        </Text>
      </View>

      <View style={styles.createacctext}>
        <Text style={styles.protext}>Course Content :</Text>
      </View>

      <View style={styles.contentcontainer}>
        <View style={styles.subcontentcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../../assets/icons/word.png')}
            />
          </View>
          <Text style={styles.itemstext}>{totalWords}+</Text>
          <Text style={styles.itemsubtext}>Words</Text>
        </View>

        <View style={styles.subcontentcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling}
              source={require('../../assets/icons/sentences.png')}
            />
          </View>
          <Text style={styles.itemstext}>{totalSentences}+</Text>
          <Text style={styles.itemsubtext}>Sentences</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.nextbutton} onPress={handleNext}>
        <Text style={styles.nexttext}>Finish</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Complete7;
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
    marginBottom: hp('1.5%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    color: '#000000',
    fontSize: moderateScale(21),
  },
  subcourseoverview: {
    marginBottom: hp('2%'),
    width: wp('84%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    color: '#000000',
    opacity: 0.58,
  },
  contentcontainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  subcontentcontainer: {
    width: wp('40%'),
    height: hp('17%'),
    backgroundColor: '#e0e5e7',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 17,
    marginHorizontal: wp('2%'),
    opacity: 0.8,
  },

  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    justifyContent: 'space-evenly',
    alignSelf: 'center',
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },

  itemstext: {
    marginTop: hp('1.5%'),
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    opacity: 0.9,
  },
  itemsubtext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.58,
    color: '#000000',
    paddingTop: hp('0.3%'),
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
