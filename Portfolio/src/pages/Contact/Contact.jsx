import { ArrowUpRight } from 'lucide-react'
import { site } from '@/data/site'
import ShrinkHeading from '@/components/typography/ShrinkHeading'
import RevealText from '@/components/typography/RevealText'
import MagneticButton from '@/components/buttons/MagneticButton'
import CopyEmailButton from '@/components/buttons/CopyEmailButton'

const LINKS = [
  { label: 'GitHub', href: site.github, meta: site.githubHandle },
  { label: 'LinkedIn', href: site.linkedin, meta: 'in/rizakdeep-singh' },
  { label: 'Phone', href: `tel:${site.phone.replace(/\s/g, '')}`, meta: site.phone },
]

const HEADLINE = ["LET'S BUILD", 'SOMETHING', 'GREAT.']
const SUBTEXT = ["I'm currently available for full-stack, AI and creative frontend work.", 'Reach out directly — I read everything myself.']

export default function Contact() {
  return (
    <div className="flex min-h-svh flex-col justify-center px-6 pb-20 pt-32 md:px-10">
      <div className="mx-auto w-full max-w-[1600px]">
        <span className="font-display text-xs uppercase tracking-[0.2em] text-muted">Have a project?</span>

        <div className="mt-6">
          <ShrinkHeading lines={HEADLINE} size="hero" endScale={0.75} end="+=70%" />
        </div>

        <RevealText as="p" lines={SUBTEXT} className="mt-10 max-w-xl font-body text-lg text-muted" />
        <p className="mt-4 font-display text-xs uppercase tracking-[0.14em] text-muted">{site.location}</p>

        <div className="mt-12 flex flex-wrap items-center gap-6">
          <MagneticButton
            as="a"
            href={`mailto:${site.email}`}
            data-cursor="mail"
            className="group flex items-center gap-3 rounded-full border border-line px-8 py-5 font-display text-base uppercase tracking-[0.1em] text-text transition-colors hover:border-accent"
          >
            {site.email}
            <ArrowUpRight size={20} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
          </MagneticButton>

          <CopyEmailButton email={site.email} />
        </div>

        <div className="mt-24 flex flex-wrap gap-x-16 gap-y-8 border-t border-line pt-12">
          {LINKS.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noreferrer"
              data-cursor="view"
              className="group flex flex-col gap-1"
            >
              <span className="font-display text-2xl font-semibold uppercase tracking-tight text-text transition-colors group-hover:text-accent">
                {link.label}
              </span>
              <span className="font-body text-sm text-muted">{link.meta}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
