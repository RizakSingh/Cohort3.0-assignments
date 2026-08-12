import { Link } from 'react-router-dom'
import { site, navLinks } from '@/data/site'

export default function Footer() {
  return (
    <footer className="relative border-t border-line px-6 py-16 md:px-10 md:py-20">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-16">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div>
            <p className="font-display text-2xl font-semibold text-text md:text-3xl">{site.name}</p>
            <p className="mt-2 font-body text-sm uppercase tracking-[0.14em] text-muted">
              {site.focus.join(' • ')}
            </p>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-3">
            <a href={site.github} target="_blank" rel="noreferrer" data-cursor="view" className="font-display text-xs uppercase tracking-[0.14em] text-muted hover:text-text">
              GitHub
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" data-cursor="view" className="font-display text-xs uppercase tracking-[0.14em] text-muted hover:text-text">
              LinkedIn
            </a>
            <a href={`mailto:${site.email}`} data-cursor="mail" className="font-display text-xs uppercase tracking-[0.14em] text-muted hover:text-text">
              {site.email}
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-line pt-8 text-xs uppercase tracking-[0.14em] text-muted md:flex-row md:items-center md:justify-between">
          <nav className="flex flex-wrap gap-x-6 gap-y-2">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-text">
                {link.label}
              </Link>
            ))}
          </nav>
          <span>© {new Date().getFullYear()} {site.name}. Built with React, GSAP &amp; Three.js.</span>
        </div>
      </div>
    </footer>
  )
}
