import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import {
  ArrowRight, PlayCircle, ShieldCheck, Sparkles, Eye, Bell, Camera, Cpu, Users, BarChart3,
  Flame, AlertOctagon, Heart, MapPin, UserSearch, Layers, FileBarChart, Lock, Activity, Zap, ChevronDown,
  EyeOff, Clock, Brain, Radio, TrendingUp,
} from "lucide-react";
import { useState } from "react";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { CommandCenter } from "@/components/site/CommandCenter";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTASection } from "@/components/site/CTASection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TrinetraAI — Protect Every Student Before It's Too Late" },
      { name: "description", content: "TrinetraAI monitors existing CCTV cameras with advanced computer vision to detect violence, medical emergencies, fire, and unauthorized access in real time." },
      { property: "og:title", content: "TrinetraAI — Protect Every Student Before It's Too Late" },
      { property: "og:description", content: "AI computer vision that turns existing school cameras into a proactive safety layer — sub-2 second alerts for violence, medical, fire and intrusion." },
    ],
  }),
  component: HomePage,
});

const FEATURES = [
  { icon: Users, title: "Bullying Detection", description: "Pose and behavior models flag physical altercations, cornering and repeated aggression across hallways and cafeterias.", tone: "critical" as const },
  { icon: AlertOctagon, title: "Violence Detection", description: "Real-time detection of fights, kicks and thrown objects with 98%+ accuracy — verified in under two seconds.", tone: "critical" as const },
  { icon: Heart, title: "Medical Emergencies", description: "Slip, fall and seizure recognition dispatches nurses and admin to the exact camera location instantly.", tone: "cyan" as const },
  { icon: Flame, title: "Fire & Smoke", description: "Visual fire and smoke detection augments smoke alarms — flagging events cameras see before sensors trip.", tone: "critical" as const },
  { icon: ShieldCheck, title: "Weapon Detection", description: "Detects firearms, blades and simulated weapons on entry, in bags and drawn — with silent lockdown workflows.", tone: "critical" as const },
  { icon: MapPin, title: "Restricted Zones", description: "Define virtual perimeters. Get alerted when students, staff or strangers cross into off-limits areas.", tone: "primary" as const },
  { icon: UserSearch, title: "Missing Student Tracking", description: "Upload a photo. TrinetraAI locates the last-known camera and traces movement across the campus timeline.", tone: "cyan" as const },
  { icon: Layers, title: "Crowd Analysis", description: "Density mapping prevents dangerous crushes at dismissals, assemblies and evacuation drills.", tone: "primary" as const },
  { icon: Activity, title: "Behavior Heatmaps", description: "See how students actually use your building. Optimize supervision where it matters most.", tone: "cyan" as const },
  { icon: FileBarChart, title: "AI Reports", description: "Weekly briefings for principals and board meetings — generated automatically from real incident data.", tone: "primary" as const },
  { icon: Lock, title: "Role-Based Access", description: "Granular controls for admins, counselors, SROs and district IT. Every action audited, always.", tone: "primary" as const },
];

function HomePage() {
  return (
    <PageShell>
      <Hero />
      <TrustedBy />
      <ProblemSection />
      <CCTVLimitations />
      <AIDetection />
      <FeatureGrid />
      <HowItWorks />
      <IncidentResponse />
      <WhySchoolsNeedAI />
      <Benefits />
      <PricingPreview />
      <FAQ />
      <CTASection />
    </PageShell>
  );
}

function StatusBadge({ label = "System Online" }: { label?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-white/80"
    >
      <span className="relative flex h-2 w-2">
        <span className="absolute inline-flex h-full w-full rounded-full bg-cyan/60 pulse-ring" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan" />
      </span>
      <span className="font-mono tracking-wide">{label}</span>
      <span className="text-white/30">·</span>
      <span className="text-white/50">340+ campuses live</span>
    </motion.div>
  );
}

