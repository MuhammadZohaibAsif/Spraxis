import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../src/context/AuthContext';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';

import { UserAnswersContext } from '../../src/context/UserAnswersContext';
const SignUp = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { answers } = useContext(UserAnswersContext);

  const { user, googleLogin, facebookLogin } = useContext(AuthContext);

  const handleSignup = async () => {
    if (!firstName || !lastName || !email || !password) {
      alert('Please fill in all fields!');
      return;
    }

    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email.trim(),
        password,
      );

      const user = userCredential.user;
      const fullName = `${firstName.trim()} ${lastName.trim()}`;

      
      await user.updateProfile({ displayName: fullName });

      await firestore().collection('users').doc(user.uid).set({
        fullName: fullName,
        email: user.email,
        createdAt: new Date().toISOString(),
      });

      
      alert('Account created successfully! Please log in.');
      navigation.navigate('Login');
    } catch (error) {
      console.log(error);
      if (error.code === 'auth/email-already-in-use') {
        alert('That email address is already in use!');
      } else if (error.code === 'auth/invalid-email') {
        alert('That email address is invalid!');
      } else {
        alert('Signup failed: ' + error.message);
      }
    }
  };

  const handleContinue = () => {
    if (!firstName || !lastName || !email) {
      alert('Please fill in all fields!');
      return;
    }

    navigation.navigate('SignUp2', { email, firstName, lastName }); 
  };

  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />
      <View style={styles.headercontainer}>
        <TouchableOpacity>
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
        <Text style={styles.protext}>Create an Account</Text>
      </View>
      <View style={styles.maininputcontainer}>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>First Name</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Your First Name"
            value={firstName}
            onChangeText={setFirstName}
          ></TextInput>
        </View>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Last Name</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Your Last Name"
            value={lastName}
            onChangeText={setLastName}
          ></TextInput>
        </View>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Email Address</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Email-address"
            value={email}
            onChangeText={setEmail}
          ></TextInput>
        </View>
      </View>
      <TouchableOpacity style={styles.loginbutton} onPress={handleContinue}>
        <Text style={styles.logintext}>Continue</Text>
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
        <TouchableOpacity onPress={() => facebookLogin(answers)}>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../../assets/icons/facebook.png')}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => googleLogin(answers)}>
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

export default SignUp;

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
    marginTop: hp('3.5%'),
    marginBottom: hp('3%'),
    color: '#000000',
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
    marginVertical: hp('2.3%'),
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
    opacity: 0.6,
    color: '#000000',
  },
  signuptext: {
    fontFamily: 'fredoka-Medium',
    color: '#5B7BFE',
  },
});
