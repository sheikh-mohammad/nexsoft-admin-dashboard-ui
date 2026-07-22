import { useState, useEffect, useCallback } from 'react'
import Sidebar from './Sidebar'
import Header from './Header'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export default function Layout({ children }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [collapsed, setCollapsed] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  // Close mobile sidebar when window resizes to desktop
  useEffect(() => {
    if (isDesktop) setMobileOpen(false)
  }, [isDesktop])

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (mobileOpen && !isDesktop) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen, isDesktop])

  // Close mobile sidebar on Escape key
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

      {/* Backdrop — mobile overlay */}
      {mobileOpen && !isDesktop && (
        <div
          className="fixed inset-0 bg-black/50 z-20 animate-fadeIn lg:hidden"
          onClick={() => setMobileOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className="flex flex-col flex-1 min-w-0">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  )
}
