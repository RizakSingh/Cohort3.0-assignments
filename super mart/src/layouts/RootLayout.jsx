import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import CartDrawer from "../components/CartDrawer";

export default function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <footer className="border-t border-line py-8 text-center text-xs text-ink/40">
        <p className="font-display text-sm font-semibold text-ink/60">Havn</p>
        <p className="mt-1">© 2026 Havn · Built with React, Context API &amp; React Router</p>
      </footer>
      <CartDrawer />
    </div>
  );
}
