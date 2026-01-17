import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load mock data from JSON file
const reportsPath = path.join(__dirname, '..', 'mock-data', 'reports.json');
const mockReports = JSON.parse(fs.readFileSync(reportsPath, 'utf8'));

// GET /api/get-reports
router.get('/get-reports', (req, res) => {
  res.json({
    success: true,
    data: mockReports
  });
});

export default router;