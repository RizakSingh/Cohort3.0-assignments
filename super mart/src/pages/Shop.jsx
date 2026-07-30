import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CATEGORIES, PRODUCTS } from "../data/products";
import ProductCard from "../components/ProductCard";

export default function Shop() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState("");
  const [sort, setSort] = useState("featured");

  const activeCategory = searchParams.get("category") || "all";

  function setCategory(slug) {
    if (slug === "all") {
      searchParams.delete("category");
    } else {
      searchParams.set("category", slug);
    }
    setSearchParams(searchParams);
  }

  const filtered = useMemo(() => {
    let list = PRODUCTS.filter((p) => (activeCategory === "all" ? true : p.category === activeCategory));

    if (query.trim()) {
      const q = query.trim().toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(q));
    }

    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price);
    else if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price);
    else if (sort === "rating") list = [...list].sort((a, b) => b.rating - a.rating);

    return list;
  }, [activeCategory, query, sort]);

  return (
    <div className="mx-auto max-w-6xl px-6 py-10">
      <div className="mb-6">
        <h1 className="font-display text-2xl font-semibold sm:text-3xl">All Products</h1>
        <p className="mt-1 text-sm text-ink/50">{filtered.length} products found</p>
      </div>

      <div className="mb-8 flex flex-col gap-3 rounded-2xl border border-line bg-paper-raised p-3 sm:flex-row">
        <div className="flex flex-1 items-center gap-2 rounded-xl border border-line px-3 py-2">
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" className="text-ink/40"><circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="1.8" /><path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" /></svg>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search products…"
            className="w-full bg-transparent text-sm outline-none placeholder:text-ink/35"
          />
        </div>

        <select
          value={activeCategory}
          onChange={(e) => setCategory(e.target.value)}
          className="rounded-xl border border-line px-3 py-2 text-sm outline-none"
        >
          <option value="all">All Categories</option>
          {CATEGORIES.map((c) => (
            <option key={c.slug} value={c.slug}>{c.name}</option>
          ))}
        </select>

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="rounded-xl border border-line px-3 py-2 text-sm outline-none"
        >
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="rating">Highest Rated</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-line py-20 text-center text-sm text-ink/40">
          No products match your search.
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </div>
  );
}
