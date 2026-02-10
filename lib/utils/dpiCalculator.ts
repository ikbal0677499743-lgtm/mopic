// DPI Calculator and Validation

export const DPI_WARNING_THRESHOLD = 150;
export const DPI_ERROR_THRESHOLD = 72;
export const TARGET_DPI = 300;

export interface DpiValidation {
  dpi: number;
  status: 'excellent' | 'good' | 'warning' | 'error';
  message: string;
  color: string;
}

/**
 * Calculate DPI for an image at given print dimensions
 */
export function calculateDpi(
  imageWidthPx: number,
  imageHeightPx: number,
  printWidthInches: number,
  printHeightInches: number
): { dpiX: number; dpiY: number; dpi: number } {
  const dpiX = imageWidthPx / printWidthInches;
  const dpiY = imageHeightPx / printHeightInches;
  const dpi = Math.min(dpiX, dpiY); // Use minimum for safety

  return { dpiX, dpiY, dpi };
}

/**
 * Validate DPI and return status with message
 */
export function validateDpi(dpi: number): DpiValidation {
  if (dpi >= TARGET_DPI) {
    return {
      dpi,
      status: 'excellent',
      message: 'Excellent quality for printing',
      color: '#10b981', // green
    };
  } else if (dpi >= DPI_WARNING_THRESHOLD) {
    return {
      dpi,
      status: 'good',
      message: 'Good quality for printing',
      color: '#3b82f6', // blue
    };
  } else if (dpi >= DPI_ERROR_THRESHOLD) {
    return {
      dpi,
      status: 'warning',
      message: 'Low resolution - may appear blurry when printed',
      color: '#f59e0b', // amber
    };
  } else {
    return {
      dpi,
      status: 'error',
      message: 'Very low resolution - not recommended for printing',
      color: '#ef4444', // red
    };
  }
}

/**
 * Get recommended minimum dimensions for target DPI
 */
export function getRecommendedDimensions(
  printWidthInches: number,
  printHeightInches: number,
  targetDpi = TARGET_DPI
): { widthPx: number; heightPx: number } {
  return {
    widthPx: Math.ceil(printWidthInches * targetDpi),
    heightPx: Math.ceil(printHeightInches * targetDpi),
  };
}

/**
 * Check if image is large enough for print size
 */
export function isImageSufficientForPrint(
  imageWidthPx: number,
  imageHeightPx: number,
  printWidthInches: number,
  printHeightInches: number,
  minDpi = DPI_WARNING_THRESHOLD
): boolean {
  const { dpi } = calculateDpi(
    imageWidthPx,
    imageHeightPx,
    printWidthInches,
    printHeightInches
  );
  return dpi >= minDpi;
}
