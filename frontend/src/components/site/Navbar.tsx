import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { to: "/product", label: "Product" },
  { to: "/features", label: "Features" },
  { to: "/technology", label: "Technology" },
  { to: "/pricing", label: "Pricing" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center px-3 pt-3">
      <nav
        className={`glass rounded-2xl w-full max-w-6xl transition-all duration-300 ${
          scrolled ? "py-2 shadow-2xl" : "py-3"
        }`}
      >
        <div className="flex items-center justify-between gap-4 px-4">
          <Logo />
          <div className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="px-3 py-2 text-sm text-white/70 hover:text-white rounded-lg hover:bg-white/5 transition"
                activeProps={{ className: "text-white bg-white/10" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
          <div className="hidden lg:flex items-center gap-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm text-white/80 hover:text-white transition"
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className="group inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground btn-glow hover:[&]:btn-glow-hover"
            >
              Get started
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </div>
          <button
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden p-2 rounded-lg hover:bg-white/5 text-white"
            aria-label="Toggle menu"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
        {open && (
          <div className="lg:hidden mt-3 border-t border-white/10 pt-3 pb-2 px-2 space-y-1">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="block px-3 py-2.5 text-sm text-white/80 rounded-lg hover:bg-white/5"
                activeProps={{ className: "text-white bg-white/10" }}
              >
                {l.label}
              </Link>
            ))}
            <div className="flex gap-2 pt-2">
              <Link to="/login" onClick={() => setOpen(false)} className="flex-1 text-center px-3 py-2 rounded-lg border border-white/10 text-sm text-white/80">
                Sign in
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="flex-1 text-center px-3 py-2 rounded-lg bg-primary text-sm text-primary-foreground font-medium">
                Get started
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
