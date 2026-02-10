import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const type = searchParams.get('type');
  
  // TODO: Implement assets fetch with Supabase
  
  return NextResponse.json({
    assets: [],
    total: 0,
  });
}
