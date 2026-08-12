import { useEffect, useRef } from 'react'
import { useAnimationFrame } from '@/hooks/useAnimationFrame'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const GAP = 28
const RADIUS = 120

export default function InteractiveGridExperiment() {
  const canvasRef = useRef(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const reducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
    }
    resize()
    window.addEventListener('resize', resize)
    return () => window.removeEventListener('resize', resize)
  }, [])

  useAnimationFrame(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const dpr = window.devicePixelRatio
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    for (let x = GAP; x < canvas.width / dpr; x += GAP) {
      for (let y = GAP; y < canvas.height / dpr; y += GAP) {
        const dx = x - mouse.current.x
        const dy = y - mouse.current.y
        const dist = Math.sqrt(dx * dx + dy * dy)
        const influence = Math.max(0, 1 - dist / RADIUS)
        const size = (1 + influence * 2.5) * dpr
        const offset = influence * 6

        ctx.beginPath()
        ctx.fillStyle = `rgba(244, 244, 244, ${0.12 + influence * 0.7})`
        ctx.arc(
          (x + (dx / (dist || 1)) * offset) * dpr,
          (y + (dy / (dist || 1)) * offset) * dpr,
          size,
          0,
          Math.PI * 2,
        )
        ctx.fill()
      }
    }
  }, !reducedMotion)

  return (
    <div
      className="relative h-full min-h-[22rem] cursor-none"
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
      }}
      onMouseLeave={() => {
        mouse.current = { x: -9999, y: -9999 }
      }}
    >
      <canvas ref={canvasRef} className="h-full w-full" />
    </div>
  )
}
