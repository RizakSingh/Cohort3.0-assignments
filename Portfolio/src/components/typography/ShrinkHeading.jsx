import { useRef } from 'react'
import { useGsap } from '@/hooks/useGsap'
import { scrollShrink } from '@/animations/typography'
import RevealText from './RevealText'

/**
 * The signature "massive typography that slowly shrinks as you scroll"
 * effect (spec §6) — wraps <RevealText/> for the entrance and layers a
 * scrubbed scale/position tween on top, driven by the section it lives in.
 */
export default function ShrinkHeading({
  lines,
  triggerRef,
  className = '',
  lineClassName = '',
  size = 'hero',
  delay = 0,
  endScale = 0.55,
  end = '+=120%',
}) {
  const wrapperRef = useRef(null)

  const sizes = {
    hero: 'text-[clamp(3.2rem,13vw,11rem)]',
    section: 'text-[clamp(2.4rem,8vw,6.5rem)]',
  }

  useGsap(() => {
    const trigger = triggerRef?.current || wrapperRef.current
    scrollShrink(wrapperRef.current, { trigger, start: 'top top', end, endScale })
  }, [lines])

  return (
    <div ref={wrapperRef} style={{ transformOrigin: 'left center', willChange: 'transform' }}>
      <RevealText
        as="h1"
        lines={lines}
        delay={delay}
        className={`font-display font-semibold uppercase leading-[0.92] tracking-tight text-text ${sizes[size]} ${className}`}
        lineClassName={lineClassName}
      />
    </div>
  )
}
