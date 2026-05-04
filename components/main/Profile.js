import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  Modal,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import Icon from 'react-native-vector-icons/Entypo';
import CountryFlag from 'react-native-country-flag';
import Icon1 from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import {
  fetchAvailableLanguages,
  addLanguageToUser,
} from '../../src/services/languageService';
import Toast from 'react-native-toast-message';

/////////////////////////////

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [createdAt, setCreatedAt] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [availableLanguages, setAvailableLanguages] = useState([]);
  const [learningLanguages, setLearningLanguages] = useState([]);

  const navigation = useNavigation();

  // useEffect(() => {
  //   const fetchProfile = async () => {
  //     const currentUser = auth().currentUser;
  //     if (currentUser) {
  //       try {
  //         const doc = await firestore()
  //           .collection('users')
  //           .doc(currentUser.uid)
  //           .get();

  //         if (doc.exists) {
  //           const data = doc.data();
  //           setProfile(data.profile);
  //           setCreatedAt(data.createdAt); // ye root level timestamp
  //         }
  //       } catch (error) {
  //         console.log('Error fetching profile:', error);
  //       }
  //     }
  //     setLoading(false);
  //   };

  //   fetchProfile();
  // }, []);

  // const handleAddLanguage = async item => {
  //   const currentUser = auth().currentUser;
  //   if (!currentUser) return;

  //   try {
  //     const updatedLanguages = await addLanguageToUser(
  //       currentUser.uid,
  //       item.name,
  //     );

  //     if (updatedLanguages) {
  //       setLearningLanguages(updatedLanguages);
  //     }

  //     setIsModalVisible(false);
  //   } catch (error) {
  //     console.log('Error adding language:', error);
  //   }
  // };

  useEffect(() => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    const unsubscribe = firestore()
      .collection('users')
      .doc(currentUser.uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const data = doc.data();
          setProfile(data.profile); // <- updated profile
          setCreatedAt(data.createdAt);
          setLearningLanguages(data.profile?.learningLanguages || []);
        }
        setLoading(false);
      });

    return unsubscribe;
  }, []);

  const handleAddLanguage = async item => {
    const currentUser = auth().currentUser;
    if (!currentUser) return;

    try {
      const updatedLanguages = await addLanguageToUser(
        currentUser.uid,
        item.name,
      );

      if (updatedLanguages) {
        setLearningLanguages(updatedLanguages);

        // ✅ SUCCESS TOAST
        Toast.show({
          type: 'success',
          text1: 'Language added successfully',
          text2: 'Start learning from the Home screen.',
          position: 'bottom',
          visibilityTime: 2500,
        });
      }

      setIsModalVisible(false);
    } catch (error) {
      console.log('Error adding language:', error);

      // ❌ ERROR TOAST (optional but recommended)
      Toast.show({
        type: 'error',
        text1: 'Something went wrong',
        text2: 'Please try again.',
      });
    }
  };

  return (
    <View style={styles.parentcontainer}>
      {/* ===== Add Language Modal ===== */}
      <Modal
        visible={isModalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setIsModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalTitle}>
              <Text style={styles.modalTitletext}>Select a Language</Text>
            </View>
            <FlatList
              data={availableLanguages}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.languageItem}
                  onPress={() => handleAddLanguage(item)}
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
        <Text style={styles.headertext}>Profile</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Icon1
            style={styles.icon}
            name="settings-outline"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.profilecontainer}>
        <View style={styles.profileimage}>
          <Icon1
            style={styles.icon1}
            name="settings-outline"
            size={56}
            color="#fff"
          />
        </View>
        <Text style={styles.usernametext}>
          {' '}
          {loading ? 'Loading...' : profile?.fullName || 'User'}
        </Text>
        <Text style={styles.joiningdate}>
          {loading
            ? ''
            : `joined ${createdAt?.toDate().toLocaleDateString('en-US', {
                month: 'long',
                year: 'numeric',
              })}`}
        </Text>
        <TouchableOpacity
          style={styles.addlanguagecontainer}
          onPress={async () => {
            const langs = await fetchAvailableLanguages();
            setAvailableLanguages(langs);
            setIsModalVisible(true);
          }}
        >
          <Text style={styles.addlanguagetext}>Add Language +</Text>
        </TouchableOpacity>
        <Text style={styles.dottext}>
          - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
          - - - - - - - - -
        </Text>
      </View>
      <View style={styles.myactivitycontainer}>
        <Text style={styles.myactivitytext}>My Activity</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Activity')}>
          <Text style={styles.viewalltext}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listitemcontainer}>
        <View style={styles.sublistitemcontainer}>
          <View style={styles.imagecontainer}>
            <Image
              style={styles.imagestyling2}
              source={require('../../assets/icons/clock.png')}
            />
          </View>
          <View>
            <Text style={styles.totalhourstext}>Total hours</Text>
            <Text style={styles.itemstext2}>8h : 20 min</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.thisweekcontainer}>
          <Text style={styles.thisweektext}>This Week </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.myactivitycontainer}>
        <Text style={styles.myactivitytext}>Achievements</Text>

        <TouchableOpacity>
          <Text style={styles.viewalltext}>View All</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.parentlanguageContainer}>
        <View style={styles.languageContainer}>
          <View style={styles.flagWraper}>
            <CountryFlag isoCode="de" size={46} />
          </View>
          <Text style={styles.germanlanguagetext}>German Language</Text>
          <Text style={styles.leveltext}>Level 1</Text>
        </View>
      </View>
    </View>
  );
};