function Hero() {
  return (
    <section className="mx-auto max-w-7xl px-6 pb-8">
      <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr] items-center">
        <div>
          <StatusBadge label="AI Vision Active" />
          <h1 className="mt-6 text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gradient leading-[1.03]">
            Protect Every Student Before It's Too Late.
          </h1>
          <p className="mt-7 text-lg text-white/65 max-w-xl leading-relaxed">
            TrinetraAI continuously monitors existing CCTV cameras using advanced computer vision to detect violence, medical emergencies, fire, unauthorized access, and other threats in real time.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="group inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow hover:[&]:btn-glow-hover"
            >
              Request demo
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <button className="inline-flex items-center gap-2 rounded-xl glass px-5 py-3 text-sm font-medium text-white hover:bg-white/10 transition">
              <PlayCircle className="w-4 h-4 text-cyan" />
              Watch 2-min demo
            </button>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-5 text-xs text-white/45">
            <div className="flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5 text-cyan"/>SOC 2 Type II</div>
            <div className="flex items-center gap-1.5"><Lock className="w-3.5 h-3.5 text-cyan"/>FERPA compliant</div>
            <div className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-cyan"/>On-prem option</div>
            <div className="flex items-center gap-1.5"><Radio className="w-3.5 h-3.5 text-cyan"/>Sub-2s alerts</div>
          </div>
        </div>
        <CommandCenter />
      </div>
    </section>
  );
}

