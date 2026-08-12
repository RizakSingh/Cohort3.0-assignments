import gsap from 'gsap'

/**
 * Cinematic route transition: a full-screen panel sweeps up to cover the
 * viewport, the route swaps underneath it, then it sweeps away to reveal
 * the next page. `onCovered` fires at full coverage — that's where the
 * caller should swap route content.
 */
export function coverIn(panelEl, { onCovered } = {}) {
  const tl = gsap.timeline()
  tl.set(panelEl, { yPercent: 100 })
  tl.to(panelEl, {
    yPercent: 0,
    duration: 0.65,
    ease: 'power4.inOut',
    onComplete: onCovered,
  })
  return tl
}

export function coverOut(panelEl) {
  return gsap.to(panelEl, {
    yPercent: -100,
    duration: 0.75,
    ease: 'power4.inOut',
    delay: 0.05,
  })
}
