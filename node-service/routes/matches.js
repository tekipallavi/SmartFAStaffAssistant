import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load mock data from JSON file
const matchesPath = path.join(__dirname, '..', 'mock-data', 'matches.json');
const mockMatches = JSON.parse(fs.readFileSync(matchesPath, 'utf8'));

// GET /api/get-matches
router.get('/get-matches', (req, res) => {
  res.json({
    success: true,
    data: mockMatches
  });
});

// GET /api/get-match/:matchId
router.get('/get-match/:matchId', (req, res) => {
  const matchId = parseInt(req.params.matchId);
  const match = mockMatches.find(m => m.matchId === matchId);
  if (match) {
    res.json({
      success: true,
      data: match
    });
  } else {
    res.status(404).json({
      success: false,
      message: 'Match not found'
    });
  }
});

export default router;