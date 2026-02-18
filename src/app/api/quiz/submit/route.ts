import { NextRequest, NextResponse } from 'next/server';
import { saveQuizResult } from '@/lib/quiz-storage';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, answers, results, styleInsights } = body;

    if (!answers || !results) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    const id = await saveQuizResult({
      name: name || '',
      email: email || '',
      phone: phone || '',
      userAgent: request.headers.get('user-agent') || 'Unknown',
      ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown',
      answers,
      results,
      styleInsights: styleInsights || [],
    });

    return NextResponse.json({ success: true, id });
  } catch (error) {
    console.error('Error saving quiz result:', error);
    return NextResponse.json(
      { error: 'Failed to save quiz result' },
      { status: 500 }
    );
  }
}
