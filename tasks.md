# Tasks — Mahroon Admin Dashboard

## Phase A: Project Setup ✅
- [x] Install dependencies (tailwindcss, @tailwindcss/vite, chart.js, react-chartjs-2, lucide-react)
- [ ] Update vite.config.js with @tailwindcss/vite plugin

## Phase B: Theming Foundation
- [ ] Replace `src/index.css` with mahroon theme CSS (Tailwind import, CSS vars, animations)
- [ ] Create `src/context/ThemeContext.jsx` (ThemeProvider + useTheme hook)
- [ ] Create `src/hooks/useMediaQuery.js`

## Phase C: App Shell
- [ ] Create `src/components/layout/Sidebar.jsx`
- [ ] Create `src/components/layout/Header.jsx`
- [ ] Create `src/components/layout/Layout.jsx`

## Phase D: UI Primitives
- [ ] Create `src/components/ui/Card.jsx`
- [ ] Create `src/components/ui/Badge.jsx`
- [ ] Create `src/components/ui/Skeleton.jsx`
- [ ] Create `src/components/ui/EmptyState.jsx`
- [ ] Create `src/components/ui/ThemeToggle.jsx`

## Phase E: Charts
- [ ] Create `src/components/charts/chartSetup.js`
- [ ] Create `src/components/charts/ChartErrorBoundary.jsx`
- [ ] Create `src/components/charts/LineChart.jsx`
- [ ] Create `src/components/charts/DoughnutChart.jsx`
- [ ] Create `src/components/charts/BarChart.jsx`
- [ ] Create `src/components/charts/ChartCard.jsx`

## Phase F: Data + Dashboard
- [ ] Create `src/data/dashboardData.js`
- [ ] Create `src/components/ui/StatCard.jsx`
- [ ] Create `src/pages/Dashboard.jsx`

## Phase G: Final Integration
- [ ] Replace `src/App.jsx` with final component tree
- [ ] Update `index.html` title
- [ ] Delete `src/App.css`
- [ ] `npm run build` — verify build succeeds
