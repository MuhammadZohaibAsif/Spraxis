//////api key here
export const translateText = async (text, target = 'de') => {
  try {
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2?key=${GOOGLE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text,
          target,
          format: 'text',
        }),
      },
    );

    const data = await response.json();

    console.log('TRANSLATE RESPONSE:', data);

    return data?.data?.translations?.[0]?.translatedText || text;
  } catch (e) {
    console.log('TRANSLATE ERROR:', e);
    return text;
  }
};
