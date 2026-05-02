import express from 'express';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3001;

// Serve the built frontend
const distPath = join(__dirname, '../dist');
app.use(express.static(distPath));

// All routes serve index.html (SPA support)
app.get('/{*splat}', (req, res) => {
  res.sendFile(join(distPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`🚀 MatDaan Guide running on port ${PORT}`);
});
