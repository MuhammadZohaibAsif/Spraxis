import React, {
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from 'react';
import { View, Text, StyleSheet, Animated, Easing } from 'react-native';
import { hp, wp, moderateScale } from '../../src/utilis/responsive';

const FeedbackSheet = forwardRef(({ onComplete }, ref) => {
  const translateY = useRef(new Animated.Value(hp(30))).current;
  const [type, setType] = useState(null);

  useImperativeHandle(ref, () => ({
    show(feedbackType) {
      setType(feedbackType);

      Animated.sequence([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.delay(1000),
        Animated.timing(translateY, {
          toValue: hp(30),
          duration: 250,
          easing: Easing.in(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start(() => {
        setType(null);
        onComplete && onComplete();
      });
    },
  }));

  if (!type) return null;

  const isCorrect = type === 'correct';

  return (
    <Animated.View
      style={[
        styles.container,
        {
          backgroundColor: isCorrect
            ? 'rgba(123, 203, 43, 0.92)'
            : 'rgba(245, 101, 101, 0.92)',
          transform: [{ translateY }],
        },
      ]}
    >
      <View style={styles.glassHighlight} />

      <Text style={styles.title}>{isCorrect ? 'Great job!' : 'Oops!'}</Text>

      <Text style={styles.subtitle}>
        {isCorrect ? 'You pronounced it correctly' : 'Try again carefully'}
      </Text>
    </Animated.View>
  );
});

export default FeedbackSheet;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: hp(22),
    paddingHorizontal: wp(6),
    paddingTop: hp(3),
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
    elevation: 2,
  },

  glassHighlight: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    // height: '40%',
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderTopLeftRadius: moderateScale(24),
    borderTopRightRadius: moderateScale(24),
  },

  title: {
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(28),
    color: '#fff',
  },

  subtitle: {
    marginTop: hp(1),
    fontFamily: 'fredoka-Medium',
    fontSize: moderateScale(16),
    color: 'rgba(255,255,255,0.9)',
  },
});
