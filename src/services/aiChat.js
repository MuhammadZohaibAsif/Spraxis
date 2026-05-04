import { GROQ_API_KEY, GROQ_URL } from '../config/ai';

export const askAI = async ({
  message,
  learningLanguage,
  nativeLanguage,
  level,
  history = [],
}) => {
  try {
    const messages = [
      {
        role: 'system',
        content: `
You are an expert language tutor.

Student learns: ${learningLanguage}
Student native language: ${nativeLanguage}
Level: ${level}

STRICT RULES:
- Reply VERY SHORT (maximum 2-4 short lines)
- Always reply in THIS format:

${learningLanguage}:
<sentence>

English:
<translation>

- Keep vocabulary simple
- Teach naturally
- If student makes mistake:
  - correct it
  - show correct sentence
  - show English meaning
- Ask ONE short follow-up question only
- Never write long paragraphs
- Never explain too much
- Keep answers beginner-friendly
`,
      },

      ...history.slice(-4),

      {
        role: 'user',
        content: message,
      },
    ];

    const response = await fetch(GROQ_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages,
        temperature: 0.3,
        max_tokens: 120,
      }),
    });

    const data = await response.json();

    if (data.error) {
      console.log(data.error);
      return 'AI unavailable';
    }

    return data?.choices?.[0]?.message?.content || 'No response';
  } catch (error) {
    console.log(error);
    return 'Something went wrong';
  }
};
