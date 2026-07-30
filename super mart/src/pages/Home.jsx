import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { CATEGORIES, PRODUCTS } from "../data/products";
import StatCard from "../components/StatCard";
import CategoryCard from "../components/CategoryCard";
import ProductCard from "../components/ProductCard";

function greeting() {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 18) return "Good afternoon";
  return "Good evening";
}

export default function Home() {
  const { user } = useAuth();
  const { totals } = useCart();

  const topRated = [...PRODUCTS].sort((a, b) => b.rating - a.rating).slice(0, 4);
  const newArrivals = PRODUCTS.filter((p) => p.badge === "new").slice(0, 4);
  const firstName = (user?.name || "there").split(" ")[0];

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <section className="relative overflow-hidden rounded-3xl border border-line bg-paper-raised p-8 sm:p-12">
        <div
          className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full opacity-40 blur-3xl"
          style={{ background: "radial-gradient(circle, #ff6b4a, transparent 70%)" }}
        />
        <div
          className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(circle, #0f766e, transparent 70%)" }}
        />

        <div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-coral-soft px-3 py-1 text-xs font-semibold uppercase tracking-wide text-coral-dark">
              {greeting()} 👋
            </p>
            <h1 className="font-display text-3xl font-semibold leading-tight sm:text-4xl">
              Welcome back, <span className="text-coral">{firstName}</span>
            </h1>
            <p className="mt-3 text-sm text-ink/60 sm:text-base">
              Handpicked finds across electronics, home, and everyday essentials — all in one place.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to="/shop"
                className="flex items-center gap-2 rounded-xl bg-coral px-5 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
              >
                Shop Now
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </Link>
              <Link
                to="/shop"
                className="rounded-xl border border-line px-5 py-3 text-sm font-semibold text-ink/70 hover:border-ink/30"
              >
                View All Products
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:w-72">
            <div className="col-span-2 rounded-2xl bg-teal-soft p-5">
              <p className="font-display text-2xl font-semibold text-teal">{PRODUCTS.length}+</p>
              <p className="text-xs font-medium text-teal/80">Products available</p>
            </div>
            <div className="col-span-2 rounded-2xl border border-line p-5">
              <p className="font-display text-2xl font-semibold">Free</p>
              <p className="text-xs text-ink/50">Delivery on orders over $75</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard
          icon="🛍️"
          iconBg="var(--color-coral-soft)"
          iconColor="var(--color-coral-dark)"
          value={totals.count}
          label="Cart Items"
          caption="in your bag"
        />
        <StatCard
          icon="📈"
          iconBg="var(--color-teal-soft)"
          iconColor="var(--color-teal)"
          value={`$${totals.value.toFixed(2)}`}
          label="Cart Value"
          caption="ready to checkout"
        />
        <StatCard
          icon="⭐"
          iconBg="#fef3c7"
          iconColor="#b45309"
          value={PRODUCTS.filter((p) => p.badge === "top").length}
          label="Top Products"
          caption="highly rated"
        />
        <StatCard
          icon="🏷️"
          iconBg="#ede9fe"
          iconColor="#7c3aed"
          value={CATEGORIES.length}
          label="Categories"
          caption="to explore"
        />
      </section>

      <section className="mt-12">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="font-display text-xl font-semibold">Shop by Category</h2>
          <Link to="/shop" className="text-sm font-semibold text-coral hover:text-coral-dark">
            View all →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {CATEGORIES.map((cat) => (
            <CategoryCard
              key={cat.slug}
              category={cat}
              count={PRODUCTS.filter((p) => p.category === cat.slug).length}
            />
          ))}
        </div>
      </section>

      <section className="mt-12 grid gap-4 lg:grid-cols-2">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">Top Rated</h2>
            <Link to="/shop" className="text-sm font-semibold text-coral hover:text-coral-dark">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {topRated.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-xl font-semibold">New Arrivals</h2>
            <Link to="/shop" className="text-sm font-semibold text-coral hover:text-coral-dark">
              See all →
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {newArrivals.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      <section className="mt-12 grid gap-4 sm:grid-cols-3">
        {[
          { icon: "⚡", title: "Fast Delivery", text: "Same-day on select items" },
          { icon: "🛡️", title: "Secure Payments", text: "100% encrypted checkout" },
          { icon: "🏷️", title: "Best Prices", text: "Price-match guarantee" },
        ].map((f) => (
          <div key={f.title} className="flex items-center gap-3 rounded-2xl border border-line bg-paper-raised p-5">
            <span className="text-xl">{f.icon}</span>
            <div>
              <p className="text-sm font-semibold">{f.title}</p>
              <p className="text-xs text-ink/50">{f.text}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
