import { NavLink } from 'react-router-dom'
import { navLinks, site } from '@/data/site'

export default function MobileMenu({ open, onClose }) {
  return (
    <div
      className={`fixed inset-0 z-40 flex flex-col justify-between bg-bg px-6 pb-10 pt-28 transition-opacity duration-400 lg:hidden ${
        open ? 'pointer-events-auto opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <nav className="flex flex-col gap-2">
        {navLinks.map((link, i) => (
          <NavLink
            key={link.to}
            to={link.to}
            onClick={onClose}
            className="border-b border-line py-5 font-display text-4xl font-semibold tracking-tight text-text"
            style={{ transitionDelay: `${i * 40}ms` }}
          >
            {link.label}
          </NavLink>
        ))}
      </nav>
      <div className="flex items-center justify-between font-body text-xs uppercase tracking-[0.12em] text-muted">
        <span>{site.focus.join(' • ')}</span>
        <a href={`mailto:${site.email}`} className="text-text">
          {site.email}
        </a>
      </div>
    </div>
  )
}
