import { useState, useRef, useCallback } from 'react'
import { Menu, Search, Bell, Moon, Sun, X, CheckCircle, AlertTriangle, Info, User, Settings, LogOut } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'
import { useNavigation, PAGES } from '../../context/NavigationContext'
import useClickOutside from '../../hooks/useClickOutside'
import { notifications as notificationData } from '../../data/notificationsData'

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

export default function Header({ onMenuClick, pageTitle = 'Dashboard' }) {
  const { theme, toggleTheme } = useTheme()
  const { navigateTo } = useNavigation()
  const [searchFocused, setSearchFocused] = useState(false)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)

  const notifRef = useRef(null)
  const notifBtnRef = useRef(null)
  const profileRef = useRef(null)
  const profileBtnRef = useRef(null)

  useClickOutside([notifRef, notifBtnRef], () => setNotificationsOpen(false), notificationsOpen)
  useClickOutside([profileRef, profileBtnRef], () => setProfileOpen(false), profileOpen)

  const toggleNotifications = useCallback(() => {
    setNotificationsOpen(prev => !prev)
    setProfileOpen(false)
  }, [])

  const toggleProfile = useCallback(() => {
    setProfileOpen(prev => !prev)
    setNotificationsOpen(false)
  }, [])

  return (
    <header className="h-16 bg-[var(--color-surface)] border-b border-[var(--color-border)] flex items-center justify-between px-4 md:px-6 sticky top-0 z-20 transition-theme">
      {/* Left: Hamburger + Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-[var(--color-primary-bg)] text-[var(--color-text)] transition-colors"
          aria-label="Toggle menu"
        >
          <Menu size={20} />
        </button>
        <h1 className="text-lg font-semibold text-[var(--color-text)]">{pageTitle}</h1>
      </div>

      {/* Right: Search + Theme + Notifications + Avatar */}
      <div className="flex items-center gap-2 md:gap-3">
        {/* Search */}
        <div className={`
          hidden md:flex items-center gap-2 px-3 py-2 rounded-lg
          transition-all duration-200
          ${searchFocused
            ? 'bg-[var(--color-primary-bg)] ring-1 ring-[var(--color-primary)]'
            : 'bg-[var(--color-bg-secondary)]'
          }
        `}>
          <Search size={16} className="text-[var(--color-text-muted)]" />
          <input
            type="text"
            placeholder="Search..."
            onFocus={() => setSearchFocused(true)}
            onBlur={() => setSearchFocused(false)}
            className="bg-transparent border-none outline-none text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] w-32 lg:w-48"
          />
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-lg hover:bg-[var(--color-primary-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-all duration-300"
          aria-label="Toggle theme"
        >
          <div className="transition-transform duration-300 rotate-0 dark:-rotate-180">
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </div>
        </button>

        {/* Notifications */}
        <div className="relative">
          <button
            ref={notifBtnRef}
            onClick={toggleNotifications}
            className="relative p-2 rounded-lg hover:bg-[var(--color-primary-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
            aria-label="Notifications"
          >
            <Bell size={20} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-error)] rounded-full animate-pulseGlow" />
          </button>

          {/* Notification Dropdown */}
          {notificationsOpen && (
            <div
              ref={notifRef}
              className="absolute top-full right-0 mt-2 w-80 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] animate-slideDown z-50"
            >
              <div className="flex items-center justify-between px-4 py-3 border-b border-[var(--color-border)]">
                <span className="text-sm font-semibold text-[var(--color-text)]">Notifications</span>
                <button
                  onClick={() => setNotificationsOpen(false)}
                  className="p-1 rounded-lg hover:bg-[var(--color-primary-bg)] text-[var(--color-text-muted)] transition-colors"
                >
                  <X size={14} />
                </button>
              </div>
              <div className="max-h-72 overflow-y-auto">
                {notificationData.slice(0, 4).map(n => {
                  const Icon = iconMap[n.type] || Info
                  return (
                    <button
                      key={n.id}
                      className="w-full flex items-start gap-3 px-4 py-3 hover:bg-[var(--color-bg-secondary)] transition-colors text-left"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      <Icon size={18} className={`mt-0.5 flex-shrink-0 ${iconColorMap[n.type] || 'text-[var(--color-text-muted)]'}`} />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-[var(--color-text)]">{n.title}</p>
                        <p className="text-xs text-[var(--color-text-muted)] mt-0.5 truncate">{n.message}</p>
                      </div>
                      <span className="text-xs text-[var(--color-text-muted)] flex-shrink-0">{n.time}</span>
                    </button>
                  )
                })}
              </div>
              <div className="border-t border-[var(--color-border)] p-2">
                <button
                  className="w-full py-2 text-sm text-center text-[var(--color-primary)] hover:bg-[var(--color-primary-bg)] rounded-lg transition-colors"
                  onClick={() => {
                    setNotificationsOpen(false)
                    navigateTo(PAGES.NOTIFICATIONS)
                  }}
                >
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Profile */}
        <div className="relative">
          <button
            ref={profileBtnRef}
            onClick={toggleProfile}
            className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-medium flex-shrink-0 ml-1 cursor-pointer hover:opacity-90 transition-opacity"
            aria-label="Profile"
          >
            AD
          </button>

          {/* Profile Dropdown */}
          {profileOpen && (
            <div
              ref={profileRef}
              className="absolute top-full right-0 mt-2 w-56 rounded-xl bg-[var(--color-surface)] border border-[var(--color-border)] shadow-[var(--shadow-lg)] animate-slideDown z-50"
            >
              <div className="px-4 py-3 border-b border-[var(--color-border)]">
                <p className="text-sm font-medium text-[var(--color-text)]">Admin User</p>
                <p className="text-xs text-[var(--color-text-muted)]">admin@nexsoft.com</p>
              </div>
              <div className="py-1">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                  onClick={() => {
                    setProfileOpen(false)
                    navigateTo(PAGES.SETTINGS)
                  }}
                >
                  <User size={16} className="text-[var(--color-text-muted)]" />
                  Profile
                </button>
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg-secondary)] transition-colors"
                  onClick={() => {
                    setProfileOpen(false)
                    navigateTo(PAGES.SETTINGS)
                  }}
                >
                  <Settings size={16} className="text-[var(--color-text-muted)]" />
                  Settings
                </button>
              </div>
              <div className="border-t border-[var(--color-border)] py-1">
                <button
                  className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-error)] hover:bg-[var(--color-error-bg)] transition-colors"
                  onClick={() => setProfileOpen(false)}
                >
                  <LogOut size={16} />
                  Logout
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}
