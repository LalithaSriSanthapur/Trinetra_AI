import { Link } from "@tanstack/react-router";
import { ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export function CTASection() {
  return (
    <section className="mx-auto max-w-7xl px-6 mt-32">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl glass-strong p-10 md:p-16 text-center"
      >
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-primary/30 blur-3xl" />
        <div className="absolute -bottom-40 left-1/2 -translate-x-1/2 w-[600px] h-[300px] rounded-full bg-cyan/20 blur-3xl" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-cyan mb-6">
            <ShieldCheck className="w-3 h-3" /> Get started today
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gradient tracking-tight">
            Every corridor. Every camera.<br className="hidden md:block" /> Always watching for what matters.
          </h2>
          <p className="mt-5 text-white/60 max-w-2xl mx-auto">
            Deploy TrinetraAI across your campus in under a week. No new cameras, no rip-and-replace — just intelligence on top of what you already own.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow hover:[&]:btn-glow-hover"
            >
              Request a demo
              <ArrowRight className="w-4 h-4 transition group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/pricing"
              className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition"
            >
              View pricing
            </Link>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
