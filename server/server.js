import express from 'express';
import cors from 'cors';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';
import { readFileSync, existsSync } from 'fs';
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
let knowledgeBase = '';
const kbPath = join(__dirname, 'knowledge-base.md');
if (existsSync(kbPath)) {
  knowledgeBase = readFileSync(kbPath, 'utf-8');
}

const systemPrompt = `${knowledgeBase}

IMPORTANT RULES:
- You are MatDaan Guide (मतदान गाइड), an election education assistant.
- ONLY answer questions related to Indian elections, voting, and democratic processes.
- If asked about political parties, candidates, or ideologies, politely decline.
- Always use markdown formatting.
- Respond in the language of the user's query (English or Hindi).
- Cite official sources like ECI (eci.gov.in) when relevant.
`;

// Initialize Gemini
const apiKey = process.env.GEMINI_API_KEY;
const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;

// API Endpoints
app.post('/api/chat', async (req, res) => {
  try {
    const { prompt, history } = req.body;

    if (!prompt) {
      return res.status(400).json({ error: 'Prompt is required' });
    }

    if (!genAI) {
      return res.status(503).json({
        error: 'AI service unavailable',
        content: 'The API key is not configured on the server.'
      });
    }

    const model = genAI.getGenerativeModel({ 
      model: 'gemini-2.0-flash',
      systemInstruction: systemPrompt
    });

    const chat = model.startChat({ history });
    const result = await chat.sendMessage(prompt);
    const responseText = result.response.text();

    res.json({ content: responseText });
  } catch (error) {
    console.error('Gemini error:', error);
    res.status(500).json({ error: 'Internal AI error', message: error.message });
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString() });
});

// Serve Static Frontend (Production)
const distPath = join(__dirname, '../dist');
if (existsSync(distPath)) {
  app.use(express.static(distPath));
  app.get('*', (req, res) => {
    // Exclude API routes from wildcard redirect
    if (req.path.startsWith('/api')) return;
    res.sendFile(join(distPath, 'index.html'));
  });
}

app.listen(PORT, () => {
  console.log(`🚀 MatDaan Guide deployed on port ${PORT}`);
});
