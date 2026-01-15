import {
  StyleSheet,
  StatusBar,
  TouchableOpacity,
  Text,
  View,
  Image,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

const FeaturedCourses = () => {
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

  const MIN_QUIZ_COUNT = 2;
  const shuffleArray = array => {
    return array.sort(() => Math.random() - 0.5);
  };

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

        // ✅ CJK → characters
        if (isCJKLanguage(langKey)) {
          sentenceUnits = [...sentence];
        }
        // ✅ Space-based → words
        else {
          sentenceUnits = sentence.split(' ').filter(Boolean);
        }

        // Pick MINIMUM 2 unique quiz words
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

  // const generateQuizStep = (sentence, correctWord, wordsArray, langKey) => {
  //   let display = '';

  //   if (isCJKLanguage(langKey)) {
  //     const chars = [...sentence];
  //     const index = chars.indexOf(correctWord);
  //     if (index !== -1) {
  //       chars[index] = '________';
  //     }
  //     display = chars.join('');
  //   } else {
  //     const words = sentence.split(' ');
  //     if (index !== -1) {
  //       words[index] = '________';
  //     }
  //     display = words.join(' ');
  //   }

  //   setBlankWord(correctWord);
  //   setDisplaySentence(display);

  //   const wrongOptions = wordsArray
  //     .map(item => item[langKey])
  //     .filter(word => word !== correctWord)
  //     .sort(() => 0.5 - Math.random())
  //     .slice(0, 5);

  //   setOptions(shuffleArray([correctWord, ...wrongOptions]));
  //   setSelectedOption(null);
  //   setIsCorrect(null);
  // };

  // useEffect(() => {
  //   if (!language || !lessonId) return;

  //   const fetchSentence = async () => {
  //     try {
  //       const langKey = language.toLowerCase().trim();

  //       const doc = await firestore()
  //         .collection('languages')
  //         .doc(langKey)
  //         .collection('lessons')
  //         .doc(lessonId)
  //         .get();

  //       if (!doc.exists) return;

  //       const data = doc.data();
  //       const sentence = data?.sentence?.[langKey] || '';
  //       const wordsArray = data?.words || [];

  //       setQuestionSentence(sentence);

  //       let correctWord = '';
  //       let display = '';

  //       // ✅ CJK
  //       if (isCJKLanguage(langKey)) {
  //         const chars = [...sentence];
  //         const randomIndex = getRandomIndex(chars.length);
  //         correctWord = chars[randomIndex];
  //         chars[randomIndex] = '________';
  //         display = chars.join('');
  //       }

  //       // ✅ Space-based
  //       else {
  //         const words = sentence.split(' ');
  //         const randomIndex = getRandomIndex(words.length);
  //         correctWord = words[randomIndex];
  //         words[randomIndex] = '________';
  //         display = words.join(' ');
  //       }

  //       setBlankWord(correctWord);
  //       setDisplaySentence(display);

  //       // ✅ OPTIONS GENERATION (KEY PART)
  //       const correctOption = correctWord;

  //       const wrongOptions = wordsArray
  //         .map(item => item[langKey]) // get target language words
  //         .filter(word => word !== correctOption)
  //         .sort(() => 0.5 - Math.random())
  //         .slice(0, 5);

  //       const finalOptions = shuffleArray([correctOption, ...wrongOptions]);

  //       setOptions(finalOptions);
  //     } catch (error) {
  //       console.log('Error:', error);
  //     }
  //   };

  //   fetchSentence();
  // }, [language, lessonId]);
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
  };

  const progressValue =
    quizWords.length > 0 ? correctCount / quizWords.length : 0;

  return (
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
          <Text style={styles.completethesentence}>Complete The Sentence</Text>
          <Text style={styles.fillthegaps2}>
            Fill in the blanks with an appropriate present tence form.
          </Text>
          <View style={styles.questioncontainer}>
            <Text style={styles.questiontext}>
              {displaySentence || 'Loading...'}
            </Text>
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
              // onPress={() => {
              //   setSelectedOption(option);
              //   setIsCorrect(option === blankWord);
              // }}
              onPress={() => {
                setSelectedOption(option);

                if (option === blankWord) {
                  const newCorrect = correctCount + 1;
                  setCorrectCount(newCorrect);
                  setIsCorrect(true);

                  setTimeout(() => {
                    const nextIndex = currentIndex + 1;

                    if (nextIndex < quizWords.length) {
                      setCurrentIndex(nextIndex);
                      generateQuizStep(
                        questionSentence,
                        quizWords[nextIndex],
                        lessonWords,
                        language.toLowerCase(),
                      );
                    }
                  }, 700);
                } else {
                  setIsCorrect(false);
                }
              }}
            >
              <Text style={styles.optiontext}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* <View style={styles.mainoptionscontainer}>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>will go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>are going</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>can go</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>is going</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.suboptionscontainer}>
            <Text style={styles.optiontext}>going to</Text>
          </TouchableOpacity>
        </View> */}
      </View>
      <TouchableOpacity
        style={[
          styles.nextbutton,
          // { opacity: correctCount === quizWords.length ? 1 : 0.5 },
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
    </View>
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
    marginTop: hp('2.3%'),
    marginBottom: hp('4.3%'),
  },
  nexttext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
});
