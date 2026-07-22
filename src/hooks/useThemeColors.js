import { useMemo } from 'react'
import { useTheme } from '../context/ThemeContext'
import { resolveColorMap } from '../utils/cssVarResolver'

const COLOR_VARS = [
  '--color-text-muted',
  '--color-text',
  '--color-text-secondary',
  '--color-border',
  '--color-primary',
  '--color-primary-light',
  '--color-surface',
  '--color-bg-secondary',
  '--color-success',
  '--color-warning',
  '--color-error',
]

/**
 * Returns an object of resolved CSS custom property values.
 * Re-computes whenever the theme changes.
 */
export function useThemeColors() {
  const { theme } = useTheme()

  return useMemo(() => {
    const map = resolveColorMap(COLOR_VARS)
    return {
      textColor:       map['--color-text-muted'],
      textPrimary:     map['--color-text'],
      textSecondary:   map['--color-text-secondary'],
      borderColor:     map['--color-border'],
      primaryColor:    map['--color-primary'],
      primaryLight:    map['--color-primary-light'],
      surfaceColor:    map['--color-surface'],
      bgSecondary:     map['--color-bg-secondary'],
      successColor:    map['--color-success'],
      warningColor:    map['--color-warning'],
      errorColor:      map['--color-error'],
    }
  }, [theme])
}
