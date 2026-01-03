import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';
import auth from '@react-native-firebase/auth';
import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../../src/context/AuthContext';

const LogIn = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { googleLogin, facebookLogin, user } = useContext(AuthContext); 

  
  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Error', 'Please enter both email and password');
      return;
    }

    try {
      await auth().signInWithEmailAndPassword(email, password);
    } catch (error) {
      console.log(error);
      Alert.alert('Login Failed', error.message);
    }
  };

  //////////////////////////////////////////////

  //////////////////////////////////////////////

  //////////////////////////////////////////////
  const handleSignUp = () => navigation.navigate('SignUp');
  const handleBack = () => navigation.goBack();

  //////////////////////////////////////////////

  return (
    <View style={styles.parentcontainer}>
      <StatusBar hidden={true} />
      <View style={styles.headercontainer}>
        <TouchableOpacity onPress={handleBack}>
          <Icon
            style={styles.icon}
            name="chevron-left"
            size={26}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={styles.headertext}>Login</Text>
      </View>

      <View style={styles.imagecontainer}>
        <Image
          style={styles.image}
          source={require('../../assets/learnToHome.png')}
        />
        <Text style={styles.protext}>
          For free, join now and start learning
        </Text>
      </View>

      <View style={styles.maininputcontainer}>
        <View style={styles.emailcontainer}>
          <Text style={styles.reftext}>Email Address</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="Enter Email-address"
            value={email}
            onChangeText={setEmail}
          />
        </View>
        <View>
          <Text style={styles.reftext}>Password</Text>
          <TextInput
            style={styles.inputstyle}
            placeholder="********"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />
          <TouchableOpacity>
            <Text style={styles.forgotpassword}>Forgot Password</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.loginbutton} onPress={handleLogin}>
        <Text style={styles.logintext}>Login</Text>
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
        <TouchableOpacity onPress={facebookLogin}>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../../assets/icons/facebook.png')}
            />
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => googleLogin()}>
          <View style={styles.sublinkingcontainer}>
            <Image
              style={styles.iconsimage}
              source={require('../../assets/icons/google.png')}
            />
          </View>
        </TouchableOpacity>
      </View>

      <View style={styles.signupbuttoncontainer}>
        <Text style={styles.havingaccounttext}>Don't have an account? </Text>
        <TouchableOpacity onPress={handleSignUp}>
          <Text style={styles.signuptext}>Signup</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default LogIn;

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
  imagecontainer: {
    alignItems: 'center',
  },
  image: {
    marginVertical: hp('3%'),
    // backgroundColor:"green",
    width: wp('33%'),
    height: hp('10%'),
  },
  protext: {
    marginVertical: hp('1%'),
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
    marginVertical: hp('2%'),
  },
  reftext: {
    fontFamily: 'fredoka-Medium',
    opacity: 0.65,
    color: '#000000',
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
  forgotpassword: {
    fontFamily: 'fredoka-Medium',
    color: '#D6185D',
    opacity: 0.75,
    paddingVertical: hp('1%'),
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
    color: '#000000',
    opacity: 0.5,
  },
  signuptext: {
    fontFamily: 'fredoka-Medium',
    color: '#5B7BFE',
  },
});
