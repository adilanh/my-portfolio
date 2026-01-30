"use client";

import { useMemo } from "react";
import { useReducedMotion } from "framer-motion";

type Star = {
  top: number;
  right: number;
  delay: number;
  duration: number;
  size: number;
  dx: number;
  dy: number;
  tone: "violet" | "cyan";
};

export default function GalaxyAmbient() {
  const shouldReduce = useReducedMotion();
  const stars = useMemo<Star[]>(
    () => [
      { top: 60, right: 60, delay: 0.8, duration: 4.2, size: 3, dx: 0, dy: 980, tone: "violet" },
      { top: 140, right: 140, delay: 1.6, duration: 4.8, size: 3, dx: 0, dy: -980, tone: "cyan" },
      { top: 240, right: 40, delay: 2.3, duration: 3.9, size: 4, dx: 0, dy: 920, tone: "violet" },
      { top: 320, right: 180, delay: 3.1, duration: 4.5, size: 3, dx: 0, dy: -940, tone: "cyan" },
      { top: 420, right: 80, delay: 3.8, duration: 4.1, size: 3, dx: 0, dy: 960, tone: "violet" },
      { top: 520, right: 160, delay: 4.6, duration: 5.0, size: 4, dx: 0, dy: -1000, tone: "cyan" },
      { top: 200, right: 260, delay: 5.2, duration: 4.0, size: 3, dx: 0, dy: 940, tone: "violet" },
      { top: 460, right: 260, delay: 6.0, duration: 4.6, size: 3, dx: 0, dy: -960, tone: "cyan" },
    ],
    []
  );

  if (shouldReduce) return null;

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="ambient-drift absolute -top-48 left-[-10%] h-[520px] w-[520px] rounded-full bg-fuchsia-500/20 blur-[140px]" />
      <div
        className="ambient-drift absolute bottom-[-200px] right-[-10%] h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-[150px]"
        style={{ animationDelay: "6s" }}
      />

      {stars.map((s, idx) => (
        <span
          key={idx}
          className={`fast-star fast-star--${s.tone}`}
          style={{
            top: s.top,
            right: s.right,
            animationDelay: `${s.delay}s`,
            animationDuration: `${s.duration}s`,
            width: s.size,
            height: s.size,
            ["--star-dx" as string]: `${s.dx}px`,
            ["--star-dy" as string]: `${s.dy}px`,
          }}
        />
      ))}
    </div>
  );
}
