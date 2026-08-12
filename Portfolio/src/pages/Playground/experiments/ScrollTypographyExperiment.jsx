import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGsap } from '@/hooks/useGsap'

gsap.registerPlugin(ScrollTrigger)

const WORDS = ['SCROLL', 'TO', 'SHRINK', 'THIS', 'TEXT']

export default function ScrollTypographyExperiment() {
  const scrollerRef = useRef(null)
  const headingRef = useRef(null)

  const scope = useGsap(() => {
    gsap.to(headingRef.current, {
      scale: 0.4,
      ease: 'none',
      scrollTrigger: {
        trigger: headingRef.current,
        scroller: scrollerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, [])

  return (
    <div ref={scope} className="h-full min-h-[22rem]">
      <div ref={scrollerRef} className="h-[22rem] overflow-y-scroll">
        <div className="flex flex-col gap-24 px-6 py-24">
          <h3
            ref={headingRef}
            style={{ transformOrigin: 'top left' }}
            className="font-display text-4xl font-semibold uppercase leading-none tracking-tight text-text md:text-6xl"
          >
            {WORDS.map((w) => (
              <span key={w} className="block">
                {w}
              </span>
            ))}
          </h3>
          <p className="max-w-sm font-body text-sm text-muted">
            This panel has its own scroll container — the heading above shrinks against it, the
            same mechanism driving the hero on every page, boxed down to a single component.
          </p>
          <div className="h-24" />
        </div>
      </div>
    </div>
  )
}
