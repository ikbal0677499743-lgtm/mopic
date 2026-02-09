// DPI calculation and validation

export function calculateDPI(
  imageWidth: number,
  imageHeight: number,
  printWidth: number,
  printHeight: number
): number {
  const dpiX = imageWidth / printWidth
  const dpiY = imageHeight / printHeight
  return Math.min(dpiX, dpiY)
}

export function getDPIStatus(dpi: number): 'good' | 'warning' | 'error' {
  if (dpi >= 150) return 'good'
  if (dpi >= 72) return 'warning'
  return 'error'
}
