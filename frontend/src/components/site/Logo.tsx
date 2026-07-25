import logoAsset from "@/assets/trinetraai-logo.png.asset.json";
import { Link } from "@tanstack/react-router";

export function Logo({ size = 36, showText = true }: { size?: number; showText?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 group">
      <div
        className="relative rounded-xl overflow-hidden ring-1 ring-white/10 shrink-0 transition-transform group-hover:scale-105"
        style={{ width: size, height: size }}
      >
        <img src={logoAsset.url} alt="TrinetraAI logo" className="w-full h-full object-cover" />
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