function TrustedBy() {
  const districts = ["Lincoln USD", "Riverside K-12", "Northgate Academy", "Cascade Public", "Fairview District", "Summit Prep", "Oakwood Schools", "Meridian ISD"];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-36">
      <p className="text-center text-xs uppercase tracking-[0.24em] text-white/40">
        Deployed across leading school districts
      </p>
      <div className="relative mt-8 overflow-hidden">
        <div className="pointer-events-none absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10" />
        <div className="flex gap-14 animate-marquee whitespace-nowrap">
          {[...districts, ...districts].map((d, i) => (
            <div key={i} className="text-2xl md:text-3xl font-display font-semibold text-white/25 hover:text-white/60 transition">
              {d}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProblemSection() {
  const stats = [
    { value: "1 in 5", label: "students report being bullied each year" },
    { value: "67s", label: "average time before a hallway fight escalates" },
    { value: "89%", label: "of school incidents caught on camera — after the fact" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs uppercase tracking-widest text-critical">
            <span className="w-1.5 h-1.5 rounded-full bg-critical animate-pulse"/> The problem
          </div>
          <h2 className="mt-5 text-4xl md:text-5xl font-bold text-gradient tracking-tight leading-tight">
            Schools have cameras. What they don't have is <span className="text-critical">someone watching</span>.
          </h2>
          <p className="mt-5 text-white/60 leading-relaxed">
            The average campus operates over 90 cameras — and no human capacity to monitor even a fraction of them in real time. When it matters most, incidents are reviewed after the harm is done.
          </p>
        </div>
        <div className="grid gap-3">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-6 flex items-center gap-6"
            >
              <div className="text-4xl md:text-5xl font-display font-bold text-critical shrink-0 w-32">{s.value}</div>
              <div className="text-white/70">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CCTVLimitations() {
  const limits = [
    { icon: EyeOff, title: "Passive by design", text: "Traditional CCTV records — it doesn't react. Footage is only useful after something has already gone wrong." },
    { icon: Clock, title: "Human bandwidth", text: "A single guard cannot monitor 90+ feeds. Attention decays after 20 minutes of screen time." },
    { icon: Users, title: "Missed context", text: "Cameras see, but don't understand. Behavior, intent and severity are invisible to raw feeds." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader
        eyebrow="Traditional CCTV"
        title={<>Recording ≠ <span className="text-gradient-cyan">responding.</span></>}
        description="Every school we've visited has invested heavily in cameras. Almost none have the staffing model to make those cameras act in real time."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {limits.map((l, i) => {
          const Icon = l.icon;
          return (
            <motion.div
              key={l.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="glass rounded-2xl p-7 relative overflow-hidden"
            >
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-critical">
                <Icon className="w-5 h-5" />
              </div>
              <div className="mt-5 font-display font-semibold text-white text-lg">{l.title}</div>
              <div className="mt-2 text-sm text-white/60 leading-relaxed">{l.text}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function AIDetection() {
  const capabilities = [
    { icon: Brain, title: "11 specialized models", text: "Pose, action, object and scene models trained on school environments — not generic surveillance datasets." },
    { icon: Zap, title: "Sub-400ms inference", text: "Edge-first architecture. Frames are analyzed the moment they're captured — no round-trip to the cloud." },
    { icon: TrendingUp, title: "Confidence-scored alerts", text: "Every event surfaces with an explainable confidence score, snapshot and 15-second clip for human review." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader
        eyebrow="AI Detection"
        title={<>Cameras that <span className="text-gradient-cyan">understand what they see.</span></>}
        description="TrinetraAI runs specialized computer vision models directly on your existing feeds — turning passive recordings into an intelligent safety layer."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {capabilities.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              whileHover={{ y: -4, scale: 1.01 }}
              className="glass-strong rounded-2xl p-7 relative overflow-hidden group"
            >
              <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-cyan/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-cyan">
                <Icon className="w-5 h-5" />
              </div>
              <div className="mt-5 font-display font-semibold text-white text-lg">{c.title}</div>
              <div className="mt-2 text-sm text-white/60 leading-relaxed">{c.text}</div>
              <div className="mt-5 pt-4 border-t border-white/5 flex items-center gap-2 text-[11px] font-mono text-white/40">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan animate-pulse" /> Model active
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

function FeatureGrid() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader
        eyebrow="Detection engine"
        title={<>Eleven safety models. <span className="text-gradient-cyan">One platform.</span></>}
        description="TrinetraAI runs a suite of purpose-built computer vision models tuned for the environments schools actually operate in — noisy hallways, dim gyms, chaotic dismissals."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
      </div>
    </section>
  );
}

function HowItWorks() {
  const steps = [
    { icon: Camera, title: "Connect existing cameras", text: "Plug into your current IP/RTSP feeds. No new hardware required." },
    { icon: Cpu, title: "AI processes on-site", text: "Edge-first inference keeps footage private and latency under 400ms." },
    { icon: Eye, title: "Incidents get flagged", text: "Purpose-built models classify events and produce a snapshot + clip." },
    { icon: Bell, title: "The right people alerted", text: "Role-based routing pings admin, SRO or nurse based on incident type." },
    { icon: BarChart3, title: "Insights compound", text: "Trends, hotspots and weekly briefings turn data into policy." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader
        eyebrow="How it works"
        title={<>From camera feed to <span className="text-gradient-cyan">first response</span> in seconds.</>}
      />
      <div className="mt-14 relative">
        <div className="hidden md:block absolute top-16 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan/40 to-transparent" />
        <div className="grid gap-6 md:grid-cols-5">
          {steps.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4 }}
                className="relative"
              >
                <div className="relative z-10 mx-auto w-14 h-14 rounded-2xl glass-strong grid place-items-center ring-cyan">
                  <Icon className="w-6 h-6 text-cyan" />
                </div>
                <div className="mt-4 text-center">
                  <div className="text-xs font-mono text-cyan/80">STEP 0{i + 1}</div>
                  <div className="mt-1 font-display font-semibold text-white">{s.title}</div>
                  <div className="mt-2 text-sm text-white/55">{s.text}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function IncidentResponse() {
  const flow = [
    { time: "T + 0.0s", title: "Camera captures event", text: "A cafeteria altercation begins on Camera 12." },
    { time: "T + 0.4s", title: "AI classifies signal", text: "Violence model returns 94% confidence — snapshot and 15s clip preserved." },
    { time: "T + 1.2s", title: "Routing engine dispatches", text: "Admin and nearest SRO paged. Silent lockdown pre-armed." },
    { time: "T + 1.8s", title: "Team responds on-scene", text: "Officer arrives with full incident context on mobile." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader
        eyebrow="Incident Response"
        title={<>Every second, <span className="text-gradient-cyan">accounted for.</span></>}
        description="A single verified alert triggers a coordinated response — with a full evidence trail from the moment of detection."
      />
      <div className="mt-14 relative grid gap-4 md:grid-cols-4">
        {flow.map((f, i) => (
          <motion.div
            key={f.time}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -4 }}
            className="glass rounded-2xl p-6 relative"
          >
            <div className="text-[11px] font-mono text-cyan tracking-widest">{f.time}</div>
            <div className="mt-3 font-display font-semibold text-white">{f.title}</div>
            <div className="mt-2 text-sm text-white/60 leading-relaxed">{f.text}</div>
            {i < flow.length - 1 && (
              <div className="hidden md:block absolute top-1/2 -right-2 w-4 h-px bg-cyan/40" />
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function WhySchoolsNeedAI() {
  const stats = [
    { value: "1 in 5", label: "students experience bullying each school year", source: "National Center for Education Statistics" },
    { value: "67%", label: "of school violence incidents show warning signs on video first", source: "Secret Service NTAC" },
    { value: "27s", label: "average delay between an incident and adult intervention", source: "Campus safety benchmark" },
    { value: "$3.4B", label: "spent on physical security by K-12 schools annually", source: "SIA industry report" },
    { value: "89%", label: "of school-safety directors say they are understaffed for real-time monitoring", source: "TrinetraAI 2025 survey" },
    { value: "< 2s", label: "median time TrinetraAI takes to detect and alert on a verified event", source: "Internal benchmark, Q1 2026" },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader
        eyebrow="Why schools need AI"
        title={<>The stakes have <span className="text-gradient-cyan">outgrown</span> human-only monitoring.</>}
        description="Campus safety leaders are being asked to do more with the same team. AI isn't optional — it's the only way the math works."
      />
      <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {stats.map((s, i) => (
          <motion.div
            key={s.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06 }}
            whileHover={{ y: -6 }}
            className="glass rounded-2xl p-7 relative overflow-hidden group"
          >
            <div className="absolute -top-24 -right-24 w-56 h-56 rounded-full bg-primary/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="text-5xl md:text-6xl font-display font-bold text-gradient-cyan leading-none">{s.value}</div>
            <div className="mt-4 text-white/75 leading-relaxed">{s.label}</div>
            <div className="mt-5 pt-4 border-t border-white/5 text-[11px] font-mono text-white/40">
              Source · {s.source}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Benefits() {
  const rows = [
    { icon: Zap, title: "Sub-2-second alerts", text: "Faster than the fastest human observer. Every second matters in a crisis." },
    { icon: ShieldCheck, title: "94% fewer missed incidents", text: "AI doesn't blink, look away, or take breaks between class periods." },
    { icon: Lock, title: "Zero footage leaves campus", text: "On-prem inference keeps student privacy at the core of every deployment." },
    { icon: BarChart3, title: "Data-backed policy", text: "Show your board what's actually happening — and what your program prevented." },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <div className="grid gap-12 lg:grid-cols-2 items-center">
        <div>
          <SectionHeader
            center={false}
            eyebrow="Why schools choose Trinetra"
            title={<>Safety that scales <span className="text-gradient-cyan">without adding staff.</span></>}
            description="Every district we work with tells us the same thing: they don't need more cameras, they need more attention. TrinetraAI is the attention layer."
          />
        </div>
        <div className="grid sm:grid-cols-2 gap-4">
          {rows.map((r, i) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={r.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
                whileHover={{ y: -4 }}
                className="rounded-2xl glass p-6"
              >
                <Icon className="w-5 h-5 text-cyan" />
                <div className="mt-3 font-semibold text-white">{r.title}</div>
                <div className="mt-1 text-sm text-white/55">{r.text}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function PricingPreview() {
  const tiers = [
    { name: "Campus", price: "$1.2k", per: "/mo per campus", features: ["Up to 30 cameras", "6 core AI models", "Email + SMS alerts", "Weekly briefings"] },
    { name: "District", price: "$4.8k", per: "/mo per district", features: ["Up to 200 cameras", "All 11 AI models", "Dispatch integrations", "Dedicated success mgr"], highlight: true },
    { name: "Enterprise", price: "Custom", per: "annual", features: ["Unlimited cameras", "On-prem deployment", "Custom model training", "24/7 phone support"] },
  ];
  return (
    <section className="mx-auto max-w-7xl px-6 mt-40">
      <SectionHeader eyebrow="Pricing" title={<>Simple plans. <span className="text-gradient-cyan">Real ROI.</span></>} />
      <div className="mt-14 grid gap-4 md:grid-cols-3">
        {tiers.map((t) => (
          <motion.div
            key={t.name}
            whileHover={{ y: -6 }}
            className={`relative rounded-3xl p-8 ${t.highlight ? "glass-strong ring-cyan" : "glass"}`}
          >
            {t.highlight && (
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-cyan px-3 py-0.5 text-[10px] uppercase tracking-widest text-cyan-foreground font-semibold">
                Most popular
              </div>
            )}
            <div className="text-sm font-semibold text-white/80">{t.name}</div>
            <div className="mt-4 flex items-baseline gap-1">
              <div className="text-4xl font-display font-bold text-white">{t.price}</div>
              <div className="text-sm text-white/50">{t.per}</div>
            </div>
            <ul className="mt-6 space-y-2.5 text-sm text-white/70">
              {t.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan shrink-0" /> {f}
                </li>
              ))}
            </ul>
            <Link
              to="/pricing"
              className={`mt-8 inline-flex w-full items-center justify-center gap-1.5 rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                t.highlight ? "bg-primary text-primary-foreground btn-glow" : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
              }`}
            >
              Choose {t.name} <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function FAQ() {
  const items = [
    { q: "Do we need to install new cameras?", a: "No. TrinetraAI works with any IP/RTSP compliant camera. Most districts see immediate value from cameras they've owned for years." },
    { q: "How is student privacy protected?", a: "Inference runs on-premise by default. Footage stays on your network. We use ephemeral snapshots — never facial recognition of students without explicit district opt-in." },
    { q: "What happens on a false positive?", a: "Every alert includes a snapshot and 15-second clip for one-tap human review. Confirmed alerts train the models further; dismissed ones do too." },
    { q: "How long does deployment take?", a: "Typical single-campus rollout is 3–5 business days. Multi-school districts complete in 2–4 weeks including staff training." },
    { q: "Is TrinetraAI FERPA compliant?", a: "Yes. We're SOC 2 Type II certified and align with FERPA, COPPA and state-specific student privacy laws." },
  ];
  const [open, setOpen] = useState<number | null>(0);
  return (
    <section className="mx-auto max-w-3xl px-6 mt-40">
      <SectionHeader eyebrow="FAQ" title={<>Answers, up front.</>} />
      <div className="mt-10 space-y-3">
        {items.map((it, i) => (
          <div key={i} className="glass rounded-2xl overflow-hidden">
            <button
              onClick={() => setOpen(open === i ? null : i)}
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-white">{it.q}</span>
              <ChevronDown className={`w-4 h-4 text-white/60 transition-transform ${open === i ? "rotate-180" : ""}`} />
            </button>
            <motion.div
              initial={false}
              animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-5 text-sm text-white/65 leading-relaxed">{it.a}</div>
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
}
