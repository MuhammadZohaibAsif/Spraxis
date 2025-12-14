import React, { createContext, useState } from 'react';
import { getApp } from '@react-native-firebase/app';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';

export const UserAnswersContext = createContext();

export const UserAnswersProvider = ({ children }) => {
  const [answers, setAnswers] = useState({
    motherLanguage: '',
    reasonToLearn: '',
  });

  const updateAnswer = (key, value) => {
    setAnswers(prev => ({ ...prev, [key]: value }));
  };

  const saveAnswersToFirestore = async () => {
    try {
      const app = getApp(); 
      const currentAuth = auth(app);
      const currentFirestore = firestore(app);

      const user = currentAuth.currentUser;
      if (!user) return console.warn('No user found');

      await currentFirestore
        .collection('users')
        .doc(user.uid)
        .set(
          {
            profile: {
              ...answers,
              completedOn: firestore.FieldValue.serverTimestamp(),
            },
          },
          { merge: true }
        );

      console.log('✅ User answers saved successfully');
    } catch (error) {
      console.error('❌ Error saving answers:', error);
    }
  };

  return (
    <UserAnswersContext.Provider value={{ answers, updateAnswer, saveAnswersToFirestore }}>
      {children}
    </UserAnswersContext.Provider>
  );
};
