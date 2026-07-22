import { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import { NavigationProvider, useNavigation, PAGES } from '../../context/NavigationContext'
import Dashboard from '../../pages/Dashboard'
import Analytics from '../../pages/Analytics'
import Users from '../../pages/Users'
import Orders from '../../pages/Orders'
import Settings from '../../pages/Settings'

const pageComponents = {
  [PAGES.DASHBOARD]: Dashboard,
  [PAGES.ANALYTICS]: Analytics,
  [PAGES.USERS]: Users,
  [PAGES.ORDERS]: Orders,
  [PAGES.SETTINGS]: Settings,
}

const pageTitles = {
  [PAGES.DASHBOARD]: 'Dashboard',
  [PAGES.ANALYTICS]: 'Analytics',
  [PAGES.USERS]: 'Users',
  [PAGES.ORDERS]: 'Orders',
  [PAGES.SETTINGS]: 'Settings',
}

function LayoutContent() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const { currentPage } = useNavigation()

  const PageComponent = pageComponents[currentPage] || Dashboard

  useEffect(() => {
    if (isDesktop) setMobileOpen(false)
  }, [isDesktop])

  useEffect(() => {
    if (mobileOpen && !isDesktop) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, isDesktop])

  const handleKeyDown = useCallback((e) => {
    if (e.key === 'Escape') setMobileOpen(false)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.addEventListener('keydown', handleKeyDown)
      return () => document.removeEventListener('keydown', handleKeyDown)
    }
  }, [mobileOpen, handleKeyDown])

  return (
    <div className="flex h-screen overflow-hidden bg-[var(--color-bg)] transition-theme">
      <Sidebar
        mobileOpen={mobileOpen}
        collapsed={collapsed}
        isDesktop={isDesktop}
        onClose={() => setMobileOpen(false)}
        onToggleCollapse={() => setCollapsed(c => !c)}
      />

      {mobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/50 z-20 animate-fadeIn lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      <div className="flex flex-col flex-1 min-w-0">
        <Header
          onMenuClick={() => setMobileOpen(true)}
          pageTitle={pageTitles[currentPage]}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <PageComponent />
        </main>
      </div>
    </div>
  )
}

export default function Layout() {
  return (
    <NavigationProvider>
      <LayoutContent />
    </NavigationProvider>
  )
}
