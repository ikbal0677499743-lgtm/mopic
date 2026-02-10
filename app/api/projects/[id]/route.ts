import { NextResponse } from 'next/server';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // TODO: Implement project fetch with Supabase
  
  return NextResponse.json({
    project: {
      id,
      name: 'My Photobook',
      selectedType: 'HC',
      selectedSize: 'HC_Square',
      selectedPaper: 'standardPaper',
      totalPages: 24,
      status: 'draft',
    },
    pages: [],
    photos: [],
    price: {
      total: 35.00,
      currency: 'USD',
    },
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const body = await request.json();
  
  // TODO: Implement project update with Supabase
  
  return NextResponse.json({
    project: {
      id,
      ...body,
      updatedAt: new Date().toISOString(),
    },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  
  // TODO: Implement project deletion with Supabase
  
  return NextResponse.json({
    success: true,
    message: 'Project deleted',
  });
}
