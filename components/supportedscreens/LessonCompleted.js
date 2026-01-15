import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useRoute } from '@react-navigation/native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
const LessonCompleted = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { language, lessonId } = route.params || {};
  const { user } = useContext(AuthContext);

  const markLessonCompleted = async () => {
    const uid = user?._user?.uid || user?.uid;
    if (!uid || !language || !lessonId) return;

    try {
      const userRef = firestore().collection('users').doc(uid);
      const userSnap = await userRef.get();
      if (!userSnap.exists) return;

      const profile = userSnap.data()?.profile || {};
      const learningLanguages = profile.learningLanguages || [];

      console.log('Updating progress for:', language, lessonId);

      const updatedLanguages = learningLanguages.map(lang => {
        if (lang.name.toLowerCase() === language.toLowerCase()) {
          return {
            ...lang,
            progress: {
              ...lang.progress,
              [lessonId]: {
                completed: true,
                completedAt: firestore.Timestamp.now(),
              },
            },
          };
        }
        return lang;
      });

      await userRef.update({
        'profile.learningLanguages': updatedLanguages,
      });

      console.log('Lesson marked completed ✅');
    } catch (error) {
      console.log('Firestore update failed ❌', error);
    }
  };

  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />

      <View style={styles.headercontainer}>
        {/* <TouchableOpacity>
          <Icon
            style={styles.icon}
            name="chevron-left"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Icon style={styles.icon} name="cross" size={26} color="#fff" />
        </TouchableOpacity> */}
      </View>
      <View style={styles.congratsView}>
        <Image
          style={styles.congratsimage}
          source={require('../../assets/Completed.png')}
        />
        <Text style={styles.congratstext}>Lesson Completed</Text>
        <Text style={styles.subcongratstext}>
          You have completed {lessonId} of the {language} language course
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextbutton}
        onPress={async () => {
          await markLessonCompleted(); // 🔥 THIS WAS MISSING

          navigation.reset({
            index: 0,
            routes: [{ name: 'BottomTabs' }],
          });
        }}
      >
        <Text style={styles.nexttext}>Back to home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LessonCompleted;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },

  headercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    backgroundColor: '#410FA3',
    height: hp('12%'),
    paddingBottom: hp('1.8%'),
  },

  icon: {
    paddingHorizontal: wp('5.7%'),
  },
  crosstext: {
    fontSize: moderateScale(23),
    color: '#ffffff',
  },
  congratsView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  congratsimage: {
    width: wp('53%'),
    height: hp('29%'),
  },
  congratstext: {
    marginTop: hp('3%'),
    fontSize: moderateScale(24),
    fontFamily: 'Fredoka-Bold',
    color: '#000000',
  },
  subcongratstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    textAlign: 'center',
    width: wp('70%'),
    opacity: 0.5,
    marginTop: hp('0.7%'),
  },
  nextbutton: {
    alignItems: 'center',
    justifyContent: 'flex-end',
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
