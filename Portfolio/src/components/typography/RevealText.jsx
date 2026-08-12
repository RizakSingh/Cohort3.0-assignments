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
  immediate = false,
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
