import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Image,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import FeedbackSheet from '../supportedscreens/FeedbackSheet';
import useFeedbackSound from '../../src/hooks/useFeedbackSound';
import {
  initTts,
  speakWord,
  speakAndThen,
  cleanForSpeech,
} from '../../src/utilis/tts';
import { KeyboardAvoidingView, Platform } from 'react-native';
const FeaturedCourses = () => {
  useEffect(() => {
    if (language) {
      initTts(language);
    }
  }, [language]);

  const navigation = useNavigation();
  const route = useRoute();
  const [questionSentence, setQuestionSentence] = useState('');
  const { language, lessonId } = route.params || {};
  const [displaySentence, setDisplaySentence] = useState('');
  const [blankWord, setBlankWord] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [quizWords, setQuizWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [lessonWords, setLessonWords] = useState([]);
  const [isLocked, setIsLocked] = useState(false);

  const feedbackRef = useRef(null);
  const MIN_QUIZ_COUNT = 2;
  const shuffleArray = array => {
    return array.sort(() => Math.random() - 0.5);
  };

  const { playCorrect, playWrong } = useFeedbackSound();

  const isCJKLanguage = lang =>
    ['chinese', 'japanese', 'korean'].includes(lang);

  const getRandomIndex = length => Math.floor(Math.random() * length);

  useEffect(() => {
    if (!language || !lessonId) return;

    const fetchSentence = async () => {
      try {
        const langKey = language.toLowerCase().trim();

        const doc = await firestore()
          .collection('languages')
          .doc(langKey)
          .collection('lessons')
          .doc(lessonId)
          .get();

        if (!doc.exists) return;

        const data = doc.data();
        const sentence = data?.sentence?.[langKey] || '';
        const wordsArray = data?.words || [];
        setLessonWords(wordsArray);
        setQuestionSentence(sentence);

        let sentenceUnits = [];

        if (isCJKLanguage(langKey)) {
          sentenceUnits = [...sentence];
        } else {
          sentenceUnits = sentence.split(' ').filter(Boolean);
        }

        const shuffled = shuffleArray([...sentenceUnits]);
        const selectedQuizWords = shuffled.slice(
          0,
          Math.min(MIN_QUIZ_COUNT, shuffled.length),
        );

        setQuizWords(selectedQuizWords);
        setCurrentIndex(0);
        setCorrectCount(0);

        generateQuizStep(sentence, selectedQuizWords[0], wordsArray, langKey);
      } catch (error) {
        console.log('Error:', error);
      }
    };

    fetchSentence();
  }, [language, lessonId]);

  const generateQuizStep = (sentence, correctWord, wordsArray, langKey) => {
    let display = '';

    if (isCJKLanguage(langKey)) {
      const chars = [...sentence];
      const index = chars.indexOf(correctWord);

      if (index !== -1) {
        chars[index] = '________';
      }

      display = chars.join('');
    } else {
      const words = sentence.split(' ');
      const index = words.indexOf(correctWord);

      if (index !== -1) {
        words[index] = '________';
      }

      display = words.join(' ');
    }

    setBlankWord(correctWord);
    setDisplaySentence(display);

    const wrongOptions = wordsArray
      .map(item => item[langKey])
      .filter(word => word && word !== correctWord)
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setOptions(shuffleArray([correctWord, ...wrongOptions]));
    setSelectedOption(null);
    setIsCorrect(null);
    setIsLocked(false);
  };

  const handleOptionPress = option => {
    if (isLocked) return;

    setSelectedOption(option);

    const correct = option === blankWord;

    speakAndThen(option, () => {
      if (correct) {
        playCorrect();
        setIsLocked(true);
        setCorrectCount(prev => prev + 1);

        feedbackRef.current?.show('correct');

        const nextIndex = currentIndex + 1;

        setTimeout(() => {
          if (nextIndex < quizWords.length) {
            setCurrentIndex(nextIndex);
            generateQuizStep(
              questionSentence,
              quizWords[nextIndex],
              lessonWords,
              language.toLowerCase(),
            );
          }
        }, 800);
      } else {
        playWrong();
        feedbackRef.current?.show('wrong');
      }
    });
  };

  const progressValue =
    quizWords.length > 0 ? correctCount / quizWords.length : 0;

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={0}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
        <View style={styles.parentcontainer}>
          <StatusBar hidden={true} />
          <View style={styles.contentcontainer}>
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
                  progress={progressValue}
                  width={220}
                  height={13}
                  color="#5A67D8"
                  unfilledColor="#E2E8F0"
                  borderWidth={1}
                  borderRadius={8}
                />
                <Text style={styles.stepText}>
                  {quizWords.length > 0
                    ? `${correctCount}/${quizWords.length}`
                    : '0/0'}
                </Text>
              </View>

              {/* Step Text */}

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

            <View style={styles.computercontainer}>
              <Image
                style={styles.computer}
                source={require('../../assets/computer.png')}
              />

              <Text style={styles.boldtext}>Grammar Quiz:</Text>
              <Text style={styles.boldtext}>Present Tense</Text>
              <Text style={styles.fillthegaps}>Fill in the gaps</Text>
            </View>

            <View style={styles.completethesentencecontainer}>
              <Text style={styles.completethesentence}>
                Complete The Sentence
              </Text>
              <Text style={styles.fillthegaps2}>
                Fill in the blanks with an appropriate present tence form.
              </Text>
              <View style={styles.questioncontainer}>
                {/* <Text style={styles.questiontext}>
              {displaySentence || 'Loading...'}
            </Text> */}
                <TouchableOpacity
                  activeOpacity={0.7}
                  onPress={() => speakWord(cleanForSpeech(displaySentence))}
                >
                  <Text style={styles.questiontext}>
                    {displaySentence || 'Loading...'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.mainoptionscontainer}>
              {options.map((option, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.suboptionscontainer,
                    selectedOption === option && {
                      borderColor: option === blankWord ? 'green' : 'red',
                    },
                  ]}
                  onPress={() => handleOptionPress(option)}
                  // onPress={() => {
                  //   setSelectedOption(option);

                  //   if (option === blankWord) {
                  //     const newCorrect = correctCount + 1;
                  //     setCorrectCount(newCorrect);
                  //     setIsCorrect(true);

                  //     setTimeout(() => {
                  //       const nextIndex = currentIndex + 1;

                  //       if (nextIndex < quizWords.length) {
                  //         setCurrentIndex(nextIndex);
                  //         generateQuizStep(
                  //           questionSentence,
                  //           quizWords[nextIndex],
                  //           lessonWords,
                  //           language.toLowerCase(),
                  //         );
                  //       }
                  //     }, 700);
                  //   } else {
                  //     setIsCorrect(false);
                  //   }
                  // }}
                >
                  <Text style={styles.optiontext}>{option}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
          <TouchableOpacity
            // style={[styles.nextbutton]}
            style={[
              styles.nextbutton,
              { opacity: correctCount === quizWords.length ? 1 : 0.5 },
            ]}
            disabled={correctCount !== quizWords.length}
            onPress={() =>
              navigation.navigate('LessonCompleted', {
                language,
                lessonId,
              })
            }
          >
            <Text style={styles.nexttext}>Next</Text>
          </TouchableOpacity>

          <FeedbackSheet
            ref={feedbackRef}
            onComplete={() => {
              // No extra navigation; handled in option press
            }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default FeaturedCourses;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },
  contentcontainer: {
    flex: 1,
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
    paddingTop: hp('4.8%'),
  },

  icon: {
    paddingHorizontal: wp('5.7%'),
    marginBottom: hp('0.8%'),
  },
  computercontainer: {
    alignItems: 'center',
    marginTop: hp('3.8%'),
  },
  computer: {
    height: hp('7%'),
    width: wp('18%'),
    marginBottom: hp('1.5%'),
  },
  boldtext: {
    fontFamily: 'Fredoka-Bold',
    fontSize: moderateScale(22),
  },
  fillthegaps: {
    fontFamily: 'fredoka-Medium',
    marginTop: hp('2%'),
    opacity: 0.6,
  },

  completethesentencecontainer: {
    paddingHorizontal: wp('8%'),
    marginTop: hp('2.5%'),
  },
  completethesentence: {
    fontFamily: 'fredoka-Medium',
    marginTop: hp('2%'),
    fontSize: moderateScale(17),
    marginBottom: hp('1.3%'),
  },
  fillthegaps2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.6,
  },
  questioncontainer: {
    backgroundColor: '#e0e5e7',
    borderRadius: 14,
    width: wp('85%'),
    marginTop: hp('3%'),
  },
  questiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    paddingVertical: wp('5%'),
    paddingHorizontal: wp('5%'),
  },
  mainoptionscontainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: wp('8%'),
    marginTop: hp('2%'),
  },
  suboptionscontainer: {
    padding: wp('3%'),
    borderColor: 'rgba(0, 0, 0, 0.37)',
    borderWidth: 1,
    borderRadius: 14,
    marginRight: wp('4%'),
    marginTop: hp('2%'),
    opacity: 0.6,
  },
  optiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    opacity: 0.65,
  },
  nextbutton: {
    alignItems: 'center',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginBottom: Platform.OS === 'ios' ? hp('3%') : hp('2%'),
  },
  nexttext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
});
