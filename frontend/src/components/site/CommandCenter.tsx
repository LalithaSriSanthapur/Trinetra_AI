import { motion, AnimatePresence } from "motion/react";
import { useEffect, useState } from "react";
import {
  Camera, AlertTriangle, ShieldCheck, Activity, Video, Eye, Flame,
  Heart, UserCheck, Send, MapPin, CheckCircle2, Radio,
} from "lucide-react";

const CAMERAS = [
  { id: "C-04", label: "Hallway B2", status: "ok" },
  { id: "C-08", label: "Gym Entry", status: "ok" },
  { id: "C-12", label: "Cafeteria", status: "alert" },
  { id: "C-17", label: "Lab Wing", status: "ok" },
  { id: "C-22", label: "Playground", status: "review" },
  { id: "C-31", label: "Bus Loop", status: "ok" },
];

const STATS = [
  { icon: Camera, label: "Cameras Online", value: "126 / 128", tone: "cyan" },
  { icon: Activity, label: "AI Accuracy", value: "98.2%", tone: "primary" },
  { icon: AlertTriangle, label: "Critical Alerts", value: "1", tone: "critical" },
  { icon: ShieldCheck, label: "Response · avg", value: "1.4s", tone: "success" },
];

const CHART = [22, 34, 28, 45, 40, 52, 48, 61, 55, 70, 66, 82, 74, 88];

type FeedItem = { id: number; icon: typeof Eye; text: string; tone: "cyan" | "critical" | "primary" | "success"; confidence: number };

const FEED_POOL: Omit<FeedItem, "id">[] = [
  { icon: Eye, text: "Potential altercation · Cafeteria", tone: "critical", confidence: 94 },
  { icon: Flame, text: "Smoke signature · Lab Wing", tone: "critical", confidence: 87 },
  { icon: Heart, text: "Fall detected · Gym", tone: "primary", confidence: 91 },
  { icon: MapPin, text: "Restricted zone breach · Roof", tone: "critical", confidence: 96 },
  { icon: UserCheck, text: "Incident assigned · Officer Rhee", tone: "success", confidence: 100 },
  { icon: Send, text: "Alert dispatched to safety team", tone: "primary", confidence: 100 },
  { icon: Activity, text: "Crowd density spike · Hall A", tone: "cyan", confidence: 82 },
];

const TIMELINE = [
  { time: "14:02", label: "Bullying · Cafeteria", tone: "critical" as const },
  { time: "13:48", label: "Crowding · Hall A", tone: "warning" as const },
  { time: "13:05", label: "Restricted entry", tone: "primary" as const },
  { time: "12:31", label: "Medical assist", tone: "cyan" as const },
];

