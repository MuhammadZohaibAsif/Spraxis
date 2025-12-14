// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';
import { UserAnswersContext } from './UserAnswersContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { Alert } from 'react-native';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const { answers, saveAnswersToFirestore } = useContext(UserAnswersContext);

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '891648014654-2lqbnh613qntugu4r1l0ba58pkat9n56.apps.googleusercontent.com',
      offlineAccess: true,
    });


    const unsubscribe = auth().onAuthStateChanged(async currentUser => {
      if (currentUser) {
        try {
          await currentUser.getIdToken(true);

          const userDoc = await firestore()
            .collection('users')
            .doc(currentUser.uid)
            .get();
          const profileData = userDoc.exists ? userDoc.data()?.profile : null;
          const fullName =
            profileData?.fullName || currentUser.displayName || 'User';

          setUser({ ...currentUser, displayName: fullName });
        } catch (err) {
          console.log('Invalid user session detected:', err);
          await auth().signOut();
          setUser(null);
        }
      } else {
        setUser(null);
      }
      setInitializing(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, fullName = {}) => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );
      const createdUser = userCredential.user;

      await createdUser.updateProfile({ displayName: fullName });

      await firestore()
        .collection('users')
        .doc(createdUser.uid)
        .set({
          provider: 'email',
          createdAt: firestore.FieldValue.serverTimestamp(),
          profile: {
            fullName,
            email: createdUser.email,
            ...answers, // answers etc.
            completedOn: firestore.FieldValue.serverTimestamp(),
          },
        });

      setUser({ ...createdUser, displayName: fullName });
    } catch (error) {
      console.error('Signup Error:', error);
      Alert.alert('Signup Failed', error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      await auth().signInWithEmailAndPassword(email.trim(), password);
    } catch (error) {
      Alert.alert('Login Failed', error.message);
      throw error;
    }
  };

  const googleLogin = async answersFromScreen => {
    console.log('Answers from context before Google login:', answersFromScreen);
    try {
      await GoogleSignin.hasPlayServices();
      await GoogleSignin.signOut(); 
      const { idToken } = await GoogleSignin.signIn();
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      const result = await auth().signInWithCredential(googleCredential);

      const userDoc = firestore().collection('users').doc(result.user.uid);
      const isNew = result.additionalUserInfo?.isNewUser;

      if (isNew) {
        await userDoc.set({
          provider: 'google',
          createdAt: firestore.FieldValue.serverTimestamp(),
          profile: {
            fullName: result.user.displayName,
            email: result.user.email,
            ...answersFromScreen,
          },
        });
      }

      await saveAnswersToFirestore();

      setUser(result.user);
    } catch (error) {
      console.log('Google login failed:', error);
      Alert.alert('Google Login Failed', error.message);
    }
  };

  const facebookLogin = async answersFromScreen => {
    try {
      const result = await LoginManager.logInWithPermissions([
        'public_profile',
        // 'email',
      ]);
      if (result.isCancelled) throw new Error('User cancelled the login');

      const data = await AccessToken.getCurrentAccessToken();
      if (!data) throw new Error('Failed to get access token');

      const facebookCredential = auth.FacebookAuthProvider.credential(
        data.accessToken,
      );
      const resultAuth = await auth().signInWithCredential(facebookCredential);

      const isNew = resultAuth.additionalUserInfo?.isNewUser;
      const userDoc = firestore().collection('users').doc(resultAuth.user.uid);

      if (isNew) {
        await userDoc.set({
          provider: 'facebook',
          createdAt: firestore.FieldValue.serverTimestamp(),
          profile: {
            fullName: resultAuth.user.displayName,
            email: resultAuth.user.email,
            ...answersFromScreen,
          },
        });
      }

      await saveAnswersToFirestore();

      setUser(resultAuth.user);
    } catch (error) {
      console.log('Facebook login failed:', error);
      Alert.alert('Facebook Login Failed', error.message);
    }
  };

  const logout = async () => {
    try {
      await GoogleSignin.signOut().catch(() => {});
      await LoginManager.logOut();
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.log('Logout Error:', error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser, 
        initializing,
        register,
        login,
        googleLogin,
        facebookLogin,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
