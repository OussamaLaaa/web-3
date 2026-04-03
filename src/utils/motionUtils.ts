/**
 * Motion utilities for consistent animation behavior across the app
 * Handles accessibility (reduced motion) and responsive behavior
 */

/**
 * Check if user prefers reduced motion
 * @returns boolean indicating if reduced motion is preferred
 */
export function prefersReducedMotion(): boolean {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is mobile sized
 * @returns boolean indicating if viewport is mobile width
 */
export function isMobile(): boolean {
  return window.matchMedia('(max-width: 768px)').matches
}

/**
 * Get parallax intensity based on device and accessibility settings
 * @param baseIntensity - The base parallax intensity (default: 1)
 * @returns adjusted intensity value
 */
export function getParallaxIntensity(baseIntensity = 1): number {
  if (prefersReducedMotion()) return 0
  if (isMobile()) return baseIntensity * 0.5
  return baseIntensity
}
