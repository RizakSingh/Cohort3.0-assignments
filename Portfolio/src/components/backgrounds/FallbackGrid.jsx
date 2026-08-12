/**
 * CSS-only stand-in for the WebGL line environment — used on mobile and
 * whenever prefers-reduced-motion is set (spec §32/§33). No JS animation
 * loop at all, just a static perspective grid + soft radial glow.
 */
export default function FallbackGrid({ accent = '#6e56cf' }) {
  return (
    <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `radial-gradient(ellipse 70% 50% at 50% 20%, ${accent}22, transparent 60%)`,
        }}
      />
      <div
        className="absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage:
            'linear-gradient(to right, #f4f4f4 1px, transparent 1px), linear-gradient(to bottom, #f4f4f4 1px, transparent 1px)',
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 40%, transparent 80%)',
        }}
      />
    </div>
  )
}
