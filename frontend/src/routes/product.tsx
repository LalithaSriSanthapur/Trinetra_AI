import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { DashboardPreview } from "@/components/site/DashboardPreview";
import { LiveActivity } from "@/components/site/LiveActivity";
import { CTASection } from "@/components/site/CTASection";
import { Camera, Cpu, Bell, ShieldCheck, Workflow, Database, ArrowRight } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/product")({
  head: () => ({
    meta: [
      { title: "Product · TrinetraAI" },
      { name: "description", content: "The TrinetraAI platform: a full-stack safety operating system for schools, from camera to console." },
      { property: "og:title", content: "The TrinetraAI Product" },
      { property: "og:description", content: "One platform. Every camera. All the moments that matter." },
    ],
  }),
  component: ProductPage,
});

function ProductPage() {
  const modules = [
    { icon: Camera, title: "Vision Layer", text: "Ingests any IP/RTSP feed. Auto-calibrates for angle, lighting and lens distortion in under 60 seconds." },
    { icon: Cpu, title: "Inference Core", text: "Eleven specialized models running on GPU or Jetson edge. 400ms end-to-end median latency." },
    { icon: Workflow, title: "Response Engine", text: "Rules that route the right event to the right person — nurse for medical, SRO for weapons, admin for behavior." },
    { icon: Bell, title: "Alerts & Comms", text: "Push, SMS, email, radio integration and PA system triggers. Silent lockdown workflows built in." },
    { icon: Database, title: "Evidence Vault", text: "Encrypted, tamper-evident clips and snapshots with chain-of-custody exports for law enforcement." },
    { icon: ShieldCheck, title: "Governance", text: "Role-based access, region-specific retention policies, complete audit logs for every viewed frame." },
  ];
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] items-center">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan uppercase tracking-widest">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan"/> The Product
            </div>
            <h1 className="mt-5 text-5xl md:text-6xl font-bold text-gradient tracking-tight">
              A safety operating system for the modern school.
            </h1>
            <p className="mt-6 text-white/60 text-lg leading-relaxed max-w-xl">
              TrinetraAI is more than detection. It's a full stack — from the pixel to the principal — designed so every incident has a clear owner, a clear response and a clear record.
            </p>
            <div className="mt-8 flex gap-3">
              <a href="/contact" className="inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow">
                Book a walkthrough <ArrowRight className="w-4 h-4"/>
              </a>
            </div>
          </div>
          <DashboardPreview />
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-32">
        <SectionHeader eyebrow="Platform" title={<>Six modules. <span className="text-gradient-cyan">One workflow.</span></>} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="glass rounded-2xl p-6"
              >
                <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-cyan">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="mt-4 font-display font-semibold text-white text-lg">{m.title}</div>
                <div className="mt-2 text-sm text-white/60">{m.text}</div>
              </motion.div>
            );
          })}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-32 grid gap-8 lg:grid-cols-2 items-center">
        <div>
          <SectionHeader
            center={false}
            eyebrow="Live console"
            title={<>See what the AI sees, when it sees it.</>}
            description="Every alert includes a snapshot, a 15-second clip and a confidence score. One-tap dismiss, escalate, or dispatch."
          />
        </div>
        <LiveActivity />
      </section>

      <CTASection />
    </PageShell>
  );
}
