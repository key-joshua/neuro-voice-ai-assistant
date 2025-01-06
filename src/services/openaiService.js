import axios from 'axios';

const API_KEY = process.env.REACT_APP_OPENAI_API_KEY;
const openai = axios.create({ baseURL: 'https://api.openai.com/v1', headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${API_KEY}`, }, });

export const promptOpenAI = async (prompt) => {
  const response = await openai.post('/chat/completions', {
    max_tokens: 20,
    model: 'gpt-3.5-turbo',
    messages: [{ role: 'system', content: 'You are a knowledgeable assistant.' }, { role: 'user', content: prompt }],
  });

  return response.data.choices[0].message.content;
};
