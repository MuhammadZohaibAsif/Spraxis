import levenshtein from 'fast-levenshtein';

export const normalizeText = text => {
  return text
    .toLowerCase()
    .replace(/[.,!?]/g, '')
    .trim();
};

export const calculateScore = (expected, spoken) => {
  const cleanExpected = normalizeText(expected);
  const cleanSpoken = normalizeText(spoken);

  const distance = levenshtein.get(cleanExpected, cleanSpoken);

  const maxLength = Math.max(cleanExpected.length, cleanSpoken.length);

  const score = Math.max(0, Math.round((1 - distance / maxLength) * 100));

  return score;
};
