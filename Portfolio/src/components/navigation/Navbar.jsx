import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { navLinks, site } from '@/data/site'
import { useScrollDirection } from '@/hooks/useScrollDirection'
import MobileMenu from './MobileMenu'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const direction = useScrollDirection()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  const hidden = direction === 'down' && !menuOpen

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-transform duration-500 ease-out ${
          hidden ? '-translate-y-full' : 'translate-y-0'
        }`}
      >
        <div
          className={`mx-auto flex max-w-[1600px] items-center justify-between px-6 transition-all duration-400 md:px-10 ${
            scrolled ? 'h-16 border-b border-line/80 bg-bg/70 backdrop-blur-md' : 'h-20 md:h-24'
          }`}
        >
          <NavLink
            to="/"
            data-cursor="click"
            className="font-display text-sm font-semibold tracking-[0.14em] text-text"
          >
            {site.name.split(' ')[0].toUpperCase()}
          </NavLink>

          <nav className="hidden items-center gap-8 lg:flex">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                data-cursor="click"
                className={({ isActive }) =>
                  `relative py-1 font-display text-xs font-medium uppercase tracking-[0.14em] transition-colors ${
                    isActive ? 'text-text' : 'text-muted hover:text-text'
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.label}
                    <span
                      className={`absolute -bottom-0.5 left-0 h-px bg-accent transition-all duration-300 ${
                        isActive ? 'w-full' : 'w-0'
                      }`}
                    />
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <button
            type="button"
            onClick={() => setMenuOpen((v) => !v)}
            data-cursor="click"
            aria-label="Toggle menu"
            className="flex items-center gap-2 text-text lg:hidden"
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </header>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
