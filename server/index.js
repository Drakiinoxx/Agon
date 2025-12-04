// packages/server/index.js
// Serveur Express minimal pour json-server-like endpoints
// Routes fournies :
// GET /api/athletes  -> retourne la liste complète des athlètes
// GET /api/cities    -> retourne la liste complète des villes
// Usage :
// 1) place ce fichier dans packages/server/index.js
// 2) npm install express cors
// 3) node index.js

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs').promises;

const app = express();
app.use(cors());
app.use(express.json());

const DB_PATH = path.join(__dirname, 'db.json');

async function readDB() {
  try {
    const raw = await fs.readFile(DB_PATH, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Erreur lecture DB:', err);
    return { athletes: [], cities: [] };
  }
}

// Récupérer tous les athlètes
app.get('/api/athletes', async (req, res) => {
  const db = await readDB();
  res.json(db.athletes || []);
});

// Récupérer toutes les villes
app.get('/api/cities', async (req, res) => {
  const db = await readDB();
  res.json(db.cities || []);
});

// Récupérer toutes les villes
app.get('/api/sport', async (req, res) => {
  const db = await readDB();
  res.json(db.epreuves || []);
});


const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Mock API (Express) listening on http://localhost:${PORT}`));
