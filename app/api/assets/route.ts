import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Placeholder - would query Supabase for assets
    return NextResponse.json({
      data: [],
      error: null,
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch assets',
        status: 500,
      },
      { status: 500 }
    )
  }
}
