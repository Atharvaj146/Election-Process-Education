import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Load knowledge base
const knowledgeBase = readFileSync(join(__dirname, 'knowledge-base.md'), 'utf-8');

// System prompt
const systemPrompt = `${knowledgeBase}

IMPORTANT RULES:
- You are MatDaan Guide, an election education assistant.
- ONLY answer questions related to Indian elections, voting, and democratic processes.
- If asked about political parties, candidates, or ideologies, politely decline.
- Always use markdown formatting in your responses.
- Keep answers concise (150-300 words) unless asked for more detail.
- Cite official sources (ECI, NVSP) when relevant.
`;

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey || apiKey === 'your_gemini_api_key_here') {
  console.warn('\n⚠️  GEMINI_API_KEY not set! The server will run but AI responses will fail.');
  console.warn('   Add your key to .env: GEMINI_API_KEY=your_key_here\n');
}

const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Messages array is required' });
    }

    if (!genAI) {
      return res.status(503).json({
        error: 'API key not configured',
        content: 'The AI service is not configured yet. Please add your Gemini API key to the `.env` file and restart the server.',
      });
    }

    const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

    // Build conversation history for Gemini
    const history = messages.slice(0, -1).map((msg) => ({
      role: msg.role === 'user' ? 'user' : 'model',
      parts: [{ text: msg.content }],
    }));

    const lastMessage = messages[messages.length - 1].content;

    const chat = model.startChat({
      history,
      systemInstruction: { parts: [{ text: systemPrompt }] },
      generationConfig: {
        maxOutputTokens: 1024,
        temperature: 0.7,
        topP: 0.9,
      },
    });

    const result = await chat.sendMessage(lastMessage);
    const responseText = result.response.text();

    res.json({ content: responseText });
  } catch (error) {
    console.error('Gemini API error:', error.message || error);

    // Handle specific Gemini errors
    if (error.message?.includes('API_KEY_INVALID') || error.message?.includes('API key')) {
      return res.status(401).json({
        error: 'Invalid API key',
        content: 'The Gemini API key is invalid. Please check your `.env` file.',
      });
    }

    if (error.message?.includes('RATE_LIMIT') || error.message?.includes('429')) {
      return res.status(429).json({
        error: 'Rate limited',
        content: 'Too many requests. Please wait a moment and try again.',
      });
    }

    res.status(500).json({
      error: 'AI service error',
      content: 'Something went wrong with the AI service. Please try again in a moment.',
    });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    hasApiKey: !!apiKey && apiKey !== 'your_gemini_api_key_here',
    timestamp: new Date().toISOString(),
  });
});

app.listen(PORT, () => {
  console.log(`\n🗳️  MatDaan Guide Server running on http://localhost:${PORT}`);
  console.log(`   Health: http://localhost:${PORT}/api/health`);
  console.log(`   Chat:   POST http://localhost:${PORT}/api/chat\n`);
});
