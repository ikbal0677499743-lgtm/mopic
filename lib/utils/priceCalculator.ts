// V3 Mopic Price Calculator
// Formula: TOTAL = base_price(size) + (paper_per_page_surcharge × total_pages) + (page_price × extra_pages_above_24)

import { PriceCalculation } from '@/lib/types/project';
import { BASE_PRICES, PAPER_SURCHARGES, PAGE_PRICES } from '@/lib/data/workspaces';

export interface PriceInputs {
  selectedSize: string;      // e.g., 'HC_Square'
  selectedPaper: string;     // e.g., 'standardPaper'
  pageConfigName: string;    // e.g., 'square_24-24-100'
  totalPages: number;        // e.g., 24, 28, 40, etc.
  currency?: string;
}

/**
 * Calculate photobook price using V3 pricing formula
 * 
 * Examples:
 * - HC_Square + Glossy + 24p = $35 + ($0×24) + ($1.50×0) = $35.00
 * - HC_Square + Silk + 40p = $35 + ($0.75×40) + ($1.50×16) = $89.00
 * - SC_Horizontal + Matte + 60p = $18 + ($0.50×60) + ($1.00×36) = $86.00
 */
export function calculatePrice(inputs: PriceInputs): PriceCalculation {
  const {
    selectedSize,
    selectedPaper,
    pageConfigName,
    totalPages,
    currency = 'USD',
  } = inputs;

  // Get base price from SIZE
  const basePrice = BASE_PRICES[selectedSize] || 0;

  // Get paper surcharge per page
  const paperSurchargePerPage = PAPER_SURCHARGES[selectedPaper] || 0;
  const totalPaperSurcharge = paperSurchargePerPage * totalPages;

  // Get page price per extra page (above 24)
  const pagePricePerPage = PAGE_PRICES[pageConfigName] || 1.00;
  const extraPages = Math.max(0, totalPages - 24);
  const totalExtraPageCost = pagePricePerPage * extraPages;

  // Calculate subtotal
  const subtotal = basePrice + totalPaperSurcharge + totalExtraPageCost;

  // Build breakdown
  const breakdown = [
    {
      label: `Base price (${selectedSize})`,
      amount: basePrice,
    },
  ];

  if (totalPaperSurcharge > 0) {
    breakdown.push({
      label: `Paper upgrade (${selectedPaper}): ${paperSurchargePerPage.toFixed(2)} × ${totalPages} pages`,
      amount: totalPaperSurcharge,
    });
  }

  if (extraPages > 0) {
    breakdown.push({
      label: `Extra pages: ${pagePricePerPage.toFixed(2)} × ${extraPages} pages`,
      amount: totalExtraPageCost,
    });
  }

  return {
    basePrice,
    paperSurcharge: paperSurchargePerPage,
    pagePricePerPage,
    totalPages,
    extraPages,
    subtotal,
    total: subtotal,
    currency,
    breakdown,
  };
}

/**
 * Format price for display
 */
export function formatPrice(amount: number, currency = 'USD'): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency,
  }).format(amount);
}

/**
 * Validate page count (must be in increments of 4, between min and max)
 */
export function validatePageCount(
  pageCount: number,
  minPages: number,
  maxPages: number,
  multiplier: number
): { valid: boolean; error?: string } {
  if (pageCount < minPages) {
    return { valid: false, error: `Minimum ${minPages} pages required` };
  }
  if (pageCount > maxPages) {
    return { valid: false, error: `Maximum ${maxPages} pages allowed` };
  }
  if (pageCount % multiplier !== 0) {
    return { valid: false, error: `Page count must be in increments of ${multiplier}` };
  }
  return { valid: true };
}
