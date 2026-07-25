import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { motion } from "motion/react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About · TrinetraAI" },
      { name: "description", content: "TrinetraAI is on a mission to make every school as safe as the safest school. Learn about our team, values and story." },
      { property: "og:title", content: "About TrinetraAI" },
      { property: "og:description", content: "Our mission is a safer school day for every student." },
    ],
  }),
  component: AboutPage,
});

const TEAM = [
  { name: "Anika Rao", role: "Co-founder & CEO", bio: "Former product lead at a top-3 school-safety platform. Grew up in an educator household." },
  { name: "Marcus Vale", role: "Co-founder & CTO", bio: "Ex-computer-vision lead at an autonomous vehicles unicorn. Trained the original Trinetra models." },
  { name: "Priya Sharma", role: "Head of Trust", bio: "20 years in K-12 IT security. Wrote the district playbook we all still use." },
  { name: "Jordan Kim", role: "Head of Design", bio: "Designed the first-response tools used by three Fortune 100 security teams." },
];

const VALUES = [
  { title: "Students first, always.", text: "Every product decision is measured against a single question: does this make a student safer today?" },
  { title: "Privacy is not a feature.", text: "It's a foundation. On-prem by default. No student data ever leaves the district without explicit consent." },
  { title: "Ship what actually works.", text: "We publish our benchmarks. Real accuracy, real latency, on real school footage. No slideware." },
  { title: "Earn trust with schools daily.", text: "Districts choose us because we show up — with humility, curiosity and 24/7 support." },
];

function AboutPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 text-center">
        <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan uppercase tracking-widest">
          <span className="w-1.5 h-1.5 rounded-full bg-cyan"/> Our mission
        </div>
        <h1 className="mt-5 text-5xl md:text-6xl font-bold text-gradient tracking-tight leading-tight">
          Make every school as safe as the safest school.
        </h1>
        <p className="mt-6 text-lg text-white/60 leading-relaxed">
          TrinetraAI began in 2023 after a series of preventable incidents at schools where cameras had captured everything and stopped nothing. We built the intelligence layer that turns those cameras into something that finally intervenes.
        </p>
      </section>

      <section className="mx-auto max-w-6xl px-6 mt-24 grid gap-4 md:grid-cols-2">
        {VALUES.map((v, i) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="glass rounded-2xl p-6"
          >
            <div className="text-xs font-mono text-cyan/80">/ VALUE 0{i + 1}</div>
            <div className="mt-2 text-xl font-display font-semibold text-white">{v.title}</div>
            <div className="mt-2 text-sm text-white/60">{v.text}</div>
          </motion.div>
        ))}
      </section>

      <section className="mx-auto max-w-7xl px-6 mt-32">
        <SectionHeader eyebrow="Team" title={<>The people behind Trinetra.</>} />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {TEAM.map((m, i) => (
            <motion.div
              key={m.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5"
            >
              <div className="w-full aspect-square rounded-xl bg-gradient-to-br from-primary/30 via-cyan/20 to-transparent grid place-items-center text-3xl font-display font-bold text-white/80">
                {m.name.split(" ").map(n => n[0]).join("")}
              </div>
              <div className="mt-4 font-display font-semibold text-white">{m.name}</div>
              <div className="text-xs text-cyan">{m.role}</div>
              <div className="mt-2 text-xs text-white/55 leading-relaxed">{m.bio}</div>
            </motion.div>
          ))}
        </div>
      </section>

      <CTASection />
    </PageShell>
  );
}
