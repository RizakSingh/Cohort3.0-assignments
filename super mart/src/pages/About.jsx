import { Link } from "react-router-dom";

const TEAM = [
  { name: "Maya Ford", role: "Founder & CEO", color: "bg-coral" },
  { name: "Devon Cole", role: "Head of Product", color: "bg-teal" },
  { name: "Ravi Patel", role: "Lead Engineer", color: "bg-violet-500" },
  { name: "Elena Cruz", role: "Design Director", color: "bg-pink-500" },
];

export default function About() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-14">
      <div className="mx-auto max-w-2xl text-center">
        <p className="mb-3 inline-flex rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-dark">
          Our Story
        </p>
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">A calmer way to shop online</h1>
        <p className="mt-4 text-sm leading-relaxed text-ink/60 sm:text-base">
          Havn started as a weekend project between three friends tired of cluttered marketplaces.
          Today it's a small, focused catalog of things worth owning — no endless scroll, no dark
          patterns, just good products at fair prices.
        </p>
      </div>

      <div className="mt-14">
        <h2 className="mb-6 text-center font-display text-2xl font-semibold">Meet the Team</h2>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {TEAM.map((member) => (
            <div key={member.name} className="rounded-2xl border border-line bg-paper-raised p-6 text-center">
              <div className={`mx-auto mb-3 flex h-14 w-14 items-center justify-center rounded-2xl text-lg font-semibold text-white ${member.color}`}>
                {member.name[0]}
              </div>
              <p className="text-sm font-semibold">{member.name}</p>
              <p className="text-xs text-ink/50">{member.role}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 rounded-3xl border border-line bg-paper-raised p-10 text-center">
        <h2 className="font-display text-2xl font-semibold sm:text-3xl">Ready to shop?</h2>
        <p className="mt-2 text-sm text-ink/60">Explore a hand-curated catalog at honest prices.</p>
        <Link
          to="/shop"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
        >
          Browse Products
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>
    </div>
  );
}
