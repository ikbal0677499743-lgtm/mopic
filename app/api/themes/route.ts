import { NextResponse } from 'next/server';

export async function GET() {
  // TODO: Implement themes fetch with Supabase
  
  return NextResponse.json({
    themes: [],
    total: 0,
  });
}
