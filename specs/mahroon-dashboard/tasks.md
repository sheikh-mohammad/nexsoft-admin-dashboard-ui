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

## Phase H: Chart Fixes — CSS Var Resolution ✅
- [x] Create `src/utils/cssVarResolver.js` (resolve CSS vars to computed values)
- [x] Create `src/hooks/useThemeColors.js` (memoized resolved colors, reacts to theme)
- [x] Fix `src/components/charts/LineChart.jsx` — use resolved colors
- [x] Fix `src/components/charts/DoughnutChart.jsx` — use resolved colors
- [x] Fix `src/components/charts/BarChart.jsx` — use resolved colors

## Phase I: Dropdowns — Notification & Profile ✅
- [x] Create `src/hooks/useClickOutside.js` (outside click + Escape to close)
- [x] Update `src/components/layout/Header.jsx` — add dropdowns + dynamic pageTitle prop

## Phase J: Navigation — Page Routing ✅
- [x] Create `src/context/NavigationContext.jsx` (page state, navigateTo, PAGES constant)
- [x] Create `src/pages/Analytics.jsx` (analytics stat cards)
- [x] Create `src/pages/Users.jsx` (EmptyState placeholder)
- [x] Create `src/pages/Orders.jsx` (EmptyState placeholder)
- [x] Create `src/pages/Settings.jsx` (setting cards)
- [x] Update `src/components/layout/Sidebar.jsx` — connect to NavigationContext
- [x] Update `src/components/layout/Layout.jsx` — integrate NavigationProvider + page rendering
- [x] Update `src/App.jsx` — simplify, Layout handles page rendering

---

## Phase K1: Mock Data ✅
- [x] Create `src/data/analyticsData.js` (metrics, revenue, traffic, growth, topPages)
- [x] Create `src/data/usersData.js` (12 users with roles, status, dates)
- [x] Create `src/data/ordersData.js` (15 orders with status, amounts, dates)
- [x] Create `src/data/notificationsData.js` (12 notifications across types)

## Phase K2: Navigation Updates ✅
- [x] Add `PAGES.NOTIFICATIONS` to `src/context/NavigationContext.jsx`
- [x] Update `src/components/layout/Layout.jsx` — register Notifications page
- [x] Update `src/components/layout/Header.jsx` — wire "View all notifications" button

## Phase K3: Analytics Page ✅
- [x] Rebuild `src/pages/Analytics.jsx` — time period tabs, stat cards, revenue chart, traffic bar, user growth chart, top pages table

## Phase K4: Users Page ✅
- [x] Rebuild `src/pages/Users.jsx` — search/filter, user table, pagination, detail modal

## Phase K5: Orders Page ✅
- [x] Rebuild `src/pages/Orders.jsx` — search/filter, orders table, pagination, detail modal

## Phase K6: Settings Page ✅
- [x] Rebuild `src/pages/Settings.jsx` — tabbed UI (Profile, Appearance, Notifications, Security) with functional controls

## Phase K7: Notifications Page ✅
- [x] Create `src/pages/Notifications.jsx` — filterable notification list with read/unread
