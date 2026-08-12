import { useEffect, useRef } from 'react'
import gsap from 'gsap'

/**
 * Short cinematic splash (spec §11): mark appears, drifts toward the navbar's
 * logo position, the panel lifts away. Capped well under 2s so it never
 * feels like a loading screen rather than an entrance.
 */
export default function LoadingScreen({ onComplete }) {
  const panelRef = useRef(null)
  const markRef = useRef(null)
  // Always call the latest onComplete without putting it in the effect's
  // deps — App.jsx passes a fresh inline function on every render (e.g.
  // when LenisProvider's setup causes a re-render right after mount), and
  // depending on it directly would kill and restart this timeline from
  // scratch each time, which cascades into every reveal animation on the
  // page never settling.
  const onCompleteRef = useRef(onComplete)
  onCompleteRef.current = onComplete

  useEffect(() => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches
    const navX = isTouch ? -window.innerWidth / 2 + 48 : -window.innerWidth / 2 + 56
    const navY = -window.innerHeight / 2 + (isTouch ? 40 : 48)

    const tl = gsap.timeline({
      defaults: { ease: 'power3.inOut' },
      onComplete: () => onCompleteRef.current?.(),
    })

    tl.fromTo(markRef.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.45 })
      .to(markRef.current, {}, '+=0.25')
      .to(markRef.current, {
        x: navX,
        y: navY,
        scale: 0.34,
        duration: 0.6,
        ease: 'power4.inOut',
      })
      .to(
        panelRef.current,
        { yPercent: -100, duration: 0.65, ease: 'power4.inOut' },
        '-=0.35',
      )

    return () => tl.kill()
  }, [])

  return (
    <div ref={panelRef} className="fixed inset-0 z-[300] flex items-center justify-center bg-bg">
      <div ref={markRef} className="font-display text-6xl font-semibold text-text">
        R<span className="text-accent">.</span>
      </div>
    </div>
  )
}
