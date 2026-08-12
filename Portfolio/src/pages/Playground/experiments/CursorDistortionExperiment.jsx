import { useEffect, useRef } from 'react'
import { useAnimationFrame } from '@/hooks/useAnimationFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'

export default function CursorDistortionExperiment() {
  const canvasRef = useRef(null)
  const target = useRef({ x: 0, y: 0 })
  const trail = useRef([])
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
      target.current = { x: canvas.width / 2, y: canvas.height / 2 }
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useAnimationFrame(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    trail.current.unshift({ ...target.current })
    if (trail.current.length > 16) trail.current.pop()

    ctx.fillStyle = 'rgba(7, 7, 7, 0.22)'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    trail.current.forEach((p, i) => {
      const t = 1 - i / trail.current.length
      const radius = t * 46 * window.devicePixelRatio
      const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, radius)
      gradient.addColorStop(0, `rgba(110, 86, 207, ${t * 0.5})`)
      gradient.addColorStop(1, 'rgba(110, 86, 207, 0)')
      ctx.fillStyle = gradient
      ctx.beginPath()
      ctx.arc(p.x, p.y, radius, 0, Math.PI * 2)
      ctx.fill()
    })
  }, !reducedMotion)

  return (
    <div
      className="relative h-full min-h-[22rem] cursor-none overflow-hidden"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        const dpr = window.devicePixelRatio
        target.current = { x: (e.clientX - rect.left) * dpr, y: (e.clientY - rect.top) * dpr }
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center font-display text-xs uppercase tracking-[0.2em] text-muted/60">
        Move your cursor
      </div>
    </div>
  )
}
