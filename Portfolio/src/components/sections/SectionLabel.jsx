export default function SectionLabel({ index, title, className = '' }) {
  return (
    <div className={`flex items-center gap-3 font-display text-xs uppercase tracking-[0.2em] text-muted ${className}`}>
      {index && <span className="text-accent">{index}</span>}
      <span className="h-px w-8 bg-line" />
      <span>{title}</span>
    </div>
  )
}
