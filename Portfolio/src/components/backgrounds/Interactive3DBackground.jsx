import { lazy, Suspense, useEffect, useRef, useState } from 'react'
import { useMousePosition } from '@/hooks/useMousePosition'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { isLowPowerDevice } from '@/utils/deviceCapability'
import FallbackGrid from './FallbackGrid'

const Scene = lazy(() => import('@/three/Scene'))

/**
 * The living 3D digital environment behind every page (spec §3/§4).
 * Mounts the full R3F scene only on capable, motion-OK devices; everything
 * else gets the static CSS grid so the site stays fast and accessible —
 * the background must never be the reason a page feels slow to open.
 */
export default function Interactive3DBackground({ accent = '#6e56cf' }) {
  const mouse = useMousePosition()
  const scrollProgress = useRef(0)
  const reducedMotion = useReducedMotion()
  const isWideEnough = useMediaQuery('(min-width: 768px)')
  const isDesktopWidth = useMediaQuery('(min-width: 1280px)')
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    setLowPower(isLowPowerDevice())
  }, [])

  const canRender3D = isWideEnough && !reducedMotion && !lowPower

  useEffect(() => {
    if (!canRender3D) return
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      scrollProgress.current = max > 0 ? window.scrollY / max : 0
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [canRender3D])

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      {canRender3D ? (
        <Suspense fallback={<FallbackGrid accent={accent} />}>
          <Scene
            mouse={mouse}
            scrollProgress={scrollProgress}
            accent={accent}
            quality={isDesktopWidth ? 'high' : 'low'}
          />
        </Suspense>
      ) : (
        <FallbackGrid accent={accent} />
      )}
    </div>
  )
}
