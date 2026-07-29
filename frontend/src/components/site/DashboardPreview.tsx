import { motion } from "motion/react";
import {
  Camera, AlertTriangle, ShieldCheck, Activity, Clock, Video, MapPin, Bell, CheckCircle2,
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
  { icon: Camera, label: "Cameras Online", value: "126", tone: "cyan" },
  { icon: AlertTriangle, label: "Under Review", value: "2", tone: "warning" },
  { icon: ShieldCheck, label: "Critical Alerts", value: "1", tone: "critical" },
  { icon: Activity, label: "AI Accuracy", value: "98.2%", tone: "primary" },
];

const CHART = [22, 34, 28, 45, 40, 52, 48, 61, 55, 70, 66, 82, 74, 88];

export function DashboardPreview() {
  const max = Math.max(...CHART);
  return (
    <div className="relative">
      {/* Floating glow */}
      <div className="absolute -inset-6 bg-gradient-to-tr from-primary/30 via-cyan/20 to-transparent rounded-[32px] blur-3xl -z-10" />

      <motion.div
        initial={{ opacity: 0, y: 30, rotateX: 8 }}
        animate={{ opacity: 1, y: 0, rotateX: 0 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="glass-strong rounded-3xl p-4 md:p-5 shadow-2xl"
        style={{ perspective: 1200 }}
      >
        {/* header bar */}
        <div className="flex items-center justify-between px-2 pb-3 border-b border-white/5">
          <div className="flex items-center gap-2">
            <div className="flex gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
              <span className="w-2.5 h-2.5 rounded-full bg-white/20" />
            </div>
            <span className="ml-3 text-xs text-white/50 font-mono">trinetra.ai / lincoln-high</span>
          </div>
          <div className="flex items-center gap-2 text-xs text-white/60">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400/75 pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Live
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mt-4">
          {STATS.map((s) => {
            const Icon = s.icon;
            const toneClass =
              s.tone === "critical" ? "text-critical" :
              s.tone === "warning" ? "text-warning" :
              s.tone === "cyan" ? "text-cyan" : "text-primary";
            return (
              <div key={s.label} className="rounded-2xl bg-white/[0.03] border border-white/5 p-3">
                <div className="flex items-center justify-between">
                  <Icon className={`w-4 h-4 ${toneClass}`} />
                  <span className="text-[10px] uppercase tracking-wider text-white/40">Now</span>
                </div>
                <div className="mt-2 text-2xl font-display font-bold text-white">{s.value}</div>
                <div className="text-[11px] text-white/50">{s.label}</div>
              </div>
            );
          })}
        </div>

        {/* Body grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mt-3">
          {/* Chart */}
          <div className="md:col-span-2 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div>
                <div className="text-xs text-white/50">Incidents · 24h</div>
                <div className="text-lg font-display font-semibold text-white">Detection Activity</div>
              </div>
              <div className="flex items-center gap-1 text-xs">
                <span className="flex items-center gap-1 text-cyan"><span className="w-2 h-2 rounded-full bg-cyan"/>Signals</span>
                <span className="mx-1 text-white/20">•</span>
                <span className="flex items-center gap-1 text-primary"><span className="w-2 h-2 rounded-full bg-primary"/>Verified</span>
              </div>
            </div>
            <div className="h-32 flex items-end gap-1.5">
              {CHART.map((v, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${(v / max) * 100}%` }}
                  transition={{ delay: 0.4 + i * 0.03, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="flex-1 rounded-t-md bg-gradient-to-t from-primary/70 to-cyan/70 relative group"
                >
                  <div className="absolute inset-x-0 top-0 h-1 rounded-t bg-white/40 opacity-0 group-hover:opacity-100" />
                </motion.div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[10px] text-white/40 font-mono">
              <span>00:00</span><span>06:00</span><span>12:00</span><span>18:00</span><span>Now</span>
            </div>
          </div>

          {/* Recent incidents */}
          <div className="rounded-2xl bg-white/[0.03] border border-white/5 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-semibold text-white">Recent Incidents</div>
              <Bell className="w-4 h-4 text-white/40" />
            </div>
            <ul className="space-y-2.5">
              {[
                { time: "2m", label: "Bullying · Cafeteria", tone: "critical", icon: AlertTriangle },
                { time: "18m", label: "Crowding · Hall A", tone: "warning", icon: Activity },
                { time: "1h", label: "Restricted zone entry", tone: "primary", icon: MapPin },
                { time: "3h", label: "Medical assist requested", tone: "cyan", icon: CheckCircle2 },
              ].map((it, i) => {
                const Icon = it.icon;
                const dot = it.tone === "critical" ? "bg-critical" : it.tone === "warning" ? "bg-warning" : it.tone === "cyan" ? "bg-cyan" : "bg-primary";
                return (
                  <li key={i} className="flex items-center gap-2.5">
                    <div className={`w-8 h-8 rounded-lg grid place-items-center bg-white/5 border border-white/5`}>
                      <Icon className={`w-3.5 h-3.5 ${it.tone === "critical" ? "text-critical" : it.tone === "warning" ? "text-warning" : it.tone === "cyan" ? "text-cyan" : "text-primary"}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-xs text-white truncate">{it.label}</div>
                      <div className="text-[10px] text-white/40">{it.time} ago</div>
                    </div>
                    <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Cameras */}
        <div className="mt-3 rounded-2xl bg-white/[0.03] border border-white/5 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Video className="w-4 h-4 text-white/60" />
              <span className="text-sm font-semibold text-white">Camera Grid</span>
            </div>
            <div className="flex items-center gap-1 text-[11px] text-white/50"><Clock className="w-3 h-3"/>Avg response 1.4s</div>
          </div>
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {CAMERAS.map((c, i) => {
              const border = c.status === "alert" ? "border-critical/50 ring-1 ring-critical/40" : c.status === "review" ? "border-warning/40" : "border-white/10";
              return (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + i * 0.04 }}
                  className={`relative aspect-video rounded-lg overflow-hidden border ${border} bg-gradient-to-br from-slate-800/60 to-slate-900/80`}
                >
                  <div className="absolute inset-0 grid-bg opacity-40" />
                  <div className="absolute top-1 left-1 text-[9px] font-mono text-white/70 bg-black/30 px-1 rounded">{c.id}</div>
                  {c.status !== "ok" && (
                    <div className={`absolute top-1 right-1 w-1.5 h-1.5 rounded-full ${c.status === "alert" ? "bg-critical" : "bg-warning"} shadow-[0_0_8px_currentColor]`} />
                  )}
                  <div className="absolute bottom-1 left-1 right-1 text-[9px] text-white/80 truncate">{c.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </motion.div>
    </div>
  );
}
