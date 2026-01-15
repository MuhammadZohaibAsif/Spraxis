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
import { hp, moderateScale, wp } from '../../src/utilis/responsive';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
const LearningTip = () => {
  const navigation = useNavigation();

  const route = useRoute();
  const { language, lessonId } = route.params;

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
        <TouchableOpacity
          onPress={() => {
            // console.log(language)
            navigation.popToTop();
          }}
        >
          <Icon style={styles.icon} name="cross" size={26} color="#fff" />
        </TouchableOpacity>
      </View>
      <View style={styles.congratsView}>
        <Image
          style={styles.congratsimage}
          source={require('../../assets/LanguageTip.png')}
        />
        <Text style={styles.congratstext}>Learning Tip</Text>
        <Text style={styles.subcongratstext}>
          Hear it loud and clear : turn up the volume or use headphones
        </Text>
      </View>
      <TouchableOpacity
        style={styles.nextbutton}
        onPress={() =>
          navigation.navigate('Que5', {
            language: language,
            lessonId: lessonId,
          })
        }
      >
        <Text style={styles.nexttext}>Got it!</Text>
      </TouchableOpacity>
    </View>
  );
};

export default LearningTip;

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
  },
  subcongratstext: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    textAlign: 'center',
    width: wp('75%'),
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
