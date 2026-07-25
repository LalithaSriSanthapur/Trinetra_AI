import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { loginUser } from "../api/auth";
import { AnimatedBackground } from "@/components/site/AnimatedBackground";
import { Logo } from "@/components/site/Logo";
import { Mail, Lock, ArrowRight, Github } from "lucide-react";
import { motion } from "motion/react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in · TrinetraAI" },
      { name: "description", content: "Sign in to the TrinetraAI safety console." },
      { property: "og:title", content: "Sign in to TrinetraAI" },
      { property: "og:description", content: "Access your school safety console." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginUser({ username: email, password });
      console.log("Logged in:", data);
      alert("Login successful!");
    } catch (err) {
      alert("Login failed");
    }
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen grid lg:grid-cols-2">
        <div className="hidden lg:flex flex-col justify-between p-12 border-r border-white/5">
          <Logo />
          <div>
            <div className="text-4xl font-display font-bold text-gradient leading-tight">
              "Within the first month, TrinetraAI helped us intervene in three altercations before they escalated."
            </div>
            <div className="mt-6 text-sm text-white/60">— Dr. Maria Chen, Superintendent · Lincoln USD</div>
          </div>
          <div className="text-xs text-white/40">© 2026 TrinetraAI · SOC 2 · FERPA</div>
        </div>
        <div className="flex items-center justify-center p-6">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-strong rounded-3xl p-8 w-full max-w-md"
          >
            <div className="lg:hidden mb-6"><Logo /></div>
            <h1 className="text-2xl font-display font-bold text-white">Welcome back.</h1>
            <p className="mt-1.5 text-sm text-white/55">Sign in to your safety console.</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-4">
              <FieldIcon 
                icon={Mail} 
                placeholder="you@district.edu" 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <FieldIcon 
                icon={Lock} 
                placeholder="Password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-white/60">
                  <input type="checkbox" className="rounded border-white/20 bg-white/5 accent-cyan" /> Remember me
                </label>
                <a href="#" className="text-cyan hover:underline">Forgot password?</a>
              </div>
              <button type="submit" className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3 text-sm font-medium text-primary-foreground btn-glow">
                Sign in <ArrowRight className="w-4 h-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3 text-xs text-white/40">
              <div className="h-px flex-1 bg-white/10"/> or <div className="h-px flex-1 bg-white/10"/>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10">
                <span className="text-cyan">G</span> Google
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white hover:bg-white/10">
                <Github className="w-4 h-4"/> SSO
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-white/55">
              New to TrinetraAI? <Link to="/register" className="text-cyan hover:underline">Create an account</Link>
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