"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import ScrollReveal from "@/components/scroll-reveal";
import ParallaxSection from "@/components/parallax-section";
import MagneticButton from "@/components/magnetic-button";
import CursorGlow from "@/components/cursor-glow";
import GalaxyAmbient from "@/components/galaxy-ambient";
import ScrollProgress from "@/components/scroll-progress";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
];

type Project = {
  title: string;
  subtitle?: string;
  tag: string;
  desc: string;
  longDesc: string;
  role: string;
  type: string;
  year: string;
  highlights: string[];
  problem: string;
  solution: string;
  decisions: string[];
  outcome: string;
  stack: string[];
  demoVideo?: string;
  poster?: string;
  github?: string;
  live?: string;
  details?: string;
  status?: "In Progress" | "Completed";
};

const PROJECTS: Project[] = [
  {
    title: "SIANTAR",
    subtitle: "Sistem Arsip Naskah & Tata Persuratan",
    tag: "Web App",
    status: "In Progress",
    desc: "Role-based management for incoming/outgoing letters with fast search and monthly reports.",
    longDesc:
      "Administrative archiving system that streamlines institutional correspondence workflows. Includes role-based access, searchable archives, structured metadata, and periodic reporting to support operational accountability.",
    role: "Frontend / System Design",
    type: "Institutional System",
    year: "2025",
    highlights: ["Role-based access control (RBAC)", "Fast archive search & reporting", "Structured document workflow"],
    problem: "Manual archiving caused duplication, slow retrieval, and reporting delays for institutional correspondence.",
    solution:
      "Built a role-based dashboard with structured workflows for incoming/outgoing letters, searchable archives, and report-ready data.",
    decisions: [
      "RBAC to separate admin and staff permissions",
      "REST API for predictable integration",
      "Search-first UX for fast retrieval",
      "Report queries optimized for monthly summaries",
    ],
    outcome: "Faster lookup, clearer accountability, and a repeatable reporting flow.",
    stack: ["React", "TypeScript", "Tailwind", "REST API", "MySQL"],
    demoVideo: "/demo/siantar.mp4",
    poster: "/demo/siantar.jpeg",
    github: "https://github.com/adilanh",
    live: "#",
    details: "#",
  },
  {
    title: "CoffeePahoman",
    subtitle: "GIS Coffee Map",
    tag: "GIS",
    status: "Completed",
    desc: "Interactive coffee map with filters, listing, and simple location insights.",
    longDesc:
      "GIS-based experience that combines map interactions (markers, popups) with searchable listings and category filters. Built to support exploration and lightweight location analysis.",
    role: "Frontend / Data Visualization",
    type: "Spatial Data App",
    year: "2025",
    highlights: ["Interactive map + filters", "GeoJSON-driven data layer", "Synced list & map state"],
    problem: "Local coffee data was scattered, making it hard to see distribution patterns and nearby options.",
    solution: "Mapped coffee locations with filters and listings to enable spatial exploration and quick insights.",
    decisions: ["Leaflet for lightweight, interactive maps", "GeoJSON for structured spatial data", "Filterable listing synced to map state"],
    outcome: "Clearer location coverage and easier discovery by area or category.",
    stack: ["React", "Leaflet", "GeoJSON"],
    demoVideo: "/demo/coffeepahoman.mp4",
    poster: "/demo/coffeepahoman.jpeg",
    github: "https://github.com/adilanh",
    live: "#",
    details: "#",
  },
  {
    title: "NOKA",
    subtitle: "Cocoa Disease Expert System",
    tag: "AI",
    status: "Completed",
    desc: "Rule-based expert system to diagnose cocoa diseases and recommend treatments.",
    longDesc:
      "Expert system that identifies cocoa plant diseases using rule-based inference from observable symptoms and provides recommendation outputs. Designed for clarity, explainability, and practical guidance.",
    role: "System Design / AI Logic",
    type: "Decision Support",
    year: "2025",
    highlights: ["Explainable rule-based inference", "Symptom-driven inputs", "Actionable treatment outputs"],
    problem: "Farmers struggled to identify plant diseases accurately from visible symptoms.",
    solution: "Implemented an explainable expert system that maps symptoms to diagnoses and treatment guidance.",
    decisions: ["Rule-based inference for transparency", "Symptom-driven input flow", "Explainable outputs over black-box ML"],
    outcome: "Clear decision support that is easy to validate and trust in the field.",
    stack: ["Python", "Expert System", "Rule-based AI"],
    demoVideo: "/demo/noka.mp4",
    poster: "/demo/noka.jpeg",
    github: "https://github.com/adilanh",
    live: "#",
    details: "#",
  },
  {
    title: "PicCrown",
    subtitle: "Photo Rating Platform",
    tag: "Web",
    status: "Completed",
    desc: "Photo upload + rating + leaderboard with authentication for engagement.",
    longDesc:
      "Interactive platform where users can upload photos, receive ratings, and view rankings. Built as a UX exploration project with authentication and basic engagement mechanics.",
    role: "Frontend / Product UX",
    type: "Interactive Platform",
    year: "2025",
    highlights: ["Auth + protected uploads", "Ratings & leaderboard loop", "Engagement-driven UX"],
    problem: "Static galleries lacked engagement and clear feedback loops for contributors.",
    solution: "Built an interactive platform with auth, uploads, ratings, and leaderboards to drive participation.",
    decisions: ["Authentication to protect submissions", "Ratings to create feedback loops", "Leaderboard for lightweight gamification"],
    outcome: "Higher engagement through clear user flows and visible outcomes.",
    stack: ["React", "Firebase", "Auth"],
    demoVideo: "/demo/piccrown.mp4",
    poster: "/demo/piccrown.jpeg",
    github: "https://github.com/adilanh",
    live: "#",
    details: "#",
  },
];

