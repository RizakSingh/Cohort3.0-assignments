import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Masked line reveal: each `.mask-line > *` moves up from 100% with a stagger.
 * Used for every heading/paragraph reveal across the site — one implementation,
 * reused everywhere per the animation-hierarchy rule (spec §41).
 */
export function revealLines(lines, { delay = 0, stagger = 0.09, trigger, start = 'top 85%', immediate = false } = {}) {
  if (!lines || !lines.length) return null

  gsap.set(lines, { yPercent: 110, opacity: 0 })

  return gsap.to(lines, {
    yPercent: 0,
    opacity: 1,
    duration: 1.1,
    ease: 'power4.out',
    stagger,
    delay,
    // `immediate: true` skips ScrollTrigger entirely — for content that's
    // already on screen at load (the hero), gating the reveal behind a
    // ScrollTrigger is unnecessary and fragile: React StrictMode's dev-only
    // mount→cleanup→remount cycle kills and recreates a ScrollTrigger on
    // the same element within one tick, and the recreated one can end up
    // never firing. A plain delayed tween has no such failure mode.
    scrollTrigger: !immediate && trigger ? { trigger, start, once: true } : undefined,
  })
}

/**
 * The signature "massive typography slowly shrinks as you scroll" timeline.
 * `el` starts huge (set via CSS clamp) and scales/tracks/moves back in space
 * across the full height of `trigger`, reused by Hero, Introduction, Project
 * hero and About hero so the transformation reads as one visual language.
 */
export function scrollShrink(el, { trigger, start = 'top top', end = '+=120%', scrub = 1, endScale = 0.55, y = -80 } = {}) {
  if (!el) return null

  return gsap.to(el, {
    scale: endScale,
    y,
    letterSpacing: '-0.01em',
    ease: 'none',
    scrollTrigger: {
      trigger: trigger || el,
      start,
      end,
      scrub,
    },
  })
}

/**
 * Subtle depth treatment for hero copy: slight blur + scale-in as it settles,
 * kept restrained per spec §7 so text stays readable throughout.
 */
export function depthSettle(el, { delay = 0 } = {}) {
  if (!el) return null
  gsap.set(el, { filter: 'blur(6px)', scale: 1.02, opacity: 0 })
  return gsap.to(el, {
    filter: 'blur(0px)',
    scale: 1,
    opacity: 1,
    duration: 1.4,
    delay,
    ease: 'power3.out',
  })
}
