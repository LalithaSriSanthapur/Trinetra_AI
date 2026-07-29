import { Link } from "@tanstack/react-router";

export function Logo({ size = 36, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div
        className="relative rounded-xl overflow-hidden bg-cyan-500/10 ring-1 ring-cyan-500/20 shrink-0 flex items-center justify-center font-bold text-cyan-400 transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        T
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className="font-display font-bold text-white tracking-tight text-lg">
            Trinetra<span className="text-gradient-cyan">AI</span>
          </span>
          <span className="text-[10px] uppercase tracking-[0.18em] text-white/40 mt-0.5">
            Intelligent Vision
          </span>
        </div>
      )}
    </Link>
  );
}