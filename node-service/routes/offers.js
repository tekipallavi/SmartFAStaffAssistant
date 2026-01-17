import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load mock data from JSON file
const offersPath = path.join(__dirname, '..', 'mock-data', 'offers.json');
const mockOffers = JSON.parse(fs.readFileSync(offersPath, 'utf8'));

// GET /api/get-offers
router.get('/get-offers', (req, res) => {
  res.json({
    success: true,
    data: mockOffers
  });
});

export default router;