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
