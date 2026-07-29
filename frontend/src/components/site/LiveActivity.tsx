import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import { Eye, Camera, ShieldAlert, FileImage, Send, UserCheck } from "lucide-react";

type Step = { icon: typeof Eye; text: string; tone: "cyan" | "critical" | "primary" | "success" };

const FEED: Step[] = [
  { icon: Camera, text: "Camera 12 — signal received", tone: "cyan" },
  { icon: Eye, text: "Potential bullying detected · 94%", tone: "critical" },
  { icon: FileImage, text: "Generating incident snapshot…", tone: "primary" },
  { icon: Send, text: "Alert dispatched to safety team", tone: "primary" },
  { icon: UserCheck, text: "Incident assigned · Officer Rhee", tone: "success" },
  { icon: ShieldAlert, text: "Camera 03 — restricted zone breach", tone: "critical" },
  { icon: Eye, text: "Crowd density spike · Hall A", tone: "cyan" },
];

export function LiveActivity() {
  const [items, setItems] = useState<{ id: number; step: Step }[]>(
    FEED.slice(0, 4).map((step, id) => ({ id, step })),
  );

  useEffect(() => {
    let counter = items.length;
    const t = setInterval(() => {
      const step = FEED[Math.floor(Math.random() * FEED.length)];
      counter += 1;
      setItems((prev) => [{ id: counter, step }, ...prev].slice(0, 5));
    }, 2400);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="glass-strong rounded-3xl p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <span className="absolute inline-flex h-full w-full rounded-full bg-cyan/60 pulse-ring" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-cyan" />
          </div>
          <div>
            <div className="text-sm font-semibold text-white">Live AI Activity</div>
            <div className="text-[11px] text-white/50">Streaming events · updated in real time</div>
          </div>
        </div>
        <span className="text-[10px] uppercase tracking-widest text-white/40">Realtime</span>
      </div>
      <ul className="relative space-y-2">
        <AnimatePresence initial={false}>
          {items.map((it) => {
            const Icon = it.step.icon;
            const toneText =
              it.step.tone === "critical" ? "text-critical" :
              it.step.tone === "cyan" ? "text-cyan" :
              it.step.tone === "success" ? "text-success" : "text-primary";
            const toneBg =
              it.step.tone === "critical" ? "bg-critical/15 border-critical/30" :
              it.step.tone === "cyan" ? "bg-cyan/10 border-cyan/25" :
              it.step.tone === "success" ? "bg-emerald-400/10 border-emerald-400/25" : "bg-primary/10 border-primary/25";
            return (
              <motion.li
                key={it.id}
                layout
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className={`flex items-center gap-3 rounded-xl px-3 py-2.5 border ${toneBg}`}
              >
                <div className={`w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/10`}>
                  <Icon className={`w-4 h-4 ${toneText}`} />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-xs text-white truncate">{it.step.text}</div>
                  <div className="text-[10px] text-white/40 font-mono">
                    {new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                  </div>
                </div>
              </motion.li>
            );
          })}
        </AnimatePresence>
      </ul>
    </div>
  );
}
