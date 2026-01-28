"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

type Project = {
  title: string;
  subtitle?: string;
  tag: string;
  desc: string;
  longDesc: string;
  stack: string[];
  demoVideo?: string; // mp4/webm url
  poster?: string; // image url
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
    stack: ["React", "TypeScript", "Tailwind", "REST API", "MySQL"],
    demoVideo: "/demo/siantar.mp4",
    poster: "/demo/siantar-poster.jpg",
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
    stack: ["React", "Leaflet", "GeoJSON"],
    demoVideo: "/demo/coffeepahoman.mp4",
    poster: "/demo/coffeepahoman-poster.jpg",
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
    stack: ["Python", "Expert System", "Rule-based AI"],
    demoVideo: "/demo/noka.mp4",
    poster: "/demo/noka-poster.jpg",
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
    stack: ["React", "Firebase", "Auth"],
    demoVideo: "/demo/piccrown.mp4",
    poster: "/demo/piccrown-poster.jpg",
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
          return (
            <circle key={i} cx={x} cy={y} r={r} fill="white" opacity={(i % 10) / 15 + 0.15} />
          );
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
              Software Developer focused on{" "}
              <span className="text-fuchsia-300">Machine Learning</span> &{" "}
              <span className="text-cyan-300">Data Science</span>
            </h2>

            <p className="mt-4 max-w-xl font-body text-sm leading-relaxed text-white/75 md:text-base">
              I design and build clean, scalable web applications with a focus on data-driven workflows.
              My work spans software development, ML experimentation, and practical analytics systems.
            </p>

            <div className="mt-5 grid gap-2 text-sm text-white/70 sm:grid-cols-2">
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
              <Button href="#projects" variant="primary">
                View Projects
              </Button>
              <Button href="#about" variant="ghost">
                About Me
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
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                      <div className="text-xs text-white/60">What I delivered</div>
                      <div className="mt-1 text-sm font-semibold text-white">
                        Dashboard UI, role-based access, search, monthly reports
                      </div>
                    </div>
                    <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
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

                <div className="mt-4 grid gap-3 text-sm text-white/70">
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Focus</span>
                    <span className="text-white/90">Product UI + Data Systems</span>
                  </div>
                  <div className="flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                    <span>Tools</span>
                    <span className="text-white/90">React, TypeScript, Python</span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <Button href="#contact" variant="primary">
                    Get in touch
                  </Button>
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
            <h2 className="font-display text-2xl font-extrabold text-white">Adila Nurul Hidayah</h2>
            <p className="mt-3 font-body text-sm leading-relaxed text-white/75">
              I am a Computer Science student with a strong interest in software development,
              machine learning, and data science. I enjoy building structured, maintainable
              applications—especially dashboards, administrative systems, and data-driven platforms—
              while exploring how machine learning can enhance real-world workflows.
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
                <div key={x.t} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-semibold text-white">{x.t}</div>
                  <p className="mt-2 text-sm text-white/70">{x.d}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-semibold text-white">Currently</div>
              <p className="mt-2 text-sm text-white/70">
                I&apos;m refining my portfolio and turning projects into concise case studies that
                clearly communicate goals, implementation choices, and measurable outcomes.
              </p>
            </div>
          </Glass>
        </div>
      </div>
    </section>
  );
}

/* ======================
   PROJECTS (NEW LAYOUT)
====================== */

function Projects() {
  const [active, setActive] = useState(0);

  const filtered = PROJECTS;

  // Keep active index valid after filtering
  const safeActive = Math.min(active, Math.max(0, filtered.length - 1));
  const proj = filtered[safeActive] ?? PROJECTS[0];

  return (
    <section id="projects" className="mx-auto max-w-6xl px-5 py-10">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <Pill className="mb-3">Projects</Pill>
          <h2 className="font-display text-2xl font-extrabold text-white">Case Studies</h2>
          <p className="mt-2 font-body text-sm text-white/70">
            Browse projects from the sidebar, watch the demo, and open the repository.
          </p>
        </div>

        
      </div>

      {/* 3-column layout like reference */}
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
                        "w-full rounded-2xl border p-2 text-left transition",
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
                            <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5">
                              {p.tag}
                            </span>
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

        {/* CENTER: VIDEO PREVIEW */}
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
            <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/5">
              {/* VIDEO */}
              <video
                className="h-[360px] w-full object-cover md:h-[420px]"
                src={proj.demoVideo}
                poster={proj.poster}
                muted
                loop
                playsInline
                preload="metadata"
              />

              {/* HOVER OVERLAY */}
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
            </div>

            <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs text-white/60">Summary</div>
              <div className="mt-1 text-sm text-white/80">{proj.desc}</div>
            </div>
          </div>
        </div>

        {/* RIGHT SIDEBAR: INSPECT */}
        <div className="relative lg:col-span-3 rounded-3xl border border-white/10 bg-transparent shadow-[0_0_40px_rgba(59,130,246,0.18)]">
          <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-white/10" />
          <div className="border-b border-white/10 p-4">
            <div className="text-xs font-semibold tracking-wider text-white/60">INSPECT</div>
          </div>

          <div className="p-4 space-y-5">
            <div>
              <div className="text-xs font-semibold text-white/70">DESCRIPTION</div>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{proj.longDesc}</p>
            </div>

            

            <div>
              <div className="text-xs font-semibold text-white/70">TECH STACK</div>
              <div className="mt-3 grid gap-2">
                {proj.stack.map((s) => (
                  <div key={s} className="flex items-center justify-between gap-3 rounded-xl border border-white/10 bg-white/5 px-3 py-2">
                    <span className="text-sm text-white/80">{s}</span>
                    <span className="text-xs text-white/50">100%</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid gap-2">
              <Button href={proj.github ?? "#"} target="_blank" variant="ghost">
                Open GitHub
              </Button>
              <Button href={proj.live ?? "#"} target="_blank" variant="ghost">
                Open Live Site
              </Button>
              <Button href={proj.details ?? "#"} variant="primary">
                Open Details
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
        <h2 className="font-display text-2xl font-extrabold text-white">Skills & Tools</h2>
        <p className="mt-2 font-body text-sm text-white/70">
          Technologies I use to build products and experiment with data.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {SKILLS.map((g) => (
          <Glass key={g.group} className="p-6">
            <div className="text-base font-semibold text-white">{g.group}</div>
            <div className="mt-4 flex flex-wrap gap-2">
              {g.items.map((it) => (
                <Pill key={it}>{it}</Pill>
              ))}
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
            <h2 className="font-display text-2xl font-extrabold text-white">Let&apos;s connect</h2>
            <p className="mt-2 font-body text-sm text-white/70">
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
              action="https://formspree.io/f/xpqdgknb"
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
  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] } },
  };

  const stagger = {
    hidden: {},
    show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
  };

  return (
    <div className="relative min-h-screen bg-slate-950 text-white">
      <GlowBg />
      <Navbar />
      <main className="relative">
        <motion.div initial="hidden" animate="show" variants={stagger}>
          <motion.div variants={fadeUp}>
            <Hero />
          </motion.div>
          <motion.div variants={fadeUp}>
            <About />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Projects />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Skills />
          </motion.div>
          <motion.div variants={fadeUp}>
            <Contact />
          </motion.div>
        </motion.div>
      </main>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <Footer />
      </motion.div>
    </div>
  );
}
