// Shopify Storefront API helper for adding items to cart

export async function addToCart(
  variantId: string,
  quantity: number = 1,
  properties: Record<string, string> = {}
): Promise<{ success: boolean; error?: string }> {
  try {
    const storeUrl = process.env.NEXT_PUBLIC_SHOPIFY_STORE_URL
    const token = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_TOKEN
    
    if (!storeUrl || !token) {
      return { success: false, error: 'Shopify configuration missing' }
    }
    
    // Create cart mutation
    const mutation = `
      mutation cartCreate($input: CartInput!) {
        cartCreate(input: $input) {
          cart {
            id
            checkoutUrl
          }
          userErrors {
            field
            message
          }
        }
      }
    `
    
    const variables = {
      input: {
        lines: [
          {
            merchandiseId: variantId,
            quantity,
            attributes: Object.entries(properties).map(([key, value]) => ({
              key,
              value,
            })),
          },
        ],
      },
    }
    
    const response = await fetch(`${storeUrl}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': token,
      },
      body: JSON.stringify({ query: mutation, variables }),
    })
    
    const result = await response.json()
    
    if (result.data?.cartCreate?.cart) {
      // Redirect to checkout
      const checkoutUrl = result.data.cartCreate.cart.checkoutUrl
      if (typeof window !== 'undefined') {
        window.location.href = checkoutUrl
      }
      return { success: true }
    }
    
    return {
      success: false,
      error: result.data?.cartCreate?.userErrors?.[0]?.message || 'Failed to add to cart',
    }
  } catch (error) {
    console.error('Add to cart error:', error)
    return { success: false, error: 'Network error' }
  }
}
