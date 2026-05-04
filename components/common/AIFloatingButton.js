import React, { useState } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

const AIFloatingButton = ({ language, lessonId }) => {
  const [visible, setVisible] = useState(false);
  const navigation = useNavigation();

  return (
    <>
      {/* Floating Button */}
      <TouchableOpacity style={styles.fab} onPress={() => setVisible(true)}>
        <Icon name="chatbubble-ellipses" size={24} color="#fff" />
      </TouchableOpacity>

      {/* Bottom Sheet */}
      <Modal
        isVisible={visible}
        onBackdropPress={() => setVisible(false)}
        style={styles.modal}
      >
        <View style={styles.sheet}>
          <Text style={styles.title}>AI Assistant</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              setVisible(false);
              navigation.navigate('ChatBotScreen', {
                language: language,
              });
            }}
          >
            <Icon name="chatbubbles-outline" size={20} />
            <Text style={styles.optionText}>Chat with Tutor</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              setVisible(false);
              navigation.navigate('PronunciationScreen', {
                language,
                lessonId,
              });
            }}
          >
            <Icon name="mic-outline" size={20} />
            <Text style={styles.optionText}>Pronunciation Coach</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.option}
            onPress={() => {
              setVisible(false);
              navigation.navigate('TestObjectRecognition', {
                language: language,
              });
            }}
          >
            <Icon name="scan-outline" size={20} />
            <Text style={styles.optionText}>Object Recognition</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </>
  );
};

export default AIFloatingButton;

const styles = StyleSheet.create({
  fab: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 55,
    height: 55,
    borderRadius: 28,
    backgroundColor: '#5B67F1',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
    zIndex: 999,
  },

  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },

  sheet: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },

  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 15,
  },

  option: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    gap: 10,
  },

  optionText: {
    fontSize: 15,
    marginLeft: 10,
  },
});
