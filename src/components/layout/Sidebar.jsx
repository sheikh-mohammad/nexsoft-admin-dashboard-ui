import { useState } from 'react'
import {
  LayoutDashboard, BarChart3, Users, ShoppingCart, Settings,
  ChevronLeft, ChevronRight, LogOut, X
} from 'lucide-react'

const navItems = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'analytics', label: 'Analytics', icon: BarChart3 },
  { id: 'users',    label: 'Users',    icon: Users },
  { id: 'orders',   label: 'Orders',   icon: ShoppingCart },
  { id: 'settings', label: 'Settings', icon: Settings },
]

export default function Sidebar({ mobileOpen, collapsed, isDesktop, onClose, onToggleCollapse }) {
  const [activeItem, setActiveItem] = useState('dashboard')

  const sidebarClasses = `
    fixed lg:static inset-y-0 left-0 z-30 flex flex-col
    bg-[var(--color-sidebar-bg)] text-[var(--color-text-inverse)]
    transition-all duration-300 ease-in-out
    ${collapsed && isDesktop ? 'w-20' : 'w-64'}
    ${mobileOpen && !isDesktop ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
  `

  return (
    <aside className={sidebarClasses}>
      {/* Logo Section */}
      <div className={`flex items-center h-16 px-4 border-b border-white/10 ${collapsed && isDesktop ? 'justify-center' : ''}`}>
        <div className="flex items-center gap-3 min-w-0">
          <div className="w-8 h-8 rounded-lg bg-[var(--color-primary)] flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className={`font-semibold text-lg whitespace-nowrap transition-opacity duration-300 ${collapsed && isDesktop ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Nexsoft
          </span>
        </div>
        {/* Mobile close button */}
        {!isDesktop && (
          <button onClick={onClose} className="ml-auto p-1 rounded-lg hover:bg-white/10 transition-colors">
            <X size={20} />
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        {navItems.map(item => {
          const Icon = item.icon
          const isActive = activeItem === item.id
          return (
            <button
              key={item.id}
              onClick={() => setActiveItem(item.id)}
              className={`
                w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                transition-all duration-200 group relative
                ${isActive
                  ? 'bg-[var(--color-primary)] text-white shadow-lg shadow-[var(--color-primary)]/25'
                  : 'text-white/60 hover:text-white hover:bg-white/5'
                }
                ${collapsed && isDesktop ? 'justify-center px-0' : ''}
              `}
              title={collapsed && isDesktop ? item.label : undefined}
            >
              <Icon size={20} className="flex-shrink-0" />
              <span className={`whitespace-nowrap text-sm font-medium transition-opacity duration-300 ${collapsed && isDesktop ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
                {item.label}
              </span>
              {isActive && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 rounded-r-full bg-white" />
              )}
            </button>
          )
        })}
      </nav>

      {/* Bottom Section */}
      <div className={`p-3 border-t border-white/10 space-y-1 ${collapsed && isDesktop ? 'flex flex-col items-center' : ''}`}>
        {/* Collapse toggle — desktop only */}
        {isDesktop && (
          <button
            onClick={onToggleCollapse}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200"
          >
            {collapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
            <span className={`text-sm transition-opacity duration-300 ${collapsed ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
              Collapse
            </span>
          </button>
        )}
        <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-white/50 hover:text-white hover:bg-white/5 transition-all duration-200">
          <LogOut size={20} />
          <span className={`text-sm transition-opacity duration-300 ${collapsed && isDesktop ? 'opacity-0 w-0 overflow-hidden' : 'opacity-100'}`}>
            Logout
          </span>
        </button>
      </div>
    </aside>
  )
}
