# Mahroon Admin Dashboard — Specification

## Overview

A professional single-page admin dashboard UI with sidebar navigation, analytics charts, stat cards, and dark/light mode toggle. Themed in a **mahroon** color palette — deep maroon / rich burgundy tones.

## Requirements

1. **Sidebar & Dashboard Layout** — App shell with fixed sidebar navigation and scrollable main content area
2. **Charts & Analytics Cards** — Data visualization using Line, Doughnut, and Bar charts with summary stat cards
3. **Responsive Navigation** — Mobile overlay sidebar (< 1024px) and desktop collapsible sidebar (>= 1024px)
4. **Reusable Components** — Card, Badge, Skeleton, EmptyState, StatCard primitives
5. **Dark/Light Mode Toggle** — Theme switching with persistence in localStorage

## Color Palette

### Light Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FFF8F5` | Page background |
| `--color-bg-secondary` | `#F5EDE8` | Secondary background |
| `--color-surface` | `#FFFFFF` | Card/surface background |
| `--color-sidebar-bg` | `#1A0000` | Sidebar background |
| `--color-text` | `#1A0000` | Primary text |
| `--color-text-muted` | `#8B6F6F` | Muted/secondary text |
| `--color-primary` | `#6B0F1A` | Accent / primary |
| `--color-primary-hover` | `#8B1A2B` | Accent hover |
| `--color-border` | `#E8D5D0` | Borders |

### Dark Theme
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#0D0000` | Page background |
| `--color-surface` | `#1A0808` | Card/surface background |
| `--color-sidebar-bg` | `#050000` | Sidebar background |
| `--color-text` | `#F5EDE8` | Primary text |
| `--color-text-muted` | `#A89090` | Muted text |
| `--color-primary` | `#D44050` | Accent / primary |

## Tech Stack

- **Framework:** React 19 + Vite 8 (JavaScript)
- **Styling:** Tailwind CSS v4 (CSS-first config) + CSS custom properties
- **Charts:** Chart.js 4 + react-chartjs-2
- **Icons:** lucide-react
- **Animations:** Pure CSS keyframes & transitions

## Component Tree

```
App
└── ThemeProvider (context/ThemeContext.jsx)
    └── Layout (components/layout/Layout.jsx)
        ├── Sidebar (components/layout/Sidebar.jsx)
        ├── Header (components/layout/Header.jsx)
        └── <main>
            └── Dashboard (pages/Dashboard.jsx)
                ├── StatCard[] x 4 (components/ui/StatCard.jsx)
                └── ChartCard[] x 3 (components/charts/ChartCard.jsx)
                    ├── LineChart (react-chartjs-2)
                    ├── DoughnutChart
                    └── BarChart
```

## Responsive Breakpoints

| Breakpoint | Sidebar | Stat Cards | Charts |
|-----------|---------|------------|--------|
| < 1024px | Overlay (w-64, hamburger toggle) | 2 columns | 1 column |
| >= 1024px | Fixed (collapsible w-64 / w-20) | 4 columns | 2-3 columns |

## Animations

- **Entrance:** fadeIn + slideInUp (staggered per card)
- **Hover:** translateY(-4px) + enhanced shadow
- **Sidebar:** smooth width transition (300ms)
- **Theme toggle:** rotate icon (300ms)
- **Skeletons:** pulse (1.5s infinite)
- **Glassmorphism:** backdrop-filter: blur(12px)

## Mock Data

- **Stat Cards:** Total Revenue ($48,250), Active Users (2,847), Orders (1,423), Conversion Rate (3.24%)
- **Revenue Chart:** Monthly data (Jan-Dec) for current vs previous year
- **Category Doughnut:** Electronics, Clothing, Home & Garden, Books, Sports, Other
- **Traffic Bar Chart:** Direct, Organic Search, Social Media, Referral, Email, Paid Ads

## States

Every component handles:
- **Default** — Normal render with data
- **Loading** — Skeleton placeholders shown during data fetch
- **Empty** — EmptyState component when no data
- **Error** — ChartErrorBoundary for chart render failures
