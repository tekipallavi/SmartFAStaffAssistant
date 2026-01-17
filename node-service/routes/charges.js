import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load mock data from JSON file
const chargesPath = path.join(__dirname, '..', 'mock-data', 'charges.json');
const mockCharges = JSON.parse(fs.readFileSync(chargesPath, 'utf8'));

// GET /api/get-charges
router.get('/get-charges', (req, res) => {
  res.json({
    success: true,
    data: mockCharges
  });
});

export default router;