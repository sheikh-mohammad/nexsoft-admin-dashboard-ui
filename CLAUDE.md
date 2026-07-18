# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start Vite dev server at localhost:5173
npm run build    # Production build to dist/
npm run preview  # Preview the production build
```

## Architecture

### Component tree

```
App
└── ThemeProvider                     (context/ThemeContext.jsx)
    └── Layout                        (components/layout/Layout.jsx)
        ├── Sidebar                   (components/layout/Sidebar.jsx)
        ├── Header                    (components/layout/Header.jsx)
        └── <main>
            └── Dashboard             (pages/Dashboard.jsx)
                ├── StatCard[] × 4    (components/ui/StatCard.jsx)
                └── ChartCard[] × 3   (components/charts/ChartCard.jsx)
                    ├── LineChart     (react-chartjs-2)
                    ├── DoughnutChart
                    └── BarChart
```

### Key patterns

**Theming via CSS custom properties.** `index.css` defines `--color-bg`, `--color-surface`, `--color-text`, `--color-text-muted`, and `--color-border` on `:root` (light) and `.dark` (dark). All components reference these with `var(--color-*)` instead of hardcoded Tailwind colors, ensuring every element swaps theme without needing `dark:` variants. Tailwind `darkMode: 'class'` is also available for direct `dark:` usage.

**ThemeContext** (`context/ThemeContext.jsx`) persists the user's choice to `localStorage(['nexsoft-theme'])`, falls back to `prefers-color-scheme`, and toggles `.dark` on `<html>`. Consumed via `useTheme()` hook — returns `{ theme, toggleTheme }`.

**Layout state machine.** Layout manages two sidebar states independently:
- `mobileOpen` (boolean) — overlay sidebar on < 1024px, triggered by hamburger button, dismissed by backdrop click or Escape key
- `collapsed` (boolean) — desktop-only icon-mode sidebar (w-20), toggled by collapse button

`useMediaQuery('(min-width: 1024px)')` determines which mode applies.

**Chart theme awareness.** Each chart component (`LineChart`, `BarChart`, `DoughnutChart`) imports `useTheme()` and rebuilds its Chart.js `options` object with theme-appropriate colors (ticks, grid lines, tooltip backgrounds, legend text). A shared `chartSetup.js` registers all required Chart.js components globally. Charts are wrapped in `ChartErrorBoundary` in the Dashboard page.

**Mock data** lives in `data/dashboardData.js` as exported plain objects — stat card definitions (with string icon names mapped to lucide-react components in the page layer), revenue time series, sales categories, and traffic source percentages.

### Directory layout

```
src/
  context/       — React context providers (ThemeContext)
  hooks/         — Custom hooks (useTheme, useMediaQuery)
  components/
    layout/      — App shell (Layout, Sidebar, Header)
    charts/      — Chart.js wrappers + ChartCard + ErrorBoundary + registrations
    ui/          — Reusable primitives (Card, StatCard, Badge, Skeleton, EmptyState)
  data/          — Mock datasets (dashboardData.js)
  pages/         — Route-level page components (Dashboard)
```

### Dependencies

| Package | Purpose |
|---|---|
| react / react-dom | UI framework |
| tailwindcss / postcss / autoprefixer | Utility-first CSS |
| chart.js / react-chartjs-2 | Chart rendering |
| lucide-react | Icon library |
| vite / @vitejs/plugin-react | Build tooling |
| @playwright/test | Screenshot tests |
