import {
  StyleSheet,
  Text,
  Image,
  View,
  StatusBar,
  TouchableOpacity,
  Animated,
  Easing,
} from 'react-native';
import React, { useEffect, useState, useRef } from 'react';
import firestore from '@react-native-firebase/firestore';
import { useRoute } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Entypo';
import { useNavigation } from '@react-navigation/native';
import * as Progress from 'react-native-progress';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import FeedbackSheet from '../supportedscreens/FeedbackSheet';
import useFeedbackSound from '../../src/hooks/useFeedbackSound';
import { initTts, speakWord } from '../../src/utilis/tts';
import AIFloatingButton from '../common/AIFloatingButton';

const Que5 = () => {
  useEffect(() => {
    if (language) {
      initTts(language);
    }
  }, [language]);
  const navigation = useNavigation();
  const route = useRoute();
  const { language, lessonId } = route.params;
  const feedbackRef = useRef(null);

  const [words, setWords] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [hasData, setHasData] = useState(true);
  const buttonAnim = useRef(new Animated.Value(1)).current;
  const [submitting, setSubmitting] = useState(false);
  const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
  const { playCorrect, playWrong } = useFeedbackSound();

  const handleSubmit = () => {
    if (submitting) return;

    setSubmitting(true);
    setIsFeedbackVisible(true);

    const isCorrect = true;

    if (isCorrect) {
      playCorrect();
    } else {
      playWrong();
    }

    feedbackRef.current?.show(isCorrect ? 'correct' : 'wrong');
  };

  const currentWord = words[currentIndex] ?? null;

  useEffect(() => {
    if (!language || !lessonId) {
      setLoading(false);
      setWords([]);
      setHasData(false);
      return;
    }

    const fetchLessonWords = async () => {
      setLoading(true);
      try {
        const doc = await firestore()
          .collection('languages')
          .doc(language.toLowerCase())
          .collection('lessons')
          .doc(lessonId)
          .get();

        if (doc.exists) {
          const fetchedWords = doc.data()?.words || [];

          if (fetchedWords.length > 0) {
            setWords(fetchedWords);
            setHasData(true);
            setCurrentIndex(0);
          } else {
            setWords([]);
            setHasData(false);
          }
        } else {
          setWords([]);
          setHasData(false);
        }
      } catch (error) {
        console.log('Error fetching words:', error);
        setWords([]);
        setHasData(false);
      } finally {
        setLoading(false);
      }
    };

    fetchLessonWords();
  }, [language, lessonId]);

  // const currentWord = words[currentIndex];

  const progress = words.length > 0 ? (currentIndex + 1) / words.length : 0;

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
            progress={progress}
            width={220}
            height={13}
            color="#5A67D8"
            unfilledColor="#E2E8F0"
            borderWidth={1}
            borderRadius={8}
          />
          <Text style={styles.stepText}>
            {currentIndex + 1}/{words.length}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.reset({
              index: 0,
              routes: [{ name: 'BottomTabs' }],
            });
          }}
        >
          <Icon style={styles.icon} name="cross" size={26} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.volumeImageView}>
        <Text style={styles.toptext}>Repeat it loudly...</Text>
        <TouchableOpacity
          onPress={() => {
            const word = currentWord?.[language.toLowerCase()];
            speakWord(word);
          }}
        >
          <Image
            style={styles.volumeImage}
            source={require('../../assets/icons/volumeDark.png')}
          />
          <Text style={styles.dotedline}>- - - - - - - - - - - - - </Text>
        </TouchableOpacity>

        {loading ? (
          <Text style={{ marginTop: 50, textAlign: 'center' }}>Loading...</Text>
        ) : hasData ? (
          <View style={styles.optionsviewans}>
            <Text style={styles.germantextans}>
              {currentWord ? currentWord[language.toLowerCase()] : ''}
            </Text>
            <View style={styles.lineviewans}>
              <View style={styles.linestylingans}></View>
            </View>
            <Text style={styles.englishtextans}>{currentWord?.english}</Text>
          </View>
        ) : (
          <Text style={{ color: '#555', fontSize: 16, marginTop: 20 }}>
            No data available for this language yet.
          </Text>
        )}
      </View>

      {!isFeedbackVisible && (
        <Animated.View style={{ opacity: buttonAnim }}>
          <TouchableOpacity
            style={[
              styles.nextbutton,
              { opacity: words.length === 0 ? 0.5 : 1 },
            ]}
            disabled={words.length === 0}
            onPress={handleSubmit}
          >
            <Text style={styles.nexttext}>
              {currentIndex === words.length - 1 ? 'Continue' : 'Submit'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      )}

      <FeedbackSheet
        ref={feedbackRef}
        onComplete={() => {
          setSubmitting(false);
          setIsFeedbackVisible(false); // 👈 button immediately back

          if (currentIndex < words.length - 1) {
            setCurrentIndex(prev => prev + 1);
          } else {
            navigation.navigate('Que7', { language, lessonId });
          }
        }}
      />
      {/* <AIFloatingButton /> */}
    </View>
  );
};

export default Que5;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  },
  volumeImageView: {
    flex: 1,
    alignItems: 'center',
    marginTop: hp('10%'),
  },
  volumeImage: {
    height: hp('16%'),
    width: wp('41%'),
    marginTop: hp('5%'),
  },
  topcontainer: {
    marginHorizontal: wp('8%'),
    marginTop: hp('2.5%'),
  },
  toptext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(24),
    color: '#000000',
    marginBottom: hp('1%'),
  },
  questioncontainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
  soundiconview: {
    backgroundColor: '#000000',
    height: hp('5%'),
    width: wp('10%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    marginRight: wp('2.5%'),
  },
  questiontext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(20),
    width: wp('70%'),
  },
  parentoptionsview: {
    flex: 1,
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
  dotedline: {
    fontSize: moderateScale(16),
    textAlign: 'center',
    color: '#000000',
    opacity: 0.5,
  },
  optionsviewans: {
    backgroundColor: '#5BA890',
    borderRadius: 16,
    marginHorizontal: wp('8%'),
    marginTop: hp('8%'),
    paddingHorizontal: wp('8%'),
    paddingVertical: wp('4%'),
    alignItems: 'center',
  },
  lineviewans: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  linestylingans: {
    backgroundColor: '#ffffff',
    opacity: 0.6,
    height: hp('0.2%'),
    width: wp('52%'),
    marginVertical: hp('2%'),
  },
  germantextans: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(25),
  },
  englishtextans: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(20),
    opacity: 0.8,
    color: '#ffffff',
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
