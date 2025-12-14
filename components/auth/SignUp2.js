import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
  Alert,
} from 'react-native';
import React, { useState, useContext } from 'react';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { UserAnswersContext } from '../../src/context/UserAnswersContext';
import { AuthContext } from '../../src/context/AuthContext'; 

const SignUp2 = ({ route, navigation }) => {
  const { email, firstName, lastName } = route.params;
  const fullName = `${firstName} ${lastName}`.trim();
  const { answers } = useContext(UserAnswersContext);
  const { setUser } = useContext(AuthContext); 

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignup = async () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }
    if (!email.trim() || !fullName.trim()) {
      Alert.alert('Error', 'All fields are required');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password,
      );
      const user = userCredential.user;

      await user.updateProfile({ displayName: fullName });

      
      await firestore()
        .collection('users')
        .doc(user.uid)
        .set({
          provider: 'email',
          profile: {
            fullName,
            email,
            ...answers,
            createdAt: firestore.FieldValue.serverTimestamp(),
          },
        });

      
      const userDoc = await firestore().collection('users').doc(user.uid).get();
      const profileData = userDoc.data()?.profile;

      
      setUser({ ...user, displayName: profileData?.fullName || fullName });

      
      navigation.replace('HomePage');
    } catch (error) {
      Alert.alert('Signup Error', error.message);
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
        <Text style={styles.headertext}>Signup</Text>
      </View>
      <View style={styles.createacctext}>
        <Text style={styles.protext}>Choose a Password</Text>
      </View>
      <View style={styles.maininputcontainer}>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Password</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="******"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          ></TextInput>
        </View>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Confirm Password</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="******"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          ></TextInput>
        </View>
        <View style={styles.emailcontainer}></View>
      </View>
      <TouchableOpacity style={styles.loginbutton} onPress={handleSignup}>
        <Text style={styles.logintext}>SignUp</Text>
      </TouchableOpacity>
      <View style={styles.orcontainer}>
        <Text style={styles.dottext}>
          - - - - - - - - - - - - - - - - - - - - -
        </Text>
        <Text style={styles.ortext}>Or</Text>
        <Text style={styles.dottext}>
          - - - - - - - - - - - - - - - - - - - - -
        </Text>
      </View>
      <View style={styles.linkingcontainer}>
        <TouchableOpacity>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../../assets/icons/facebook.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../../assets/icons/google.png')}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.signupbuttoncontainer}>
        <Text style={styles.havingaccounttext}>Already have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.signuptext}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SignUp2;

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
    paddingRight: wp('38%'),
  },
  headertext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(18),
  },
  icon: {
    paddingRight: wp('20%'),
  },
  createacctext: {
    alignItems: 'center',
  },
  protext: {
    marginTop: hp('4.5%'),
    color: '#000000',
    marginBottom: hp('3%'),

    fontFamily: 'fredoka-Medium',
    width: wp('65%'),
    textAlign: 'center',
    fontSize: moderateScale(22),
  },
  maininputcontainer: {
    paddingHorizontal: wp('7.5%'),
  },
  emailcontainer: {
    marginVertical: hp('1.5%'),
  },
  reftext: {
    color: '#000000',
    fontFamily: 'fredoka-Medium',
    opacity: 0.65,
    marginVertical: hp('0.8%'),
    fontSize: moderateScale(14),
  },

  inputstyle: {
    backgroundColor: '#e0e5e7',
    fontFamily: 'fredoka-Medium',
    borderRadius: 15,
    paddingHorizontal: wp('4%'),
    height: hp('6.7%'),
    opacity: 0.75,
  },
  loginbutton: {
    alignItems: 'center',
    backgroundColor: '#5B7BFE',
    borderRadius: 12,
    paddingVertical: hp('2%'),
    marginHorizontal: wp('7.5%'),
    marginTop: hp('12%'),
    marginBottom: hp('2.3%'),
  },
  logintext: {
    color: '#ffffff',
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(17),
  },
  orcontainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: hp('3%'),
  },
  ortext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.5,
    color: '#000000',
    paddingHorizontal: wp('3%'),
  },
  dottext: {
    opacity: 0.3,
  },
  linkingcontainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  sublinkingcontainer: {
    backgroundColor: '#E7E7E7',
    paddingVertical: hp('1.4%'),
    paddingHorizontal: wp('17%'),
    borderRadius: 12,
  },
  iconsimage: {
    height: hp('3.5%'),
    width: wp('7.39%'),
  },
  signupbuttoncontainer: {
    marginTop: hp('2%'),
    justifyContent: 'center',
    flexDirection: 'row',
  },
  havingaccounttext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.5,
    color: '#000000',
  },
  signuptext: {
    fontFamily: 'fredoka-Medium',
    color: '#5B7BFE',
  },
});
