import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { CTASection } from "@/components/site/CTASection";
import { ShieldCheck, ArrowRight, Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    meta: [
      { title: "Pricing · TrinetraAI" },
      { name: "description", content: "Simple, per-campus and per-district pricing for AI school safety. No hidden fees, no per-camera surprises." },
      { property: "og:title", content: "TrinetraAI Pricing" },
      { property: "og:description", content: "Simple plans that scale from a single campus to statewide districts." },
    ],
  }),
  component: PricingPage,
});

function PricingPage() {
  const tiers = [
    {
      name: "Campus",
      price: "$1,200",
      per: "/month per campus",
      description: "Perfect for individual schools looking to modernize existing camera systems.",
      features: [
        "Up to 30 cameras",
        "6 core AI models",
        "Email + SMS alerts",
        "Weekly briefings",
        "Standard support",
        "30-day evidence retention",
      ],
    },
    {
      name: "District",
      price: "$4,800",
      per: "/month per district",
      description: "For districts running 3+ campuses that need centralized visibility and response.",
      features: [
        "Up to 200 cameras",
        "All 11 AI models",
        "Dispatch integrations",
        "Dedicated success manager",
        "Priority support (24/5)",
        "1-year evidence retention",
        "Custom reporting",
        "Multi-campus console",
      ],
      highlight: true,
    },
    {
      name: "Enterprise",
      price: "Custom",
      per: "annual contract",
      description: "For statewide agencies, large private networks and specialized deployments.",
      features: [
        "Unlimited cameras",
        "On-prem deployment",
        "Custom model training",
        "24/7 phone support",
        "Dedicated infra team",
        "Custom retention SLAs",
        "White-glove onboarding",
        "SLA-backed uptime",
      ],
    },
  ];
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Pricing"
          title={<>Priced per campus. <span className="text-gradient-cyan">Not per surprise.</span></>}
          description="No per-camera fees. No per-alert billing. Choose a plan by campus size, and every feature scales with you."
        />
        <div className="mt-14 grid gap-4 lg:grid-cols-3">
          {tiers.map((t) => (
            <div
              key={t.name}
              className={`relative rounded-3xl p-8 flex flex-col ${t.highlight ? "glass-strong ring-cyan" : "glass"}`}
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
              <p className="mt-3 text-sm text-white/60">{t.description}</p>
              <ul className="mt-6 space-y-2.5 text-sm text-white/75 flex-1">
                {t.features.map((f) => (
                  <li key={f} className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-cyan shrink-0" /> {f}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                className={`mt-8 inline-flex items-center justify-center gap-1.5 rounded-xl px-4 py-3 text-sm font-medium transition ${
                  t.highlight ? "bg-primary text-primary-foreground btn-glow" : "border border-white/10 bg-white/5 text-white hover:bg-white/10"
                }`}
              >
                Get started <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        <div className="mt-14 glass-strong rounded-3xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-cyan/15 grid place-items-center text-cyan">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="font-display font-semibold text-white text-lg">Every plan includes</div>
              <div className="text-sm text-white/60">SOC 2 · FERPA · On-prem option · 99.9% uptime SLA · Free onboarding</div>
            </div>
          </div>
          <Link to="/contact" className="rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow">
            Talk to sales
          </Link>
        </div>
      </section>
      <CTASection />
    </PageShell>
  );
}
