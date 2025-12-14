import firestore from '@react-native-firebase/firestore';
import lesson from '../data/lesson1.json';

export const uploadLesson = async () => {
  try {
    await firestore()
      .collection('languages')
      .doc('german')
      .collection('lessons')
      .doc('lesson1') 
      .set(lesson);

    console.log('✅ Lesson uploaded successfully!');
  } catch (error) {
    console.error('❌ Upload failed:', error);
  }
};
