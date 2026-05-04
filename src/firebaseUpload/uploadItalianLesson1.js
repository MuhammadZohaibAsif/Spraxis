// src/firebaseUpload/uploadUrduLesson3.js

import firestore from '@react-native-firebase/firestore';

export async function uploadUrduLesson3() {
  const lessonData = {
    sentence: {
      title: 'Coffee Shop Conversation', // keep English title
      english: 'Hello, I would like a coffee, please. Do you want sugar or milk? Just milk, thank you.',
      urdu: 'ہیلو، میں ایک کافی لینا چاہتا ہوں، براہِ مہربانی۔ کیا آپ چینی یا دودھ چاہتے ہیں؟ صرف دودھ، شکریہ۔',
    },
    words: [
      { english: 'Hello', urdu: 'ہیلو' },
      { english: 'I would like', urdu: 'میں چاہتا ہوں' },
      { english: 'coffee', urdu: 'کافی' },
      { english: 'please', urdu: 'براہِ مہربانی' },
      { english: 'Do you want', urdu: 'کیا آپ چاہتے ہیں' },
      { english: 'sugar', urdu: 'چینی' },
      { english: 'or', urdu: 'یا' },
      { english: 'milk', urdu: 'دودھ' },
      { english: 'Just', urdu: 'صرف' },
      { english: 'thank you', urdu: 'شکریہ' },
    ],
  };

  try {
    await firestore()
      .collection('languages')
      .doc('urdu')
      .collection('lessons')
      .doc('lesson3')
      .set(lessonData);

    console.log('Urdu lesson3 uploaded successfully!');
  } catch (error) {
    console.error('Failed to upload Urdu lesson3:', error);
  }
}
