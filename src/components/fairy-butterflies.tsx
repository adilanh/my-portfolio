"use client";

import { motion, useReducedMotion } from "framer-motion";

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function ButterflyIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" className={cn("h-10 w-10", className)} fill="none" aria-hidden>
      <path
        d="M32 33c-2.5 0-5-1.4-6.5-3.6C23.5 26 21 22 16 20c-4.7-1.9-8.5.6-9.7 5.2-1.7 6.6 3.2 14.2 11.7 17.2 6.1 2.1 10.8.5 14-3.3"
        fill="currentColor"
        opacity="0.95"
      />
      <path
        d="M32 33c2.5 0 5-1.4 6.5-3.6C40.5 26 43 22 48 20c4.7-1.9 8.5.6 9.7 5.2 1.7 6.6-3.2 14.2-11.7 17.2-6.1 2.1-10.8.5-14-3.3"
        fill="currentColor"
        opacity="0.95"
      />
      <path d="M30.7 31.5c0 7.4-3 13.7-6 18.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M33.3 31.5c0 7.4 3 13.7 6 18.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" opacity="0.9" />
      <path d="M32 31c0 10.2 0 18.7 0 24" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" opacity="0.95" />
    </svg>
  );
}

export default function FairyButterflies({
  className,
  intensity = 1,
}: {
  className?: string;
  intensity?: number;
}) {
  const reduce = useReducedMotion();

  const float = reduce
    ? {}
    : {
        y: [0, -10 * intensity, 0],
        rotate: [0, -1.5 * intensity, 0],
      };

  const float2 = reduce
    ? {}
    : {
        y: [0, 12 * intensity, 0],
        rotate: [0, 1.8 * intensity, 0],
      };

  return (
    <div aria-hidden className={cn("pointer-events-none relative h-10 w-10", className)}>
      <motion.div
        className="absolute left-1/2 top-1/2 h-[260px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-80"
        style={{
          background: "radial-gradient(closest-side, rgba(56,190,255,0.42), rgba(56,190,255,0.10), transparent 70%)",
        }}
        animate={reduce ? {} : { scale: [1, 1.08, 1], x: ["-52%", "-48%", "-52%"] }}
        transition={reduce ? { duration: 0 } : { duration: 6.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        className="absolute left-1/2 top-1/2 h-[240px] w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-75"
        style={{
          background: "radial-gradient(closest-side, rgba(217,70,239,0.40), rgba(217,70,239,0.12), transparent 72%)",
        }}
        animate={reduce ? {} : { scale: [1, 1.06, 1], x: ["-46%", "-54%", "-46%"] }}
        transition={reduce ? { duration: 0 } : { duration: 7.4, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="absolute left-1/2 top-1/2 h-[360px] w-[420px] -translate-x-1/2 -translate-y-1/2 opacity-60">
        {Array.from({ length: 26 }).map((_, i) => {
          const x = ((i * 73) % 420) + 6;
          const y = ((i * 131) % 360) + 6;
          const s = 0.5 + ((i * 19) % 10) / 10;
          const d = ((i * 17) % 20) / 10;
          const dur = 2.2 + ((i * 29) % 10) / 10;
          return (
            <span
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: x,
                top: y,
                width: 2,
                height: 2,
                transform: `scale(${s})`,
                opacity: 0.0,
                animation: `fairyTwinkle ${dur}s ease-in-out ${d}s infinite`,
                boxShadow: "0 0 12px rgba(190,170,255,0.55)",
              }}
            />
          );
        })}
      </div>

      <motion.div
        className="absolute left-1/2 top-[34%] -translate-x-[1.5rem]"
        animate={float}
        transition={reduce ? { duration: 0 } : { duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={reduce ? {} : { rotateZ: [0, 8 * intensity, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
          className="text-cyan-200"
          style={{
            filter: "drop-shadow(0 0 18px rgba(56,190,255,0.55)) drop-shadow(0 0 44px rgba(56,190,255,0.22))",
          }}
        >
          <ButterflyIcon className="h-10 w-10 md:h-12 md:w-12" />
        </motion.div>
      </motion.div>

      <motion.div
        className="absolute left-1/2 top-1/2 -translate-x-[60%] -translate-y-[10%]"
        animate={float2}
        transition={reduce ? { duration: 0 } : { duration: 4.1, repeat: Infinity, ease: "easeInOut" }}
      >
        <motion.div
          animate={reduce ? {} : { rotateZ: [0, -9 * intensity, 0] }}
          transition={reduce ? { duration: 0 } : { duration: 1.05, repeat: Infinity, ease: "easeInOut" }}
          className="text-fuchsia-200"
          style={{
            filter: "drop-shadow(0 0 18px rgba(217,70,239,0.55)) drop-shadow(0 0 44px rgba(217,70,239,0.22))",
          }}
        >
          <ButterflyIcon className="h-10 w-10 md:h-12 md:w-12" />
        </motion.div>
      </motion.div>
    </div>
  );
}
