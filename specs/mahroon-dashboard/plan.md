# Mahroon Admin Dashboard — Implementation Plan

## Context

The project is a fresh Vite 8 + React 19.2 scaffold (JS, no TS). Only `react`/`react-dom` are installed. The goal is to build a single-page admin dashboard with sidebar layout, charts, stat cards, and dark/light mode — all themed in a **mahroon** (deep maroon / rich burgundy) palette with smooth animations and a professional aesthetic.

---

## Implementation Phases

### Phase A — Project Setup
| Step | File | Action |
|------|------|--------|
| A1 | `package.json` | `npm install tailwindcss @tailwindcss/vite chart.js react-chartjs-2 lucide-react` |
| A2 | `vite.config.js` | Add `@tailwindcss/vite` plugin after the React plugin |

### Phase B — Theming Foundation
| Step | File | Action |
|------|------|--------|
| B1 | `src/index.css` | Replace entirely: import Tailwind, define CSS custom properties for light (`:root`) and dark (`.dark`) mahroon themes, animation keyframes, glassmorphism utilities |
| B2 | `src/context/ThemeContext.jsx` | Create `ThemeProvider` + `useTheme()` hook. Read/write `localStorage('nexsoft-theme')`, fallback to `prefers-color-scheme`, toggle `.dark` on `<html>` |
| B3 | `src/hooks/useMediaQuery.js` | Create `useMediaQuery(query)` hook using `window.matchMedia` |

### Phase C — App Shell
| Step | File | Action |
|------|------|--------|
| C1 | `src/components/layout/Sidebar.jsx` | Nav sidebar: logo, 5 nav items (Dashboard, Analytics, Users, Orders, Settings with lucide icons), collapse toggle (desktop), close button (mobile), active item indicator |
| C2 | `src/components/layout/Header.jsx` | Top bar: hamburger menu btn, page title, search input, ThemeToggle, notification bell with dot, user avatar |
| C3 | `src/components/layout/Layout.jsx` | Orchestrator: `mobileOpen` + `collapsed` state, `useMediaQuery('(min-width:1024px)')` for responsive decision, backdrop overlay on mobile |

### Phase D — UI Primitives
| Step | File | Action |
|------|------|--------|
| D1 | `src/components/ui/Card.jsx` | Reusable card: `{ children, className, glass, hoverable }` with shadow/border/radius via CSS vars |
| D2 | `src/components/ui/Badge.jsx` | `{ children, variant, size }` — variants: default, success, warning, error, primary |
| D3 | `src/components/ui/Skeleton.jsx` | Loading placeholder with pulse animation, `{ width, height, borderRadius }` |
| D4 | `src/components/ui/EmptyState.jsx` | Centered message: `{ icon: Icon, title, message, action }` |
| D5 | `src/components/ui/ThemeToggle.jsx` | Sun/Moon icon button calling `toggleTheme()` |

### Phase E — Charts
| Step | File | Action |
|------|------|--------|
| E1 | `src/components/charts/chartSetup.js` | Register all Chart.js components globally (CategoryScale, LinearScale, Point, Line, Bar, Arc, Title, Tooltip, Legend, Filler) |
| E2 | `src/components/charts/ChartErrorBoundary.jsx` | Error boundary wrapping charts, graceful fallback UI |
| E3 | `src/components/charts/LineChart.jsx` | Theme-aware Line chart with gradient fill |
| E4 | `src/components/charts/DoughnutChart.jsx` | Theme-aware Doughnut chart |
| E5 | `src/components/charts/BarChart.jsx` | Theme-aware Bar chart |
| E6 | `src/components/charts/ChartCard.jsx` | Card wrapper for charts: title, subtitle, period selector |

### Phase F — Data + Dashboard
| Step | File | Action |
|------|------|--------|
| F1 | `src/data/dashboardData.js` | Mock data: 4 statCards, revenue time series, category distribution, traffic sources |
| F2 | `src/components/ui/StatCard.jsx` | Stat display: `{ title, value, change, changeType, icon: Icon }` with trend indicator and entrance animation |
| F3 | `src/pages/Dashboard.jsx` | Assemble dashboard page: stat cards grid + chart cards grid. Map icon strings to lucide components, wrap charts in error boundaries |

