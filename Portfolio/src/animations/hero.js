import gsap from 'gsap'
import { revealLines, depthSettle } from './typography'

/**
 * The full hero entrance timeline, played once after the loading sequence
 * finishes: status badge → masked headline lines → supporting copy → scroll cue.
 */
export function heroTimeline({ badge, lines, meta, scrollCue }) {
  const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

  if (badge) {
    tl.fromTo(badge, { opacity: 0, y: -12 }, { opacity: 1, y: 0, duration: 0.7 }, 0)
  }

  if (lines?.length) {
    gsap.set(lines, { yPercent: 110, opacity: 0 })
    tl.to(lines, { yPercent: 0, opacity: 1, duration: 1.2, stagger: 0.1 }, 0.15)
  }

  if (meta) {
    tl.fromTo(meta, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.9 }, 0.75)
  }

  if (scrollCue) {
    tl.fromTo(scrollCue, { opacity: 0 }, { opacity: 1, duration: 0.8 }, 1.1)
  }

  return tl
}

export { revealLines, depthSettle }
