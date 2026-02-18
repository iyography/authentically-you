import { supabase, supabaseAdmin } from './supabase';

const TABLE = 'aty_quiz_responses';

export interface QuizResponse {
  id: string;
  created_at: string;
  name: string | null;
  email: string | null;
  phone: string | null;
  user_agent: string | null;
  ip_address: string | null;
  answers: Record<number, string[]>;
  confidence_zone: string | null;
  headline: string | null;
  description: string | null;
  patterns: string[] | null;
  support: string | null;
  style_insights: string[] | null;
}

// Save a new quiz result (uses anon client — RLS allows inserts)
export async function saveQuizResult(data: {
  name: string;
  email: string;
  phone: string;
  userAgent: string;
  ip: string;
  answers: Record<number, string[]>;
  results: {
    zone: string;
    headline: string;
    description: string;
    patterns: string[];
    support: string;
  };
  styleInsights: string[];
}): Promise<string> {
  const payload: Record<string, unknown> = {
    name: data.name,
    email: data.email,
    phone: data.phone,
    user_agent: data.userAgent,
    ip_address: data.ip,
    answers: data.answers,
    confidence_zone: data.results.zone,
    headline: data.results.headline,
    description: data.results.description,
    patterns: data.results.patterns,
    support: data.results.support,
    style_insights: data.styleInsights,
  };

  let { data: row, error } = await supabaseAdmin
    .from(TABLE)
    .insert(payload)
    .select('id')
    .single();

  // If phone column doesn't exist yet, retry without it
  if (error && error.message?.includes('phone')) {
    const { phone, ...payloadWithoutPhone } = payload;
    ({ data: row, error } = await supabaseAdmin
      .from(TABLE)
      .insert(payloadWithoutPhone)
      .select('id')
      .single());
  }

  if (error) {
    console.error('Supabase insert error:', error);
    throw new Error('Failed to save quiz result');
  }

  return row!.id;
}

// Load all quiz results (uses service role — bypasses RLS)
export async function loadQuizResults(): Promise<QuizResponse[]> {
  const { data, error } = await supabaseAdmin
    .from(TABLE)
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Supabase select error:', error);
    throw new Error('Failed to load quiz results');
  }

  return data || [];
}

// Get quiz statistics
export async function getQuizStats() {
  const results = await loadQuizResults();

  if (results.length === 0) {
    return {
      totalResponses: 0,
      zones: {} as Record<string, number>,
      responsesByDate: {} as Record<string, number>,
    };
  }

  const zones: Record<string, number> = {};
  const responsesByDate: Record<string, number> = {};

  results.forEach(result => {
    const zone = result.confidence_zone || 'Unknown';
    zones[zone] = (zones[zone] || 0) + 1;

    const date = new Date(result.created_at).toISOString().split('T')[0];
    responsesByDate[date] = (responsesByDate[date] || 0) + 1;
  });

  return {
    totalResponses: results.length,
    zones,
    responsesByDate,
  };
}
