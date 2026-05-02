/**
 * MatDaan Gemini API Service
 * 
 * Calls the Gemini API directly from the frontend.
 */
import { GoogleGenerativeAI } from '@google/generative-ai';

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

const systemPrompt = `You are **MatDaan Guide (मतदान गाइड)**, an AI assistant that educates Indian citizens about the election process.
Your responses must be:
- **Accurate**: Only use verified facts from the Election Commission of India (ECI).
- **Non-partisan**: Never endorse, criticize, or discuss any political party, candidate, or ideology.
- **Helpful**: Give clear, actionable answers. Use bullet points and bold text for readability.
- **Concise**: Keep answers focused. Aim for 150-300 words unless the user asks for detail.
- **Bilingual-aware**: You may include Hindi terms in parentheses where helpful.
- Respond in the language of the user's query (English or Hindi).
- Cite official sources like ECI (eci.gov.in) when relevant.
- If asked about political parties, candidates, or ideologies, politely decline.
- Always use markdown formatting.`;

export const geminiApi = {
  async sendChatMessage(prompt: string, history: { role: string; parts: { text: string }[] }[] = []): Promise<string> {
    try {
      console.log('Gemini API Call - Key Present:', !!import.meta.env.VITE_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({
        model: 'gemini-1.5-flash-latest',
        systemInstruction: systemPrompt,
      });

      // Filter history: Gemini requires it to start with a 'user' role message
      let chatHistory = history || [];
      while (chatHistory.length > 0 && chatHistory[0].role === 'model') {
        chatHistory = chatHistory.slice(1);
      }

      const chat = model.startChat({ history: chatHistory });
      const result = await chat.sendMessage(prompt);
      return result.response.text();
    } catch (error) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
};
