import { useRef } from 'react'
import { useGsap } from '@/hooks/useGsap'
import { revealLines } from '@/animations/typography'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import SectionLabel from '@/components/sections/SectionLabel'

const HEADLINE = ['I BUILD', 'PRODUCTS', 'THAT FEEL', 'SIMPLE.']

const PARAGRAPH = [
  'I design and develop digital products across web, mobile and AI —',
  'combining engineering with motion, interaction and visual design.',
  'Every project here shipped with a working backend, a real deploy,',
  'or a deliberate craft constraint — nothing here is a template.',
]

export default function Introduction() {
  const paraLines = useRef([])
  paraLines.current = []

  const scope = useGsap(() => {
    revealLines(paraLines.current, { trigger: scope.current, stagger: 0.12 })
  }, [])

  return (
    <section ref={scope} className="relative border-t border-line px-6 py-28 md:px-10 md:py-40">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-14">
        <SectionLabel index="01" title="Introduction" />

        <ShrinkHeading
          lines={HEADLINE}
          size="section"
          triggerRef={scope}
          endScale={0.85}
          end="+=60%"
        />

        <div className="max-w-2xl">
          {PARAGRAPH.map((line, i) => (
            <span className="mask-line" key={i}>
              <span
                ref={(el) => {
                  if (el) paraLines.current[i] = el
                }}
                className="inline-block font-body text-lg text-muted md:text-xl"
              >
                {line}
              </span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
