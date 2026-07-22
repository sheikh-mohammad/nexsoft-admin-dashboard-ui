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