const SKILLS = [
  { group: "Software Development", items: ["React", "TypeScript", "Tailwind", "Bootstrap", "Vite"] },
  { group: "Backend/Database", items: ["REST API", "MySQL", "PostgreSQL (basic)", "Node.js (basic)"] },
  { group: "Machine Learning / Data Science", items: ["Python", "Pandas", "scikit-learn", "TensorFlow/Keras"] },
  { group: "Tools", items: ["Git/GitHub", "Figma", "Postman", "Docker (basic)"] },
];

const WRITINGS = [
  { title: "From Raw Data to Decision Support", outlet: "Medium", href: "#" },
  { title: "Building Explainable ML Pipelines", outlet: "LinkedIn", href: "#" },
  { title: "Designing Admin Systems with RBAC", outlet: "Blog", href: "#" },
];

const TESTIMONIALS = [
  {
    quote: "Adila delivers structured workflows with clear documentation. The reporting output was easy to adopt.",
    author: "Project Stakeholder",
    role: "Institutional Client",
  },
  {
    quote: "Strong attention to UX details and consistent UI systems. Communicates progress clearly.",
    author: "Collaborator",
    role: "Team Member",
  },
];

const SKILL_ICONS: Record<string, React.ReactNode> = {
  React: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="12" cy="12" r="1.6" />
      <ellipse cx="12" cy="12" rx="9" ry="3.6" />
      <ellipse cx="12" cy="12" rx="3.6" ry="9" transform="rotate(60 12 12)" />
      <ellipse cx="12" cy="12" rx="3.6" ry="9" transform="rotate(-60 12 12)" />
    </svg>
  ),
  TypeScript: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3.5" y="3.5" width="17" height="17" rx="2.5" />
      <path d="M8 10h4M10 10v6M15 10h2.5c1.2 0 1.8.6 1.8 1.4 0 .8-.6 1.4-1.8 1.4h-2.5v3" />
    </svg>
  ),
  Python: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M7 9a4 4 0 0 1 4-4h4a3 3 0 0 1 3 3v4h-6a4 4 0 0 1-4-4z" />
      <circle cx="11" cy="7.5" r="0.8" />
      <path d="M17 15a4 4 0 0 1-4 4H9a3 3 0 0 1-3-3v-4h6a4 4 0 0 1 4 4z" />
      <circle cx="13" cy="16.5" r="0.8" />
    </svg>
  ),
  Tailwind: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M5 12c1.6-2 3.6-3 6-3 2.4 0 4 1 5.2 3 1.1 2 2.8 3 5.8 3" />
      <path d="M2 12c1.6 2 3.6 3 6 3 2.4 0 4-1 5.2-3 1.1-2 2.8-3 5.8-3" />
    </svg>
  ),
  "Node.js (basic)": (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M12 2.8 20 7.3v9.4l-8 4.5-8-4.5V7.3z" />
      <path d="M9.5 9.5h3.2c1.5 0 2.3.8 2.3 2 0 1.2-.8 2-2.3 2H9.5z" />
    </svg>
  ),
  "Git/GitHub": (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <circle cx="6" cy="6" r="2.2" />
      <circle cx="18" cy="6" r="2.2" />
      <circle cx="12" cy="18" r="2.2" />
      <path d="M8 7.5l3.5 8M16 7.5l-3.5 8" />
    </svg>
  ),
  Figma: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 3h6a3 3 0 1 1 0 6H9z" />
      <path d="M9 9h6a3 3 0 1 1 0 6H9z" />
      <path d="M9 15h6a3 3 0 1 1 0 6H9z" />
      <path d="M9 3a3 3 0 1 0 0 6" />
      <path d="M9 9a3 3 0 1 0 0 6" />
    </svg>
  ),
  Docker: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M3 13h18c0 4-3.5 7-8 7H9c-3.3 0-6-2.7-6-6z" />
      <path d="M6 10h3v3H6zM10 10h3v3h-3zM14 10h3v3h-3zM10 6h3v3h-3z" />
    </svg>
  ),
  MySQL: (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M6 9c0-2.2 2.7-4 6-4s6 1.8 6 4-2.7 4-6 4-6-1.8-6-4z" />
      <path d="M6 9v6c0 2.2 2.7 4 6 4s6-1.8 6-4V9" />
    </svg>
  ),
  "REST API": (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M4 7h6M4 12h10M4 17h8" />
      <circle cx="18" cy="7" r="2" />
      <circle cx="20" cy="12" r="2" />
      <circle cx="18" cy="17" r="2" />
    </svg>
  ),
};

function cn(...parts: Array<string | undefined | false>) {
  return parts.filter(Boolean).join(" ");
}

