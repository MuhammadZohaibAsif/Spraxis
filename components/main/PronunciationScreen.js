import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  PermissionsAndroid,
  Platform,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation, useRoute } from '@react-navigation/native';
import Voice from '@react-native-voice/voice';
import { calculateScore } from '../../src/utilis/pronunciation';
import { speakWord, initTts } from '../../src/utilis/tts';

const PronunciationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { language, lessonId } = route.params;

  const [lesson, setLesson] = useState(null);
  const [lessonWords, setLessonWords] = useState([]);
  const [sentence, setSentence] = useState({});
  const [loading, setLoading] = useState(true);

  const [wordIndex, setWordIndex] = useState(0);
  const [mode, setMode] = useState('word'); // word | sentence
  const [completed, setCompleted] = useState(false);

  const [spokenText, setSpokenText] = useState('');
  const [score, setScore] = useState(null);
  const [scores, setScores] = useState([]);
  const [recording, setRecording] = useState(false);

  const langKey = language.toLowerCase();

  useEffect(() => {
    initTts(language);
  }, [language]);

  useEffect(() => {
    const fetchLesson = async () => {
      try {
        const doc = await firestore()
          .collection('languages')
          .doc(langKey)
          .collection('lessons')
          .doc(lessonId)
          .get();

        if (doc.exists) {
          const data = doc.data();

          setLesson(data);
          setLessonWords(data?.words || []);
          setSentence(data?.sentence || {});
        }
      } catch (error) {
        console.log('fetch error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLesson();
  }, [langKey, lessonId]);

  const currentWord = lessonWords[wordIndex]?.[langKey] || '';
  const fullSentence = sentence?.[langKey] || '';
  const englishSentence = sentence?.english || '';

  const target = mode === 'word' ? currentWord : fullSentence;

  const averageScore = scores.length
    ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length)
    : 0;

  useEffect(() => {
    Voice.onSpeechResults = e => {
      const text = e.value?.[0] || '';

      setSpokenText(text);

      const finalScore = calculateScore(target, text);

      setScore(finalScore);
      setScores(prev => [...prev, finalScore]);

      setRecording(false);
    };

    Voice.onSpeechError = e => {
      console.log('VOICE ERROR:', JSON.stringify(e, null, 2));
      setRecording(false);
    };

    return () => {
      Voice.destroy();
      Voice.removeAllListeners();
    };
  }, [target]);

  const requestMicPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }

    return true;
  };

  const getLocale = () => {
    switch (langKey) {
      case 'german':
        return 'de-DE';
      case 'french':
        return 'fr-FR';
      case 'italian':
        return 'it-IT';
      case 'urdu':
        return 'ur-PK';
      case 'arabic':
        return 'ar-SA';
      default:
        return 'en-US';
    }
  };

  const startListening = async () => {
    try {
      const allowed = await requestMicPermission();

      if (!allowed) return;

      setSpokenText('');
      setScore(null);
      setRecording(true);

      await Voice.start(getLocale());
    } catch (error) {
      console.log(error);
      setRecording(false);
    }
  };

  const handleNext = () => {
    setSpokenText('');
    setScore(null);

    if (mode === 'word') {
      if (wordIndex < lessonWords.length - 1) {
        setWordIndex(prev => prev + 1);
      } else {
        setMode('sentence');
      }
    } else {
      setCompleted(true);
    }
  };

  const renderSentence = () => {
    const activeWord = lessonWords[wordIndex]?.[langKey] || '';

    const words = fullSentence.split(' ');

    return (
      <Text style={styles.sentence}>
        {words.map((word, index) => {
          const isActive = mode === 'word' && word.includes(activeWord);

          return (
            <Text
              key={index}
              style={[styles.wordPiece, isActive && styles.highlightWord]}
            >
              {word}{' '}
            </Text>
          );
        })}
      </Text>
    );
  };

  if (loading) {
    return (
      <View style={styles.loader}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (completed) {
    return (
      <SafeAreaView style={styles.loader}>
        <Text style={styles.completeTitle}>🎉 Lesson Completed</Text>

        <Text style={styles.completeScore}>Average Score: {averageScore}%</Text>

        <Text style={styles.completeText}>
          Complete the remaining quizzes in the Learning Stack to unlock
          pronunciation practice for the next lesson.
        </Text>

        <TouchableOpacity
          style={styles.nextBtn}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.nextText}>Go Back</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <View style={styles.headerRow}>
            <TouchableOpacity
              style={styles.backBtn}
              onPress={() => navigation.goBack()}
            >
              <Icon name="chevron-back" size={22} color="#fff" />
            </TouchableOpacity>
            <View style={{ flex: 1, marginLeft: 14 }}>
              <Text style={styles.title}>Pronunciation Coach</Text>
              <Text style={styles.subtitle}>{lesson?.title || language}</Text>
            </View>
            <View style={styles.languageBadge}>
              <Text style={styles.languageBadgeText}>{language}</Text>
            </View>
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.label}>
            {mode === 'word'
              ? `Word ${wordIndex + 1}/${lessonWords.length}`
              : 'Complete Sentence'}
          </Text>

          {renderSentence()}

          <Text style={styles.translation}>{englishSentence}</Text>

          <TouchableOpacity
            style={styles.listenBtn}
            onPress={() => speakWord(target)}
          >
            <Icon name="volume-high-outline" size={22} color="#5B67F1" />
            <Text style={styles.listenText}>Listen</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.center}>
          <TouchableOpacity style={styles.micBtn} onPress={startListening}>
            <Icon
              name={recording ? 'radio-button-on' : 'mic'}
              size={42}
              color="#fff"
            />
          </TouchableOpacity>

          <Text style={styles.tapText}>
            {recording ? 'Listening...' : 'Tap to speak'}
          </Text>
        </View>

        <View style={styles.resultCard}>
          <Text style={styles.resultTitle}>Your Result</Text>

          <Text style={styles.score}>You said: {spokenText || '--'}</Text>

          <Text style={styles.score}>
            Accuracy: {score !== null ? `${score}%` : '--'}
          </Text>

          <Text style={styles.progressText}>
            Progress Score: {averageScore}%
          </Text>
        </View>

        <TouchableOpacity style={styles.nextBtn} onPress={handleNext}>
          <Text style={styles.nextText}>
            {mode === 'word' && wordIndex === lessonWords.length - 1
              ? 'Practice Sentence'
              : mode === 'sentence'
              ? 'Finish'
              : 'Next'}
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </ScrollView>
  );
};

