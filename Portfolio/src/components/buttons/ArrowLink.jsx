import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function ArrowLink({ to, href, children, cursor = 'view', className = '', external = false }) {
  const Tag = to ? Link : 'a'
  const linkProps = to ? { to } : { href, target: external ? '_blank' : undefined, rel: external ? 'noreferrer' : undefined }

  return (
    <Tag
      {...linkProps}
      data-cursor={cursor}
      className={`group inline-flex items-center gap-2 font-display text-sm font-medium uppercase tracking-[0.1em] text-text ${className}`}
    >
      <span className="relative overflow-hidden">
        <span className="block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          {children}
        </span>
        <span className="absolute left-0 top-full block transition-transform duration-400 ease-out group-hover:-translate-y-full">
          {children}
        </span>
      </span>
      <ArrowUpRight size={16} className="transition-transform duration-300 ease-out group-hover:translate-x-1 group-hover:-translate-y-1" />
    </Tag>
  )
}
