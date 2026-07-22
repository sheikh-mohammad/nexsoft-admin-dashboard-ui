/**
 * Resolves a CSS custom property to its computed value.
 * Falls back to a default if the property is not defined.
 * Always reads from document.documentElement so it picks up :root / .dark changes.
 *
 * @param {string} varName - The CSS custom property name, with or without 'var()' wrapping
 * @param {string} fallback - Optional fallback value if the property is not found
 * @returns {string} The resolved color value
 */
export function resolveCSSVar(varName, fallback = '#000000') {
  const name = varName.replace(/^var\(/, '').replace(/\)$/, '').trim()

  if (/^(#|rgb|hsl)/i.test(name)) return name

  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

/**
 * Builds a color map from CSS variable names to resolved values.
 * Used by chart components to derive all theme-dependent colors in one call.
 *
 * @param {string[]} varNames - Array of CSS variable names
 * @returns {Record<string, string>} Map of variable name -> resolved value
 */
export function resolveColorMap(varNames) {
  const style = getComputedStyle(document.documentElement)
  const map = {}
  for (const name of varNames) {
    map[name] = style.getPropertyValue(name).trim() || '#000000'
  }
  return map
}
