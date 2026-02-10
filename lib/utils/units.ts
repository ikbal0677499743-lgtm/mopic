// Unit conversion utilities

export const INCHES_TO_MM = 25.4;
export const MM_TO_INCHES = 1 / INCHES_TO_MM;
export const INCHES_TO_POINTS = 72;
export const POINTS_TO_INCHES = 1 / INCHES_TO_POINTS;
export const CSS_PX_PER_INCH = 96; // at 100% zoom

/**
 * Convert inches to millimeters
 */
export function inchesToMm(inches: number): number {
  return inches * INCHES_TO_MM;
}

/**
 * Convert millimeters to inches
 */
export function mmToInches(mm: number): number {
  return mm * MM_TO_INCHES;
}

/**
 * Convert inches to points (PDF units)
 */
export function inchesToPoints(inches: number): number {
  return inches * INCHES_TO_POINTS;
}

/**
 * Convert points to inches
 */
export function pointsToInches(points: number): number {
  return points * POINTS_TO_INCHES;
}

/**
 * Convert inches to CSS pixels at given zoom level
 */
export function inchesToPx(inches: number, zoomLevel = 100): number {
  return inches * CSS_PX_PER_INCH * (zoomLevel / 100);
}

/**
 * Convert CSS pixels to inches at given zoom level
 */
export function pxToInches(px: number, zoomLevel = 100): number {
  return px / CSS_PX_PER_INCH / (zoomLevel / 100);
}

/**
 * Format dimension for display
 */
export function formatDimension(
  inches: number,
  unit: 'in' | 'mm' | 'cm' = 'in',
  decimals = 2
): string {
  switch (unit) {
    case 'mm':
      return `${inchesToMm(inches).toFixed(decimals)} mm`;
    case 'cm':
      return `${(inchesToMm(inches) / 10).toFixed(decimals)} cm`;
    case 'in':
    default:
      return `${inches.toFixed(decimals)}"`;
  }
}
