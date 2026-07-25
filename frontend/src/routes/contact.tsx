import { createFileRoute } from "@tanstack/react-router";
import { PageShell, SectionHeader } from "@/components/site/PageShell";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact · TrinetraAI" },
      { name: "description", content: "Get in touch with the TrinetraAI team. Book a demo, request a quote, or reach out for support." },
      { property: "og:title", content: "Contact TrinetraAI" },
      { property: "og:description", content: "Book a demo or get in touch with our team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const [sent, setSent] = useState(false);
  return (
    <PageShell>
      <section className="mx-auto max-w-6xl px-6">
        <SectionHeader
          eyebrow="Contact"
          title={<>Let's make your campus safer.</>}
          description="Tell us about your district. A safety specialist will reach out within one business day."
        />
        <div className="mt-14 grid gap-6 lg:grid-cols-[1fr_1.3fr]">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@trinetra.ai" },
              { icon: Phone, label: "Phone", value: "+1 (415) 555-0134" },
              { icon: MapPin, label: "HQ", value: "550 Bryant St, San Francisco, CA" },
            ].map((c) => {
              const Icon = c.icon;
              return (
                <div key={c.label} className="glass rounded-2xl p-5 flex items-center gap-4">
                  <div className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-cyan">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="text-xs uppercase tracking-widest text-white/40">{c.label}</div>
                    <div className="text-white font-medium">{c.value}</div>
                  </div>
                </div>
              );
            })}
            <div className="glass rounded-2xl p-5">
              <div className="text-sm font-semibold text-white">Office hours</div>
              <div className="mt-1 text-xs text-white/60">Mon–Fri · 7am to 7pm PT</div>
              <div className="mt-3 text-xs text-cyan">24/7 emergency support for Enterprise customers</div>
            </div>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="glass-strong rounded-3xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <Field label="First name" placeholder="Alex" />
              <Field label="Last name" placeholder="Chen" />
            </div>
            <Field label="Work email" placeholder="alex@district.edu" type="email" />
            <Field label="District / organization" placeholder="Lincoln USD" />
            <div>
              <Label>Role</Label>
              <select className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40">
                <option className="bg-bg-elevated">Superintendent</option>
                <option className="bg-bg-elevated">Principal</option>
                <option className="bg-bg-elevated">Director of Security</option>
                <option className="bg-bg-elevated">IT Director</option>
                <option className="bg-bg-elevated">Other</option>
              </select>
            </div>
            <div>
              <Label>How can we help?</Label>
              <textarea
                rows={4}
                placeholder="We're looking to modernize our camera system across 8 campuses…"
                className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40 resize-none"
              />
            </div>
            <button
              type="submit"
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow"
            >
              {sent ? "Message sent — we'll be in touch" : (<>Send message <Send className="w-4 h-4"/></>)}
            </button>
            <p className="text-[11px] text-white/40 text-center">
              By submitting this form, you agree to our privacy policy. We'll never share your info.
            </p>
          </form>
        </div>
      </section>
    </PageShell>
  );
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="text-xs font-medium text-white/70">{children}</label>;
}
function Field({ label, ...rest }: { label: string } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <Label>{label}</Label>
      <input
        {...rest}
        className="mt-1.5 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
      />
    </div>
  );
}