### Phase G — Final Integration
| Step | File | Action |
|------|------|--------|
| G1 | `src/App.jsx` | Replace Vite boilerplate: `<ThemeProvider><Layout><Dashboard /></Layout></ThemeProvider>` |
| G2 | `index.html` | Update title to "Nexsoft Admin Dashboard" |
| G3 | `src/App.css` | Delete (no longer needed) |

---

## Mahroon Color Palette

**Light Theme (`:root`):**
- `--color-bg: #FFF8F5` | `--color-sidebar-bg: #1A0000`
- `--color-surface: #FFFFFF` | `--color-primary: #6B0F1A`
- `--color-text: #1A0000` | `--color-text-muted: #8B6F6F`
- `--color-border: #E8D5D0` | `--color-primary-hover: #8B1A2B`

**Dark Theme (`.dark`):**
- `--color-bg: #0D0000` | `--color-sidebar-bg: #050000`
- `--color-surface: #1A0808` | `--color-primary: #D44050`
- `--color-text: #F5EDE8` | `--color-text-muted: #A89090`
- `--color-border: #3D1A1A`

---

## Animation Strategy

- **Entrance:** `fadeIn` + `slideInUp` keyframes on mount, staggered via `animation-delay` (100ms increments)
- **Hover:** `translateY(-4px)` + shadow intensification, `transition: all 300ms ease`
- **Sidebar:** `width: 300ms ease-in-out` for collapse, `transform: 300ms` for mobile overlay
- **Theme toggle:** `rotate: 300ms` on icon
- **Skeletons:** `pulse` opacity animation at 1.5s infinite
- **Glassmorphism:** `backdrop-filter: blur(12px)` with semi-transparent background

All animations are pure CSS — no external animation library.

---

## Theming Approach

Tailwind v4 CSS-first config (no `tailwind.config.js`). Components reference CSS custom properties directly via `var(--color-*)` in className strings. This ensures theme swaps propagate globally without needing `dark:` variants. The `@tailwindcss/vite` plugin handles Tailwind setup automatically.

---

## Responsive Strategy

| Breakpoint | Sidebar | Stat Cards | Charts |
|-----------|---------|------------|--------|
| < 1024px | Overlay (w-64, hidden, hamburger toggle) | 2 cols | 1 col stacked |
| >= 1024px | Fixed, collapsible (w-64 / w-20) | 4 cols | 2-3 cols (Line spans 2) |

---

## Verification

After each phase, run `npm run dev` and verify:
- **Phase A:** Dev server starts, no plugin errors
- **Phase B:** CSS vars exist on `:root`, `.dark` class swaps them
- **Phase C:** Sidebar renders/collapses, hamburger works, theme toggles
- **Phase D:** Card/Badge/Skeleton/EmptyState render correctly
- **Phase E:** All 3 chart types render and respond to theme toggle
- **Phase F:** 4 StatCards + 3 ChartCards display mock data, entrance animations play
- **Phase G:** Final build succeeds (`npm run build`), no console errors, theme persists on refresh

---

# Phase H: Bug Fixes & Navigation — Implementation Plan

## Context

The dashboard is built but has critical issues:
1. **Chart crash** — CSS `var()` strings passed to Chart.js options crash because the Canvas 2D API cannot resolve CSS custom properties. All three charts show "Chart Error."
2. **No page routing** — Sidebar nav items (Analytics, Users, Orders, Settings) don't switch content; only visual state changes.
3. **No dropdowns** — Notification bell and profile avatar have no click behavior.
4. **Dark/light chart colors** — Chart text, grid lines, tooltips don't update when theme toggles because colors are hardcoded strings.

## Implementation Plan

### Track A: Chart Fixes — CSS Var Resolution

**Root cause:** Chart.js uses the Canvas 2D API which only accepts concrete color values. Strings like `'var(--color-text-muted)'` cause a `DOMException` crash.

**Solution:** Resolve CSS custom properties to computed values at runtime via `getComputedStyle`, then use those resolved values in Chart.js options. Re-compute when theme changes.

