import { GoogleGenerativeAI } from '@google/generative-ai';

const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');

const systemPrompt = `You are MatDaan AI, a helpful assistant for the MatDaan Guide platform.
Your goal is to educate Indian citizens about the election process, voting rights, and procedures.
- Provide accurate information based on Election Commission of India (ECI) guidelines.
- Be polite, encouraging, and non-partisan.
- If asked about political parties, candidates, or ideologies, politely decline.
- Always use markdown formatting.`;

export const geminiApi = {
  async sendChatMessage(prompt: string, history: any[] = []): Promise<string> {
    try {
      const model = genAI.getGenerativeModel({
        model: 'gemini-2.5-flash',
        systemInstruction: systemPrompt
      });

      const chat = model.startChat({
        history: history.map(msg => ({
          role: msg.role === 'assistant' ? 'model' : 'user',
          parts: msg.parts
        }))
      });

      const result = await chat.sendMessage(prompt);
      const response = await result.response;
      return response.text();
    } catch (error: any) {
      console.error('Gemini API Error:', error);
      throw error;
    }
  }
};