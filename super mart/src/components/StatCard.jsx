export default function StatCard({ icon, iconBg, iconColor, label, value, caption }) {
  return (
    <div className="rounded-2xl border border-line bg-paper-raised p-5">
      <div
        className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl text-lg"
        style={{ backgroundColor: iconBg, color: iconColor }}
      >
        {icon}
      </div>
      <p className="font-display text-2xl font-semibold">{value}</p>
      <p className="text-sm font-medium text-ink/70">{label}</p>
      <p className="text-xs text-ink/40">{caption}</p>
    </div>
  );
}
