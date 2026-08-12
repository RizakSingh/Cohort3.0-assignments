import { forwardRef, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * The full-screen sweep panel used for route transitions (spec §30).
 * Purely visual — App.jsx drives its GSAP timeline via animations/transitions.js
 * and swaps the displayed route while it's at full coverage.
 *
 * The hidden position MUST be set via gsap.set, not a raw inline `style`
 * transform: GSAP keeps its own internal cache of an element's transform
 * components, and if the very first value it sees comes from React's plain
 * `style` string instead of gsap.set, that cache starts out inconsistent
 * with the DOM — the later `coverOut` tween can then resolve to the wrong
 * position and leave the panel stuck covering the page.
 */
const PageTransition = forwardRef(function PageTransition(_, forwardedRef) {
  const localRef = useRef(null)

  useLayoutEffect(() => {
    gsap.set(localRef.current, { yPercent: 100 })
  }, [])

  return (
    <div
      ref={(el) => {
        localRef.current = el
        if (typeof forwardedRef === 'function') forwardedRef(el)
        else if (forwardedRef) forwardedRef.current = el
      }}
      className="pointer-events-none fixed inset-0 z-[200] flex flex-col items-center justify-center gap-4 bg-bg"
      aria-hidden="true"
    >
      <span className="font-display text-xs uppercase tracking-[0.3em] text-muted">
        Rizakdeep Singh
      </span>
      <span className="flex items-center gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="h-1.5 w-1.5 rounded-full bg-accent"
            style={{ animation: `pulseDot 1.1s ease-in-out ${i * 0.15}s infinite` }}
          />
        ))}
      </span>
    </div>
  )
})

export default PageTransition
