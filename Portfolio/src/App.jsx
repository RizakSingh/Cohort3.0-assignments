import { useEffect, useRef, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { LenisProvider, useLenis } from '@/hooks/useLenis'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { coverIn, coverOut } from '@/animations/transitions'
import { introAlreadyPlayed, markIntroPlayed } from '@/utils/intro'

import Interactive3DBackground from '@/components/backgrounds/Interactive3DBackground'
import CustomCursor from '@/components/cursor/CustomCursor'
import Navbar from '@/components/navigation/Navbar'
import PageTransition from '@/components/transitions/PageTransition'
import LoadingScreen from '@/components/transitions/LoadingScreen'
import Footer from '@/components/sections/Footer'

import Home from '@/pages/Home/Home'
import Work from '@/pages/Work/Work'
import Project from '@/pages/Project/Project'
import About from '@/pages/About/About'
import Experience from '@/pages/Experience/Experience'
import Playground from '@/pages/Playground/Playground'
import Contact from '@/pages/Contact/Contact'
import NotFound from '@/pages/NotFound'

const ACCENT = '#6e56cf'

function AnimatedRoutes() {
  const location = useLocation()
  const [displayLocation, setDisplayLocation] = useState(location)
  const panelRef = useRef(null)
  const lenis = useLenis()
  const isFirstRender = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    if (location.pathname === displayLocation.pathname) return

    coverIn(panelRef.current, {
      onCovered: () => {
        setDisplayLocation(location)
        window.scrollTo(0, 0)
        lenis?.scrollTo(0, { immediate: true })
        coverOut(panelRef.current)
      },
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location])

  return (
    <>
      <PageTransition ref={panelRef} />
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/work" element={<Work />} />
        <Route path="/work/:slug" element={<Project />} />
        <Route path="/about" element={<About />} />
        <Route path="/experience" element={<Experience />} />
        <Route path="/playground" element={<Playground />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  )
}

function AppShell() {
  const reducedMotion = useReducedMotion()
  // Play the cinematic intro once per browser tab session — not on every
  // hard refresh or direct load of a non-home route, which is what made
  // the site feel slow to navigate around.
  const [showLoader, setShowLoader] = useState(() => !reducedMotion && !introAlreadyPlayed())

  return (
    <div className="relative">
      <Interactive3DBackground accent={ACCENT} />
      <div className="noise-layer" />
      <CustomCursor />

      {showLoader && (
        <LoadingScreen
          onComplete={() => {
            markIntroPlayed()
            setShowLoader(false)
          }}
        />
      )}

      <Navbar />
      <main className="relative">
        <AnimatedRoutes />
      </main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <LenisProvider>
      <AppShell />
    </LenisProvider>
  )
}
