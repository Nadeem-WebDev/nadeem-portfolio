import { useEffect, useRef } from "react";
import { animate, useAnimate } from "framer-motion";

// Loading screen: counts 0 → 100%, fades the text out, then splits open
// like two curtains to reveal the page. Calls onComplete when it's done.
export default function Preloader({ onComplete }) {
  const [scope, animateInScope] = useAnimate();
  const percentRef = useRef(null);

  useEffect(() => {
    let cancelled = false;

    // Counts the number up in the DOM directly (no React re-render per frame)
    const counter = animate(0, 100, {
      duration: 0.8,
      ease: "easeInOut",
      onUpdate: (value) => {
        if (percentRef.current) percentRef.current.textContent = Math.round(value);
      },
    });

    const run = async () => {
      // 1. Progress bar fills while the number counts up
      await animateInScope(".preloader-bar", { scaleX: 1 }, { duration: 0.8, ease: "easeInOut" });
      if (cancelled) return;

      // 2. Fade the text and bar out
      await animateInScope(".preloader-content", { opacity: 0, y: -20 }, { duration: 0.35, ease: "easeIn" });
      if (cancelled) return;

      // 3. Open the curtains (scaleX instead of width, so nothing re-lays out)
      await animateInScope(
        ".preloader-curtain",
        { scaleX: 0 },
        { duration: 0.6, ease: [0.76, 0, 0.24, 1] }
      );
      if (!cancelled) onComplete();
    };
    run();

    return () => {
      cancelled = true;
      counter.stop();
    };
  }, [animateInScope, onComplete]);

  return (
    <div
      ref={scope}
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none"
      aria-hidden="true"
    >
      {/* Left and right curtains */}
      <div className="preloader-curtain absolute left-0 top-0 h-full w-1/2 bg-slate-50 dark:bg-black origin-left" />
      <div className="preloader-curtain absolute right-0 top-0 h-full w-1/2 bg-slate-50 dark:bg-black origin-right" />

      {/* Counter, label and progress bar */}
      <div className="preloader-content relative z-10 flex flex-col items-center gap-8">
        <div className="relative">
          <div className="text-7xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
            {/* Fixed-width digits so the number doesn't jiggle while counting */}
            <span ref={percentRef} className="inline-block w-[3ch] text-right tabular-nums">
              0
            </span>
            %
          </div>
          {/* Soft glow behind the number */}
          <div className="absolute inset-0 -z-10 blur-3xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-20" />
        </div>

        <p className="text-sm md:text-base font-mono tracking-widest uppercase text-slate-500 dark:text-gray-400 animate-pulse">
          Loading Portfolio
        </p>

        <div className="w-64 h-1 rounded-full overflow-hidden bg-slate-900/10 dark:bg-white/10">
          <div
            className="preloader-bar h-full origin-left bg-gradient-to-r from-blue-500 to-purple-500"
            style={{ transform: "scaleX(0)" }}
          />
        </div>
      </div>
    </div>
  );
}
