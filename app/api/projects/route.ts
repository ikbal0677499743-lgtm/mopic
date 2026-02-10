import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    projects: [],
    total: 0,
  });
}

export async function POST(request: Request) {
  const body = await request.json();
  
  // TODO: Implement project creation with Supabase
  
  return NextResponse.json({
    project: {
      id: 'temp-id',
      ...body,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    },
    pages: [],
    price: {
      total: 35.00,
      currency: 'USD',
    },
  });
}
