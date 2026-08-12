import { useEffect, useMemo, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import CarouselCard from './CarouselCard'

const AUTO_ROTATE_SPEED = 4 // degrees / second
const IDLE_RESUME_DELAY = 2200 // ms after interaction before auto-rotate resumes
const DRAG_SENSITIVITY = 0.32 // degrees per pixel of drag
const FLING_FACTOR = 55 // how much release velocity extends the snap target

/**
 * Projects arranged around the rim of a 3D cylinder — drag/swipe to rotate
 * which one faces the viewer, click any card to open its case study.
 * Built with CSS 3D transforms rather than WebGL: the cards are real,
 * interactive DOM (images, text, hover, cursor states), which fights badly
 * with pushing HTML into a Three.js scene — CSS `transform-style: preserve-3d`
 * gives the same cylinder illusion with none of that friction.
 */
export default function ProjectCarousel({ projects }) {
  const navigate = useNavigate()
  const reducedMotion = useReducedMotion()
  const isCompact = useMediaQuery('(max-width: 767px)')

  const perspectiveRef = useRef(null)
  const stageRef = useRef(null)
  const appearanceRefs = useRef([])
  const rotation = useRef({ value: 0 })
  const drag = useRef({ active: false, startX: 0, startRotation: 0, lastX: 0, lastT: 0, velocity: 0 })
  const idleTimer = useRef(null)
  const autoRotateEnabled = useRef(!reducedMotion)
  const [activeIndex, setActiveIndex] = useState(0)

  const count = projects.length
  const angleStep = 360 / count
  const cardWidth = isCompact ? 240 : 340
  const radius = Math.round(cardWidth / 2 / Math.tan(Math.PI / count) + 90)
  const stageHeight = isCompact ? 480 : 620

  const positions = useMemo(() => projects.map((_, i) => i * angleStep), [projects, angleStep])

  const applyAppearance = (rot) => {
    positions.forEach((cardAngle, i) => {
      const el = appearanceRefs.current[i]
      if (!el) return
      let effective = (cardAngle + rot) % 360
      if (effective > 180) effective -= 360
      if (effective < -180) effective += 360
      const distance = Math.abs(effective)
      // Steep falloff: the front card reads fully solid, neighbors dim
      // quickly, and anything past ~100° is effectively gone rather than a
      // washed-out, half-see-through ring of cards.
      const opacity = distance < 18 ? 1 : Math.max(0, 1 - (distance - 18) / 85)
      const scale = Math.max(0.72, 1 - distance / 280)
      el.style.opacity = String(opacity)
      el.style.transform = `scale(${scale})`
      el.style.zIndex = String(Math.round(1000 - distance))
    })
  }

  const applyRotation = (rot) => {
    rotation.current.value = rot
    if (stageRef.current) stageRef.current.style.transform = `rotateY(${rot}deg)`
    applyAppearance(rot)
  }

  const snapTo = (target) => {
    gsap.killTweensOf(rotation.current)
    gsap.to(rotation.current, {
      value: target,
      duration: 0.75,
      ease: 'power3.out',
      onUpdate: () => applyRotation(rotation.current.value),
    })
    const idx = (((-target / angleStep) % count) + count) % count
    setActiveIndex(Math.round(idx))
  }

  const goToNearest = (extraVelocity = 0) => {
    snapTo(Math.round((rotation.current.value + extraVelocity) / angleStep) * angleStep)
  }

  const scheduleIdleResume = () => {
    if (reducedMotion) return
    clearTimeout(idleTimer.current)
    autoRotateEnabled.current = false
    idleTimer.current = setTimeout(() => {
      autoRotateEnabled.current = true
    }, IDLE_RESUME_DELAY)
  }

  useEffect(() => {
    applyRotation(rotation.current.value)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, isCompact])

  useEffect(() => {
    if (reducedMotion) return
    let raf
    let last = performance.now()
    const tick = (now) => {
      const delta = (now - last) / 1000
      last = now
      if (autoRotateEnabled.current && !drag.current.active) {
        applyRotation(rotation.current.value + AUTO_ROTATE_SPEED * delta)
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [reducedMotion])

  const onPointerDown = (e) => {
    gsap.killTweensOf(rotation.current)
    drag.current = {
      active: true,
      startX: e.clientX,
      startRotation: rotation.current.value,
      lastX: e.clientX,
      lastT: performance.now(),
      velocity: 0,
    }
    scheduleIdleResume()
  }

  const onPointerMove = (e) => {
    if (!drag.current.active) return
    const dx = e.clientX - drag.current.startX

    // Capture is deferred until real movement is confirmed, not set on
    // pointerdown itself — capturing immediately redirects the eventual
    // pointerup (and the click derived from it) to this container instead
    // of whatever card button is under the cursor, silently swallowing
    // every click. A plain tap never captures, so it hits the button normally.
    if (!drag.current.captured && Math.abs(dx) > 3) {
      drag.current.captured = true
      perspectiveRef.current?.setPointerCapture?.(e.pointerId)
    }

    const now = performance.now()
    const dt = Math.max(1, now - drag.current.lastT)
    drag.current.velocity = ((e.clientX - drag.current.lastX) / dt) * 16 // px per ~frame
    drag.current.lastX = e.clientX
    drag.current.lastT = now

    applyRotation(drag.current.startRotation + dx * DRAG_SENSITIVITY)
  }

  const endDrag = () => {
    if (!drag.current.active) return
    drag.current.active = false
    const flingDeg = drag.current.velocity * DRAG_SENSITIVITY * FLING_FACTOR
    goToNearest(flingDeg)
    scheduleIdleResume()
  }

  // Native click semantics already distinguish a tap from a drag (a `click`
  // only fires when pointerup lands near pointerdown) — every card just
  // navigates straight to its case study, active or not.
  const handleCardClick = (project) => {
    navigate(`/work/${project.slug}`)
  }

  const step = (dir) => {
    scheduleIdleResume()
    const currentIndex = Math.round(rotation.current.value / angleStep)
    snapTo((currentIndex + dir) * angleStep)
  }

  return (
    <div className="relative">
      <div
        ref={perspectiveRef}
        className="relative mx-auto touch-pan-y select-none"
        style={{ perspective: '1400px', height: stageHeight }}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onPointerCancel={endDrag}
      >
        <div
          ref={stageRef}
          className="absolute left-1/2 top-1/2"
          style={{ transformStyle: 'preserve-3d', willChange: 'transform' }}
        >
          {projects.map((project, i) => (
            <div
              key={project.slug}
              className="absolute left-0 top-0"
              style={{
                transform: `rotateY(${positions[i]}deg) translateZ(${radius}px) translate(-50%, -50%)`,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
              }}
            >
              <div
                ref={(el) => {
                  appearanceRefs.current[i] = el
                }}
                style={{ willChange: 'transform, opacity' }}
              >
                <CarouselCard project={project} width={cardWidth} onClick={() => handleCardClick(project)} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 flex items-center justify-center gap-6">
        <button
          type="button"
          data-cursor="click"
          onClick={() => step(-1)}
          aria-label="Previous project"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-accent"
        >
          <ArrowLeft size={18} />
        </button>

        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">
          {String(activeIndex + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
        </span>

        <button
          type="button"
          data-cursor="click"
          onClick={() => step(1)}
          aria-label="Next project"
          className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-text transition-colors hover:border-accent"
        >
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  )
}
