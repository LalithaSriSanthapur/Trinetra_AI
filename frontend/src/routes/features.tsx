import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { FeatureCard } from "@/components/site/FeatureCard";
import { CTASection } from "@/components/site/CTASection";
import { Users, AlertOctagon, Heart, Flame, ShieldCheck, MapPin, UserSearch, Layers, Activity, FileBarChart, Lock } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features · TrinetraAI" },
      { name: "description", content: "All 11 AI safety models: bullying, violence, weapons, medical, fire, restricted zones, missing students, crowd analysis, heatmaps, reports and role-based access." },
      { property: "og:title", content: "TrinetraAI Features" },
      { property: "og:description", content: "Eleven safety models built for schools." },
    ],
  }),
  component: FeaturesPage,
});

const FEATURES = [
  { icon: Users, title: "Bullying Detection", description: "Behavioral pose analysis flags cornering, shoving and repeated aggression — even in the noise of a crowded hallway.", tone: "critical" as const },
  { icon: AlertOctagon, title: "Violence Detection", description: "Fights, kicks and thrown objects flagged with sub-2-second latency and 98%+ model accuracy.", tone: "critical" as const },
  { icon: Heart, title: "Medical Emergency Detection", description: "Slips, falls and seizure-like motion route directly to your nurse's device with the camera location attached.", tone: "cyan" as const },
  { icon: Flame, title: "Fire Detection", description: "Visual fire and smoke recognition complements traditional sensors — often flagging incidents 30-60 seconds earlier.", tone: "critical" as const },
  { icon: ShieldCheck, title: "Weapon Detection", description: "Detects firearms, blades and simulated weapons across entryways, hallways and outdoor perimeters.", tone: "critical" as const },
  { icon: MapPin, title: "Restricted Area Monitoring", description: "Draw virtual boundaries. Get alerted the moment anyone enters — student, staff or stranger.", tone: "primary" as const },
  { icon: UserSearch, title: "Missing Student Tracking", description: "Upload a photo; TrinetraAI stitches a movement timeline across your camera network in seconds.", tone: "cyan" as const },
  { icon: Layers, title: "Crowd Analysis", description: "Density mapping and flow analysis prevent dangerous crowding during dismissals and evacuations.", tone: "primary" as const },
  { icon: Activity, title: "Heatmaps", description: "Understand how students actually use your building. Optimize supervision where it matters most.", tone: "cyan" as const },
  { icon: FileBarChart, title: "AI Reports", description: "Automated weekly briefings for principals and quarterly summaries for the school board.", tone: "primary" as const },
  { icon: Lock, title: "Role-Based Access", description: "Granular controls for admins, SROs, nurses and IT — every viewed frame audited, always.", tone: "primary" as const },
];

function FeaturesPage() {
  return (
    <PageShell>
      <section className="mx-auto max-w-7xl px-6">
        <SectionHeader
          eyebrow="Features"
          title={<>Eleven models. <span className="text-gradient-cyan">Zero blind spots.</span></>}
          description="TrinetraAI ships with a purpose-built model suite for every category of incident schools care about — no plugins, no add-ons, no surprises."
        />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => <FeatureCard key={f.title} {...f} index={i} />)}
        </div>
      </section>
      <CTASection />
    </PageShell>
  );
}
