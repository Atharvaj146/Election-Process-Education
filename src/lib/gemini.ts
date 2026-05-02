/**
 * MatDaan Gemini API Service
 * 
 * Securely communicates with our backend proxy to interact with Gemini.
 * This prevents exposing the API key in the browser.
 */

export const geminiApi = {
  async sendChatMessage(prompt: string, history: any[] = []): Promise<string> {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt, history }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.content || errorData.error || 'Failed to fetch AI response');
      }

      const data = await response.json();
      return data.content;
    } catch (error) {
      console.error('Chat API Error:', error);
      throw error;
    }
  }
};