| Step | File | Action |
|------|------|--------|
| H1 | `src/utils/cssVarResolver.js` | **NEW** — Utility to resolve CSS custom properties to computed hex/rgba values via `getComputedStyle(document.documentElement).getPropertyValue(name)` |
| H2 | `src/hooks/useThemeColors.js` | **NEW** — Hook that returns memoized resolved color values, re-computes when `theme` changes |
| H3 | `src/components/charts/LineChart.jsx` | **MODIFY** — Remove `useTheme` import, use `useThemeColors` instead. Replace all `'var(--color-*)'` strings with `colors.*` properties. Fix gradient fill callback. |
| H4 | `src/components/charts/DoughnutChart.jsx` | **MODIFY** — Same fix as LineChart |
| H5 | `src/components/charts/BarChart.jsx` | **MODIFY** — Same fix as LineChart |

### Track B: Dropdowns — Notification & Profile

| Step | File | Action |
|------|------|--------|
| H6 | `src/hooks/useClickOutside.js` | **NEW** — Hook that detects clicks outside a ref + Escape key to close dropdowns. Supports multiple refs and conditional enabling. |
| H7 | `src/components/layout/Header.jsx` | **MODIFY** — Add notification dropdown (3 sample notifications with icons, timestamps) and profile dropdown (Profile/Settings/Logout). Use `useClickOutside` for closing. Accept `pageTitle` prop. |

### Track C: Navigation — Page Routing

| Step | File | Action |
|------|------|--------|
| H8 | `src/context/NavigationContext.jsx` | **NEW** — Context with `currentPage` state, `navigateTo(page)` function, `PAGES` constant (DASHBOARD, ANALYTICS, USERS, ORDERS, SETTINGS). No react-router. |
| H9 | `src/pages/Analytics.jsx` | **NEW** — Analytics page with 3 stat cards (Page Views, Bounce Rate, Avg. Session) |
| H10 | `src/pages/Users.jsx` | **NEW** — Users page with EmptyState placeholder |
| H11 | `src/pages/Orders.jsx` | **NEW** — Orders page with EmptyState placeholder |
| H12 | `src/pages/Settings.jsx` | **NEW** — Settings page with 3 setting cards (Appearance, Notifications, Security) |
| H13 | `src/components/layout/Sidebar.jsx` | **MODIFY** — Replace local `activeItem` state with `currentPage`/`navigateTo` from `useNavigation()`. Close mobile sidebar on nav click. |
| H14 | `src/components/layout/Layout.jsx` | **MODIFY** — Wrap in `NavigationProvider`. Create `LayoutContent` inner component that reads `currentPage` and renders the matching page. Pass `pageTitle` to Header. Remove `children` dependency. |
| H15 | `src/App.jsx` | **MODIFY** — Remove `<Dashboard />` children from Layout. Layout now handles page rendering internally. |

## Color Resolution Pattern

```js
// cssVarResolver.js
export function resolveCSSVar(varName, fallback = '#000000') {
  const name = varName.replace(/^var\(/, '').replace(/\)$/, '').trim()
  const value = getComputedStyle(document.documentElement).getPropertyValue(name).trim()
  return value || fallback
}

// useThemeColors.js
export function useThemeColors() {
  const { theme } = useTheme()
  return useMemo(() => ({
    textColor: resolveCSSVar('--color-text-muted'),
    primaryColor: resolveCSSVar('--color-primary'),
    surfaceColor: resolveCSSVar('--color-surface'),
    // ... all other color vars
  }), [theme])
}
```

## Verification

1. `npm run build` — must succeed with zero errors
2. Open app — charts render without "Chart Error" fallback
3. Toggle dark/light mode — chart legend, axis ticks, grid lines, tooltips update immediately
4. Click each sidebar nav item — corresponding page renders with animation
5. Click notification bell — dropdown opens; close by outside click, Escape, or item selection
6. Click profile avatar — dropdown opens with Profile (navigates), Settings (navigates), Logout
7. Mobile: nav item click closes sidebar and switches page
