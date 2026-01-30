"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

type Variant = "lift" | "zoom" | "slide-left" | "slide-right" | "flip";

export default function ScrollReveal({
  children,
  delay = 0,
  className,
  once = false,
  variant = "lift",
  stagger = 0, // kalau > 0, child motion akan stagger
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  once?: boolean;
  variant?: Variant;
  stagger?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [inView, setInView] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setInView(true);
        else if (!once) setInView(false);
      },
      {
        threshold: 0.18,
        rootMargin: "0px 0px -10% 0px",
      }
    );

    obs.observe(el);
    return () => obs.disconnect();
  }, [once]);

  const { hidden, show } = useMemo(() => {
    if (reduce) {
      return {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { duration: 0.2, delay } },
      };
    }

    const baseShow = {
      opacity: 1,
      y: 0,
      x: 0,
      scale: 1,
      rotateX: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.85,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    };

    const glow = {
      boxShadow: "0 0 0 rgba(0,0,0,0)",
      transition: {
        duration: 0.9,
        delay,
        ease: [0.16, 1, 0.3, 1],
      },
    };

    if (variant === "zoom") {
      return {
        hidden: { opacity: 0, y: 18, scale: 0.92, filter: "blur(10px)" },
        show: { ...baseShow, ...glow },
      };
    }

    if (variant === "slide-left") {
      return {
        hidden: { opacity: 0, x: 34, y: 8, scale: 0.98, filter: "blur(10px)" },
        show: { ...baseShow, ...glow },
      };
    }

    if (variant === "slide-right") {
      return {
        hidden: { opacity: 0, x: -34, y: 8, scale: 0.98, filter: "blur(10px)" },
        show: { ...baseShow, ...glow },
      };
    }

    if (variant === "flip") {
      return {
        hidden: { opacity: 0, y: 18, rotateX: 18, scale: 0.96, filter: "blur(10px)" },
        show: { ...baseShow, ...glow },
      };
    }

    return {
      hidden: { opacity: 0, y: 36, scale: 0.94, filter: "blur(16px)" },
      show: { ...baseShow, ...glow },
    };
  }, [delay, reduce, variant]);

  const container = useMemo(() => {
    if (!stagger) return undefined;
    return {
      hidden: {},
      show: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };
  }, [stagger, delay]);

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger ? container : undefined}
      style={{ transformPerspective: 1000 }}
    >
      <motion.div variants={!stagger ? { hidden, show } : undefined} initial={false}>
        {children}
      </motion.div>
    </motion.div>
  );
}
