import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const body = await request.json();
  
  // TODO: Implement Shopify add to cart
  
  return NextResponse.json({
    cartId: 'temp-cart-id',
    cartUrl: 'https://mopic-store.myshopify.com/cart',
    lineItems: [],
  });
}
