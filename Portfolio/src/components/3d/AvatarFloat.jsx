import { lazy, Suspense, useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { useMediaQuery } from '@/hooks/useMediaQuery'
import { isLowPowerDevice } from '@/utils/deviceCapability'

const AvatarScene = lazy(() => import('@/three/AvatarScene'))

function StaticAvatar({ avatarSrc, accent }) {
  return (
    <div className="relative flex aspect-square w-full items-center justify-center">
      <div
        className="absolute inset-0 rounded-full opacity-50 blur-3xl"
        style={{ background: `radial-gradient(circle, ${accent}44, transparent 70%)` }}
      />
      <div className="animate-float-in-place relative w-full" style={{ animationDuration: '7s' }}>
        <img src={avatarSrc} alt="" className="h-full w-full object-contain" />
      </div>
    </div>
  )
}

/**
 * The avatar + orbit-ring 3D object filling the negative space beside the
 * hero/intro copy. Real WebGL on capable desktop devices; a static image
 * with a CSS glow on everything else, so it never becomes the reason a
 * page feels slow (same policy as Interactive3DBackground).
 */
export default function AvatarFloat({ avatarSrc, accent = '#6e56cf', className = '' }) {
  const reducedMotion = useReducedMotion()
  const isDesktop = useMediaQuery('(min-width: 768px) and (pointer: fine)')
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    setLowPower(isLowPowerDevice())
  }, [])

  const canRender3D = isDesktop && !reducedMotion && !lowPower

  return (
    <div className={`relative ${className}`} aria-hidden="true">
      {canRender3D ? (
        <Suspense fallback={<StaticAvatar avatarSrc={avatarSrc} accent={accent} />}>
          <div className="aspect-square w-full">
            <AvatarScene avatarSrc={avatarSrc} accent={accent} />
          </div>
        </Suspense>
      ) : (
        <StaticAvatar avatarSrc={avatarSrc} accent={accent} />
      )}
    </div>
  )
}
