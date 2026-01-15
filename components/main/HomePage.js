import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  ScrollView,
  Modal,
  FlatList,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Iconadd from 'react-native-vector-icons/Ionicons';

import { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import firestore from '@react-native-firebase/firestore';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import Icon1 from 'react-native-vector-icons/Fontisto';
import Icon2 from 'react-native-vector-icons/FontAwesome5';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';

const HomePage = () => {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('User');
  const { user } = useContext(AuthContext);
  // const [learningLanguage, setLearningLanguage] = useState('');
  const [learningLanguages, setLearningLanguages] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  // const [lessonCount, setLessonCount] = useState(0);
  const [lessonCounts, setLessonCounts] = useState({});
  const courseCardColors = ['#5B7BFE', '#f8eadacd'];

  const getTextColorByBg = bgColor =>
    bgColor === '#5B7BFE' ? '#FFFFFF' : '#000000';

  const fetchAvailableLanguages = async () => {
    try {
      const snapshot = await firestore().collection('languages').get();
      const languages = snapshot.docs.map(doc => ({
        id: doc.id,
        name: doc.data().name, // assuming each language document has a 'name' field
      }));
      setAvailableLanguages(languages);
    } catch (error) {
      console.log('Error fetching languages:', error);
    }
  };

  useEffect(() => {
    const uid = user?._user?.uid || user?.uid;
    if (!uid) return;

    const fetchUserProfile = async () => {
      try {
        const doc = await firestore().collection('users').doc(uid).get();
        if (doc.exists) {
          const data = doc.data();
          const profile = data?.profile || {};
          setUserName(profile.fullName || 'User');
          // make sure learningLanguages is an array
          setLearningLanguages(profile.learningLanguages || []);
        } else {
          setUserName('User');
          setLearningLanguages([]);
        }
      } catch (error) {
        console.log('Error fetching user profile:', error);
        setUserName('User');
        setLearningLanguages([]);
      }
    };

    fetchUserProfile();
  }, [user]);

  const getCleanName = (fullName = '') => {
    const parts = fullName.trim().split(' ').filter(Boolean);

    if (parts.length >= 3) {
      return parts[1];
    } else if (parts.length === 2) {
      return parts[1];
    } else if (parts.length === 1) {
      return parts[0];
    }

    return 'User';
  };

  useEffect(() => {
    const fetchLessonsCount = async () => {
      if (!learningLanguages.length) {
        setLessonCounts({});
        return;
      }

      const counts = {};

      try {
        for (const lang of learningLanguages) {
          const langId = lang.name.toLowerCase();

          const snapshot = await firestore()
            .collection('languages')
            .doc(langId)
            .collection('lessons')
            .get();

          counts[lang.name] = snapshot.size;
        }

        setLessonCounts(counts);
      } catch (error) {
        console.log('Error fetching lessons:', error);
      }
    };

    fetchLessonsCount();
  }, [learningLanguages]);

  const addBgColor =
    courseCardColors[learningLanguages.length % courseCardColors.length];

  const addIconColor = addBgColor === '#5B7BFE' ? '#FFFFFF' : '#F76400';

  const addTextColor = addBgColor === '#5B7BFE' ? '#FFFFFF' : '#000000';

  // const getNextLessonId = (progress = {}) => {
  //   const lessonIds = Object.keys(progress).sort(); // lesson1, lesson2, ...

  //   // find first incomplete lesson
  //   const nextLesson = lessonIds.find(lessonId => progress[lessonId] === false);

  //   // if all lessons completed, fallback to last lesson
  //   return nextLesson || lessonIds[lessonIds.length - 1] || null;
  // };

  const getNextLessonId = (progress = {}) => {
    const lessonIds = Object.keys(progress).sort();

    const nextLesson = lessonIds.find(
      lessonId => progress[lessonId]?.completed === false,
    );

    return nextLesson || lessonIds[lessonIds.length - 1] || null;
  };

  return (
    <View style={styles.parentcontainer}>
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select a Language</Text>

            <FlatList
              data={availableLanguages}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={async () => {
                    const uid = user?._user?.uid || user?.uid;
                    if (!uid) return;

                    try {
                      const userDocRef = firestore()
                        .collection('users')
                        .doc(uid);
                      const userSnap = await userDocRef.get();

                      let existingLanguages =
                        userSnap.data()?.profile?.learningLanguages || [];

                      // check if already added
                      const alreadyExists = existingLanguages.some(
                        lang => lang.name === item.name,
                      );

                      if (alreadyExists) {
                        setIsModalVisible(false);
                        return;
                      }

                      // fetch lessons of selected language
                      const lessonsSnap = await firestore()
                        .collection('languages')
                        .doc(item.name.toLowerCase())
                        .collection('lessons')
                        .get();

                      const progress = {};
                      lessonsSnap.forEach(doc => {
                        progress[doc.id] = {
                          completed: false,
                          completedAt: null,
                        }; // lesson not completed
                      });

                      const updatedLanguages = [
                        ...existingLanguages,
                        {
                          name: item.name,
                          progress: progress,
                        },
                      ];

                      await userDocRef.update({
                        'profile.learningLanguages': updatedLanguages,
                      });

                      setLearningLanguages(updatedLanguages);
                      setIsModalVisible(false);
                    } catch (err) {
                      console.log('Error adding language:', err);
                    }
                  }}

                  // onPress={async () => {
                  //   const uid = user?._user?.uid || user?.uid;
                  //   if (!uid) return;

                  //   try {
                  //     const userDocRef = firestore()
                  //       .collection('users')
                  //       .doc(uid);

                  //     // Get current array
                  //     const doc = await userDocRef.get();
                  //     let existingLanguages = [];
                  //     if (doc.exists) {
                  //       existingLanguages =
                  //         doc.data()?.profile?.learningLanguages || [];
                  //     }

                  //     // Add selected language if not present
                  //     const updatedLanguages = existingLanguages.includes(
                  //       item.name,
                  //     )
                  //       ? existingLanguages
                  //       : [...existingLanguages, item.name];

                  //     // Update Firestore
                  //     await userDocRef.update({
                  //       'profile.learningLanguages': updatedLanguages,
                  //     });

                  //     // Update local state
                  //     setLearningLanguages(updatedLanguages);

                  //     setIsModalVisible(false);
                  //   } catch (error) {
                  //     console.log('Error updating language:', error);
                  //   }
                  // }}
                >
                  <Text style={styles.languageText}>{item.name}</Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              style={styles.modalCloseButton}
              onPress={() => setIsModalVisible(false)}
            >
              <Text style={styles.modalCloseText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* // =================== Modal ENDED HERE ================ */}
      <StatusBar hidden={true} />
      <View style={styles.headercontainer}>
        <View style={styles.firstheadercontainer}>
          <View style={styles.imagecontainer}>
            <View style={styles.imagestyling}>
              <Icon1 name="person" size={24} color="#000000ab" />
            </View>
          </View>
          <TouchableOpacity>
            <Icon name="notifications-outline" size={24} color="#ffffff" />
            <View style={styles.notificationdot}></View>
          </TouchableOpacity>
        </View>
        <View style={styles.usernamecontainer}>
          <Text style={styles.nametext}>Hello, {getCleanName(userName)}</Text>
          <Text style={styles.learntodaytext}>
            What would you like to learn today?
          </Text>
        </View>
      </View>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text style={styles.highlightedtext}>Continue course</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.parentprogresscontainer}
        >
          {learningLanguages.map((language, index) => {
            const bgColor = courseCardColors[index % courseCardColors.length];
            const textColor = bgColor === '#5B7BFE' ? '#FFFFFF' : '#000000';
            const progressFillColor =
              bgColor === '#5B7BFE' ? '#3adbd5ff' : '#F76400';
            const progressUnfillColor =
              bgColor === '#5B7BFE' ? '#ffffff' : '#FFF6EB';

            //////////////////////////////////////////////////

            const progress = language.progress || {};
            const totalLessons = Object.keys(progress).length;
            // const completedLessons = Object.values(progress).filter(
            //   v => v === true,
            // ).length;
            const completedLessons = Object.values(progress).filter(
              lesson => lesson?.completed === true,
            ).length;
            const fill =
              totalLessons === 0 ? 0 : (completedLessons / totalLessons) * 100;

            return (
              <TouchableOpacity
                key={language.name}
                style={[styles.progresscontainer, { backgroundColor: bgColor }]}
                onPress={() => {
                  const nextLessonId = getNextLessonId(language.progress);

                  navigation.navigate('LearningStack', {
                    screen: 'LearningTip',
                    params: {
                      language: language.name,
                      lessonId: nextLessonId,
                    },
                  });
                }}
              >
                <View style={styles.container}>
                  <View style={{ transform: [{ rotate: '-90deg' }] }}>
                    <AnimatedCircularProgress
                      size={95}
                      width={10}
                      fill={fill}
                      tintColor={progressFillColor} // dynamic fill color
                      backgroundColor={progressUnfillColor} // dynamic unfill color
                      lineCap="round"
                    />
                  </View>

                  <View style={styles.textContainer}>
                    <Text style={[styles.text, { color: textColor }]}>
                      {completedLessons}/{totalLessons}
                    </Text>
                  </View>
                </View>

                <View style={styles.languagetextcontainer}>
                  <Text style={[styles.languagetext, { color: textColor }]}>
                    {language.name}
                  </Text>
                  <Text style={[styles.languagetext, { color: textColor }]}>
                    Language
                  </Text>

                  <Text
                    style={[
                      styles.bottomtext,
                      { color: textColor, opacity: 0.7 },
                    ]}
                  >
                    {lessonCounts[language.name] > 0
                      ? `${lessonCounts[language.name]} ${
                          lessonCounts[language.name] === 1
                            ? 'Class'
                            : 'Classes'
                        }`
                      : 'No Classes Yet'}
                    . Easy
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })}

          <TouchableOpacity
            style={[
              styles.progresscontainer1,
              {
                backgroundColor: addBgColor,
              },
            ]}
            onPress={() => {
              fetchAvailableLanguages();
              setIsModalVisible(true);
            }}
          >
            <View style={styles.languagetextcontainer1}>
              <Iconadd
                name="add-circle-outline"
                size={48}
                color={addIconColor}
                style={styles.addIcon}
              />
              <Text style={[styles.languagetext1, { color: addTextColor }]}>
                Add Language
              </Text>
            </View>
          </TouchableOpacity>
        </ScrollView>
        <Text style={styles.FeaturedCourses}>Featured courses</Text>
        <ScrollView
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          contentContainerStyle={{ paddingHorizontal: wp('6%') }}
        >
          <View style={styles.parentgrammerquizcontainer}>
            <View style={styles.grammerquizcontainer}>
              <View style={styles.subgrammerquizcontainer}>
                <View>
                  <Text style={styles.languagetext1}>Grammer</Text>
                  <Text style={styles.languagetext1}>Quiz</Text>
                  <Text style={styles.businessenglish}>Business English</Text>
                </View>
                <Image
                  style={styles.grammerquizimage}
                  source={require('../../assets/grammerquiz.png')}
                />
              </View>
              <View style={styles.watchcontainer}>
                <Icon2 name="stopwatch" size={18} color="#5BA890" />

                <Text style={styles.twohours}>2 hours</Text>
              </View>
            </View>

            <View style={styles.grammerquizcontainer1}>
              <View style={styles.subgrammerquizcontainer}>
                <View>
                  <Text style={styles.languagetext1}>Online</Text>
                  <Text style={styles.languagetext1}>Phrases</Text>
                  <Text style={styles.businessenglish}>Business English</Text>
                </View>
                <Image
                  style={styles.grammerquizimage1}
                  source={require('../../assets/GoalSet.png')}
                />
              </View>
              <View style={styles.watchcontainer}>
                <Icon2 name="stopwatch" size={18} color="#5BA890" />

                <Text style={styles.twohours}>2 hours</Text>
              </View>
            </View>
          </View>
        </ScrollView>
        <TouchableOpacity
          style={styles.weeklygoalscontainer}
          onPress={() =>
            navigation.navigate('GoalsStack', { screen: 'SetGoal1' })
          } // yahan GoalsStack ko target karna
        >
          <View style={styles.goalview}>
            <Image
              style={styles.goalimage}
              source={require('../../assets/icons/goal.png')}
            />
          </View>
          <View style={styles.goalcontainer}>
            <Text style={styles.setweeklygoaltext}>Set Weekly Goal!</Text>
            <Text style={styles.motivationtext}>
              Who set a weekly goal are more likely to stay motivated.
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default HomePage;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },
  headercontainer: {
    backgroundColor: '#410FA3',
    height: hp('26%'),
  },
  firstheadercontainer: {
    marginTop: hp('4.5%'),
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: wp('8%'),
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  imagestyling: {
    backgroundColor: '#f3be0fff',
    width: wp('10.8%'),
    height: hp('5.3%'),
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    //     paddingLeft:wp("2.3%"),
    // marginTop:wp("10.3%"),
    borderRadius: 20,
  },

  notificationdot: {
    position: 'absolute',
    marginTop: 1,
    marginLeft: 14,
    backgroundColor: '#D6185D',
    width: wp('1.8%'),
    height: hp('0.9%'),
    borderRadius: 12,
  },
  usernamecontainer: {
    marginHorizontal: wp('8%'),
  },
  nametext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(25),
  },
  learntodaytext: {
    marginTop: hp('1.5%'),

    marginBottom: hp('2.5%'),
    color: '#ffffffce',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
  },
  highlightedtext: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    marginHorizontal: wp('7%'),
    marginVertical: hp('1.6%'),
  },
  FeaturedCourses: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(22),
    marginHorizontal: wp('7%'),
    marginVertical: hp('2%'),
  },
  parentprogresscontainer: {
    marginHorizontal: wp('5%'),
    flexDirection: 'row',
    // justifyContent: 'space-between',
  },
  progresscontainer: {
    backgroundColor: '#5B7BFE',
    height: hp('28%'),
    width: wp('42%'),
    borderRadius: 15,
    marginRight: wp('4%'),
  },
  container: {
    marginVertical: hp('2.3%'),
    justifyContent: 'center',
    alignItems: 'center',
  },

  textContainer: {
    position: 'absolute',
  },
  text: {
    fontSize: moderateScale(19),
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
  },
  languagetextcontainer: {
    marginHorizontal: wp('4%'),
  },
  languagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
    color: '#ffffff',
  },
  bottomtext: {
    marginTop: hp('1.8%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#ffffffb7',
  },
  languagetextcontainer1: {
    marginHorizontal: wp('5.5%'),
  },
  addIcon: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('9%'),
    marginTop: hp('8%'),
  },
  text1: {
    fontSize: moderateScale(19),
    color: '#000000',
    fontFamily: 'fredoka-Medium',
  },
  languagetext1: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
  bottomtext1: {
    marginTop: hp('1.9%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#0000008e',
  },
  businessenglish: {
    marginTop: hp('0.8%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#0000008e',
  },
  twohours: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#00000077',
    marginHorizontal: wp('2%'),
  },
  progresscontainer1: {
    backgroundColor: '#f8eadacd',
    height: hp('28%'),
    width: wp('42%'),
    borderRadius: 15,
    marginRight: wp('10%'),
  },
  parentgrammerquizcontainer: {
    flexDirection: 'row',
  },
  grammerquizcontainer: {
    height: hp('17%'),
    padding: wp('4%'),
    marginRight: wp('5%'),
    width: wp('70%'),
    backgroundColor: '#dbf6ff',
    borderRadius: 18,
  },
  subgrammerquizcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  grammerquizcontainer1: {
    height: hp('17%'),
    backgroundColor: '#f8eadacd',
    borderRadius: 18,
    padding: wp('4%'),
    width: wp('70%'),
  },
  grammerquizimage: {
    width: wp('26%'),
    height: hp('11.4%'),
  },
  grammerquizimage1: {
    width: wp('18%'),
    height: hp('11%'),
  },
  watchcontainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weeklygoalscontainer: {
    borderRadius: 16,
    backgroundColor: '#f8eadacd',
    marginHorizontal: wp('7%'),
    marginVertical: hp('2%'),
    flexDirection: 'row',
    padding: wp('4%'),
    height: hp('13.5%'),
    alignItems: 'center',
  },
  goalview: {
    backgroundColor: '#ffffff',
    width: wp('13.5%'),
    height: hp('6.2%'),
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
  },
  goalimage: {
    width: wp('7%'),
    height: hp('3.5%'),
  },
  goalcontainer: {
    marginLeft: wp('4%'),
  },
  setweeklygoaltext: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  motivationtext: {
    marginTop: hp('0.8%'),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    color: '#0000008e',
    width: wp('55%'),
  },

  // =================modal styling ================

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    width: wp('90%'),
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: hp('95%'),
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    backgroundColor: '#5B7BFE',
    paddingVertical: hp('1.5%'),
    borderRadius: 14,
    color: '#fff',
  },
  languageItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  languageText: {
    fontSize: 19,
    fontFamily: 'fredoka-Medium',
    color: '#000000aa',
  },
  modalCloseButton: {
    marginTop: 15,
    backgroundColor: '#5B7BFE',
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalCloseText: {
    color: '#fff',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 21,
    fontFamily: 'fredoka-Medium',
  },
});
{
  /* <TouchableOpacity style={styles.progresscontainer}>
            <View style={styles.container}>
              <View style={{ transform: [{ rotate: '-90deg' }] }}>
                <AnimatedCircularProgress
                  size={95}
                  width={10}
                  fill={(15 * 100) / 30}
                  tintColor="#3adbd5ff"
                  backgroundColor="#ffffff"
                  lineCap="round"
                  delay={500}
                />
              </View>

              <View style={styles.textContainer}>
                <Text style={styles.text}>15/20</Text>
              </View>
            </View>
            <View style={styles.languagetextcontainer}>
              <Text style={styles.languagetext}>
                {learningLanguages.join(', ') || 'No language selected'}
              </Text>
              <Text style={styles.languagetext}>Language</Text>
              <Text style={styles.bottomtext}>
                {lessonCount > 0
                  ? `${lessonCount} ${lessonCount === 1 ? 'Class' : 'Classes'}`
                  : 'No Classes Yet'}
                . Easy
              </Text>
            </View>
          </TouchableOpacity> */
}
// useEffect(() => {
//   const fetchLessonsCount = async () => {
//     if (!learningLanguages?.length) {
//       setLessonCount(0);
//       return;
//     }

//     const languageName = learningLanguages[0].toLowerCase(); // assuming language IDs are lowercase
//     try {
//       const lessonsSnapshot = await firestore()
//         .collection('languages')
//         .doc(languageName)
//         .collection('lessons')
//         .get();

//       setLessonCount(lessonsSnapshot.size);
//     } catch (error) {
//       console.log('Error fetching lessons:', error);
//       setLessonCount(0);
//     }
//   };

//   fetchLessonsCount();
// }, [learningLanguages]);
