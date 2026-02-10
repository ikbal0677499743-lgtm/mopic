// Price calculation based on attributes and page count

interface PriceData {
  basePrice: number
  pricePerExtraPage: number
}

export function calculatePrice(
  attributes: {
    size: string
    type: string
    paper: string
  },
  pageCount: number,
  prices: PriceData[],
  basePageCount: number = 20
): number {
  // Find matching price
  const priceData = prices[0] || { basePrice: 50, pricePerExtraPage: 1.0 }
  
  let total = priceData.basePrice
  
  // Add extra page cost
  if (pageCount > basePageCount) {
    const extraPages = pageCount - basePageCount
    total += extraPages * priceData.pricePerExtraPage
  }
  
  return Math.round(total * 100) / 100
}
