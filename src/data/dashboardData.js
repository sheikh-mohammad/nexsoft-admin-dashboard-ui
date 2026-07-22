export const statCards = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '$48,250',
    change: 12.5,
    changeType: 'increase',
    icon: 'DollarSign',
  },
  {
    id: 2,
    title: 'Active Users',
    value: '2,847',
    change: 8.2,
    changeType: 'increase',
    icon: 'Users',
  },
  {
    id: 3,
    title: 'Orders',
    value: '1,423',
    change: -3.1,
    changeType: 'decrease',
    icon: 'ShoppingCart',
  },
  {
    id: 4,
    title: 'Conversion Rate',
    value: '3.24%',
    change: 1.8,
    changeType: 'increase',
    icon: 'TrendingUp',
  },
]

export const revenueData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  currentYear: [18, 25, 22, 30, 28, 35, 32, 40, 38, 45, 42, 48],
  previousYear: [15, 20, 18, 24, 22, 28, 26, 32, 30, 36, 34, 38],
}

export const categoryData = {
  labels: ['Electronics', 'Clothing', 'Home & Garden', 'Books', 'Sports', 'Other'],
  values: [35, 25, 18, 12, 7, 3],
  colors: ['#6B0F1A', '#8B1A2B', '#A52A3A', '#C04050', '#D46070', '#E8D5D0'],
}

export const trafficSources = {
  labels: ['Direct', 'Organic Search', 'Social Media', 'Referral', 'Email', 'Paid Ads'],
  values: [28, 24, 20, 14, 9, 5],
}
