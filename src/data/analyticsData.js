export const analyticsStats = {
  '7d': {
    pageViews: { value: '128,450', change: 12.3 },
    bounceRate: { value: '32.1%', change: -2.4 },
    avgSession: { value: '4m 32s', change: 8.1 },
    conversionRate: { value: '3.8%', change: 1.2 },
  },
  '30d': {
    pageViews: { value: '485,200', change: 15.8 },
    bounceRate: { value: '34.5%', change: -1.8 },
    avgSession: { value: '3m 58s', change: 5.4 },
    conversionRate: { value: '3.2%', change: 0.9 },
  },
  '90d': {
    pageViews: { value: '1,245,800', change: 18.2 },
    bounceRate: { value: '35.2%', change: -0.5 },
    avgSession: { value: '3m 45s', change: 3.2 },
    conversionRate: { value: '2.9%', change: 0.4 },
  },
}

export const analyticsRevenue = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    current: [4200, 5100, 4800, 5600, 6200, 5800, 5400],
    previous: [3800, 4500, 4200, 4900, 5400, 5100, 4800],
  },
  '30d': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    current: [32500, 34800, 36200, 38400],
    previous: [28000, 29500, 31000, 32500],
  },
  '90d': {
    labels: ['Jan', 'Feb', 'Mar'],
    current: [125000, 132000, 141000],
    previous: [110000, 115000, 118000],
  },
}

export const analyticsTraffic = {
  '7d': {
    labels: ['Direct', 'Organic', 'Social', 'Referral', 'Email', 'Paid'],
    values: [28, 24, 20, 14, 9, 5],
  },
  '30d': {
    labels: ['Direct', 'Organic', 'Social', 'Referral', 'Email', 'Paid'],
    values: [25, 26, 18, 15, 10, 6],
  },
  '90d': {
    labels: ['Direct', 'Organic', 'Social', 'Referral', 'Email', 'Paid'],
    values: [22, 28, 16, 16, 11, 7],
  },
}

export const analyticsGrowth = {
  '7d': {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    newUsers: [45, 52, 48, 61, 55, 38, 42],
    returning: [120, 135, 128, 142, 138, 98, 105],
  },
  '30d': {
    labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
    newUsers: [320, 345, 368, 390],
    returning: [850, 890, 920, 960],
  },
  '90d': {
    labels: ['Jan', 'Feb', 'Mar'],
    newUsers: [1250, 1320, 1410],
    returning: [3400, 3550, 3700],
  },
}

export const topPages = [
  { page: '/dashboard', views: 45_230, bounceRate: 28.5, status: 'up' },
  { page: '/analytics', views: 32_100, bounceRate: 32.1, status: 'up' },
  { page: '/users', views: 28_450, bounceRate: 25.8, status: 'down' },
  { page: '/orders', views: 24_800, bounceRate: 30.2, status: 'up' },
  { page: '/settings', views: 18_920, bounceRate: 22.4, status: 'stable' },
  { page: '/products', views: 15_670, bounceRate: 35.6, status: 'down' },
  { page: '/reports', views: 12_340, bounceRate: 20.1, status: 'up' },
]
