import { createFileRoute, Link } from "@tanstack/react-router";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Logo } from "@/components/site/Logo";
import { Mail, Lock, User, Building2, ArrowRight, ShieldCheck } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/register")({
  head: () => ({
    meta: [
      { title: "Create account · TrinetraAI" },
      { name: "description", content: "Create a TrinetraAI account and start protecting your campus in days." },
      { property: "og:title", content: "Create your TrinetraAI account" },
      { property: "og:description", content: "Deploy AI school safety in under a week." },
    ],
  }),
  component: RegisterPage,
});

function RegisterPage() {
  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/5">
          <Logo />
          <div>
            <div className="text-4xl font-display font-bold text-gradient leading-tight">
              Protect every student with the intelligence layer schools have been waiting for.
            </div>
            <ul className="mt-8 space-y-3 text-sm text-white/70">
              {["Deployed in 3-5 business days", "Works with your existing cameras", "FERPA & SOC 2 by default", "Dedicated onboarding specialist"].map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-cyan"/> {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="text-xs text-white/40">© 2026 TrinetraAI · Intelligent Vision. Safer Schools.</div>
        </div>
        <div className="flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 w-full max-w-md"
          >
            <div className="lg:hidden mb-6"><Logo /></div>
            <h1 className="text-2xl font-display font-bold text-white">Create your account.</h1>
            <p className="mt-1.5 text-sm text-white/55">Get access to the TrinetraAI safety console.</p>

            <form onSubmit={(e) => { e.preventDefault(); window.location.href = '/'; }} className="mt-8 space-y-4">
              <FieldIcon icon={User} placeholder="Full name" />
              <FieldIcon icon={Building2} placeholder="District / organization" />
              <FieldIcon icon={Mail} placeholder="Work email" type="email" />
              <FieldIcon icon={Lock} placeholder="Password" type="password" />
              <label className="flex items-start gap-2 text-xs text-white/60">
                <input type="checkbox" className="mt-0.5 rounded border-white/20 bg-white/5 accent-cyan" />
                I agree to the <a href="#" className="text-cyan hover:underline">Terms of Service</a> and <a href="#" className="text-cyan hover:underline">Privacy Policy</a>.
              </label>
              <button className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow">
                Create account <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-white/55">
              Already have an account? <Link to="/login" className="text-cyan hover:underline">Sign in</Link>
            </p>
          </motion.div>
        </div>
      </div>
    </>
  );
}

function FieldIcon({ icon: Icon, ...rest }: { icon: typeof Mail } & React.InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div className="relative">
      <Icon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-white/40" />
      <input
        {...rest}
        className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary/40"
      />
    </div>
  );
}