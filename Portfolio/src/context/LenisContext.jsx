import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '@/hooks/useReducedMotion'

gsap.registerPlugin(ScrollTrigger)

const LenisContext = createContext(null)

export function LenisProvider({ children }) {
  const lenisRef = useRef(null)
  const reducedMotion = useReducedMotion()
  const [instance, setInstance] = useState(null)

  useEffect(() => {
    if (reducedMotion) {
      document.documentElement.classList.remove('lenis')
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    })
    lenisRef.current = lenis
    setInstance(lenis)

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      lenisRef.current = null
      setInstance(null)
    }
  }, [reducedMotion])

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
}

export function useLenis() {
  return useContext(LenisContext)
}
