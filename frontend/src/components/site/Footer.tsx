import { Link } from "@tanstack/react-router";
import { Logo } from "./Logo";
import { Github, Twitter, Linkedin, Youtube } from "lucide-react";

const COLUMNS = [
  {
    title: "Product",
    links: [
      { to: "/product", label: "Overview" },
      { to: "/features", label: "Features" },
      { to: "/technology", label: "Technology" },
      { to: "/pricing", label: "Pricing" },
    ],
  },
  {
    title: "Company",
    links: [
      { to: "/about", label: "About" },
      { to: "/contact", label: "Contact" },
      { to: "/pricing", label: "Careers" },
      { to: "/pricing", label: "Press" },
    ],
  },
  {
    title: "Resources",
    links: [
      { to: "/features", label: "Documentation" },
      { to: "/technology", label: "Security" },
      { to: "/about", label: "Trust Center" },
      { to: "/contact", label: "Support" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-white/60 leading-relaxed">
              TrinetraAI transforms existing school cameras into an intelligent safety network — detecting incidents in real time before they escalate.
            </p>
            <div className="mt-6 flex gap-2">
              {[Twitter, Linkedin, Github, Youtube].map((Icon, i) => (
                <a key={i} href="#" className="glass rounded-xl p-2.5 hover:ring-cyan transition" aria-label="social">
                  <Icon className="w-4 h-4 text-white/80" />
                </a>
              ))}
            </div>
          </div>
          {COLUMNS.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-white mb-4">{col.title}</h4>
              <ul className="space-y-2.5">
                {col.links.map((l, i) => (
                  <li key={i}>
                    <Link to={l.to} className="text-sm text-white/60 hover:text-white transition">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-12 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-white/40">© 2026 TrinetraAI, Inc. All rights reserved.</p>
          <div className="flex items-center gap-2 text-xs text-white/40">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-cyan opacity-75 pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
            </span>
            All systems operational · SOC 2 Type II · FERPA compliant
          </div>
        </div>
      </div>
    </footer>
  );
}
