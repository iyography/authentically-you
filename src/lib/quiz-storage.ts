import fs from 'fs';
import path from 'path';

export interface QuizResult {
  id: string;
  timestamp: string;
  userAgent: string;
  ip?: string;
  answers: Record<number, string[]>;
  results: {
    zone: string;
    headline: string;
    description: string;
    patterns: string[];
    support: string;
  };
  styleInsights: string[];
  score: number;
  percentage: number;
}

const DATA_DIR = path.join(process.cwd(), 'data');
const RESULTS_FILE = path.join(DATA_DIR, 'quiz-results.json');

// Ensure data directory exists
export function ensureDataDirectory() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
}

// Load all quiz results
export function loadQuizResults(): QuizResult[] {
  try {
    ensureDataDirectory();
    if (!fs.existsSync(RESULTS_FILE)) {
      return [];
    }
    const data = fs.readFileSync(RESULTS_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Error loading quiz results:', error);
    return [];
  }
}

// Save a new quiz result
export function saveQuizResult(result: QuizResult): void {
  try {
    ensureDataDirectory();
    const results = loadQuizResults();
    results.push(result);
    fs.writeFileSync(RESULTS_FILE, JSON.stringify(results, null, 2));
  } catch (error) {
    console.error('Error saving quiz result:', error);
    throw new Error('Failed to save quiz result');
  }
}

// Get quiz statistics
export function getQuizStats() {
  const results = loadQuizResults();
  
  if (results.length === 0) {
    return {
      totalResponses: 0,
      zones: {},
      averageScore: 0,
      responsesByDate: {},
    };
  }

  const zones: Record<string, number> = {};
  let totalScore = 0;
  const responsesByDate: Record<string, number> = {};

  results.forEach(result => {
    // Count by zone
    zones[result.results.zone] = (zones[result.results.zone] || 0) + 1;
    
    // Sum scores
    totalScore += result.score;
    
    // Count by date
    const date = new Date(result.timestamp).toISOString().split('T')[0];
    responsesByDate[date] = (responsesByDate[date] || 0) + 1;
  });

  return {
    totalResponses: results.length,
    zones,
    averageScore: totalScore / results.length,
    responsesByDate,
  };
}