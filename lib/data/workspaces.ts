// V3 Mopic Static Workspace Data with exact Printbox dimensions

import { Workspace, PageConfig } from '@/lib/types/project';

// ============================================================================
// WORKSPACES (9 total: 6 cover + 3 block)
// Exact dimensions from Printbox audit
// ============================================================================

export const WORKSPACES: Record<string, Workspace> = {
  // HARDCOVER COVERS (larger, with spine and 0.3937" bleed)
  HC_horizontal_cover: {
    id: 'HC_horizontal_cover',
    name: 'HC_horizontal_cover',
    displayName: 'Hardcover Horizontal Cover',
    workspaceType: 'cover',
    orientation: 'horizontal',
    bindingType: 'hardcover',
    pageWidth: 12.5984,
    pageHeight: 8.6614,
    bleed: 0.3937,
    safeZone: 0.1969,
    spineWidth: 0.3150,  // base spine width
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 1,
  },
  HC_vertical_cover: {
    id: 'HC_vertical_cover',
    name: 'HC_vertical_cover',
    displayName: 'Hardcover Vertical Cover',
    workspaceType: 'cover',
    orientation: 'vertical',
    bindingType: 'hardcover',
    pageWidth: 8.6614,
    pageHeight: 12.5984,
    bleed: 0.3937,
    safeZone: 0.1969,
    spineWidth: 0.3150,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 2,
  },
  HC_square_cover: {
    id: 'HC_square_cover',
    name: 'HC_square_cover',
    displayName: 'Hardcover Square Cover',
    workspaceType: 'cover',
    orientation: 'square',
    bindingType: 'hardcover',
    pageWidth: 12.5984,
    pageHeight: 12.5984,
    bleed: 0.3937,
    safeZone: 0.1969,
    spineWidth: 0.3150,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 3,
  },
  
  // SOFTCOVER COVERS (no spine, 0.1181" bleed)
  SC_horizontal_cover: {
    id: 'SC_horizontal_cover',
    name: 'SC_horizontal_cover',
    displayName: 'Softcover Horizontal Cover',
    workspaceType: 'cover',
    orientation: 'horizontal',
    bindingType: 'softcover',
    pageWidth: 11.8110,
    pageHeight: 8.2677,
    bleed: 0.1181,
    safeZone: 0.1969,
    spineWidth: 0.0000,  // SC has NO spine
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 4,
  },
  SC_vertical_cover: {
    id: 'SC_vertical_cover',
    name: 'SC_vertical_cover',
    displayName: 'Softcover Vertical Cover',
    workspaceType: 'cover',
    orientation: 'vertical',
    bindingType: 'softcover',
    pageWidth: 8.2677,
    pageHeight: 11.8110,
    bleed: 0.1181,
    safeZone: 0.1969,
    spineWidth: 0.0000,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 5,
  },
  SC_square_cover: {
    id: 'SC_square_cover',
    name: 'SC_square_cover',
    displayName: 'Softcover Square Cover',
    workspaceType: 'cover',
    orientation: 'square',
    bindingType: 'softcover',
    pageWidth: 11.8110,
    pageHeight: 11.8110,
    bleed: 0.1181,
    safeZone: 0.1969,
    spineWidth: 0.0000,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 6,
  },
  
  // BLOCK WORKSPACES (inner pages, 0.1181" bleed, no spine)
  horizontal_block: {
    id: 'horizontal_block',
    name: 'horizontal_block',
    displayName: 'Horizontal Block',
    workspaceType: 'block',
    orientation: 'horizontal',
    pageWidth: 11.8110,
    pageHeight: 8.2677,
    bleed: 0.1181,
    safeZone: 0.1969,
    spineWidth: 0.0000,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 7,
  },
  vertical_block: {
    id: 'vertical_block',
    name: 'vertical_block',
    displayName: 'Vertical Block',
    workspaceType: 'block',
    orientation: 'vertical',
    pageWidth: 8.2677,
    pageHeight: 11.8110,
    bleed: 0.1181,
    safeZone: 0.1969,
    spineWidth: 0.0000,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 8,
  },
  square_block: {
    id: 'square_block',
    name: 'square_block',
    displayName: 'Square Block',
    workspaceType: 'block',
    orientation: 'square',
    pageWidth: 11.8110,
    pageHeight: 11.8110,
    bleed: 0.1181,
    safeZone: 0.1969,
    spineWidth: 0.0000,
    snapArea: 0.1575,
    paperThickness: 0.0047,
    hasCropMarks: true,
    hasEndPaper: false,
    pdfMode: 'single_spread',
    isActive: true,
    position: 9,
  },
};

