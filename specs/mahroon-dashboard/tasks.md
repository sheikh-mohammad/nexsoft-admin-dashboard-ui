# Tasks — Mahroon Admin Dashboard

## Phase A: Project Setup ✅
- [x] Install dependencies (tailwindcss, @tailwindcss/vite, chart.js, react-chartjs-2, lucide-react)
- [x] Update vite.config.js with @tailwindcss/vite plugin

## Phase B: Theming Foundation ✅
- [x] Replace `src/index.css` with mahroon theme CSS (Tailwind import, CSS vars, animations)
- [x] Create `src/context/ThemeContext.jsx` (ThemeProvider + useTheme hook)
- [x] Create `src/hooks/useMediaQuery.js`

## Phase C: App Shell ✅
- [x] Create `src/components/layout/Sidebar.jsx`
- [x] Create `src/components/layout/Header.jsx`
- [x] Create `src/components/layout/Layout.jsx`

## Phase D: UI Primitives ✅
- [x] Create `src/components/ui/Card.jsx`
- [x] Create `src/components/ui/Badge.jsx`
- [x] Create `src/components/ui/Skeleton.jsx`
- [x] Create `src/components/ui/EmptyState.jsx`

## Phase E: Charts ✅
- [x] Create `src/components/charts/chartSetup.js`
- [x] Create `src/components/charts/ChartErrorBoundary.jsx`
- [x] Create `src/components/charts/LineChart.jsx`
- [x] Create `src/components/charts/DoughnutChart.jsx`
- [x] Create `src/components/charts/BarChart.jsx`
- [x] Create `src/components/charts/ChartCard.jsx`

## Phase F: Data + Dashboard ✅
- [x] Create `src/data/dashboardData.js`
- [x] Create `src/components/ui/StatCard.jsx`
- [x] Create `src/pages/Dashboard.jsx`

## Phase G: Final Integration ✅
- [x] Replace `src/App.jsx` with final component tree
- [x] Update `index.html` title
- [x] Delete `src/App.css`
- [x] `npm run build` — verify build succeeds

---

## Phase H: Chart Fixes — CSS Var Resolution
- [ ] Create `src/utils/cssVarResolver.js` (resolve CSS vars to computed values)
- [ ] Create `src/hooks/useThemeColors.js` (memoized resolved colors, reacts to theme)
- [ ] Fix `src/components/charts/LineChart.jsx` — use resolved colors
- [ ] Fix `src/components/charts/DoughnutChart.jsx` — use resolved colors
- [ ] Fix `src/components/charts/BarChart.jsx` — use resolved colors

## Phase I: Dropdowns — Notification & Profile
- [ ] Create `src/hooks/useClickOutside.js` (outside click + Escape to close)
- [ ] Update `src/components/layout/Header.jsx` — add dropdowns + dynamic pageTitle prop

## Phase J: Navigation — Page Routing
- [ ] Create `src/context/NavigationContext.jsx` (page state, navigateTo, PAGES constant)
- [ ] Create `src/pages/Analytics.jsx` (analytics stat cards)
- [ ] Create `src/pages/Users.jsx` (EmptyState placeholder)
- [ ] Create `src/pages/Orders.jsx` (EmptyState placeholder)
- [ ] Create `src/pages/Settings.jsx` (setting cards)
- [ ] Update `src/components/layout/Sidebar.jsx` — connect to NavigationContext
- [ ] Update `src/components/layout/Layout.jsx` — integrate NavigationProvider + page rendering
- [ ] Update `src/App.jsx` — simplify, Layout handles page rendering
