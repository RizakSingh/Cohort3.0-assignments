import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Generic "fade + rise into place" reveal for supporting content
 * (cards, list items, paragraphs) — the lowest tier of the animation
 * hierarchy in spec §41, kept simple and cheap to run in bulk.
 */
export function staggerReveal(targets, { trigger, start = 'top 88%', stagger = 0.08, y = 40, delay = 0, immediate = false } = {}) {
  if (!targets || (Array.isArray(targets) && !targets.length)) return null

  gsap.set(targets, { y, opacity: 0 })
  return gsap.to(targets, {
    y: 0,
    opacity: 1,
    duration: 0.9,
    ease: 'power3.out',
    stagger,
    delay,
    // See revealLines() in animations/typography.js for why above-the-fold
    // content should skip ScrollTrigger entirely rather than rely on its
    // "already in view" auto-fire behavior.
    scrollTrigger: immediate ? undefined : { trigger: trigger || targets, start, once: true },
  })
}

export function parallax(el, { amount = 60, trigger } = {}) {
  if (!el) return null
  return gsap.fromTo(
    el,
    { y: -amount },
    {
      y: amount,
      ease: 'none',
      scrollTrigger: {
        trigger: trigger || el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    },
  )
}
