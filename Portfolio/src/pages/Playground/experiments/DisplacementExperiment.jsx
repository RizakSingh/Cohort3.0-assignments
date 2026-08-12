import { useRef } from 'react'
import { useAnimationFrame } from '@/hooks/useAnimationFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const TEXT = 'DISPLACE ME'
const RADIUS = 90
const STRENGTH = 26
const NBSP = String.fromCharCode(160)

export default function DisplacementExperiment() {
  const containerRef = useRef(null)
  const letterRefs = useRef([])
  const mouse = useRef({ x: -9999, y: -9999 })
  const reducedMotion = useReducedMotion()

  useAnimationFrame(() => {
    const container = containerRef.current
    if (!container) return
    const bounds = container.getBoundingClientRect()

    letterRefs.current.forEach((el) => {
      if (!el) return
      const r = el.getBoundingClientRect()
      const cx = r.left + r.width / 2 - bounds.left
      const cy = r.top + r.height / 2 - bounds.top
      const dx = cx - mouse.current.x
      const dy = cy - mouse.current.y
      const dist = Math.sqrt(dx * dx + dy * dy)
      const influence = Math.max(0, 1 - dist / RADIUS)
      const tx = (dx / (dist || 1)) * influence * STRENGTH
      const ty = (dy / (dist || 1)) * influence * STRENGTH
      el.style.transform = `translate(${tx}px, ${ty}px)`
    })
  }, !reducedMotion)

  return (
    <div
      ref={containerRef}
      className="flex h-full min-h-[22rem] items-center justify-center"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }}
      onMouseLeave={() => {
        mouse.current = { x: -9999, y: -9999 }
      }}
    >
      <h3 className="flex flex-wrap justify-center font-display text-4xl font-semibold uppercase tracking-tight text-text md:text-6xl">
        {TEXT.split('').map((char, i) => (
          <span
            key={i}
            ref={(el) => {
              letterRefs.current[i] = el
            }}
            className="inline-block transition-transform duration-150 ease-out"
            style={{ willChange: 'transform' }}
          >
            {char === ' ' ? NBSP : char}
          </span>
        ))}
      </h3>
    </div>
  )
}
