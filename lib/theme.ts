/**
 * Centralized theme configuration for Awesome Swadeshi Apps
 * Defines consistent colors, spacing, typography, and other design tokens
 */

export const theme = {
  colors: {
    // Primary brand colors based on Indian flag
    primary: {
      saffron: '#FF9933',
      white: '#FFFFFF',
      green: '#138808'
    },
    // Accent colors
    accent: {
      navy: '#000080', // Ashoka Chakra blue
      blue: '#2563EB', // Interactive elements
      orange: '#EA580C' // Call-to-action
    },
    // Neutral colors
    neutral: {
      50: '#F9FAFB',
      100: '#F3F4F6',
      200: '#E5E7EB',
      300: '#D1D5DB',
      400: '#9CA3AF',
      500: '#6B7280',
      600: '#4B5563',
      700: '#374151',
      800: '#1F2937',
      900: '#111827'
    },
    // Semantic colors
    semantic: {
      success: '#059669',
      warning: '#D97706',
      error: '#DC2626',
      info: '#2563EB'
    }
  },

  spacing: {
    0: '0',
    1: '0.25rem', // 4px
    2: '0.5rem',  // 8px
    3: '0.75rem', // 12px
    4: '1rem',    // 16px
    5: '1.25rem', // 20px
    6: '1.5rem',  // 24px
    8: '2rem',    // 32px
    10: '2.5rem', // 40px
    12: '3rem',   // 48px
    16: '4rem',   // 64px
    20: '5rem',   // 80px
    24: '6rem'    // 96px
  },

  borderRadius: {
    none: '0',
    sm: '0.25rem',   // 4px
    DEFAULT: '0.5rem', // 8px
    md: '0.75rem',   // 12px
    lg: '1rem',      // 16px
    xl: '1.5rem',    // 24px
    '2xl': '2rem',   // 32px
    full: '9999px'
  },

  fontSize: {
    xs: ['0.75rem', { lineHeight: '1rem' }],
    sm: ['0.875rem', { lineHeight: '1.25rem' }],
    base: ['1rem', { lineHeight: '1.5rem' }],
    lg: ['1.125rem', { lineHeight: '1.75rem' }],
    xl: ['1.25rem', { lineHeight: '1.75rem' }],
    '2xl': ['1.5rem', { lineHeight: '2rem' }],
    '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
    '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
    '5xl': ['3rem', { lineHeight: '1' }],
    '6xl': ['3.75rem', { lineHeight: '1' }]
  },

  fontWeight: {
    normal: '400',
    medium: '500',
    semibold: '600',
    bold: '700',
    extrabold: '800'
  },

  shadows: {
    sm: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
    DEFAULT: '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
    md: '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
    lg: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    xl: '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
    '2xl': '0 25px 50px -12px rgb(0 0 0 / 0.25)'
  },

  transitions: {
    DEFAULT: 'all 150ms cubic-bezier(0.4, 0, 0.2, 1)',
    fast: 'all 100ms cubic-bezier(0.4, 0, 0.2, 1)',
    slow: 'all 300ms cubic-bezier(0.4, 0, 0.2, 1)'
  },

  breakpoints: {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
    '2xl': '1536px'
  }
} as const

// CSS custom properties for runtime theme usage
export const cssVariables = {
  '--color-primary-saffron': theme.colors.primary.saffron,
  '--color-primary-white': theme.colors.primary.white,
  '--color-primary-green': theme.colors.primary.green,
  '--color-accent-navy': theme.colors.accent.navy,
  '--color-accent-blue': theme.colors.accent.blue,
  '--color-accent-orange': theme.colors.accent.orange,
  '--color-neutral-50': theme.colors.neutral[50],
  '--color-neutral-100': theme.colors.neutral[100],
  '--color-neutral-200': theme.colors.neutral[200],
  '--color-neutral-300': theme.colors.neutral[300],
  '--color-neutral-400': theme.colors.neutral[400],
  '--color-neutral-500': theme.colors.neutral[500],
  '--color-neutral-600': theme.colors.neutral[600],
  '--color-neutral-700': theme.colors.neutral[700],
  '--color-neutral-800': theme.colors.neutral[800],
  '--color-neutral-900': theme.colors.neutral[900],
  '--spacing-xs': theme.spacing[2],
  '--spacing-sm': theme.spacing[4],
  '--spacing-md': theme.spacing[6],
  '--spacing-lg': theme.spacing[8],
  '--spacing-xl': theme.spacing[12],
  '--border-radius-sm': theme.borderRadius.sm,
  '--border-radius-md': theme.borderRadius.md,
  '--border-radius-lg': theme.borderRadius.lg,
  '--shadow-sm': theme.shadows.sm,
  '--shadow-md': theme.shadows.md,
  '--shadow-lg': theme.shadows.lg,
  '--transition-default': theme.transitions.DEFAULT
} as const

// Theme-aware utility functions
export const getColor = (path: string) => {
  const keys = path.split('.')
  let value: any = theme.colors
  for (const key of keys) {
    value = value[key]
  }
  return value
}

export const getSpacing = (size: keyof typeof theme.spacing) => {
  return theme.spacing[size]
}

export const getBorderRadius = (size: keyof typeof theme.borderRadius) => {
  return theme.borderRadius[size]
}

// Type exports for TypeScript usage
export type ThemeColors = typeof theme.colors
export type ThemeSpacing = typeof theme.spacing
export type ThemeBorderRadius = typeof theme.borderRadius