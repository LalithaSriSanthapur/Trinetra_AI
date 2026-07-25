export function AnimatedBackground() {
  return (
    <div aria-hidden className="fixed inset-0 -z-10 overflow-hidden bg-background">
      <div className="absolute inset-0 bg-aurora animate-aurora" />
      <div className="absolute inset-0 grid-bg opacity-30" />
      <div className="absolute -top-40 -left-40 w-[520px] h-[520px] rounded-full bg-primary/25 blur-[130px] float-slow" />
      <div className="absolute top-1/3 -right-40 w-[620px] h-[620px] rounded-full bg-cyan/20 blur-[150px] float-slow" style={{ animationDelay: "2s" }} />
      <div className="absolute bottom-0 left-1/3 w-[600px] h-[500px] rounded-full bg-cyan/10 blur-[160px] float-slow" style={{ animationDelay: "4s" }} />
      {/* subtle scanlines */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage:
            "repeating-linear-gradient(0deg, rgba(255,255,255,0.6) 0px, rgba(255,255,255,0.6) 1px, transparent 1px, transparent 3px)",
        }}
      />
    </div>
  );
}
