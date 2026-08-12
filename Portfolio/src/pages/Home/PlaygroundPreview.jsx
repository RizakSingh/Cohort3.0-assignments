import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { useGsap } from '@/hooks/useGsap'
import { staggerReveal } from '@/animations/scroll'
import SectionLabel from '@/components/sections/SectionLabel'
import ArrowLink from '@/components/buttons/ArrowLink'
import MagneticButton from '@/components/buttons/MagneticButton'

const EXPERIMENTS = ['Magnetic Button', 'Cursor Distortion', 'Scroll Typography', 'Interactive Grid', 'Text Displacement']

export default function PlaygroundPreview() {
  const listRef = useRef(null)

  const scope = useGsap(() => {
    staggerReveal(listRef.current.children, { trigger: scope.current })
  }, [])

  return (
    <section ref={scope} className="relative border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-12">
        <div className="flex items-center justify-between">
          <SectionLabel index="05" title="Playground" />
          <ArrowLink to="/playground" cursor="view" className="hidden md:inline-flex">
            Explore
          </ArrowLink>
        </div>

        <div ref={listRef} className="grid gap-x-6 gap-y-3 md:grid-cols-2 lg:grid-cols-3">
          {EXPERIMENTS.map((label, i) => (
            <MagneticButton
              as={Link}
              key={label}
              to="/playground"
              data-cursor="view"
              strength={0.2}
              className="flex items-center justify-between border-b border-line py-5 font-display text-xl uppercase tracking-tight text-text transition-colors hover:text-accent"
            >
              <span>{String(i + 1).padStart(2, '0')} {label}</span>
            </MagneticButton>
          ))}
        </div>
      </div>
    </section>
  )
}
