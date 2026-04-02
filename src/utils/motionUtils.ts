/**
 * Cinematic motion utilities for Phase 1 implementation
 * Handles motion preferences and responsive behavior
 */

/**
 * Check if user prefers reduced motion
 */
export const prefersReducedMotion = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/**
 * Check if device is mobile (viewport < 768px)
 */
export const isMobile = (): boolean => {
  if (typeof window === 'undefined') return false
  return window.innerWidth < 768
}

/**
 * Get adjusted animation duration based on motion preferences
 */
export const getAnimationDuration = (baseDuration: number): number => {
  return prefersReducedMotion() ? baseDuration * 0.5 : baseDuration
}

/**
 * Get adjusted pin duration for mobile
 */
export const getPinDuration = (desktopDuration: string, mobileDuration: string): string => {
  return isMobile() ? mobileDuration : desktopDuration
}

/**
 * Get parallax intensity based on device capabilities
 */
export const getParallaxIntensity = (baseIntensity: number): number => {
  if (prefersReducedMotion()) return 0
  if (isMobile()) return baseIntensity * 0.3
  return baseIntensity
}