function GlowBg() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute -top-40 left-1/2 h-[520px] w-[520px] -translate-x-1/2 rounded-full bg-fuchsia-500/25 blur-3xl" />
      <div className="absolute top-20 right-[-140px] h-[520px] w-[520px] rounded-full bg-cyan-400/20 blur-3xl" />
      <div className="absolute bottom-[-200px] left-[-180px] h-[620px] w-[620px] rounded-full bg-indigo-500/25 blur-3xl" />

      <div className="absolute inset-0 opacity-[0.18] [background-image:linear-gradient(to_right,rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:64px_64px]" />

      <svg className="absolute inset-0 opacity-35" viewBox="0 0 1200 900" fill="none">
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 97) % 1200;
          const y = (i * 151) % 900;
          const r = (i % 3) + 0.8;
          return <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={(i % 10) / 15 + 0.15} />;
        })}
      </svg>
    </div>
  );
}

function Glass({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "relative rounded-3xl border border-white/10 bg-white/[0.06] backdrop-blur-xl",
        "shadow-[0_20px_80px_-30px_rgba(0,0,0,0.75)]",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
      {children}
    </div>
  );
}

function Pill({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80",
        className
      )}
    >
      {children}
    </span>
  );
}

function Button({
  children,
  href = "#",
  variant = "primary",
  target,
}: {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "ghost";
  target?: "_blank";
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-fuchsia-400 to-indigo-400 text-slate-950 hover:brightness-110"
      : "border border-white/12 bg-white/5 text-white/90 hover:bg-white/10";
  return (
    <a href={href} target={target} rel={target ? "noreferrer" : undefined} className={cn(base, styles)}>
      {children}
    </a>
  );
}

function SkillBadge({ label }: { label: string }) {
  const abbr = label
    .replace(/[^\w]/g, " ")
    .trim()
    .split(/\s+/)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 transition hover:-translate-y-0.5 hover:border-white/20">
      <span className="grid h-5 w-5 place-items-center rounded-full border border-white/15 bg-white/10 text-[10px] font-semibold text-white/80">
        {SKILL_ICONS[label] ?? abbr}
      </span>
      <span>{label}</span>
    </span>
  );
}

function ActionButton({
  children,
  variant = "primary",
  onClick,
}: {
  children: React.ReactNode;
  variant?: "primary" | "ghost";
  onClick?: () => void;
}) {
  const base =
    "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition active:scale-[0.98]";
  const styles =
    variant === "primary"
      ? "bg-gradient-to-r from-fuchsia-400 to-indigo-400 text-slate-950 hover:brightness-110"
      : "border border-white/12 bg-white/5 text-white/90 hover:bg-white/10";
  return (
    <button type="button" onClick={onClick} className={cn(base, styles)}>
      {children}
    </button>
  );
}

function Marquee({ items }: { items: string[] }) {
  const doubled = [...items, ...items];
  return (
    <div className="marquee">
      <div className="marquee-track">
        {doubled.map((item, idx) => (
          <span
            key={`${item}-${idx}`}
            className="whitespace-nowrap rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80"
          >
            {item}
          </span>
        ))}
      </div>
    </div>
  );
}

