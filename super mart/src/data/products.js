export const CATEGORIES = [
  { slug: "electronics", name: "Electronics", icon: "🎧" },
  { slug: "clothing", name: "Clothing", icon: "👕" },
  { slug: "furniture", name: "Furniture", icon: "🛋️" },
  { slug: "home", name: "Home & Living", icon: "🪴" },
  { slug: "sports", name: "Sports & Outdoors", icon: "🏃" },
  { slug: "accessories", name: "Accessories", icon: "🎒" },
];

export const PRODUCTS = [
  { id: "p1", name: "Wireless Bluetooth Headphones", category: "electronics", price: 99.99, rating: 4.6, reviews: 120, icon: "🎧", badge: "top" },
  { id: "p2", name: "Smart Watch Series 5", category: "electronics", price: 249.99, rating: 4.2, reviews: 85, icon: "⌚" },
  { id: "p3", name: "4K Ultra HD Monitor", category: "electronics", price: 329.99, rating: 4.7, reviews: 88, icon: "🖥️", badge: "new" },
  { id: "p4", name: "Mechanical Keyboard", category: "electronics", price: 139.99, rating: 4.5, reviews: 142, icon: "⌨️" },
  { id: "p5", name: "Portable Power Bank", category: "electronics", price: 44.99, rating: 4.3, reviews: 203, icon: "🔋" },
  { id: "p6", name: "Wireless Earbuds", category: "electronics", price: 84.99, rating: 4.4, reviews: 167, icon: "🎧" },
  { id: "p7", name: "Smart Home Hub", category: "electronics", price: 119.99, rating: 4.6, reviews: 134, icon: "🔊", badge: "new" },
  { id: "p8", name: "Fitness Tracker Band", category: "electronics", price: 74.99, rating: 4.1, reviews: 189, icon: "⌚" },
  { id: "p9", name: "Portable Bluetooth Speaker", category: "electronics", price: 64.99, rating: 4.3, reviews: 156, icon: "🔊" },
  { id: "p10", name: "Over-Ear Gaming Headset", category: "electronics", price: 109.99, rating: 4.8, reviews: 98, icon: "🎧", badge: "top" },
  { id: "p11", name: "Comfortable Cotton T-Shirt", category: "clothing", price: 22.99, rating: 4.2, reviews: 200, icon: "👕" },
  { id: "p12", name: "Everyday Denim Jacket", category: "clothing", price: 68.0, rating: 4.4, reviews: 76, icon: "🧥" },
  { id: "p13", name: "Ergonomic Office Chair", category: "furniture", price: 189.99, rating: 4.7, reviews: 65, icon: "🪑", badge: "top" },
  { id: "p14", name: "Compact Standing Desk", category: "furniture", price: 259.0, rating: 4.5, reviews: 41, icon: "🗄️" },
  { id: "p15", name: "Oak Bookshelf, 5-Tier", category: "furniture", price: 145.5, rating: 4.3, reviews: 33, icon: "📚" },
  { id: "p16", name: "Stainless Steel Water Bottle", category: "home", price: 32.99, rating: 4.4, reviews: 150, icon: "🧴" },
  { id: "p17", name: "Ceramic Pour-Over Coffee Set", category: "home", price: 46.0, rating: 4.6, reviews: 58, icon: "☕", badge: "new" },
  { id: "p18", name: "Linen Throw Blanket", category: "home", price: 39.5, rating: 4.5, reviews: 72, icon: "🛏️" },
  { id: "p19", name: "Aromatic Soy Candle Trio", category: "home", price: 28.0, rating: 4.7, reviews: 94, icon: "🕯️" },
  { id: "p20", name: "Non-Slip Yoga Mat", category: "sports", price: 36.99, rating: 4.4, reviews: 130, icon: "🧘" },
  { id: "p21", name: "Adjustable Dumbbell Set", category: "sports", price: 129.0, rating: 4.6, reviews: 52, icon: "🏋️" },
  { id: "p22", name: "Insulated Sports Bottle", category: "sports", price: 24.99, rating: 4.3, reviews: 88, icon: "🥤" },
  { id: "p23", name: "Genuine Leather Wallet", category: "accessories", price: 27.99, rating: 4.4, reviews: 75, icon: "👛" },
  { id: "p24", name: "Polarized Sunglasses", category: "accessories", price: 39.99, rating: 4.2, reviews: 63, icon: "🕶️", badge: "new" },
];

export function findProduct(id) {
  return PRODUCTS.find((p) => p.id === id) || null;
}

export function categoryLabel(slug) {
  const found = CATEGORIES.find((c) => c.slug === slug);
  return found ? found.name : slug;
}

const GRADIENTS = [
  ["#FF6B4A", "#FFB199"],
  ["#0F766E", "#5EEAD4"],
  ["#7C3AED", "#C4B5FD"],
  ["#B45309", "#FCD34D"],
  ["#DB2777", "#FBCFE8"],
  ["#0284C7", "#7DD3FC"],
  ["#4D7C0F", "#BEF264"],
  ["#475569", "#CBD5E1"],
];

function gradientFor(id) {
  const digits = String(id).replace(/\D/g, "");
  const index = (parseInt(digits, 10) || 0) % GRADIENTS.length;
  return GRADIENTS[index];
}

function escapeForSvg(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

// Builds a self-contained image for a product, entirely from its own name and
// icon, so the picture is always correct for the title — no external photo
// service involved, so nothing to fetch and nothing that can mismatch or break.
export function imageUrlFor(product) {
  const [from, to] = gradientFor(product?.id);
  const icon = product?.icon || "🛍️";
  const label = escapeForSvg(product?.name || "");

  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="480" height="360" viewBox="0 0 480 360">
      <defs>
        <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="${from}" />
          <stop offset="100%" stop-color="${to}" />
        </linearGradient>
      </defs>
      <rect width="480" height="360" fill="url(#bg)" />
      <text x="240" y="160" font-size="108" text-anchor="middle" dominant-baseline="middle">${icon}</text>
      <text x="240" y="320" font-size="19" font-family="Arial, Helvetica, sans-serif" font-weight="700" fill="rgba(255,255,255,0.95)" text-anchor="middle">${label}</text>
    </svg>
  `.trim();

  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}