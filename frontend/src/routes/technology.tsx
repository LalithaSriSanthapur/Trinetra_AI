import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { Cpu, Server, ShieldCheck, GitBranch, Zap, Layers, Lock, Cloud } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Technology · TrinetraAI" },
      { name: "description", content: "Purpose-built computer vision, edge inference, on-prem privacy. The tech stack behind TrinetraAI." },
      { property: "og:title", content: "TrinetraAI Technology" },
      { property: "og:description", content: "Edge-first AI infrastructure built for schools." },
    ],
  }),
  component: TechPage,
});

function TechPage() {
  const pillars = [
    { icon: Cpu, title: "Vision transformer core", text: "A custom ViT backbone fine-tuned on 4.2M annotated school-environment frames." },
    { icon: Server, title: "Edge-first inference", text: "Runs on NVIDIA Jetson or on-site GPU. Cloud is optional, not required." },
    { icon: ShieldCheck, title: "Privacy by design", text: "Ephemeral snapshots. No student face recognition without district opt-in." },
    { icon: GitBranch, title: "Continuous learning", text: "Every confirmed alert improves the model — with district-level isolation." },
    { icon: Zap, title: "Sub-400ms latency", text: "Frame-to-alert measured at 380ms median across 340+ live deployments." },
    { icon: Layers, title: "Modular pipeline", text: "Detection, tracking, classification and event routing as swappable stages." },
    { icon: Lock, title: "SOC 2 Type II + FERPA", text: "Independently audited annually. Full evidence room available under NDA." },
    { icon: Cloud, title: "Hybrid dashboards", text: "Console runs in the cloud; sensitive footage never leaves your building." },
  ];
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Technology"
          title={<>Built for the physics of real schools.</>}
          description="Off-the-shelf CV models fail in the environments schools actually operate in. Ours were trained for them — dim gyms, chaotic dismissals, cluttered classrooms."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {pillars.map((p, i) => {
            const Icon = p.icon;
            return (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04 }}
                className="glass rounded-2xl p-5"
              >
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-cyan">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-3 font-display font-semibold text-white">{p.title}</div>
                <div className="mt-1.5 text-xs text-white/55">{p.text}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-6 mt-32">
        <div className="glass-strong rounded-3xl p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <div className="text-xs uppercase tracking-widest text-cyan mb-3">Architecture</div>
              <h3 className="text-3xl font-display font-bold text-white">
                Camera → Edge → Console
              </h3>
              <p className="mt-3 text-white/60">
                Frames enter the edge box, get processed through our detection pipeline, and only structured events — never raw video — travel to the console.
              </p>
              <ul className="mt-6 space-y-2 text-sm text-white/70">
                {["RTSP/ONVIF ingest", "GPU or Jetson inference", "Event bus + routing", "Encrypted evidence vault", "Real-time console"].map((s) => (
                  <li key={s} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-cyan" /> {s}
                  </li>
                ))}
              </ul>
            </div>
            <div className="relative rounded-2xl border border-white/10 p-6 bg-white/[0.02] font-mono text-xs text-white/80 space-y-2">
              <div className="text-cyan">// pipeline.trinetra.ai</div>
              <div><span className="text-white/40">stage:</span> ingest → rtsp://192.168.1.24</div>
              <div><span className="text-white/40">stage:</span> preprocess (denoise · normalize)</div>
              <div><span className="text-white/40">stage:</span> detect · trinetra-vit-v4.2</div>
              <div><span className="text-white/40">stage:</span> classify · [bullying, weapon, medical]</div>
              <div><span className="text-white/40">stage:</span> confidence &gt; 0.87 ? emit : discard</div>
              <div className="text-cyan">// median latency 380ms · p99 720ms</div>
            </div>
          </div>
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
