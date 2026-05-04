import Tts from 'react-native-tts';

const languageMap = {
  arabic: 'ar-SA',
  chinese: 'zh-CN',
  dutch: 'nl-NL',
  french: 'fr-FR',
  german: 'de-DE',
  hindi: 'hi-IN',
  italian: 'it-IT',
  japanese: 'ja-JP',
  korean: 'ko-KR',
  portuguese: 'pt-PT',
  russian: 'ru-RU',
  spanish: 'es-ES',
  turkish: 'tr-TR',
  urdu: 'ur-PK',
};

let initializedLang = null;
let finishCallback = null;

// NEW
let lastSpokenText = '';
let repeatCount = 0;

// safe single listener
Tts.removeAllListeners('tts-finish');

Tts.addEventListener('tts-finish', () => {
  if (finishCallback) {
    const cb = finishCallback;
    finishCallback = null;
    cb();
  }
});

export const initTts = language => {
  const langCode = languageMap[language?.toLowerCase()] || 'en-US';

  if (initializedLang === langCode) return;

  Tts.setDefaultLanguage(langCode);
  Tts.setDefaultPitch(1);

  initializedLang = langCode;
};

export const cleanForSpeech = text => {
  if (!text) return '';

  return text.replace(/_{3,}/g, '').replace(/\s+/g, ' ').trim();
};

const getSpeechRate = text => {
  const cleaned = cleanForSpeech(text);

  if (cleaned.toLowerCase() === lastSpokenText.toLowerCase()) {
    repeatCount += 1;
  } else {
    lastSpokenText = cleaned;
    repeatCount = 0;
  }

  // 1st time = normal
  if (repeatCount === 0) {
    return 0.45;
  }

  // repeated = slow
  return 0.18;
};

export const speakWord = text => {
  if (!text) return;

  const cleaned = cleanForSpeech(text);
  const rate = getSpeechRate(cleaned);

  Tts.stop();
  Tts.setDefaultRate(rate);
  Tts.speak(cleaned);
};

export const speakAndThen = (text, callback) => {
  if (!text) return;

  const cleaned = cleanForSpeech(text);
  const rate = getSpeechRate(cleaned);

  Tts.stop();
  Tts.setDefaultRate(rate);

  finishCallback = callback;
  Tts.speak(cleaned);
};

// import Tts from 'react-native-tts';

// const languageMap = {
//   arabic: 'ar-SA',
//   chinese: 'zh-CN',
//   dutch: 'nl-NL',
//   french: 'fr-FR',
//   german: 'de-DE',
//   hindi: 'hi-IN',
//   italian: 'it-IT',
//   japanese: 'ja-JP',
//   korean: 'ko-KR',
//   portuguese: 'pt-PT',
//   russian: 'ru-RU',
//   spanish: 'es-ES',
//   turkish: 'tr-TR',
//   urdu: 'ur-PK',
// };

// let initializedLang = null;
// let finishCallback = null;

// // ✅ safe single listener
// Tts.removeAllListeners('tts-finish');

// Tts.addEventListener('tts-finish', () => {
//   if (finishCallback) {
//     const cb = finishCallback;
//     finishCallback = null;
//     cb();
//   }
// });

// export const initTts = (language) => {
//   const langCode = languageMap[language?.toLowerCase()] || 'en-US';

//   if (initializedLang === langCode) return;

//   Tts.setDefaultLanguage(langCode);
//   Tts.setDefaultPitch(1);
//   Tts.setDefaultRate(0.45);

//   initializedLang = langCode;
// };

// export const cleanForSpeech = (text) => {
//   if (!text) return '';
//   return text.replace(/_{3,}/g, '').replace(/\s+/g, ' ').trim();
// };

// export const speakWord = (text) => {
//   if (!text) return;

//   Tts.stop();
//   Tts.speak(cleanForSpeech(text));
// };

// export const speakAndThen = (text, callback) => {
//   if (!text) return;

//   Tts.stop();
//   finishCallback = callback;
//   Tts.speak(cleanForSpeech(text));
// };
