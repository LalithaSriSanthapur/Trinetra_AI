import type { ReactNode } from "react";
import { motion } from "motion/react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";
import { AnimatedBackground } from "./AnimatedBackground";
import { MouseGlow } from "./MouseGlow";

export function PageShell({ children, hideFooter }: { children: ReactNode; hideFooter?: boolean }) {
  return (
    <>
      <AnimatedBackground />
      <MouseGlow />
      <Navbar />
      <motion.main
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="pt-28"
      >
        {children}
      </motion.main>
      {!hideFooter && <Footer />}
    </>
  );
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  center = true,
}: {
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`max-w-3xl ${center ? "mx-auto text-center" : ""}`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.18em] text-cyan mb-4 ${center ? "" : ""}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-cyan" />
          {eyebrow}
        </div>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-gradient tracking-tight">{title}</h2>
      {description && (
        <p className="mt-4 text-white/60 text-base md:text-lg leading-relaxed">{description}</p>
      )}
    </div>
  );
}
