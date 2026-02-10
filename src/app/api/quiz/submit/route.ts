import { NextRequest, NextResponse } from 'next/server';
import { saveQuizResult } from '@/lib/quiz-storage';
import { QuizResult } from '@/lib/quiz-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const { answers, results, styleInsights, score, percentage } = body;
    
    if (!answers || !results) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const quizResult: QuizResult = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown',
      answers,
      results,
      styleInsights: styleInsights || [],
      score: score || 0,
      percentage: percentage || 0,
    };

    saveQuizResult(quizResult);

    return NextResponse.json({ success: true, id: quizResult.id });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result' },
      { status: 500 }
    );
  }
}