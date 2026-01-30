"use client";

import React, { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";

type Props = {
  children: React.ReactNode;
  className?: string;
  strength?: number;
};

/**
 * ParallaxSection:
 * - Ngasih efek "depth" pas user scroll.
 * - y transform mengikuti progress scroll saat section lewat viewport.
 */
export default function ParallaxSection({ children, className, strength = 18 }: Props) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [strength, -strength]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.85, 1], [0.98, 1, 1, 0.98]);

  if (reduceMotion) {
    return (
      <section ref={ref as any} className={className}>
        {children}
      </section>
    );
  }

  return (
    <section ref={ref as any} className={className}>
      <motion.div style={{ y, opacity }}>{children}</motion.div>
    </section>
  );
}
