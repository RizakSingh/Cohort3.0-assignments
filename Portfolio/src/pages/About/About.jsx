import { useRef } from 'react'
import { useGsap } from '@/hooks/useGsap'
import { staggerReveal } from '@/animations/scroll'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import RevealText from '@/components/typography/RevealText'
import SectionLabel from '@/components/sections/SectionLabel'
import ArrowLink from '@/components/buttons/ArrowLink'

const PHILOSOPHY = [
  {
    title: 'Engineering first',
    body: 'Every project here has a real data layer, real auth, or a real external API behind it — motion and polish come after the underlying system actually works.',
  },
  {
    title: 'Design as a constraint',
    body: 'Interfaces are built to be simple to use before they\'re built to be impressive — animation exists to clarify state changes, not to decorate them.',
  },
  {
    title: 'Ship, then refine',
    body: 'Nearly everything I build gets deployed, not just built — Vercel and Render for the frontend/backend split, with the deploy pipeline treated as part of the feature, not an afterthought.',
  },
]

const FOCUS = ['Full-stack MERN applications', 'AI API integration', 'Creative, motion-driven frontend', 'Scroll-driven interaction design']

const HEADLINE = ["I'M A DEVELOPER", 'WHO CARES ABOUT', 'HOW SOFTWARE', 'FEELS.']
const BACKGROUND_TEXT = [
  'I started with vanilla JavaScript and the DOM before ever touching a framework —',
  'which is still how I debug React apps today. That led to a frontend internship at',
  'Springer Capital, and now a Software Developer role at Unyfer Inc., shipping',
  'features for a live product used by 10,000+ people, alongside AI-powered side projects.',
]

export default function About() {
  const philosophyRef = useRef(null)
  const focusRef = useRef(null)

  const scope = useGsap(() => {
    staggerReveal(philosophyRef.current?.children, { trigger: philosophyRef.current })
    staggerReveal(focusRef.current?.children, { trigger: focusRef.current, y: 16, stagger: 0.06 })
  }, [])

  return (
    <div ref={scope} className="px-6 pb-32 pt-32 md:px-10 md:pt-40">
      <div className="mx-auto max-w-[1600px]">
        <ShrinkHeading lines={HEADLINE} size="hero" endScale={0.7} end="+=100%" />

        <div className="mt-16 grid gap-16 md:grid-cols-[1fr_1.4fr]">
          <SectionLabel index="01" title="Background" />
          <RevealText
            as="p"
            lines={BACKGROUND_TEXT}
            className="max-w-2xl font-body text-lg text-muted md:text-xl"
          />
        </div>

        <div className="mt-28 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <SectionLabel index="02" title="Approach" />
          <div ref={philosophyRef} className="flex flex-col gap-10">
            {PHILOSOPHY.map((item) => (
              <div key={item.title} className="border-t border-line pt-6">
                <h3 className="font-display text-xl font-semibold text-text md:text-2xl">{item.title}</h3>
                <p className="mt-3 max-w-xl font-body text-base text-muted">{item.body}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-28 grid gap-10 md:grid-cols-[1fr_1.4fr]">
          <SectionLabel index="03" title="Current Focus" />
          <ul ref={focusRef} className="flex flex-col gap-4">
            {FOCUS.map((f) => (
              <li key={f} className="border-t border-line pt-4 font-display text-lg uppercase tracking-tight text-text md:text-2xl">
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-32 flex flex-col items-start gap-6 border-t border-line pt-16">
          <SectionLabel index="04" title="Elsewhere" />
          <div className="flex flex-wrap gap-6">
            <ArrowLink to="/experience" cursor="view">See Experience</ArrowLink>
            <ArrowLink to="/contact" cursor="mail">Get In Touch</ArrowLink>
          </div>
        </div>
      </div>
    </div>
  )
}
