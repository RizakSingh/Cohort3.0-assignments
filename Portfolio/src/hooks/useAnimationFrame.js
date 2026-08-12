import { useEffect, useRef } from 'react'

/** Runs `callback(deltaSeconds)` every frame while `active` is true. */
export function useAnimationFrame(callback, active = true) {
  const requestRef = useRef(null)
  const lastRef = useRef(null)
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  useEffect(() => {
    if (!active) return

    const loop = (time) => {
      if (lastRef.current != null) {
        callbackRef.current((time - lastRef.current) / 1000)
      }
      lastRef.current = time
      requestRef.current = requestAnimationFrame(loop)
    }
    requestRef.current = requestAnimationFrame(loop)

    return () => {
      cancelAnimationFrame(requestRef.current)
      lastRef.current = null
    }
  }, [active])
}
