import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Placeholder - would query Supabase for themes
    return NextResponse.json({
      data: [
        {
          id: '1',
          name: 'Travel Adventure',
          slug: 'travel-adventure',
          thumbnailUrl: '/themes/travel.jpg',
          previewUrls: [],
          categoryId: '1',
          tags: ['travel', 'adventure'],
        },
        {
          id: '2',
          name: 'Classic Elegance',
          slug: 'classic-elegance',
          thumbnailUrl: '/themes/classic.jpg',
          previewUrls: [],
          categoryId: '2',
          tags: ['classic', 'elegant'],
        },
      ],
      error: null,
      status: 200,
    })
  } catch (error) {
    return NextResponse.json(
      {
        data: null,
        error: 'Failed to fetch themes',
        status: 500,
      },
      { status: 500 }
    )
  }
}
