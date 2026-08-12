import { useRef } from 'react'
import { useGsap } from '@/hooks/useGsap'
import { staggerReveal } from '@/animations/scroll'
import SectionLabel from '@/components/sections/SectionLabel'
import ArrowLink from '@/components/buttons/ArrowLink'

export default function AboutPreview() {
  const contentRef = useRef(null)

  const scope = useGsap(() => {
    staggerReveal(contentRef.current.children, { trigger: scope.current })
  }, [])

  return (
    <section ref={scope} className="relative border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div ref={contentRef} className="mx-auto flex max-w-[1600px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-xl">
          <SectionLabel index="04" title="About" className="mb-8" />
          <h3 className="font-display text-[clamp(2rem,5vw,3.4rem)] font-semibold uppercase leading-[1] tracking-tight text-text">
            A developer who cares how software feels.
          </h3>
          <p className="mt-6 font-body text-base text-muted md:text-lg">
            From framework-free DOM work to full-stack MERN apps wired to real AI APIs — I care
            about the engineering underneath a product as much as how it feels to use.
          </p>
        </div>

        <ArrowLink to="/about" cursor="view">
          More About Me
        </ArrowLink>
      </div>
    </section>
  )
}
