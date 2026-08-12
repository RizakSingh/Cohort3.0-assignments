import MagneticButton from '@/components/buttons/MagneticButton'

const STRENGTHS = [
  { label: 'Subtle', value: 0.15 },
  { label: 'Standard', value: 0.35 },
  { label: 'Heavy', value: 0.6 },
]

export default function MagneticButtonExperiment() {
  return (
    <div className="flex h-full min-h-[22rem] flex-wrap items-center justify-center gap-8 p-8">
      {STRENGTHS.map((s) => (
        <MagneticButton
          key={s.label}
          strength={s.value}
          data-cursor="click"
          className="rounded-full border border-line px-8 py-5 font-display text-sm uppercase tracking-[0.1em] text-text transition-colors hover:border-accent"
        >
          {s.label}
        </MagneticButton>
      ))}
    </div>
  )
}
