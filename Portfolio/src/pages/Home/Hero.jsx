import { useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import { useGsap } from '@/hooks/useGsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { introAlreadyPlayed } from '@/utils/intro'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import { staggerReveal } from '@/animations/scroll'
import MagneticButton from '@/components/buttons/MagneticButton'
import AvatarFloat from '@/components/3d/AvatarFloat'
import avatarIntro from '@/assets/avtar.png'

// Timed to land just as the loading sequence lifts (~1.6s) — a fixed,
// one-shot schedule rather than something re-triggered by React state,
// so it can't get caught mid-animation by an unrelated re-render.
const BADGE_DELAY = 1.55
const HEADING_DELAY = 1.7
const META_DELAY = 2.15

// Hoisted to a stable reference — an inline array literal here would get a
// new identity every time Hero re-renders (e.g. when the loading overlay
// unmounts), which re-triggers the reveal effect and can leave the
// headline stuck mid-transform.
const HEADLINE = ['I DESIGN', '& BUILD', 'DIGITAL', 'EXPERIENCES.']

export default function Hero() {
  const badgeRef = useRef(null)
  const metaRef = useRef(null)
  const cueRef = useRef(null)
  const reducedMotion = useReducedMotion()
  // Frozen at first mount — recomputing this on every render means it flips
  // from false to true partway through (the moment the loader completes),
  // which would change `delay` mid-flight and re-trigger the reveal effect
  // while its ScrollTrigger-gated tween is still pending, leaving the
  // headline stuck. The reveal only needs the right answer once, at mount.
  const [skipDelay] = useState(() => reducedMotion || introAlreadyPlayed())
  const badgeDelay = skipDelay ? 0 : BADGE_DELAY
  const headingDelay = skipDelay ? 0 : HEADING_DELAY
  const metaDelay = skipDelay ? 0 : META_DELAY

  const scope = useGsap(() => {
    // Hero content is always on screen at load — it never needs
    // ScrollTrigger to know when to reveal, just a delay. See revealLines()
    // for why gating this behind ScrollTrigger is actively fragile here.
    staggerReveal([badgeRef.current], { delay: badgeDelay, immediate: true })
    staggerReveal([metaRef.current, cueRef.current], { stagger: 0.12, delay: metaDelay, immediate: true })
  }, [])

  return (
    <section ref={scope} className="relative flex min-h-svh flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pt-32">
      <div className="flex flex-1 flex-col items-center gap-10 lg:flex-row lg:gap-14">
        <div className="order-2 flex min-w-0 flex-1 flex-col justify-center lg:order-1">
          <div ref={badgeRef} className="mb-6 flex items-center gap-3 md:mb-10">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">
              {site.status}
            </span>
          </div>

          <ShrinkHeading
            lines={HEADLINE}
            size="heroSplit"
            delay={headingDelay}
            triggerRef={scope}
            end="+=140%"
            immediate
          />

          <div ref={metaRef} className="mt-10 flex flex-col gap-8">
            <p className="max-w-md font-body text-sm uppercase tracking-[0.14em] text-muted md:text-base">
              {site.focus.join(' • ')}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton
                as="a"
                href={site.resume}
                target="_blank"
                rel="noreferrer"
                data-cursor="click"
                className="group flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-display text-sm font-medium uppercase tracking-widest text-bg transition-colors"
              >
                Hire Me
                <ArrowUpRight size={16} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </MagneticButton>

              <MagneticButton
                as={Link}
                to="/work"
                data-cursor="view"
                className="flex items-center gap-2 rounded-full border border-line px-6 py-3 font-display text-sm uppercase tracking-widest text-text transition-colors hover:border-accent"
              >
                View Work
              </MagneticButton>
            </div>
          </div>
        </div>

        <div className="order-1 mt-8 flex w-56 shrink-0 items-center justify-center self-center sm:w-72 lg:order-2 lg:mt-0 lg:w-[420px] xl:w-[520px]">
          <AvatarFloat avatarSrc={avatarIntro} accent="#6e56cf" />
        </div>
      </div>

      <div ref={cueRef} className="flex items-center justify-center gap-2 pt-10 font-display text-xs uppercase tracking-[0.2em] text-muted">
        Scroll
        <ChevronDown size={14} className="animate-bounce" />
      </div>
    </section>
  )
}