export default Profile;

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
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingHorizontal: wp('5.7%'),
  },
  profilecontainer: {
    alignItems: 'center',
  },
  profileimage: {
    backgroundColor: '#5B7BFE',
    borderRadius: 50,
    width: wp('19%'),
    height: hp('9%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('4%'),
    marginTop: hp('4%'),
  },
  icon1: {
    alignItems: 'center',
  },
  usernametext: {
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Fredoka-Bold',
    fontSize: moderateScale(20),
    marginTop: hp('2.5%'),
  },
  joiningdate: {
    textAlign: 'center',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    marginTop: hp('1%'),
    opacity: 0.6,
  },
  addlanguagecontainer: {
    backgroundColor: '#e0e5e7',
    borderColor: '#5B7BFE',
    borderWidth: 1,
    borderRadius: 9,
    paddingHorizontal: wp('4.5%'),
    paddingVertical: wp('2.5%'),
    marginTop: hp('2%'),
    opacity: 0.6,
  },
  addlanguagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(15),
    color: '#5B7BFE',
  },
  dottext: {
    opacity: 0.35,
    marginTop: hp('2.5%'),
  },
  myactivitycontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('4.5%'),
    alignItems: 'center',
    marginTop: hp('2.5%'),
    marginHorizontal: wp('3.5%'),
  },
  myactivitytext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    marginTop: hp('0.5%'),
    color: '#000000',
  },
  viewalltext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(13),
    marginTop: hp('0.5%'),
    opacity: 0.5,
  },
  listitemcontainer: {
    marginTop: hp('3%'),
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('7%'),
    borderRadius: 18,
    height: hp('8%'),
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingHorizontal: wp('5%'),
  },
  sublistitemcontainer: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    justifyContent: 'space-evenly',
  },
  imagestyling2: {
    width: wp('7.3%'),
    height: hp('3.5%'),
    alignSelf: 'center',
  },
  itemstext2: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    paddingLeft: wp('4%'),
    color: '#000000',
  },
  icon2: {
    opacity: 0.7,
  },
  totalhourstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(12),
    paddingLeft: wp('4%'),
    opacity: 0.6,
  },
  thisweekcontainer: {
    backgroundColor: '#e0e5e7',
    borderColor: '#5B7BFE',
    borderWidth: 1.5,
    borderRadius: 6.5,
    paddingHorizontal: wp('2.5%'),
    paddingVertical: wp('1.7%'),
    opacity: 0.75,
    alignSelf: 'center',
  },
  thisweektext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    // color: '#5B7BFE',
    opacity: 0.6,
  },
  parentlanguageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  languageContainer: {
    marginVertical: hp('3%'),
    backgroundColor: '#e0e5e7',
    paddingVertical: 20,
    alignItems: 'center',
    paddingHorizontal: wp('8%'),
    borderRadius: 15,
  },
  flagWraper: {
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('11%'),
    height: hp('5.2%'),
    borderRadius: 25,
    overflow: 'hidden',
    opacity: 0.85,
    marginBottom: hp('1.5%'),
  },
  germanlanguagetext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    marginBottom: hp('0.8%'),
    color: '#000000',
  },
  leveltext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(14),
    opacity: 0.6,
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
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#5A67D8', //'#5B7BFE',
    paddingVertical: hp('1.5%'),
    borderRadius: 14,
    elevation: 16,
  },
  modalTitletext: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    fontFamily: 'fredoka-Medium',
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
    elevation: 3,
    marginTop: 15,
    backgroundColor: '#5A67D8',
    paddingVertical: 10,
    borderRadius: 10,
  },
  modalCloseText: {
    color: '#fff',
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 18,
    fontFamily: 'fredoka-Medium',
  },
});
