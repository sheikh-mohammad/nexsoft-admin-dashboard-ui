import { createContext, useContext, useState, useCallback } from 'react'

const NavigationContext = createContext(undefined)

export const PAGES = {
  DASHBOARD: 'dashboard',
  ANALYTICS: 'analytics',
  USERS: 'users',
  ORDERS: 'orders',
  SETTINGS: 'settings',
  NOTIFICATIONS: 'notifications',
}

export function NavigationProvider({ children }) {
  const [currentPage, setCurrentPage] = useState(PAGES.DASHBOARD)

  const navigateTo = useCallback((page) => {
    setCurrentPage(page)
  }, [])

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, PAGES }}>
      {children}
    </NavigationContext.Provider>
  )
}

export function useNavigation() {
  const ctx = useContext(NavigationContext)
  if (ctx === undefined) {
    throw new Error('useNavigation must be used within a NavigationProvider')
  }
  return ctx
}
