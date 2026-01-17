import express from 'express';
import reportsRouter from './routes/reports.js';
import chargesRouter from './routes/charges.js';
import offersRouter from './routes/offers.js';
import matchesRouter from './routes/matches.js';
import analysisRouter from './routes/analysis.js';
import cors from 'cors';

const app = express();
const PORT = 3000;

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/api', reportsRouter);
app.use('/api', chargesRouter);
app.use('/api', offersRouter);
app.use('/api', matchesRouter);
app.use('/api', analysisRouter);

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});