import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/AntDesign';
import Icon2 from 'react-native-vector-icons/Entypo';
import Icon3 from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';

const Que7 = () => {
  const route = useRoute();
  const { language, lessonId } = route.params;
  const navigation = useNavigation();
  const [lessonWords, setLessonWords] = useState([]);
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [options, setOptions] = useState([]);
  const [wordWidth, setWordWidth] = useState(0);

  useEffect(() => {
    if (!lessonWords.length) return;

    const currentWord = lessonWords[currentWordIndex];

    // Get all other words to choose wrong options
    const otherWords = lessonWords.filter((_, idx) => idx !== currentWordIndex);
    const shuffledOthers = otherWords.sort(() => 0.5 - Math.random());

    const incorrectOptions = shuffledOthers.slice(0, 2).map(w => w.english);

    // Combine correct + incorrect and shuffle
    const allOptions = [currentWord.english, ...incorrectOptions].sort(
      () => 0.5 - Math.random(),
    );

    setOptions(allOptions);
  }, [currentWordIndex, lessonWords]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const lessonDoc = await firestore()
          .collection('languages')
          .doc(language.toLowerCase())
          .collection('lessons')
          .doc(lessonId)
          .get();

        if (lessonDoc.exists) {
          const lessonData = lessonDoc.data();
          setLessonWords(lessonData.words || []);
        }
      } catch (error) {
        console.log('Error fetching lesson:', error);
      }
    };

    fetchLesson();
  }, [language, lessonId]);

  const handleSubmit = () => {
    if (currentWordIndex < lessonWords.length - 1) {
      // Show next word
      setCurrentWordIndex(currentWordIndex + 1);
    } else {
      // All words done, go to Que8 and pass selected language and lesson
      navigation.navigate('Que8', {
        language,
        lessonId,
      });
    }
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
        <View style={styles.container}>
          <Progress.Bar
            progress={1 / 2}
            width={220}
            height={13}
            color="#5A67D8"
            unfilledColor="#E2E8F0"
            borderWidth={1}
            borderRadius={8}
          />
          <Text style={styles.stepText}></Text>
        </View>
        <TouchableOpacity
          onPress={() =>
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabs' }],
            })
          }
        >
          <Icon style={styles.icon} name="cross" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.topparentcontainer}>
        <View style={styles.topcontainer}>
          <Text style={styles.toptext}>Select the correct word</Text>
          <View style={styles.questioncontainer}>
            <TouchableOpacity style={styles.soundiconview}>
              <Image
                style={styles.volumeImage}
                source={require('../../assets/icons/volumeLight.png')}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={styles.questiontext}
                onLayout={event => {
                  setWordWidth(event.nativeEvent.layout.width);
                }}
              >
                {/* {lessonWords[currentWordIndex]?.german || ''} */}
                {lessonWords[currentWordIndex]?.[language.toLowerCase()] || ''}
              </Text>
              <View style={[styles.dottedLine, { width: wordWidth }]} />
            </View>
          </View>
        </View>
        {/* <View style={styles.parentoptionsview}>
          <View style={styles.optionsview}>
            <Text style={styles.germantext}>Goedemorgen</Text>
            <View style={styles.lineview}>
              <TouchableOpacity>
                <Icon2
                  style={styles.icon2}
                  name="circle"
                  size={26}
                  color="#0000001e"
                />
              </TouchableOpacity>
              <View style={styles.linestyling}></View>
            </View>
            <Text style={styles.englishtext}>Good Morning!</Text>
          </View>
          <View style={styles.optionsviewans}>
            <Text style={styles.germantextans}>Hoi</Text>
            <View style={styles.lineviewans}>
              <TouchableOpacity>
                <Icon3
                  style={styles.icon2}
                  name="checkmark-circle-sharp"
                  size={28}
                  color="#5BA890"
                />
              </TouchableOpacity>
              <View style={styles.linestylingans}></View>
            </View>
            <Text style={styles.englishtextans}>Hello!</Text>
          </View>
          <View style={styles.optionsview}>
            <Text style={styles.germantext}>Tot ziens</Text>
            <View style={styles.lineview}>
              <TouchableOpacity>
                <Icon2
                  style={styles.icon2}
                  name="circle"
                  size={26}
                  color="#0000001e"
                />
              </TouchableOpacity>
              <View style={styles.linestyling}></View>
            </View>
            <Text style={styles.englishtext}>Good bye!</Text>
          </View>
        </View> */}
        <View style={styles.parentoptionsview}>
          {options.map((opt, idx) => (
            <View
              key={idx}
              style={
                opt === lessonWords[currentWordIndex]?.english
                  ? styles.optionsviewans
                  : styles.optionsview
              }
            >
              <Text style={styles.germantext}>
                {lessonWords[currentWordIndex]?.[language.toLowerCase()] || ''}{' '}
              </Text>
              <View
                style={
                  opt === lessonWords[currentWordIndex]?.english
                    ? styles.lineviewans
                    : styles.lineview
                }
              >
                <TouchableOpacity>
                  {opt === lessonWords[currentWordIndex]?.english ? (
                    <Icon3
                      style={styles.icon2}
                      name="checkmark-circle-sharp"
                      size={28}
                      color="#5BA890"
                    />
                  ) : (
                    <Icon2
                      style={styles.icon2}
                      name="circle"
                      size={26}
                      color="#0000001e"
                    />
                  )}
                </TouchableOpacity>
                <View
                  style={
                    opt === lessonWords[currentWordIndex]?.english
                      ? styles.linestylingans
                      : styles.linestyling
                  }
                ></View>
              </View>
              <Text
                style={
                  opt === lessonWords[currentWordIndex]?.english
                    ? styles.englishtextans
                    : styles.englishtext
                }
              >
                {opt}
              </Text>
            </View>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.nextbutton}
        // onPress={() => navigation.navigate('Que8')}

        onPress={handleSubmit}
        // disabled={!selected}
      >
        <Text style={styles.nexttext}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Que7;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    marginTop: hp('2.4%'),
    alignItems: 'center',
  },
  stepText: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    paddingTop: wp('1.5%'),
  },
  headercontainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#410FA3',
    height: hp('15%'),
    paddingTop: hp('3.5%'),
  },
  icon: {
    paddingHorizontal: wp('5.7%'),
    marginBottom: hp('0.8%'),
  },
  icon2: {
    paddingHorizontal: wp('3%'),
    // marginBottom: hp('0.8%'),
  },
  topparentcontainer: {
    // flex: 1,
  },
  topcontainer: {
    // flex: 1,
    marginHorizontal: wp('8%'),
    marginTop: hp('2.5%'),
  },
  toptext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    color: '#000',
    marginTop: hp('-3.5%'),
    marginBottom: hp('3.5%'),
  },
  questioncontainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundiconview: {
    backgroundColor: '#000000',
    height: hp('6.5%'),
    width: wp('14%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: wp('3.5%'),
  },
  volumeImage: {
    height: hp('5%'),
    width: wp('8.5%'),
  },
  questiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(20),
    // width: wp('70%'),
    color: '#000',
    textAlign: 'left',
  },
  dottedLine: {
    opacity: 0.4,
    borderBottomWidth: 1,
    borderStyle: 'dashed',
    borderColor: '#000',
    alignSelf: 'flex-start',
  },
  parentoptionsview: {
    // flex: 1,
  },
  optionsview: {
    borderWidth: wp('0.35%'),
    borderColor: '#0000001e',
    borderRadius: 16,
    marginHorizontal: wp('8%'),
    marginTop: hp('5%'),
    paddingHorizontal: wp('8%'),
    paddingVertical: wp('4%'),

    alignItems: 'center',
  },
  lineview: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linestyling: {
    backgroundColor: '#0000001e',
    height: hp('0.2%'),
    width: wp('58%'),
  },
  germantext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  englishtext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.5,
  },
  optionsviewans: {
    backgroundColor: '#5ba89034',
    borderWidth: wp('0.35%'),
    borderColor: '#5ba890a2',
    borderRadius: 16,
    marginHorizontal: wp('8%'),
    marginTop: hp('5%'),
    paddingHorizontal: wp('8%'),
    paddingVertical: wp('4%'),
    alignItems: 'center',
  },
  lineviewans: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linestylingans: {
    backgroundColor: '#5ba89090',
    height: hp('0.2%'),
    width: wp('58%'),
  },
  germantextans: {
    color: '#5ba890ff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  englishtextans: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.68,
    color: '#5ba890ff',
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
