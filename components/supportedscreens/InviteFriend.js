import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  ScrollView,
  Image,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import Icon1 from 'react-native-vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { Linking, Alert } from 'react-native';

const InviteFriend = () => {
  const navigation = useNavigation();
  const inviteMessage =
    'Hey! 👋 I am learning German on Spraxis. Join me and learn together 🚀\n\nDownload here:\nhttps://spraxis.app';
  const inviteViaWhatsApp = async () => {
    const url = `whatsapp://send?text=${encodeURIComponent(inviteMessage)}`;

    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert('WhatsApp not installed', 'Please install WhatsApp first.');
    }
  };

  return (
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
        <Text style={styles.headertext}>Invite Friends</Text>
      </View>
      <View style={styles.congratsView}>
        <Image
          style={styles.congratsimage}
          source={require('../../assets/inviteafriend.png')}
        />
        <Text style={styles.congratstext}>Invite your Friend</Text>
        <Text style={styles.subcongratstext}>Learn together with friends </Text>
      </View>
      <TouchableOpacity style={styles.nextbutton} onPress={inviteViaWhatsApp}>
        <Icon1 style={styles.icon} name="whatsapp" size={26} color="#fff" />
        <Text style={styles.nexttext}>Whatsapp</Text>
      </TouchableOpacity>
    </View>
  );
};

export default InviteFriend;

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
  },
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },

  icon: {
    paddingHorizontal: wp('2%'),
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
    width: wp('55%'),
    height: hp('30%'),
  },
  congratstext: {
    marginTop: hp('3%'),
    fontSize: moderateScale(24),
    fontFamily: 'Fredoka-Bold',
  },
  subcongratstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    textAlign: 'center',
    width: wp('70%'),
    opacity: 0.5,
    marginTop: hp('0.7%'),
  },
  buttonsView: {},
  nextbutton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
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
