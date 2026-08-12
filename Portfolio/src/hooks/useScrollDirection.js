import { useEffect, useRef, useState } from 'react'

export function useScrollDirection({ threshold = 10 } = {}) {
  const [direction, setDirection] = useState('up')
  const lastY = useRef(0)

  useEffect(() => {
    lastY.current = window.scrollY
    const onScroll = () => {
      const y = window.scrollY
      const diff = y - lastY.current
      if (Math.abs(diff) < threshold) return
      setDirection(diff > 0 && y > 80 ? 'down' : 'up')
      lastY.current = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [threshold])

  return direction
}
