export const notifications = [
  { id: 1, type: 'success', title: 'Order completed', message: 'Order ORD-005 has been delivered successfully.', time: '2 min ago', read: false },
  { id: 2, type: 'warning', title: 'Low inventory alert', message: '"Wireless Headphones" stock is down to 3 units.', time: '15 min ago', read: false },
  { id: 3, type: 'info', title: 'New user registered', message: 'Sarah Connor has created an account.', time: '1 hour ago', read: false },
  { id: 4, type: 'error', title: 'Payment failed', message: 'Transaction for ORD-012 was declined by the bank.', time: '2 hours ago', read: false },
  { id: 5, type: 'success', title: 'Report generated', message: 'Monthly sales report for June is ready to download.', time: '3 hours ago', read: true },
  { id: 6, type: 'warning', title: 'Server warning', message: 'CPU usage on main server exceeded 85%.', time: '5 hours ago', read: true },
  { id: 7, type: 'info', title: 'Backup completed', message: 'Daily database backup completed successfully (2.4 GB).', time: '8 hours ago', read: true },
  { id: 8, type: 'success', title: 'User verified', message: 'Henry Taylor has completed email verification.', time: '1 day ago', read: true },
  { id: 9, type: 'error', title: 'Failed deployment', message: 'Production deployment v2.4.1 failed on staging checks.', time: '1 day ago', read: false },
  { id: 10, type: 'info', title: 'Scheduled maintenance', message: 'Server maintenance is scheduled for Jul 25, 02:00-04:00 UTC.', time: '2 days ago', read: true },
  { id: 11, type: 'success', title: 'Subscription renewed', message: 'Enterprise plan for Nexsoft has been renewed.', time: '2 days ago', read: true },
  { id: 12, type: 'warning', title: 'SSL certificate expiring', message: 'SSL certificate for api.nexsoft.com expires in 14 days.', time: '3 days ago', read: true },
]

export const notificationTypes = ['all', 'success', 'warning', 'info', 'error']
