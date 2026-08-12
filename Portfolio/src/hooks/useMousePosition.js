import { useEffect, useRef } from 'react'

/**
 * Tracks normalized mouse position (-1..1 on each axis, origin at viewport center)
 * without triggering re-renders — consumers read `ref.current` inside rAF/useFrame loops.
 */
export function useMousePosition() {
  const position = useRef({ x: 0, y: 0, clientX: 0, clientY: 0 })

  useEffect(() => {
    const onMove = (e) => {
      position.current.clientX = e.clientX
      position.current.clientY = e.clientY
      position.current.x = (e.clientX / window.innerWidth) * 2 - 1
      position.current.y = -((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return position
}
