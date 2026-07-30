import { Link } from "react-router-dom";

export default function CategoryCard({ category, count }) {
  return (
    <Link
      to={`/shop?category=${category.slug}`}
      className="flex flex-col items-center gap-2 rounded-2xl border border-line bg-paper-raised px-4 py-6 text-center transition-colors hover:border-coral"
    >
      <span className="text-2xl">{category.icon}</span>
      <span className="text-sm font-semibold">{category.name}</span>
      <span className="text-xs text-ink/40">{count} items</span>
    </Link>
  );
}
