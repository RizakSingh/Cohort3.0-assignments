import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Runs `callback` inside a scoped gsap.context() bound to `scope.current`.
 * All tweens/ScrollTriggers created inside are automatically reverted on unmount
 * or when a dependency changes — prevents leaked ScrollTrigger instances across routes.
 */
export function useGsap(callback, deps = []) {
  const scope = useRef(null)

  useEffect(() => {
    if (!scope.current) return
    const ctx = gsap.context(callback, scope)
    return () => ctx.revert()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return scope
}
