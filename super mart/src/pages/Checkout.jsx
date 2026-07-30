import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const [placed, setPlaced] = useState(false);

  if (items.length === 0 && !placed) {
    return <Navigate to="/shop" replace />;
  }

  function handlePlaceOrder() {
    clearCart();
    setPlaced(true);
  }

  if (placed) {
    return (
      <div className="mx-auto flex max-w-md flex-col items-center px-6 py-24 text-center">
        <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-teal-soft text-3xl">✓</div>
        <h1 className="font-display text-2xl font-semibold">Order placed!</h1>
        <p className="mt-2 text-sm text-ink/50">
          This is a demo checkout — no payment was actually processed, but your cart has been cleared.
        </p>
        <Link
          to="/shop"
          className="mt-6 rounded-xl bg-coral px-6 py-3 text-sm font-semibold text-white hover:bg-coral-dark"
        >
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-6 py-14">
      <h1 className="font-display text-2xl font-semibold">Review your order</h1>
      <div className="mt-6 flex flex-col gap-3 rounded-2xl border border-line bg-paper-raised p-5">
        {items.map((item) => (
          <div key={item.id} className="flex items-center justify-between text-sm">
            <span>{item.name} × {item.qty}</span>
            <span className="font-semibold">${(item.price * item.qty).toFixed(2)}</span>
          </div>
        ))}
        <div className="mt-2 flex items-center justify-between border-t border-line pt-3 text-base font-semibold">
          <span>Total</span>
          <span>${totals.value.toFixed(2)}</span>
        </div>
      </div>
      <button
        type="button"
        onClick={handlePlaceOrder}
        className="mt-6 w-full rounded-xl bg-coral py-3 text-sm font-semibold text-white hover:bg-coral-dark"
      >
        Place Order
      </button>
    </div>
  );
}
