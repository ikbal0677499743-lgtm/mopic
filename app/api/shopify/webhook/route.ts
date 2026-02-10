import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // TODO: Implement Shopify webhook handling
  
  return NextResponse.json({
    received: true,
  });
}
