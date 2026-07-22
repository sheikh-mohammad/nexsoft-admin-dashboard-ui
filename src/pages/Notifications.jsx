import { useState, useEffect } from 'react'
import { CheckCircle, AlertTriangle, Info, X, CheckCheck, Bell } from 'lucide-react'
import { notifications as allNotifications, notificationTypes } from '../data/notificationsData'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import Skeleton from '../components/ui/Skeleton'
import EmptyState from '../components/ui/EmptyState'

const iconMap = {
  success: CheckCircle,
  warning: AlertTriangle,
  info: Info,
  error: AlertTriangle,
}

const iconColorMap = {
  success: 'text-[var(--color-success)]',
  warning: 'text-[var(--color-warning)]',
  info: 'text-[var(--color-primary)]',
  error: 'text-[var(--color-error)]',
}

export default function Notifications() {
  const [loading, setLoading] = useState(true)
  const [activeType, setActiveType] = useState('all')
  const [notifications, setNotifications] = useState([])

  useEffect(() => {
    setLoading(true)
    const timer = setTimeout(() => {
      setNotifications(allNotifications)
      setLoading(false)
    }, 600)
    return () => clearTimeout(timer)
  }, [])

  const filtered = activeType === 'all'
    ? notifications
    : notifications.filter(n => n.type === activeType)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    )
  }

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })))
  }

  const clearAll = () => {
    setNotifications([])
  }

  return (
    <div className="space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-[var(--color-text)]">Notifications</h2>
          <p className="text-sm text-[var(--color-text-muted)] mt-1">
            {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
          </p>
        </div>
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg bg-[var(--color-primary-bg)] text-[var(--color-primary)] hover:bg-[var(--color-primary)] hover:text-white transition-all duration-200"
            >
              <CheckCheck size={16} />
              Mark all read
            </button>
          )}
          {notifications.length > 0 && (
            <button
              onClick={clearAll}
              className="flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg text-[var(--color-text-muted)] hover:bg-[var(--color-error-bg)] hover:text-[var(--color-error)] transition-all duration-200"
            >
              <X size={16} />
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex flex-wrap gap-2">
        {notificationTypes.map(type => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`px-3 py-1.5 rounded-lg text-sm font-medium capitalize transition-all duration-200 ${
              activeType === type
                ? 'bg-[var(--color-primary)] text-white shadow-sm'
                : 'bg-[var(--color-bg-secondary)] text-[var(--color-text-muted)] hover:text-[var(--color-text)] hover:bg-[var(--color-border)]'
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Loading State */}
      {loading && (
        <div className="space-y-3">
          {[1, 2, 3, 4].map(i => (
            <Card key={i} className="p-4">
              <div className="flex items-start gap-3">
                <Skeleton width={36} height={36} borderRadius="50%" />
                <div className="flex-1 space-y-2">
                  <Skeleton width="60%" height={16} />
                  <Skeleton width="85%" height={12} />
                  <Skeleton width="20%" height={10} />
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {/* Empty State */}
      {!loading && filtered.length === 0 && (
        <Card className="p-6">
          <EmptyState
            icon={Bell}
            title={notifications.length === 0 ? "You're all caught up!" : 'No notifications'}
            message={
              notifications.length === 0
                ? 'You have no notifications at the moment. New notifications will appear here.'
                : `No ${activeType === 'all' ? '' : activeType} notifications found.`
            }
          />
        </Card>
      )}

      {/* Notification List */}
      {!loading && filtered.length > 0 && (
        <div className="space-y-3">
          {filtered.map((n, i) => {
            const Icon = iconMap[n.type] || Info
            return (
              <Card
                key={n.id}
                className={`p-4 animate-fadeInUp transition-all duration-200 ${
                  !n.read ? 'ring-1 ring-[var(--color-primary)]/20' : ''
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <div className="flex items-start gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
                    !n.read ? 'bg-[var(--color-primary-bg)]' : 'bg-[var(--color-bg-secondary)]'
                  }`}>
                    <Icon size={18} className={iconColorMap[n.type] || 'text-[var(--color-text-muted)]'} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <p className={`text-sm ${!n.read ? 'font-semibold' : 'font-medium'} text-[var(--color-text)]`}>
                        {n.title}
                      </p>
                      <div className="flex items-center gap-2 flex-shrink-0">
                        <span className="text-xs text-[var(--color-text-muted)] whitespace-nowrap">{n.time}</span>
                        {!n.read && (
                          <button
                            onClick={() => markAsRead(n.id)}
                            className="p-1 rounded hover:bg-[var(--color-primary-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
                            title="Mark as read"
                          >
                            <CheckCheck size={14} />
                          </button>
                        )}
                      </div>
                    </div>
                    <p className="text-xs text-[var(--color-text-muted)] mt-0.5">{n.message}</p>
                  </div>
                  {!n.read && (
                    <div className="w-2 h-2 rounded-full bg-[var(--color-primary)] flex-shrink-0 mt-2" />
                  )}
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
