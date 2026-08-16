/**
 * Application constants
 */

export const APP_NAME = 'LKK Web'
export const APP_VERSION = '1.0.0'

// API configuration
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api'

// Routes
export const ROUTES = {
  HOME: '/',
  ACTIVITIES: '/activities',
  LIBRARY: '/library',
  AWARDS: '/awards',
  NEWS: '/news',
}

/** Glow tím dùng chung (giống hover card Tin tức) */
export const BRAND_GLOW_SHADOW =
  'shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]'

export const BRAND_GLOW_HOVER =
  'hover:shadow-[0_0_10px_5px_rgba(90,59,196,0.1),0_12px_48px_rgba(90,59,196,0.45)]'
