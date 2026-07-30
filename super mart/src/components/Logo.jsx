export default function Logo({ size = 30 }) {
  return (
    <div className="flex items-center gap-2">
      <span
        className="flex items-center justify-center rounded-xl bg-coral text-white"
        style={{ width: size, height: size }}
      >
        <svg viewBox="0 0 24 24" width={size * 0.55} height={size * 0.55} fill="none">
          <path
            d="M12 3l7 4v6c0 4.5-3 7.5-7 8-4-0.5-7-3.5-7-8V7l7-4z"
            stroke="currentColor"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="font-display font-semibold text-lg tracking-tight">
        Havn
      </span>
    </div>
  );
}
