import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Per spec §16: image clips in from a slight inset while scaling up,
 * copy rises in behind it — used by every cinematic project section.
 */
export function projectEnter({ visual, copy, index, trigger }) {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: trigger || visual,
      start: 'top 75%',
      once: true,
    },
  })

  if (visual) {
    gsap.set(visual, { clipPath: 'inset(14% round 2px)', scale: 0.86 })
    tl.to(visual, { clipPath: 'inset(0% round 2px)', scale: 1, duration: 1.3, ease: 'power4.out' }, 0)
  }

  if (index) {
    tl.fromTo(index, { opacity: 0, x: -12 }, { opacity: 1, x: 0, duration: 0.8 }, 0.1)
  }

  if (copy?.length) {
    gsap.set(copy, { y: 60, opacity: 0 })
    tl.to(copy, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'power3.out' }, 0.2)
  }

  return tl
}
