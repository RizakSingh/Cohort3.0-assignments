import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { useGsap } from '@/hooks/useGsap'
import { staggerReveal } from '@/animations/scroll'
import RevealText from '@/components/typography/RevealText'
import MagneticButton from '@/components/buttons/MagneticButton'

const HEADLINE = ["LET'S BUILD", 'SOMETHING', 'GREAT.']

export default function ContactCTA() {
  const subRef = useRef(null)

  const scope = useGsap(() => {
    staggerReveal(subRef.current, { trigger: scope.current })
  }, [])

  return (
    <section ref={scope} className="relative border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-10">
        <RevealText
          as="h2"
          lines={HEADLINE}
          className="font-display text-[clamp(2.6rem,9vw,7.5rem)] font-semibold uppercase leading-[0.92] tracking-tight text-text"
        />

        <div ref={subRef} className="flex flex-col items-start gap-6">
          <p className="max-w-md font-body text-base text-muted">
            Have a project in mind? I'm currently available for full-stack, AI and creative
            frontend work.
          </p>

          <MagneticButton
            as="a"
            href={`mailto:${site.email}`}
            data-cursor="mail"
            className="group flex items-center gap-3 rounded-full border border-line px-7 py-4 font-display text-sm uppercase tracking-[0.12em] text-text transition-colors hover:border-accent"
          >
            Let's talk
            <ArrowUpRight size={18} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>
        </div>
      </div>
    </section>
  )
}