// ============================================================================
// SIZE → WORKSPACE MAPPING
// Maps attribute value keys to cover + block workspace names
// ============================================================================

export const SIZE_WORKSPACE_MAP: Record<string, { cover: string; block: string; pageConfig: string }> = {
  HC_Horizontal: {
    cover: 'HC_horizontal_cover',
    block: 'horizontal_block',
    pageConfig: 'standard_24-24-100',
  },
  HC_Vertical: {
    cover: 'HC_vertical_cover',
    block: 'vertical_block',
    pageConfig: 'standard_24-24-100',
  },
  HC_Square: {
    cover: 'HC_square_cover',
    block: 'square_block',
    pageConfig: 'square_24-24-100',
  },
  SC_Horizontal: {
    cover: 'SC_horizontal_cover',
    block: 'horizontal_block',
    pageConfig: 'standard_24-24-100',
  },
  SC_Vertical: {
    cover: 'SC_vertical_cover',
    block: 'vertical_block',
    pageConfig: 'standard_24-24-100',
  },
  SC_Square: {
    cover: 'SC_square_cover',
    block: 'square_block',
    pageConfig: 'square_24-24-100',
  },
};

// ============================================================================
// TYPE → SIZE RULES (cascade)
// ============================================================================

export const TYPE_SIZE_RULES: Record<string, string[]> = {
  HC: ['HC_Horizontal', 'HC_Vertical', 'HC_Square'],
  SC: ['SC_Horizontal', 'SC_Vertical', 'SC_Square'],
};

// ============================================================================
// PAGE CONFIGS (V3: pages_min = 24)
// ============================================================================

export const DEFAULT_PAGE_CONFIG: PageConfig = {
  id: 'standard_24-24-100',
  name: 'standard_24-24-100',
  pagesMin: 24,
  pagesInitial: 24,
  pagesMax: 100,
  pagesMultiplier: 4,
};

export const SQUARE_PAGE_CONFIG: PageConfig = {
  id: 'square_24-24-100',
  name: 'square_24-24-100',
  pagesMin: 24,
  pagesInitial: 24,
  pagesMax: 100,
  pagesMultiplier: 4,
};

// ============================================================================
// BASE PRICES per SIZE (combinatorial pricing)
// ============================================================================

export const BASE_PRICES: Record<string, number> = {
  HC_Horizontal: 30.00,
  HC_Vertical: 32.00,
  HC_Square: 35.00,
  SC_Horizontal: 20.00,
  SC_Vertical: 20.00,
  SC_Square: 22.00,
};

// ============================================================================
// PAPER SURCHARGES per page (page_additive pricing)
// ============================================================================

export const PAPER_SURCHARGES: Record<string, number> = {
  standardPaper: 0.00,  // Standard Glossy
  deepMatte: 0.50,      // Deep Matte
  silk: 0.75,           // Silk
};

// ============================================================================
// PAGE PRICING per page config
// ============================================================================

export const PAGE_PRICES: Record<string, number> = {
  'standard_24-24-100': 1.00,  // $1.00 per extra page
  'square_24-24-100': 1.50,    // $1.50 per extra page
};
