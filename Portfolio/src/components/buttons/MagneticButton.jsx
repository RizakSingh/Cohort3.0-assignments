import { useRef } from 'react'
import gsap from 'gsap'

export default function MagneticButton({ as: Tag = 'button', children, className = '', strength = 0.35, ...rest }) {
  const ref = useRef(null)

  const onMouseMove = (e) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - (rect.left + rect.width / 2)
    const y = e.clientY - (rect.top + rect.height / 2)
    gsap.to(el, { x: x * strength, y: y * strength, duration: 0.5, ease: 'power3.out' })
  }

  const onMouseLeave = () => {
    gsap.to(ref.current, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <Tag
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={className}
      style={{ willChange: 'transform' }}
      {...rest}
    >
      {children}
    </Tag>
  )
}
