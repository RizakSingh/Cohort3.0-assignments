import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const LABELS = {
  view: 'VIEW',
  project: 'VIEW',
  explore: 'EXPLORE',
  image: 'EXPLORE',
  click: 'CLICK',
  mail: 'MAIL',
  drag: 'DRAG',
}

export default function CustomCursor() {
  const isDesktop = useMediaQuery('(pointer: fine) and (min-width: 1024px)')
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const [variant, setVariant] = useState(null)

  useEffect(() => {
    if (!isDesktop) return

    document.documentElement.classList.add('has-custom-cursor')

    const setDot = gsap.quickTo(dotRef.current, 'x', { duration: 0.12, ease: 'power3.out' })
    const setDotY = gsap.quickTo(dotRef.current, 'y', { duration: 0.12, ease: 'power3.out' })
    const setRing = gsap.quickTo(ringRef.current, 'x', { duration: 0.4, ease: 'power3.out' })
    const setRingY = gsap.quickTo(ringRef.current, 'y', { duration: 0.4, ease: 'power3.out' })

    const onMove = (e) => {
      setDot(e.clientX)
      setDotY(e.clientY)
      setRing(e.clientX)
      setRingY(e.clientY)
    }

    const onOver = (e) => {
      const target = e.target.closest?.('[data-cursor]')
      setVariant(target ? target.getAttribute('data-cursor') : null)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)

    return () => {
      document.documentElement.classList.remove('has-custom-cursor')
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
    }
  }, [isDesktop])

  if (!isDesktop) return null

  const label = variant ? LABELS[variant] : null
  const isBig = Boolean(label)

  return (
    <div className="pointer-events-none fixed inset-0 z-[999]" aria-hidden="true">
      <div
        ref={dotRef}
        className="fixed left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-text"
        style={{ willChange: 'transform' }}
      />
      <div
        ref={ringRef}
        className="fixed left-0 top-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-text/40 transition-[width,height,background-color,border-color] duration-300 ease-out"
        style={{
          width: isBig ? 84 : 34,
          height: isBig ? 84 : 34,
          willChange: 'transform',
          backgroundColor: isBig ? 'rgba(110,86,207,0.15)' : 'transparent',
          borderColor: isBig ? 'rgba(110,86,207,0.6)' : 'rgba(244,244,244,0.35)',
        }}
      >
        {label && (
          <span className="font-display text-[10px] font-semibold tracking-[0.12em] text-text">
            {label}
          </span>
        )}
      </div>
    </div>
  )
}
