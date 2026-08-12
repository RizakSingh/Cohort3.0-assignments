import { useRef } from 'react'
import { useGsap } from '@/hooks/useGsap'
import { revealLines } from '@/animations/typography'

/**
 * Masked line-by-line reveal — the one reusable primitive behind every
 * heading/paragraph entrance on the site (spec §41: one animation language).
 * `lines` is an array of strings, one per visual line.
 */
export default function RevealText({
  as: Tag = 'div',
  lines,
  className = '',
  lineClassName = '',
  delay = 0,
  stagger = 0.09,
  // Defaults to true: a ScrollTrigger that's already satisfied at creation
  // time (content already in the viewport) is supposed to fire right away,
  // but that path has proven unreliable across this app — headings above
  // the fold were ending up permanently stuck hidden. A plain delayed tween
  // has no such failure mode, so it's the safe default everywhere; pass
  // `immediate={false}` explicitly for content that's genuinely below the
  // fold and should wait for the user to scroll to it.
  immediate = true,
  ...rest
}) {
  const linesRef = useRef([])
  linesRef.current = []

  const scope = useGsap(() => {
    revealLines(linesRef.current, {
      trigger: scope.current,
      delay,
      stagger,
      start: 'top 88%',
      immediate,
    })
  }, [lines, delay, stagger, immediate])

  return (
    <Tag ref={scope} className={className} {...rest}>
      {lines.map((line, i) => (
        <span className={`mask-line ${lineClassName}`} key={i}>
          <span
            ref={(el) => {
              if (el) linesRef.current[i] = el
            }}
            className="inline-block"
          >
            {line}
          </span>
        </span>
      ))}
    </Tag>
  )
}
