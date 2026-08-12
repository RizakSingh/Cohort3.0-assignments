import ArrowLink from '@/components/buttons/ArrowLink'

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-8 px-6 text-center">
      <span className="font-display text-sm uppercase tracking-[0.2em] text-muted">404</span>
      <h1 className="font-display text-[clamp(3rem,10vw,7rem)] font-semibold uppercase leading-none tracking-tight text-text">
        Not Found.
      </h1>
      <ArrowLink to="/" cursor="click">Back Home</ArrowLink>
    </div>
  )
}
