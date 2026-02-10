import { NextRequest, NextResponse } from 'next/server';
import { loadQuizResults, getQuizStats } from '@/lib/quiz-storage';

function checkAuth(request: NextRequest) {
  const adminPassword = process.env.ADMIN_PASSWORD || 'admin123';
  const authHeader = request.headers.get('authorization');
  
  if (!authHeader) return false;
  
  const [scheme, credentials] = authHeader.split(' ');
  if (scheme !== 'Basic' || !credentials) return false;
  
  const [username, password] = Buffer.from(credentials, 'base64')
    .toString()
    .split(':');
  
  return username === 'admin' && password === adminPassword;
}

export async function GET(request: NextRequest) {
  // Check authentication
  if (!checkAuth(request)) {
    return new NextResponse('Authentication required', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="Admin API"',
      },
    });
  }
  try {
    const { searchParams } = new URL(request.url);
    const statsOnly = searchParams.get('stats') === 'true';
    
    if (statsOnly) {
      const stats = getQuizStats();
      return NextResponse.json(stats);
    } else {
      const results = loadQuizResults();
      return NextResponse.json(results);
    }
  } catch (error) {
    console.error('Error loading quiz results:', error);
    return NextResponse.json(
      { error: 'Failed to load quiz results' },
      { status: 500 }
    );
  }
}