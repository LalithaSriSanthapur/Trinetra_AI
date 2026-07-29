import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

export function FeatureCard({
  icon: Icon,
  title,
  description,
  tone = "primary",
  index = 0,
}: {
  icon: LucideIcon;
  title: string;
  description: string;
  tone?: "primary" | "cyan" | "critical";
  index?: number;
}) {
  const glow = tone === "critical" ? "from-critical/30" : tone === "cyan" ? "from-cyan/30" : "from-primary/30";
  const iconColor = tone === "critical" ? "text-critical" : tone === "cyan" ? "text-cyan" : "text-primary";
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-white/10 bg-white/[0.03] p-6 overflow-hidden"
    >
      <div className={`absolute -top-24 -right-24 w-56 h-56 rounded-full bg-gradient-to-br ${glow} to-transparent opacity-0 group-hover:opacity-100 blur-2xl transition-opacity duration-500`} />
      <div className={`inline-grid place-items-center w-11 h-11 rounded-xl bg-white/5 border border-white/10 ${iconColor}`}>
        <Icon className="w-5 h-5" />
      </div>
      <h3 className="mt-4 text-lg font-display font-semibold text-white">{title}</h3>
      <p className="mt-2 text-sm text-white/60 leading-relaxed">{description}</p>
      <div className="mt-5 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />
      <div className="mt-3 flex items-center gap-2 text-[11px] text-white/40 font-mono">
        <span className="w-1.5 h-1.5 rounded-full bg-cyan" /> Active model · v4.2
      </div>
    </motion.div>
  );
}
