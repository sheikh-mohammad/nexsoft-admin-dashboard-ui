import { useState } from 'react'
import { Menu, Search, Bell, Moon, Sun } from 'lucide-react'
import { useTheme } from '../../context/ThemeContext'

export default function Header({ onMenuClick }) {
  const { theme, toggleTheme } = useTheme()
  const [searchFocused, setSearchFocused] = useState(false)

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
        <h1 className="text-lg font-semibold text-[var(--color-text)]">Dashboard</h1>
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
        <button className="relative p-2 rounded-lg hover:bg-[var(--color-primary-bg)] text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors" aria-label="Notifications">
          <Bell size={20} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[var(--color-error)] rounded-full animate-pulseGlow" />
        </button>

        {/* Avatar */}
        <div className="w-8 h-8 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-sm font-medium flex-shrink-0 ml-1">
          AD
        </div>
      </div>
    </header>
  )
}