export default PronunciationScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  loader: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F7F7F7',
  },
  languageBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  languageBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },
  header: {
    backgroundColor: '#4B16B5',
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 34,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },

  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  backBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: 'rgba(255,255,255,.15)',
    justifyContent: 'center',
    alignItems: 'center',
  },

  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  subtitle: {
    color: '#D8CCFF',
    marginTop: 4,
    fontSize: 13,
  },

  lang: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
  },

  card: {
    marginHorizontal: 20,
    marginTop: 24,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    elevation: 2,
  },

  label: {
    color: '#5D7BFF',
    fontWeight: '700',
    marginBottom: 16,
    fontSize: 14,
  },

  sentence: {
    fontSize: 28,
    lineHeight: 42,
    color: '#111',
    fontWeight: '700',
  },

  wordPiece: {
    color: '#111',
    fontWeight: '500',
  },

  highlightWord: {
    color: '#5D7BFF',
    fontWeight: '800',
  },

  translation: {
    marginTop: 16,
    color: '#666',
    fontSize: 15,
    lineHeight: 24,
  },

  listenBtn: {
    backgroundColor: 'rgba(93, 123, 255, 0.12)',
    paddingHorizontal: 14,
    paddingVertical: 5,
    borderRadius: 20,
    marginTop: 15,
    flexDirection: 'row',
    width:100,
    alignItems: 'center',
  },

  listenText: {
    marginLeft: 8,
    color: '#5D7BFF',
    fontWeight: '600',
  },

  center: {
    alignItems: 'center',
    marginTop: 35,
  },

  micBtn: {
    width: 95,
    height: 95,
    borderRadius: 48,
    backgroundColor: '#5D7BFF',
    justifyContent: 'center',
    alignItems: 'center',
  },

  tapText: {
    marginTop: 14,
    color: '#666',
    fontSize: 14,
  },

  resultCard: {
    marginHorizontal: 20,
    marginTop: 30,
    backgroundColor: '#fff',
    borderRadius: 22,
    padding: 22,
    borderLeftWidth: 4,
    borderLeftColor: '#5D7BFF',
  },

  resultTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: '#111',
    marginBottom: 12,
  },

  score: {
    fontSize: 15,
    color: '#444',
    marginBottom: 8,
  },

  progressText: {
    marginTop: 8,
    fontSize: 16,
    fontWeight: '700',
    color: '#5D7BFF',
  },

  nextBtn: {
    marginHorizontal: 20,
    marginTop: 28,
    marginBottom: 30,
    height: 46,
    borderRadius: 16,
    backgroundColor: '#5D7BFF',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 25,
  },

  nextText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },

  completeTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111',
    marginBottom: 20,
  },

  completeScore: {
    fontSize: 22,
    color: '#4B16B5',
    fontWeight: '700',
    marginBottom: 20,
  },

  completeText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 16,
    lineHeight: 26,
    marginBottom: 30,
    paddingHorizontal: 25,
  },
});