function Navbar() {
  return (
    <div className="sticky top-0 z-50 border-b border-white/10 bg-slate-950/60 backdrop-blur-xl">
      <div className="mx-auto flex max-w-6xl items-center gap-4 px-5 py-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-400/90 to-cyan-300/80 text-slate-950 shadow-[0_0_40px_-12px_rgba(217,70,239,0.85)]">
            <span className="text-sm font-black">AN</span>
          </div>
          <div className="leading-tight">
            <div className="text-sm font-bold text-white">Adila</div>
            <div className="text-xs text-white/60">Software • ML • Data</div>
          </div>
        </div>

        <div className="ml-auto hidden items-center gap-6 md:flex">
          {NAV.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-white/70 hover:text-white">
              {n.label}
            </a>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-2 md:ml-6">
          <Button variant="ghost" href="#contact">
            Contact
          </Button>
          <Button href="#projects" variant="primary">
            View Work
          </Button>
        </div>
      </div>
    </div>
  );
}

/* ======================
   TOP BANNER (FULL WIDTH)
====================== */

function TopBanner() {
  const name = "ADILANH";

  // deterministic stars (no random on re-render)
  const stars = useMemo(() => {
    return Array.from({ length: 28 }).map((_, i) => {
      const x = ((i * 73) % 1000) / 10; // 0..100
      const y = ((i * 191) % 1000) / 10;
      const s = 0.55 + ((i * 29) % 100) / 170;
      const d = ((i * 17) % 100) / 10;
      const v = 10 + ((i * 13) % 100) / 3;
      const cyan = i % 3 === 0;
      return { x, y, s, d, v, cyan };
    });
  }, []);

  const [hideScrollCue, setHideScrollCue] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      // hide setelah scroll turun dikit
      setHideScrollCue(window.scrollY > 60);
    };

    onScroll(); // set initial
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.15 } },
  };

  const letter = {
    hidden: { opacity: 0, x: 46, y: 0, filter: "blur(12px)" },
    show: {
      opacity: 1,
      x: 0,
      y: 0,
      filter: "blur(0px)",
      transition: { duration: 1.25, ease: [0.12, 0.95, 0.2, 1] },
    },
  };

  return (
    <section className="relative overflow-hidden border-b border-white/10">
      <div className="intro-wrap intro-wrap--tall relative">
        {/* soft fairy veil */}
        <div aria-hidden className="intro-veil" />

        {/* stars + shooting */}
        <div aria-hidden className="intro-stars">
          {stars.map((st, idx) => (
            <span
              key={idx}
              className={cn("intro-star", st.cyan && "intro-star--cyan")}
              style={
                {
                  left: `${st.x}%`,
                  top: `${st.y}%`,
                  transform: `scale(${st.s})`,
                  animationDelay: `${st.d}s`,
                  animationDuration: `${st.v}s`,
                } as React.CSSProperties
              }
            />
          ))}
          <span className="intro-shoot" style={{ left: "12%", top: "18%" } as React.CSSProperties} />
          <span className="intro-shoot intro-shoot--2" style={{ left: "58%", top: "10%" } as React.CSSProperties} />
          <span className="intro-shoot intro-shoot--3" style={{ left: "78%", top: "26%" } as React.CSSProperties} />
        </div>

        {/* content */}
        <div className="relative z-[2] mx-auto h-full min-h-[calc(100vh-76px)] max-w-6xl px-5 pt-[14vh]">
          {/* CENTER BLOCK (judul + subtitle) */}
          <div className="intro-content">
            <motion.div initial="hidden" animate="show" variants={container} className="relative">
              <div aria-hidden className="intro-glow intro-glow--fairy" />

              <motion.h1
                className="intro-title font-display font-extrabold tracking-[0.55em] text-white"
                style={{ paddingLeft: "0.55em" }}
              >
              {name.split("").map((ch, i) => {
                const isI = i === 2;

                return (
                  <motion.span
                    key={`${ch}-${i}`}
                    variants={letter}
                    data-letter-index={i}
                    className="intro-letter relative inline-block"
                    style={{ ["--i" as any]: i } as React.CSSProperties}
                  >
                    {ch}

                    {isI && (
                      <span className="absolute left-1/2 top-[-24px] -translate-x-1/2 translate-x-[2px]">
                      </span>
                    )}
                  </motion.span>
                );
              })}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 10, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
                className="intro-sub mx-auto text-center"
              >
                <span className="block">
                  Software Machine Learning Data Systems Clean UI, real workflows, measurable outcomes.
                </span>
              </motion.p>
            </motion.div>
          </div>

          {/* SCROLL (SELALU DI BAWAH) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={
              hideScrollCue
                ? { opacity: 0, y: 14, pointerEvents: "none" }
                : { opacity: 1, y: 0, pointerEvents: "auto" }
            }
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="intro-scroll intro-scroll--bottom"
          >
            <div className="text-xs font-semibold tracking-wider text-white/60">SCROLL TO EXPLORE</div>

            <a href="#home" className="scroll-cue" aria-label="Scroll to content">
              <span className="scroll-cue__dot" />
              <svg viewBox="0 0 24 24" className="scroll-cue__arrow" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ======================
   HERO (your existing)
====================== */

function Hero() {
  return (
    <section id="home" className="relative">
      <div className="mx-auto grid max-w-6xl gap-6 px-5 py-10 md:grid-cols-12 md:py-14">
        <div className="md:col-span-7">
          <Glass className="p-7 md:p-9">
            <Pill className="mb-4">Open for Internship / Collaboration</Pill>

            <h1 className="font-display text-3xl font-extrabold leading-tight text-white md:text-5xl">
              Hi, I&apos;m{" "}
              <span className="bg-gradient-to-r from-fuchsia-300 to-cyan-200 bg-clip-text text-transparent">
                Adila Nurul Hidayah
              </span>
            </h1>

            <h2 className="mt-2 font-display text-2xl font-semibold text-white md:text-3xl">
              Software Developer focused on <span className="text-fuchsia-300">Machine Learning</span> &{" "}
              <span className="text-cyan-300">Data Science</span>
            </h2>

            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-white/85 md:text-base">
              I design and build clean, scalable web applications with a focus on data-driven workflows. My work spans
              software development, ML experimentation, and practical analytics systems.
            </p>

            <div className="mt-5 grid gap-2 text-sm text-white/80 sm:grid-cols-2">
              {[
                "UI implementation with consistent systems",
                "Role-based apps, search, and reporting",
                "ML pipelines and evaluation dashboards",
                "Clear documentation and teamwork",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2">
                  <span className="mt-1 h-2 w-2 rounded-full bg-gradient-to-r from-fuchsia-300 to-cyan-200" />
                  <span>{item}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              <MagneticButton>
                <Button href="#projects" variant="primary">
                  View Projects
                </Button>
              </MagneticButton>
              <Button href="#about" variant="ghost">
                About Me
              </Button>
              <Button href="/resume.pdf" variant="ghost">
                Download CV
              </Button>
            </div>
          </Glass>
        </div>

        <div className="md:col-span-5">
          <Glass className="h-full p-6">
            <div className="flex items-center justify-between">
              <Pill>Highlights</Pill>
              <span className="text-xs text-white/55">2026</span>
            </div>

            <div className="mt-5 grid gap-4">
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/25 via-fuchsia-500/15 to-cyan-400/20 p-5">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-fuchsia-400/20 blur-2xl" />
                <div className="absolute -left-10 bottom-[-30px] h-40 w-40 rounded-full bg-cyan-300/20 blur-2xl" />

                <div className="relative">
                  <div className="text-sm font-semibold text-white">Featured</div>
                  <div className="mt-1 text-xs text-white/60">SIANTAR — Case Study</div>

                  <div className="mt-4 grid gap-3">
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-xs text-white/60">What I delivered</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        Dashboard UI, role-based access, search, monthly reports
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <div className="text-xs text-white/60">Design approach</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        Clear layout, consistent components, and practical workflows
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2">
                    <Pill className="border-fuchsia-300/20">UI/UX</Pill>
                    <Pill className="border-cyan-300/20">Admin Workflow</Pill>
                    <Pill className="border-indigo-300/20">Reporting</Pill>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="text-sm font-semibold text-white">Availability</div>
                    <div className="mt-1 text-xs text-white/60">Internship • Collaboration</div>
                  </div>
                  <span className="rounded-xl bg-gradient-to-r from-fuchsia-300/80 to-indigo-300/80 px-3 py-1 text-xs font-semibold text-slate-950">
                    Open
                  </span>
                </div>

                <div className="mt-4 grid gap-3 text-sm text-white/75">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <span>Focus</span>
                    <span className="text-white/90">Product UI + Data Systems</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-4">
                    <span>Tools</span>
                    <span className="text-white/90">React, TypeScript, Python</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <MagneticButton>
                    <Button href="#contact" variant="primary">
                      Get in touch
                    </Button>
                  </MagneticButton>
                  <Button href="#projects" variant="ghost">
                    See work
                  </Button>
                </div>
              </div>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-5 py-10">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-5">
          <Glass className="p-7">
            <Pill className="mb-3">About</Pill>
            <h2 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">Adila Nurul Hidayah</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/85">
              I am a Computer Science student with a strong interest in software development, machine learning, and data
              science. I enjoy building structured, maintainable applications—especially dashboards, administrative
              systems, and data-driven platforms—while exploring how machine learning can enhance real-world workflows.
            </p>

            <div className="mt-6 flex flex-wrap gap-2">
              <Pill>Bandar Lampung</Pill>
              <Pill>Software Development</Pill>
              <Pill>Machine Learning</Pill>
              <Pill>Data Science</Pill>
            </div>

            <div className="mt-6 flex gap-2">
              <Button href="#contact" variant="primary">
                Contact
              </Button>
              <Button href="#projects" variant="ghost">
                Projects
              </Button>
            </div>
          </Glass>
        </div>

        <div className="md:col-span-7">
          <Glass className="p-7">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-sm font-semibold text-white">Strengths</div>
                <div className="text-xs text-white/60">How I work</div>
              </div>
              <Pill className="border-cyan-300/20">detail-oriented</Pill>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              {[
                {
                  t: "Clean UI Implementation",
                  d: "Translate designs into production-ready Tailwind UI with consistent spacing and components.",
                },
                {
                  t: "System & Workflow Design",
                  d: "Build CRUD, role-based access, search/filter, and reporting features for administrative needs.",
                },
                {
                  t: "ML & Data Experimentation",
                  d: "Develop pipelines for preprocessing, training, evaluation, and result visualization.",
                },
                {
                  t: "Team Collaboration",
                  d: "Comfortable with documentation, communication, and iterative development in collaborative work.",
                },
              ].map((x) => (
                <div
                  key={x.t}
                  className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-transform hover:-translate-y-1 hover:border-white/20"
                >
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <p className="mt-2 text-sm text-white/80">{x.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-6">
              <div className="text-sm font-semibold text-white">Currently</div>
              <p className="mt-2 text-sm text-white/80">
                I&apos;m refining my portfolio and turning projects into concise case studies that clearly communicate
                goals, implementation choices, and measurable outcomes.
              </p>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
}

/* ======================
   PROJECTS (YOUR NEW LAYOUT)
====================== */

function Projects() {
  const [active, setActive] = useState(0);
  const [sidebarTab, setSidebarTab] = useState(0);
  const [caseOpen, setCaseOpen] = useState(false);

  const filtered = PROJECTS;

  useEffect(() => {
    setSidebarTab(0);
    setCaseOpen(false);
  }, [active]);

  useEffect(() => {
    if (!caseOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [caseOpen]);

  useEffect(() => {
    const root = document.documentElement;
    root.dataset.caseStudyOpen = caseOpen ? "true" : "false";
    return () => {
      delete root.dataset.caseStudyOpen;
    };
  }, [caseOpen]);

  const safeActive = Math.min(active, Math.max(0, filtered.length - 1));
  const proj = filtered[safeActive] ?? PROJECTS[0];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Pill className="mb-3">Projects</Pill>
          <h2 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">Case Studies</h2>
          <p className="mt-2 font-body text-sm text-white/80">Browse projects from the sidebar, watch the demo, and open the repository.</p>
        </div>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-12">
        {/* LEFT SIDEBAR */}
        <div className="relative lg:col-span-4 lg:w-[calc(100%-62px)] lg:justify-self-start rounded-3xl border border-white/10 bg-transparent shadow-[0_0_40px_rgba(99,102,241,0.18)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          <div className="border-b border-white/10 p-4">
            <div className="text-xs font-semibold tracking-wider text-white/60">PROJECTS</div>
          </div>

          <div className="max-h-[520px] overflow-y-auto px-2 pr-3 py-2 md:max-h-[640px]">
            {filtered.length === 0 ? (
              <div className="p-4 text-sm text-white/60">No projects found.</div>
            ) : (
              <div className="grid gap-2">
                {filtered.map((p, idx) => {
                  const isActive = idx === safeActive;
                  return (
                    <button
                      key={p.title}
                      onClick={() => setActive(idx)}
                      className={cn(
                        "w-full rounded-2xl border p-2 text-left transition hover:-translate-y-0.5 hover:border-white/20",
                        isActive
                          ? "border-white/15 bg-gradient-to-r from-indigo-500/25 via-fuchsia-500/15 to-cyan-400/15"
                          : "border-white/10 bg-white/5 hover:bg-white/10"
                      )}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={cn(
                            "mt-0.5 grid h-9 w-9 place-items-center rounded-xl text-xs font-black",
                            isActive
                              ? "bg-gradient-to-br from-fuchsia-300 to-cyan-200 text-slate-950"
                              : "bg-white/10 text-white/80"
                          )}
                        >
                          {p.title.slice(0, 1)}
                        </div>

                        <div className="min-w-0">
                          <div className="truncate text-sm font-semibold text-white">{p.title}</div>
                          <div className="truncate text-xs text-white/60">{p.subtitle ?? p.tag}</div>

                          <div className="mt-2 flex items-center gap-2 text-[11px] text-white/60">
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">{p.tag}</span>
                            {p.status ? <span className="truncate">{p.status}</span> : null}
                          </div>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* CENTER: VIDEO */}
        <div className="relative lg:col-span-5 lg:ml-[-62px] rounded-3xl border border-white/10 bg-transparent shadow-[0_0_40px_rgba(168,85,247,0.18)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          <div className="border-b border-white/10 p-4">
            <div className="flex items-center justify-between gap-3">
              <div className="min-w-0">
                <div className="truncate text-sm font-semibold text-white">
                  {proj.title}
                  {proj.subtitle ? <span className="text-white/60"> / {proj.subtitle}</span> : null}
                </div>
                <div className="mt-1 text-xs text-white/60">Demo Preview</div>
              </div>

              <div className="flex items-center gap-2">
                <Pill className="border-white/12">{proj.tag}</Pill>
              </div>
            </div>
          </div>

          <div className="p-4">
            <motion.div
              key={proj.title}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5"
            >
              <video
                className="h-[360px] w-full object-cover md:h-[420px]"
                src={proj.demoVideo}
                poster={proj.poster}
                muted
                loop
                playsInline
                preload="metadata"
              />

              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-slate-950/70 via-slate-950/10 to-transparent opacity-0 transition group-hover:opacity-100" />

              <div className="pointer-events-none absolute inset-0 flex items-end justify-between p-4 opacity-0 transition group-hover:opacity-100">
                <div className="pointer-events-auto">
                  <div className="text-sm font-semibold text-white">Open project</div>
                  <div className="text-xs text-white/60">GitHub, Live, or Details</div>
                </div>

                <div className="pointer-events-auto flex flex-wrap gap-2 justify-end">
                  <Button href={proj.github ?? "#"} target="_blank" variant="ghost">
                    GitHub
                  </Button>
                  <Button href={proj.live ?? "#"} target="_blank" variant="ghost">
                    Live
                  </Button>
                  <Button href={proj.details ?? "#"} variant="primary">
                    Details
                  </Button>
                </div>
              </div>
            </motion.div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Summary</div>
              <div className="mt-1 text-sm text-white/80">{proj.desc}</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR */}
        <div className="relative lg:col-span-3 rounded-3xl border border-white/10 bg-transparent shadow-[0_0_40px_rgba(59,130,246,0.18)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          <div className="border-b border-white/10 p-4">
            <div className="text-xs font-semibold tracking-wider text-white/60">INSPECT</div>
          </div>

          <div className="p-4 space-y-4">
            <div className="flex flex-wrap gap-2">
              {["Snapshot", "Highlights", "Stack", "Actions"].map((label, idx) => (
                <button
                  key={label}
                  onClick={() => setSidebarTab(idx)}
                  className={cn(
                    "rounded-full border px-3 py-1 text-[11px] font-semibold tracking-wide transition",
                    sidebarTab === idx
                      ? "border-white/20 bg-white/10 text-white"
                      : "border-white/10 bg-white/5 text-white/60 hover:text-white/90"
                  )}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div
                className="flex transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{ transform: `translateX(-${sidebarTab * 100}%)` }}
              >
                <div className="w-full shrink-0 p-4">
                  <div className="text-xs font-semibold tracking-wider text-white/60">SNAPSHOT</div>
                  <div className="mt-3 grid gap-2 text-sm text-white/75">
                    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="w-14 shrink-0 pt-[2px] text-white/60">Role</span>
                      <span className="ml-auto max-w-[68%] text-right leading-snug text-white/90">
                        {proj.role}
                      </span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-white/60">Type</span>
                      <span className="text-white/90">{proj.type}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-white/60">Status</span>
                      <span className="text-white/90">{proj.status ?? "Completed"}</span>
                    </div>
                    <div className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                      <span className="text-white/60">Year</span>
                      <span className="text-white/90">{proj.year}</span>
                    </div>
                  </div>
                </div>

                <div className="w-full shrink-0 p-4">
                  <div className="text-xs font-semibold tracking-wider text-white/60">TECHNICAL HIGHLIGHTS</div>
                  <div className="mt-3 grid gap-3">
                    <Marquee items={proj.highlights} />
                    <div className="text-[11px] text-white/50">Swipe the sidebar tabs to explore.</div>
                  </div>
                </div>

                <div className="w-full shrink-0 p-4">
                  <div className="text-xs font-semibold tracking-wider text-white/60">STACK</div>
                  <div className="mt-3 grid gap-3">
                    <Marquee items={proj.stack} />
                    <div className="text-[11px] text-white/50">Compressed view for quick scanning.</div>
                  </div>
                </div>

                <div className="w-full shrink-0 p-4">
                  <div className="text-xs font-semibold tracking-wider text-white/60">ACTIONS</div>
                  <div className="mt-3 grid gap-2">
                    <ActionButton variant="primary" onClick={() => setCaseOpen(true)}>
                      View Case Study
                    </ActionButton>
                    <Button href={proj.github ?? "#"} target="_blank" variant="ghost">
                      Open GitHub
                    </Button>
                    <Button href={proj.live ?? "#"} target="_blank" variant="ghost">
                      Open Live Site
                    </Button>
                    <Button href={proj.details ?? "#"} variant="ghost">
                      Open Details
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CASE STUDY DRAWER */}
      <div
        className={cn("fixed inset-0 z-50 transition-opacity", caseOpen ? "opacity-100" : "pointer-events-none opacity-0")}
        aria-hidden={!caseOpen}
      >
        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm" onClick={() => setCaseOpen(false)} />
        <div
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-xl border-l border-white/10 bg-slate-950/95 shadow-[0_0_60px_rgba(99,102,241,0.25)] transition-transform duration-500",
            caseOpen ? "translate-x-0" : "translate-x-full"
          )}
          role="dialog"
          aria-modal="true"
          aria-labelledby="case-study-title"
        >
          <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
            <div>
              <div className="text-xs text-white/60">Case Study</div>
              <div id="case-study-title" className="text-sm font-semibold text-white">
                {proj.title} — {proj.subtitle ?? proj.tag}
              </div>
            </div>
            <button
              type="button"
              onClick={() => setCaseOpen(false)}
              className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70 hover:bg-white/10"
            >
              Close
            </button>
          </div>

          <div className="h-[calc(100%-60px)] overflow-y-auto px-5 py-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-semibold text-white/70">OVERVIEW</div>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{proj.longDesc}</p>
            </div>

            <div className="mt-4 grid gap-3">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">PROBLEM</div>
                <p className="mt-2 text-sm text-white/75">{proj.problem}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">SOLUTION</div>
                <p className="mt-2 text-sm text-white/75">{proj.solution}</p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">TECHNICAL DECISIONS</div>
                <ul className="mt-2 grid gap-2 text-sm text-white/75">
                  {proj.decisions.map((d) => (
                    <li key={d} className="rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="text-xs font-semibold text-white/70">OUTCOME</div>
                <p className="mt-2 text-sm text-white/75">{proj.outcome}</p>
              </div>
            </div>

            <div className="mt-4 grid gap-2">
              <Button href={proj.github ?? "#"} target="_blank" variant="ghost">
                Open GitHub
              </Button>
              <Button href={proj.live ?? "#"} target="_blank" variant="ghost">
                Open Live Site
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Skills() {
  return (
    <section id="skills" className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6">
        <Pill className="mb-3">Skills</Pill>
        <h2 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">Skills & Tools</h2>
        <p className="mt-2 font-body text-sm text-white/80">Technologies I use to build products and experiment with data.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SKILLS.map((g) => (
          <Glass key={g.group} className="p-7">
            <div className="text-base font-semibold text-white">{g.group}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <SkillBadge key={it} label={it} />
              ))}
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}

function Writing() {
  return (
    <section id="writing" className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6">
        <Pill className="mb-3">Writing</Pill>
        <h2 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">Articles & Notes</h2>
        <p className="mt-2 font-body text-sm text-white/80">
          Short explanations of my ML experiments, system design decisions, and lessons learned.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        {WRITINGS.map((w) => (
          <Glass key={w.title} className="p-6 transition-transform hover:-translate-y-1 hover:border-white/20">
            <div className="text-xs text-white/60">{w.outlet}</div>
            <div className="mt-2 text-sm font-semibold text-white">{w.title}</div>
            <a href={w.href} className="mt-4 inline-flex text-xs text-fuchsia-200 hover:text-white">
              Read article
            </a>
          </Glass>
        ))}
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section id="testimonials" className="mx-auto max-w-6xl px-5 py-10">
      <div className="mb-6">
        <Pill className="mb-3">Social Proof</Pill>
        <h2 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">What People Say</h2>
        <p className="mt-2 font-body text-sm text-white/80">Short feedback from collaborators and stakeholders.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {TESTIMONIALS.map((t) => (
          <Glass key={t.quote} className="p-7 transition-transform hover:-translate-y-1 hover:border-white/20">
            <p className="text-sm text-white/85">“{t.quote}”</p>
            <div className="mt-4 text-xs text-white/60">
              {t.author} — {t.role}
            </div>
          </Glass>
        ))}
      </div>
    </section>
  );
}

function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  useEffect(() => {
    if (status !== "success" && status !== "error") return;
    const t = setTimeout(() => setStatus("idle"), 3500);
    return () => clearTimeout(t);
  }, [status]);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("sending");
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const res = await fetch(form.action, {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        form.reset();
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="mx-auto max-w-6xl px-5 py-10 pb-14">
      <div className="grid gap-6 md:grid-cols-12">
        <div className="md:col-span-6">
          <Glass className="p-7">
            <Pill className="mb-3">Contact</Pill>
            <h2 className="font-display text-2xl font-extrabold text-white drop-shadow-sm">Let&apos;s connect</h2>
            <p className="mt-2 font-body text-sm text-white/80">
              Feel free to reach out for internship opportunities, collaborations, or project discussions.
            </p>

            <div className="mt-6 grid gap-3">
              <a
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 hover:bg-white/10"
                href="https://www.linkedin.com/in/adilanh"
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn — linkedin.com/in/adilanh
              </a>

              <a
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 hover:bg-white/10"
                href="https://github.com/adilanh"
                target="_blank"
                rel="noreferrer"
              >
                GitHub — github.com/adilanh
              </a>

              <a
                className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-white/80 hover:bg-white/10"
                href="mailto:nuruladila429@gmail.com"
              >
                Email — nuruladila429@gmail.com
              </a>
            </div>
          </Glass>
        </div>

        <div className="md:col-span-6">
          <Glass className="p-7">
            <div className="text-sm font-semibold text-white">Quick Message</div>

            <form
              className="mt-6 grid gap-3"
              action="https://formspree.io/f/xwvoddnw"
              method="POST"
              onSubmit={handleSubmit}
            >
              <input
                className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-fuchsia-300/40"
                placeholder="Your name"
                name="name"
                required
              />
              <input
                className="h-11 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm text-white placeholder:text-white/40 outline-none focus:border-fuchsia-300/40"
                placeholder="Email"
                name="email"
                type="email"
                required
              />
              <textarea
                rows={4}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/40 outline-none focus:border-fuchsia-300/40"
                placeholder="Message"
                name="message"
                required
              />
              <button
                type="submit"
                className="mt-2 inline-flex h-11 items-center justify-center rounded-2xl bg-gradient-to-r from-fuchsia-400 to-indigo-400 text-sm font-bold text-slate-950 hover:brightness-110 active:scale-[0.99]"
                disabled={status === "sending"}
              >
                {status === "sending" ? "Sending..." : "Send Message"}
              </button>
            </form>

            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 rounded-2xl border border-emerald-300/20 bg-emerald-300/10 px-4 py-3 text-sm text-emerald-100"
              >
                Thanks! Your message has been sent.
              </motion.div>
            ) : null}
            {status === "error" ? (
              <motion.div
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="mt-3 rounded-2xl border border-rose-300/20 bg-rose-300/10 px-4 py-3 text-sm text-rose-100"
              >
                Sorry, something went wrong. Please try again.
              </motion.div>
            ) : null}
          </Glass>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-white/10 bg-slate-950/50">
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 md:flex-row md:items-center md:justify-between">
        <div className="text-sm text-white/70">{new Date().getFullYear()} Adila Nurul Hidayah • Portfolio</div>
        <div className="flex gap-4 text-sm text-white/60">
          <a className="hover:text-white" href="#home">
            Top
          </a>
          <a className="hover:text-white" href="#projects">
            Projects
          </a>
          <a className="hover:text-white" href="#contact">
            Contact
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function Page() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <GlowBg />
      <CursorGlow />
      <GalaxyAmbient />
      <ScrollProgress />

      <Navbar />

      {/* FULL-WIDTH TOP BANNER (NOT an intro screen) */}
      <TopBanner />

      <main className="relative">
        <ParallaxSection className="relative">
          <ScrollReveal variant="zoom" delay={0.05} className="relative">
            <Hero />
          </ScrollReveal>
        </ParallaxSection>

        <ParallaxSection className="relative">
          <ScrollReveal variant="slide-right" delay={0.08} className="relative">
            <About />
          </ScrollReveal>
        </ParallaxSection>

        <ParallaxSection className="relative">
          <ScrollReveal variant="slide-left" delay={0.08} className="relative">
            <Projects />
          </ScrollReveal>
        </ParallaxSection>

        <ParallaxSection className="relative">
          <ScrollReveal variant="flip" delay={0.08} className="relative">
            <Skills />
          </ScrollReveal>
        </ParallaxSection>

        <ParallaxSection className="relative">
          <ScrollReveal delay={0.1} className="relative">
            <Writing />
          </ScrollReveal>
        </ParallaxSection>

        <ParallaxSection className="relative">
          <ScrollReveal delay={0.1} className="relative">
            <Testimonials />
          </ScrollReveal>
        </ParallaxSection>

        <ParallaxSection className="relative">
          <ScrollReveal delay={0.1} className="relative">
            <Contact />
          </ScrollReveal>
        </ParallaxSection>
      </main>

      <ParallaxSection className="relative">
        <ScrollReveal delay={0.1} className="relative">
          <Footer />
        </ScrollReveal>
      </ParallaxSection>
    </div>
  );
}
