export const getLanguageCode = language => {
  const map = {
    German: 'de',
    Urdu: 'ur',
    French: 'fr',
    Spanish: 'es',
    Arabic: 'ar',
    Turkish: 'tr',
    English: 'en',
  };

  return map[language] || 'en';
};
