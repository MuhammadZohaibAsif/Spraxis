import firestore from '@react-native-firebase/firestore';

export const fetchAvailableLanguages = async () => {
  const snapshot = await firestore().collection('languages').get();
  return snapshot.docs.map(doc => ({
    id: doc.id,
    name: doc.data().name,
  }));
};

export const addLanguageToUser = async (uid, languageName) => {
  const userRef = firestore().collection('users').doc(uid);
  const userSnap = await userRef.get();

  const existingLanguages =
    userSnap.data()?.profile?.learningLanguages || [];

  const alreadyExists = existingLanguages.some(
    l => l.name === languageName,
  );

  if (alreadyExists) return false;

  const lessonsSnap = await firestore()
    .collection('languages')
    .doc(languageName.toLowerCase())
    .collection('lessons')
    .get();

  const progress = {};
  lessonsSnap.forEach(doc => {
    progress[doc.id] = {
      completed: false,
      completedAt: null,
    };
  });

  const updatedLanguages = [
    ...existingLanguages,
    { name: languageName, progress },
  ];

  await userRef.update({
    'profile.learningLanguages': updatedLanguages,
  });

  return updatedLanguages;
};