export function CommandCenter() {
  const max = Math.max(...CHART);
  const [feed, setFeed] = useState<FeedItem[]>(
    FEED_POOL.slice(0, 4).map((s, id) => ({ ...s, id })),
  );

  useEffect(() => {
    let counter = feed.length;
    const t = setInterval(() => {
      const step = FEED_POOL[Math.floor(Math.random() * FEED_POOL.length)];
      counter += 1;
      setFeed((prev) => [{ ...step, id: counter }, ...prev].slice(0, 4));
    }, 2600);
    return () => clearInterval(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="relative">
      <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 via-cyan/20 to-transparent rounded-[36px] blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl p-4 md:p-5 shadow-2xl"
        style={{ perspective: 1200 }}
      >
        {/* header */}
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="text-xs text-white/50 font-mono">trinetra.ai / command-center</span>
          </div>
          <div className="flex items-center gap-3 text-[11px] text-white/60">
            <div className="flex items-center gap-1.5"><Radio className="w-3 h-3 text-cyan" /> 11 models</div>
            <span className="flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/75 pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              Live
            </span>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            const toneClass =
              s.tone === "critical" ? "text-critical" :
              s.tone === "success" ? "text-success" :
              s.tone === "cyan" ? "text-cyan" : "text-primary";
            return (
              <motion.div
                key={s.label}
                whileHover={{ y: -2 }}
                className="rounded-2xl bg-white/[0.03] border border-white/5 p-3 relative overflow-hidden"
              >
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${toneClass}`} />
                  <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-white/40">
                    <span className={`w-1 h-1 rounded-full ${toneClass.replace("text-", "bg-")} animate-pulse`} />
                    Live
                  </span>
                </div>
                <div className="mt-2 text-2xl font-display font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-white/50">{s.label}</div>
              </motion.div>
            );
          })}
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {/* Chart */}
          <div className="md:col-span-2 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-[11px] text-white/50 uppercase tracking-widest">Detection · 24h</div>
                <div className="text-base font-display font-semibold text-white">Threat Signal Analytics</div>
              </div>
              <div className="flex items-center gap-2 text-[11px]">
                <span className="flex items-center gap-1 text-cyan"><span className="w-2 h-2 rounded-full bg-cyan"/>Signals</span>
                <span className="text-white/20">•</span>
                <span className="flex items-center gap-1 text-primary"><span className="w-2 h-2 rounded-full bg-primary"/>Verified</span>
              </div>
            </div>
            <div className="h-28 flex items-end gap-1.5">
              {CHART.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.03, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-cyan/70 relative"
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-white/40 font-mono">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
            </div>
          </div>

          {/* Live AI Activity */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-white">Live AI Activity</div>
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-cyan/60 pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
              </span>
            </div>
            <ul className="space-y-2">
              <AnimatePresence initial={false}>
                {feed.map((it) => {
                  const Icon = it.icon;
                  const toneText =
                    it.tone === "critical" ? "text-critical" :
                    it.tone === "cyan" ? "text-cyan" :
                    it.tone === "success" ? "text-success" : "text-primary";
                  const toneBar =
                    it.tone === "critical" ? "bg-critical" :
                    it.tone === "cyan" ? "bg-cyan" :
                    it.tone === "success" ? "bg-success" : "bg-primary";
                  return (
                    <motion.li
                      key={it.id}
                      layout
                      initial={{ opacity: 0, y: -8, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className="rounded-lg px-2.5 py-2 border border-white/5 bg-white/[0.02]"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className={`w-3.5 h-3.5 ${toneText} shrink-0`} />
                        <div className="text-[11px] text-white truncate flex-1">{it.text}</div>
                        <div className="text-[10px] font-mono text-white/50">{it.confidence}%</div>
                      </div>
                      <div className="mt-1.5 h-1 rounded-full bg-white/5 overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${it.confidence}%` }}
                          transition={{ duration: 0.6, ease: "easeOut" }}
                          className={`h-full ${toneBar}`}
                        />
                      </div>
                    </motion.li>
                  );
                })}
              </AnimatePresence>
            </ul>
          </div>
        </div>

        {/* Camera grid + timeline */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          <div className="md:col-span-2 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Video className="w-4 h-4 text-white/60" />
                <span className="text-sm font-semibold text-white">Camera Grid</span>
              </div>
              <div className="text-[11px] text-white/50 font-mono">6 / 126 shown</div>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {CAMERAS.map((c, i) => {
                const border = c.status === "alert" ? "border-critical/50 ring-1 ring-critical/40" : c.status === "review" ? "border-warning/40" : "border-white/10";
                return (
                  <motion.div
                    key={c.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.04 }}
                    whileHover={{ scale: 1.02 }}
                    className={`relative aspect-video rounded-lg overflow-hidden border ${border} bg-gradient-to-br from-slate-800/60 to-slate-900/80`}
                  >
                    <div className="absolute inset-0 grid-bg opacity-40" />
                    <div className="absolute top-1 left-1 text-[9px] font-mono text-white/70 bg-black/30 px-1 rounded">{c.id}</div>
                    {c.status !== "ok" && (
                      <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${c.status === "alert" ? "bg-critical" : "bg-warning"} shadow-[0_0_8px_currentColor] animate-pulse`} />
                    )}
                    {c.status === "alert" && (
                      <div className="absolute inset-x-0 bottom-3 text-center text-[9px] font-mono text-critical bg-black/40 py-0.5">
                        AI · 94%
                      </div>
                    )}
                    <div className="absolute bottom-1 left-1 right-1 text-[9px] text-white/80 truncate">{c.label}</div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Incident Timeline */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
            <div className="text-sm font-semibold text-white mb-3">Incident Timeline</div>
            <div className="relative pl-4">
              <div className="absolute left-1 top-1 bottom-1 w-px bg-gradient-to-b from-cyan/60 via-white/10 to-transparent" />
              <ul className="space-y-3">
                {TIMELINE.map((t, i) => {
                  const dot = t.tone === "critical" ? "bg-critical" : t.tone === "warning" ? "bg-warning" : t.tone === "cyan" ? "bg-cyan" : "bg-primary";
                  return (
                    <li key={i} className="relative">
                      <span className={`absolute -left-3.5 top-1 w-2 h-2 rounded-full ${dot} shadow-[0_0_10px_currentColor]`} />
                      <div className="text-[11px] text-white">{t.label}</div>
                      <div className="text-[10px] font-mono text-white/40">{t.time}</div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
