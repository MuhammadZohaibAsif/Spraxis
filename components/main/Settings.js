import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  TextInput,
  Modal,
  Image,
  Alert,
} from 'react-native';
import React, { useState, useEffect } from 'react';
import CountryFlag from 'react-native-country-flag';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';
const Settings = () => {
  const navigation = useNavigation();
  const uid = auth().currentUser.uid;
  const [showEditModal, setShowEditModal] = useState(false);
  const [fullName, setFullName] = useState('');
  const [saving, setSaving] = useState(false);
  const [learningLanguages, setLearningLanguages] = useState([]);
  const [loadingLanguages, setLoadingLanguages] = useState(true);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const faqs = [
    {
      q: 'How to add a language?',
      a: 'Go to Profile > Add Language + button.',
    },
    { q: 'How to track progress?', a: 'Check My Activity section in Profile.' },
    {
      q: 'How to delete a language?',
      a: 'Edit Profile > click trash icon next to language.',
    },
  ];
  useEffect(() => {
    if (!uid) return;
    const unsubscribe = firestore()
      .collection('users')
      .doc(uid)
      .onSnapshot(doc => {
        if (doc.exists) {
          const userData = doc.data();
          // Populate TextInput from profile.fullName
          setFullName(userData?.profile?.fullName || '');
          setLearningLanguages(userData?.profile?.learningLanguages || []);
        }
        setLoadingLanguages(false);
      });

    return unsubscribe;
  }, [uid]);

  const handleSaveName = async () => {
    if (!fullName.trim()) return;

    try {
      setSaving(true);
      await firestore().collection('users').doc(uid).update({
        'profile.fullName': fullName.trim(), // <-- update profile.fullName
      });

      setProfile(prev => ({
        ...prev,
        fullName: fullName.trim(),
      }));
      setShowEditModal(false);
    } catch (e) {
      console.log('Name update error:', e);
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteLanguage = langName => {
    Alert.alert(
      'Delete Language',
      `Are you sure you want to delete "${langName}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            const updatedLanguages = learningLanguages.filter(
              lang => lang.name !== langName,
            );
            await firestore().collection('users').doc(uid).update({
              'profile.learningLanguages': updatedLanguages, // <-- nested path
            });
            setLearningLanguages(updatedLanguages); // <-- update locally too
          },
        },
      ],
    );
  };

  return (
    <>
      {/* ???????????????????????? */}
      <Modal transparent visible={showEditModal} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <ScrollView
              contentContainerStyle={{ paddingBottom: 20 }}
              keyboardShouldPersistTaps="handled"
            >
              <Text style={styles.modalTitle}>Edit Profile</Text>

              {/* Full Name */}
              <TextInput
                placeholder="Enter full name"
                value={fullName}
                onChangeText={setFullName}
                style={styles.input}
              />

              {/* Divider */}
              <View style={styles.divider} />

              {/* Learning Languages */}
              <Text style={styles.modalTitle}>Learning Languages</Text>
              {loadingLanguages ? (
                <Text>Loading languages...</Text>
              ) : learningLanguages.length === 0 ? (
                <Text style={{ color: '#6B7280', marginVertical: 10 }}>
                  No languages added.
                </Text>
              ) : (
                learningLanguages.map((lang, index) => (
                  <View key={index} style={styles.languageRow}>
                    <Text style={styles.languageText}>{lang.name}</Text>
                    <TouchableOpacity
                      onPress={() => handleDeleteLanguage(lang.name)}
                    >
                      <Icon name="trash" size={20} color="#5A67D8" />
                    </TouchableOpacity>
                  </View>
                ))
              )}

              {/* Cancel button */}
              <View style={styles.divider} />

              <TouchableOpacity
                disabled={saving}
                style={styles.saveBtn}
                onPress={handleSaveName}
              >
                <Text style={styles.saveText}>
                  {saving ? 'Saving...' : 'Save'}
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={{ marginTop: 20 }}
                onPress={() => setShowEditModal(false)}
              >
                <Text style={styles.cancelText}>Close</Text>
              </TouchableOpacity>
            </ScrollView>
          </View>
        </View>
      </Modal>

      {/* ////////////////////////////////////////// */}
      <Modal visible={showHelpModal} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>FAQs</Text>
            <ScrollView>
              {faqs.map((item, index) => (
                <View key={index} style={{ marginBottom: 15 }}>
                  <Text
                    style={{
                      fontFamily: 'fredoka-Medium',
                      fontSize: 18,
                      color: '#000',
                    }}
                  >
                    {item.q}
                  </Text>
                  <Text
                    style={{
                      color: '#555',
                      fontFamily: 'fredoka-Medium',
                      fontSize: 13,
                    }}
                  >
                    {item.a}
                  </Text>
                </View>
              ))}
            </ScrollView>
            <TouchableOpacity
              onPress={() => setShowHelpModal(false)}
              style={{ marginTop: 20 }}
            >
              <Text
                style={{
                  textAlign: 'center',
                  color: '#007AFF',
                  fontFamily: 'fredoka-Medium',
                }}
              >
                Close
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      {/* /////////////////////////////////////// */}
      <View style={styles.parentcontainer}>
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
          <Text style={styles.headertext}>Settings</Text>
        </View>

        <View style={styles.listcontainer}>
          <TouchableOpacity
            style={styles.listitemcontainer}
            onPress={() => setShowEditModal(true)}
          >
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/editprofile.png')}
              />
            </View>
            <Text style={styles.itemstext}>Edit Profile</Text>
          </TouchableOpacity>

          {/* <View style={styles.listitemcontainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/mylanguage.png')}
              />
            </View>
            <Text style={styles.itemstext}>My Language</Text>
          </View> */}

          <TouchableOpacity
            onPress={() => navigation.navigate('InviteFriend')}
            style={styles.listitemcontainer}
          >
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/invitefriends.png')}
              />
            </View>
            <Text style={styles.itemstext}>Invite Friend</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.listitemcontainer}
            onPress={() => setShowHelpModal(true)}
          >
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/help.png')}
              />
            </View>
            <Text style={styles.itemstext}>Help</Text>
          </TouchableOpacity>

          {/* <View style={styles.listitemcontainer}>
            <View style={styles.imagecontainer}>
              <Image
                style={styles.imagestyling}
                source={require('../../assets/icons/getaccess.png')}
              />
            </View>
            <Text style={styles.itemstext}>Get Access</Text>
          </View> */}
        </View>
      </View>
    </>
  );
};

export default Settings;

const styles = StyleSheet.create({
  parentcontainer: {
    flex: 1,
  },

  headercontainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
    backgroundColor: '#410FA3',
    height: hp('12%'),
    paddingBottom: hp('1.8%'),
    paddingRight: wp('30%'),
    marginBottom: wp('6%'),
  },
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingRight: wp('10%'),
  },
  createacctext: {
    alignItems: 'center',
  },
  protext: {
    marginTop: hp('4.5%'),
    marginBottom: hp('3%'),
    fontFamily: 'fredoka-Medium',
    textAlign: 'center',
    fontSize: moderateScale(21),
  },
  listcontainer: {
    flex: 1,
  },
  listitemcontainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#e0e5e7',
    marginHorizontal: wp('7%'),
    borderRadius: 18,
    height: hp('8%'),
  },
  imagecontainer: {
    backgroundColor: '#ffffff',
    borderRadius: 25,
    width: wp('12.5%'),
    height: hp('6%'),
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: wp('4%'),
  },
  imagestyling: {
    width: wp('7%'),
    height: hp('3.5%'),
    alignSelf: 'center',
    // backgroundColor:"green"
  },
  itemstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
    opacity: 0.85,
    paddingLeft: wp('4%'),
  },
  nextbutton: {
    alignItems: 'center',
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

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '90%',
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 20,
    maxHeight: '80%',
  },
  modalTitle: {
    fontSize: 20,
    fontFamily: 'fredoka-Medium',
    marginVertical: 15,
    color: '#000000', // dark text
  },
  input: {
    borderWidth: 1,
    borderColor: '#CBD5E1', // light grey
    borderRadius: 12,
    padding: 10,
    fontSize: 16,
    marginBottom: 15,
    fontFamily: 'fredoka-Medium',
  },
  saveBtn: {
    backgroundColor: '#5A67D8', // spraxis primary
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 25,
    marginBottom: 15,
    elevation:3
  },
  saveText: {
    color: '#fff',
    fontFamily: 'fredoka-Medium',
    fontSize: 16,
  },
  cancelText: {
    color: '#6B7280', // grey
    textAlign: 'center',
    fontSize: 16,
    fontFamily: 'fredoka-Medium',
  },
  languageRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 10,
    marginHorizontal: wp('3%'),
    borderBottomColor: '#E5E7EB',
    borderBottomWidth: 1,
  },
  languageText: {
    fontSize: 16,
    color: '#111827',
    fontFamily: 'fredoka-Medium',
  },
});
