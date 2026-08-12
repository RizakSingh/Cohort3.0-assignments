import { useState } from 'react'
import { Check, Copy } from 'lucide-react'

export default function CopyEmailButton({ email, className = '' }) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      /* clipboard unavailable — no-op */
    }
  }

  return (
    <button
      type="button"
      onClick={onCopy}
      data-cursor="click"
      className={`group inline-flex items-center gap-3 font-display text-sm uppercase tracking-[0.1em] text-muted transition-colors hover:text-text ${className}`}
    >
      {copied ? <Check size={15} className="text-accent" /> : <Copy size={15} />}
      {copied ? 'Copied' : 'Copy Email'}
    </button>
  )
}
