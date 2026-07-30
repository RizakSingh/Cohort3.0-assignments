import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { imageUrlFor } from "../data/products";

export default function CartDrawer() {
  const { items, isOpen, setIsOpen, updateQty, removeItem, clearCart, totals } = useCart();
  const navigate = useNavigate();

  if (!isOpen) return null;

  function handleCheckout() {
    setIsOpen(false);
    navigate("/checkout");
  }

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Close cart"
        onClick={() => setIsOpen(false)}
        className="absolute inset-0 bg-ink/40 backdrop-blur-sm"
      />

      <div className="relative flex h-full w-full max-w-md flex-col bg-paper-raised shadow-2xl">
        <div className="flex items-center justify-between border-b border-line px-6 py-5">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" width="20" height="20" fill="none" className="text-coral">
              <path d="M3 4h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <h2 className="font-display text-lg font-semibold">Your Cart</h2>
            <span className="rounded-full bg-teal-soft px-2 py-0.5 text-xs font-semibold text-teal">
              {totals.count} {totals.count === 1 ? "item" : "items"}
            </span>
          </div>
          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="flex h-8 w-8 items-center justify-center rounded-full text-ink/50 hover:bg-paper hover:text-ink"
          >
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none"><path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto px-6 py-4">
          {items.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center text-ink/50">
              <p className="text-3xl mb-3">🛒</p>
              <p className="text-sm">Your cart is empty.</p>
            </div>
          ) : (
            <ul className="flex flex-col gap-3">
              {items.map((item) => (
                <li key={item.id} className="flex gap-3 rounded-xl border border-line p-3">
                  <img
                    src={imageUrlFor(item)}
                    alt={item.name}
                    className="h-16 w-16 flex-shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-sm font-semibold leading-tight">{item.name}</p>
                      <p className="text-xs text-ink/50">${item.price.toFixed(2)} each</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty - 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-line text-ink/60 hover:border-coral hover:text-coral"
                        >
                          −
                        </button>
                        <span className="w-4 text-center text-sm font-medium">{item.qty}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                          className="flex h-6 w-6 items-center justify-center rounded-md border border-line text-ink/60 hover:border-coral hover:text-coral"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-ink/40 hover:text-coral-dark"
                        aria-label="Remove item"
                      >
                        <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M4 7h16M9 7V5a1 1 0 011-1h4a1 1 0 011 1v2m2 0v13a1 1 0 01-1 1H8a1 1 0 01-1-1V7h10z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" /></svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-line px-6 py-5">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-ink/60">Total</span>
              <span className="font-display text-xl font-semibold">${totals.value.toFixed(2)}</span>
            </div>
            <button
              type="button"
              onClick={handleCheckout}
              className="flex w-full items-center justify-center gap-2 rounded-xl bg-coral py-3 text-sm font-semibold text-white hover:bg-coral-dark"
            >
              Checkout
              <svg viewBox="0 0 24 24" width="15" height="15" fill="none"><path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
            <button
              type="button"
              onClick={clearCart}
              className="mt-2 w-full text-center text-xs text-ink/40 hover:text-coral-dark"
            >
              Clear cart
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
