import { useEffect } from 'react'

/**
 * Calls `handler` when a click/touch event occurs outside of `ref.current`.
 * Also closes on Escape key press.
 * Supports multiple refs via array parameter.
 *
 * @param {import('react').RefObject|import('react').RefObject[]} refOrRefs
 * @param {() => void} handler
 * @param {boolean} [enabled=true] - Conditionally enable the listener
 */
export default function useClickOutside(refOrRefs, handler, enabled = true) {
  useEffect(() => {
    if (!enabled) return

    const refs = Array.isArray(refOrRefs) ? refOrRefs : [refOrRefs]

    const handleClick = (e) => {
      const isOutside = refs.every(ref => {
        return !ref.current || !ref.current.contains(e.target)
      })
      if (isOutside) handler()
    }

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') handler()
    }

    document.addEventListener('mousedown', handleClick, true)
    document.addEventListener('touchstart', handleClick, true)
    document.addEventListener('keydown', handleKeyDown)

    return () => {
      document.removeEventListener('mousedown', handleClick, true)
      document.removeEventListener('touchstart', handleClick, true)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [refOrRefs, handler, enabled])
}
