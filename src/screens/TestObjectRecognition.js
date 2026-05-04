import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchCamera } from 'react-native-image-picker';
import { PermissionsAndroid, Platform } from 'react-native';
import ImageResizer from 'react-native-image-resizer';
import RNFS from 'react-native-fs';
import { detectObjectGoogle } from '../services/googleVision';
import { useRoute } from '@react-navigation/native';
import { translateText } from '../services/googleTranslate';
import { getLanguageCode } from '../utilis/languageCode';
import Icon from 'react-native-vector-icons/Ionicons';
import { initTts, speakWord } from '../utilis/tts';

const TestObjectRecognition = () => {
  useEffect(() => {
    if (language) {
      initTts(language);
    }
  }, [language]);

  const requestCameraPermission = async () => {
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.CAMERA,
      );

      return granted === PermissionsAndroid.RESULTS.GRANTED;
    }
    return true;
  };
  const route = useRoute();
  const { language } = route.params || {};
  const [image, setImage] = useState(null);
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  // 📸 Convert URI → Base64
  const uriToBase64 = async uri => {
    return await RNFS.readFile(uri, 'base64');
  };

  const openCamera = async () => {
    try {
      const hasPermission = await requestCameraPermission();

      if (!hasPermission) {
        console.log('Camera permission denied');
        return;
      }

      const res = await launchCamera({
        mediaType: 'photo',
        includeBase64: false,
        quality: 0.8,
      });

      console.log('CAMERA RESPONSE:', res);

      if (res.didCancel) return;
      if (!res.assets?.length) return;

      const asset = res.assets[0];

      setLoading(true);

      const compressed = await ImageResizer.createResizedImage(
        asset.uri,
        600,
        600,
        'JPEG',
        70,
      );

      setImage(compressed.uri);

      const base64 = await uriToBase64(compressed.uri);

      const detectedObject = await detectObjectGoogle(base64);

      if (detectedObject) {
        const code = getLanguageCode(language);
        const translated = await translateText(detectedObject, code);

        setResult(translated);
      } else {
        setResult('Nothing detected');
      }

      setLoading(false);
    } catch (err) {
      console.log('Camera Error:', err);
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <View style={styles.headerAvatar}>
            <Icon name="scan" size={24} color="#4B16B5" />
          </View>

          <View style={{ flex: 1 }}>
            <Text style={styles.headerTitle}>Object Recognition</Text>
            <Text style={styles.headerSubtitle}>
              Detect objects in {language}
            </Text>
          </View>

          <View style={styles.languageBadge}>
            <Text style={styles.languageBadgeText}>{language}</Text>
          </View>
        </View>
      </View>

      <View style={styles.content}>
        {image ? (
          <View style={styles.imageCard}>
            <Image source={{ uri: image }} style={styles.image} />
          </View>
        ) : (
          <View style={styles.placeholderCard}>
            <Icon name="image-outline" size={42} color="#999" />
            <Text style={styles.placeholderText}>No image selected</Text>
          </View>
        )}

        {loading && (
          <View style={styles.loadingBox}>
            <Text style={styles.loadingText}>Detecting...</Text>
          </View>
        )}
        {!!result && (
          <View style={styles.resultCard}>
            <Text style={styles.resultLabel}>Detected Object</Text>

            <View style={styles.resultRow}>
              <Text style={styles.resultText}>{result}</Text>

              <TouchableOpacity
                style={styles.speakerBtn}
                onPress={() => speakWord(result)}
              >
                <Icon name="volume-high" size={22} color="#5D7BFF" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        <TouchableOpacity style={styles.captureBtn} onPress={openCamera}>
          <Icon name="camera" size={22} color="#fff" />
          <Text style={styles.captureText}>Take Picture</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TestObjectRecognition;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F7F7',
  },

  header: {
    backgroundColor: '#4B16B5',
    paddingHorizontal: 22,
    paddingTop: 55,
    paddingBottom: 28,
    // borderBottomLeftRadius: 30,
    // borderBottomRightRadius: 30,
  },

  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  headerAvatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },

  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },

  headerSubtitle: {
    color: '#D7CBFF',
    marginTop: 4,
    fontSize: 13,
  },

  languageBadge: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  languageBadgeText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 12,
  },

  content: {
    flex: 1,
    padding: 20,
    justifyContent: 'space-evenly',
  },

  captureBtn: {
    height: 56,
    borderRadius: 18,
    backgroundColor: '#5D7BFF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 22,
  },

  captureText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    marginLeft: 10,
  },

  placeholderCard: {
    height: 260,
    borderRadius: 24,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },

  placeholderText: {
    marginTop: 10,
    color: '#888',
    fontSize: 14,
  },

  imageCard: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: '#fff',
    elevation: 2,
  },

  image: {
    width: '100%',
    height: 260,
  },

  loadingBox: {
    marginTop: 20,
    padding: 18,
    borderRadius: 18,
    backgroundColor: '#fff',
    alignItems: 'center',
  },

  loadingText: {
    color: '#666',
    fontSize: 15,
    fontWeight: '500',
  },

  resultCard: {
    marginTop: 20,
    padding: 22,
    borderRadius: 22,
    backgroundColor: '#fff',
    elevation: 2,
  },

  resultLabel: {
    color: '#777',
    fontSize: 13,
    marginBottom: 8,
  },

  resultText: {
    color: '#111',
    fontSize: 24,
    fontWeight: '700',
  },
  resultRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 8,
  },

  speakerBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(93, 123, 255, 0.12)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
