// src/firebaseUpload/uploadUrduLesson1.js

import firestore from '@react-native-firebase/firestore';

export async function uploadUrduLesson1() {
  const lessonData = {
    sentence: {
      title: 'Greetings',
      english: 'Good morning, I want to learn Urdu.',
      urdu: 'صبح بخیر، میں اردو سیکھنا چاہتا ہوں۔',
    },
    words: [
      { english: 'Good', urdu: 'اچھا' },
      { english: 'Morning', urdu: 'صبح' },
      { english: 'I', urdu: 'میں' },
      { english: 'want to', urdu: 'چاہتا ہوں' },
      { english: 'learn', urdu: 'سیکھنا' },
      { english: 'Urdu', urdu: 'اردو' },
    ],
  };

  try {
    await firestore()
      .collection('languages')
      .doc('urdu')
      .collection('lessons')
      .doc('lesson1')
      .set(lessonData);

    console.log('Urdu lesson1 uploaded successfully!');
  } catch (error) {
    console.error('Failed to upload Urdu lesson1:', error);
  }
}
