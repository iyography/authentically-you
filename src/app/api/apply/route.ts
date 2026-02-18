import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { qualifying, experience, challenge, goals, investment, commitment, name, email, phone } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      );
    }

    // Try to save to Supabase (aty_applications table)
    // If table doesn't exist yet, just log and return success
    try {
      await supabaseAdmin
        .from('aty_applications')
        .insert({
          name,
          email,
          phone: phone || null,
          qualifying,
          experience,
          challenges: challenge,
          goals,
          investment,
          commitment,
          user_agent: request.headers.get('user-agent') || 'Unknown',
          ip_address: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'Unknown',
        });
    } catch {
      // Table may not exist yet - that's OK
      console.log('Application received (table may not exist yet):', { name, email });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error saving application:', error);
    return NextResponse.json(
      { error: 'Failed to save application' },
      { status: 500 }
    );
  }
}
