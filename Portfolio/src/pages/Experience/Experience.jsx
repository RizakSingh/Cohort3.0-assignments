import { useRef } from 'react'
import gsap from 'gsap'
import { experience } from '@/data/experience'
import { useGsap } from '@/hooks/useGsap'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import { staggerReveal } from '@/animations/scroll'

const HEADLINE = ['EXPERIENCE.']

export default function Experience() {
  const lineRef = useRef(null)
  const progressRef = useRef(null)
  const markersRef = useRef([])
  markersRef.current = []

  const scope = useGsap(() => {
    gsap.set(progressRef.current, { scaleY: 0, transformOrigin: 'top' })
    gsap.to(progressRef.current, {
      scaleY: 1,
      ease: 'none',
      scrollTrigger: {
        trigger: lineRef.current,
        start: 'top center',
        end: 'bottom center',
        scrub: 0.5,
      },
    })

    markersRef.current.forEach((marker) => {
      gsap.to(marker, {
        backgroundColor: '#6e56cf',
        borderColor: '#6e56cf',
        scrollTrigger: { trigger: marker, start: 'top center', end: 'top 40%', scrub: true },
      })
    })

    staggerReveal(document.querySelectorAll('[data-experience-item]'), { trigger: lineRef.current, y: 30 })
  }, [])

  return (
    <div className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <ShrinkHeading lines={HEADLINE} size="section" endScale={0.8} end="+=50%" />

        <p className="mt-8 max-w-xl font-body text-lg text-muted">
          A build-history, not a resume — each milestone is grounded in something actually shipped.
        </p>

        <div ref={scope} className="relative mt-24">
          <div ref={lineRef} className="absolute left-[7px] top-0 h-full w-px bg-line md:left-[9px]">
            <div ref={progressRef} className="absolute inset-0 w-px bg-accent" />
          </div>

          <div className="flex flex-col gap-16 pl-10 md:gap-24 md:pl-16">
            {experience.map((item, i) => (
              <div key={i} data-experience-item className="relative">
                <span
                  ref={(el) => {
                    if (el) markersRef.current[i] = el
                  }}
                  className="absolute -left-10 top-1.5 h-3.5 w-3.5 rounded-full border-2 border-line bg-bg transition-colors md:-left-16 md:h-4 md:w-4"
                />
                <div className="flex flex-col gap-3 md:flex-row md:items-baseline md:gap-10">
                  <span className="font-display text-sm uppercase tracking-[0.14em] text-accent md:w-32 md:shrink-0">
                    {item.year} — {item.period}
                  </span>
                  <div className="max-w-2xl">
                    <h3 className="font-display text-2xl font-semibold uppercase tracking-tight text-text md:text-4xl">
                      {item.title}
                    </h3>
                    <p className="mt-4 font-body text-base text-muted md:text-lg">{item.description}</p>
                    <div className="mt-5 flex flex-wrap gap-2">
                      {item.tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-line px-3 py-1 font-display text-[11px] uppercase tracking-[0.1em] text-muted">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
