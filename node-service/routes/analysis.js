import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

// Load mock data
const charges = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mock-data', 'charges.json'), 'utf8'));
const offers = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mock-data', 'offers.json'), 'utf8'));
const matches = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'mock-data', 'matches.json'), 'utf8'));

// POST /api/generate-analysis
router.post('/generate-analysis', (req, res) => {
  const { offenderId, criteria, offenderName } = req.body;


  let analysis = '';

  if (criteria === 'offence history') {
    const offenderCharges = charges.filter(c => c.offenderId === offenderId);
    const totalCharges = offenderCharges.length;
    const suspensions = offenderCharges.filter(c => c.severity === 'Severe').length; // Mock suspensions for severe
    analysis = `${offender.name} has ${totalCharges} charges in total. Out of these, ${suspensions} have resulted in suspensions.`;
  } else if (criteria === 'recent news') {
    // Mock recent news based on offenderName
    const mockNews = {
      "Wayne Rooney": "Wayne Rooney recently criticized Manchester United's defensive strategy in a post-match interview, highlighting issues with set-piece defending.",
      "Cristiano Ronaldo": "Cristiano Ronaldo has been linked with a potential return to European football, with reports suggesting interest from several top clubs.",
      "Lionel Messi": "Lionel Messi continues to dazzle in the MLS, recently scoring a hat-trick and assisting two more in a match against a rival team.",
      "Neymar Jr": "Neymar Jr faced backlash from fans after a controversial incident during a match, with social media erupting in debates over the referee's decision.",
      "Kylian Mbappe": "Kylian Mbappe is reportedly in advanced talks with Real Madrid, potentially becoming the most expensive transfer in history.",
      "Erling Haaland": "Erling Haaland's goal-scoring streak continues, with pundits praising his consistency and impact on Manchester City's attack.",
      "Mohamed Salah": "Mohamed Salah has been vocal about Liverpool's need for reinforcements in defense, following a series of conceded goals.",
      "Kevin De Bruyne": "Kevin De Bruyne's vision and passing accuracy were key in Manchester City's recent victory, earning him player of the match honors.",
      "Harry Kane": "Harry Kane's future at Tottenham remains uncertain, with Bayern Munich reportedly preparing a massive bid.",
      "Jude Bellingham": "Jude Bellingham's performances for Real Madrid have been outstanding, with fans comparing him to club legends.",
      "Bukayo Saka": "Bukayo Saka's versatility has been crucial for Arsenal, contributing both goals and assists in recent matches.",
      "Phil Foden": "Phil Foden's development under Pep Guardiola has been remarkable, with experts predicting a bright future.",
      "Trent Alexander-Arnold": "Trent Alexander-Arnold's set-piece delivery has been pinpoint, leading to several goals for Liverpool.",
      "Marcus Rashford": "Marcus Rashford's form has dipped recently, sparking concerns among Manchester United supporters.",
      "Bruno Fernandes": "Bruno Fernandes continues to be the driving force behind Manchester United's midfield, orchestrating attacks effectively.",
      "Son Heung-min": "Son Heung-min's partnership with Harry Kane has been lethal, with both players finding the net regularly.",
      "Raheem Sterling": "Raheem Sterling's pace and dribbling have been assets for Chelsea, despite some injury setbacks.",
      "Jamie Vardy": "Jamie Vardy remains a clinical finisher, proving his worth even at an advanced age.",
      "Harry Maguire": "Harry Maguire's confidence has been questioned following errors in recent matches for Manchester United.",
      "Mason Mount": "Mason Mount's creativity has been missed during his injury layoff, with Chelsea struggling in his absence.",
      "Callum Wilson": "Callum Wilson has been in fine form for Newcastle, scoring crucial goals in important matches.",
      "Jarrod Bowen": "Jarrod Bowen's work rate and finishing have made him indispensable for West Ham United.",
      "Ivan Toney": "Ivan Toney's ban has ended, and he's eager to make an impact at Brentford upon his return.",
      "Chris Wood": "Chris Wood's aerial ability has been a threat for Nottingham Forest in attacking set pieces.",
      "Rodrigo": "Rodrigo's versatility has allowed Leeds to adapt formations, providing midfield stability.",
      "Martin Odegaard": "Martin Odegaard's leadership at Arsenal has been evident, guiding younger players effectively."
    };
    analysis = mockNews[offenderName] || `${offenderName} has been involved in recent discussions regarding team performance and personal milestones. No major controversies reported.`;
  } else if (criteria === 'upcoming matches') {
    // Mock upcoming matches based on team
    const upcoming = [
      { match: `${offender.team} vs Rival Team A`, date: '2026-01-20' },
      { match: `${offender.team} vs Rival Team B`, date: '2026-01-27' }
    ];
    analysis = `Upcoming matches for ${offender.team}: ${upcoming.map(m => `${m.match} on ${m.date}`).join(', ')}.`;
  } else {
    analysis = 'Invalid criteria selected.';
  }

  res.json({
    success: true,
    analysis
  });
});

export default router;