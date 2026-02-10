// Unit conversion utilities

export function inchesToMm(inches: number): number {
  return inches * 25.4
}

export function mmToInches(mm: number): number {
  return mm / 25.4
}

export function inchesToPx(inches: number, dpi: number = 300): number {
  return inches * dpi
}

export function pxToInches(px: number, dpi: number = 300): number {
  return px / dpi
}

export function pointsToInches(points: number): number {
  return points / 72
}

export function inchesToPoints(inches: number): number {
  return inches * 72
}
