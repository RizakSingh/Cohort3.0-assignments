import { useCart } from "../context/CartContext";
import { imageUrlFor, categoryLabel } from "../data/products";

export default function ProductCard({ product }) {
  const { addItem, lastAddedId } = useCart();
  const justAdded = lastAddedId === product.id;

  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-line bg-paper-raised transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden bg-paper">
        <img
          src={imageUrlFor(product)}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
        />
        {product.badge && (
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide ${
              product.badge === "new" ? "bg-teal text-white" : "bg-coral text-white"
            }`}
          >
            {product.badge === "new" ? "New" : "Top Rated"}
          </span>
        )}
        <span className="absolute right-3 top-3 rounded-full bg-ink/70 px-2.5 py-1 text-[10px] font-medium text-white backdrop-blur">
          {categoryLabel(product.category)}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <h3 className="text-sm font-semibold leading-snug">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-ink/50">
          <span className="text-coral">★</span>
          <span>{product.rating.toFixed(1)}</span>
          <span>({product.reviews})</span>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span className="font-display text-lg font-semibold">${product.price.toFixed(2)}</span>
          <button
            type="button"
            onClick={() => addItem(product)}
            className={`flex items-center gap-1.5 rounded-full px-3.5 py-2 text-xs font-semibold transition-colors ${
              justAdded ? "bg-teal text-white" : "bg-coral text-white hover:bg-coral-dark"
            }`}
          >
            {justAdded ? (
              <>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Added
              </>
            ) : (
              <>
                <svg viewBox="0 0 24 24" width="13" height="13" fill="none"><path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
