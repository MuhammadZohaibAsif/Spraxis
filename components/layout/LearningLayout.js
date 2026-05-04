import React from 'react';
import { View, StyleSheet } from 'react-native';
import AIFloatingButton from '../common/AIFloatingButton';
import { useRoute } from '@react-navigation/native';

const LearningLayout = ({ children }) => {
  const route = useRoute();

  const language = route?.params?.language;
  const lessonId = route?.params?.lessonId;

  return (
    <View style={styles.container}>
      {children}

      <AIFloatingButton language={language} lessonId={lessonId} />
    </View>
  );
};

export default LearningLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
