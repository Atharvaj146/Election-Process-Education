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
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
    if (!apiKey) throw new Error("API Key missing");

    try {
      console.log('Attempting Direct Gemini API Call...');
      
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [...history, { role: 'user', parts: [{ text: prompt }] }],
          systemInstruction: { parts: [{ text: systemPrompt }] }
        })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error?.message || `API Error ${response.status}`);
      }

      return data.candidates[0].content.parts[0].text;
    } catch (error: any) {
      console.error('Direct API Error:', error);
      throw error;
    }
  }
};
