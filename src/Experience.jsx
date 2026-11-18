import { useEffect, useRef } from "react";
import { motion, animate, useInView } from "framer-motion";
import { Briefcase, Calendar, ArrowUpRight, ShieldCheck, Gauge, MailCheck } from "lucide-react";
import rockSolidLogo from "./images/rock-solid-logo.png";

// To add another job, add another object to this list
const jobs = [
  {
    role: "Full Stack Developer",
    type: "Internship",
    company: "Rock Solid Solutions",
    website: "https://www.rocksolid.in/",
    period: "Aug 2025 – Nov 2026",
    logo: rockSolidLogo,
    // Headline numbers, shown as tiles that count up when scrolled into view
    // (figures from the Work Highlights record)
    stats: [
      { value: 250, suffix: "+", label: "merged changes across 16 production repos" },
      { value: 55, suffix: "s", label: "a slow database job now takes, down from 15+ min" },
      { value: 150, prefix: "~", label: "production errors fixed from Sentry and job alerts" },
      { value: 9, label: "security vulnerabilities fixed" },
    ],
    // Short one-line highlights under the tiles
    highlights: [
      { icon: ShieldCheck, text: "Closed security holes including IDOR, XSS and SQL injection, and moved hard-coded secrets out of the code." },
      { icon: Gauge, text: "Cut a crashing report job from ~7 GB to ~1 GB of memory and fixed a leak in a 111-million-row import." },
      { icon: MailCheck, text: "Built a pre-renewal reminder email for customers and moved reporting to ClickHouse." },
    ],
    tech: ["PHP", "Perl", "JavaScript", "PostgreSQL", "ClickHouse", "Sentry"],
  },
];

// A number that counts up from 0 the first time it scrolls into view
function CountUp({ value, prefix = "", suffix = "" }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.4,
      ease: "easeOut",
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix]);

  return (
    <span ref={ref} className="tabular-nums">
      {prefix}0{suffix}
    </span>
  );
}

// Glowing border + spotlight that follow the mouse (CSS variables: no re-render)
const trackGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

export default function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-24 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/3 w-80 h-80 bg-blue-700 rounded-full blur-[140px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[140px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Briefcase className="text-blue-600 dark:text-blue-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              Experience
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            Where I've been building, shipping and fixing real production software.
          </p>
        </motion.div>

        <div className="space-y-8">
          {jobs.map((job) => (
            <motion.div
              key={job.company}
              onMouseMove={trackGlow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true, amount: 0.2 }}
              className="group relative rounded-3xl p-px bg-slate-900/10 dark:bg-white/10 shadow-xl"
            >
              {/* 1px border glow under the mouse */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background:
                    "radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.9), rgba(168,85,247,0.5) 30%, transparent 60%)",
                }}
              />

              {/* Card body */}
              <div className="relative rounded-[calc(1.5rem-1px)] bg-white/90 dark:bg-[#0a0a0a] backdrop-blur-xl p-6 md:p-8 overflow-hidden">
                {/* Spotlight inside the card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(500px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.08), transparent 45%)",
                  }}
                />

                {/* Header: logo, role, company, badges */}
                <div className="relative flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-5 mb-8">
                  <div className="relative w-16 h-16 flex-shrink-0">
                    {/* Soft glow behind the logo */}
                    <div className="absolute -inset-2 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-25 blur-lg" />
                    <div className="relative w-full h-full rounded-2xl overflow-hidden border border-slate-900/10 dark:border-white/10 shadow-lg">
                      <img src={job.logo} alt={`${job.company} logo`} className="w-full h-full object-cover" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                      {job.role}
                    </h3>
                    <a
                      href={job.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:opacity-80 transition-opacity"
                    >
                      {job.company}
                      <ArrowUpRight size={16} className="text-purple-600 dark:text-purple-400" />
                    </a>
                  </div>

                  <div className="flex flex-wrap sm:flex-col sm:items-end gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-gray-300">
                      <Calendar size={13} /> {job.period}
                    </span>
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-700 dark:text-blue-300">
                      {job.type}
                    </span>
                  </div>
                </div>

                {/* Stat tiles */}
                <div className="relative grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4 mb-7">
                  {job.stats.map((stat) => (
                    <div
                      key={stat.label}
                      className="p-4 md:p-5 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10"
                    >
                      <div className="text-3xl md:text-4xl font-black tracking-tight bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 dark:from-blue-400 dark:via-purple-400 dark:to-pink-400 bg-clip-text text-transparent mb-2">
                        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      </div>
                      <p className="text-xs md:text-sm leading-snug text-slate-600 dark:text-gray-400">{stat.label}</p>
                    </div>
                  ))}
                </div>

                {/* One-line highlights */}
                <ul className="relative space-y-3 mb-6">
                  {job.highlights.map((item) => (
                    <li
                      key={item.text}
                      className="flex items-start gap-3 text-sm md:text-base text-slate-700 dark:text-gray-300"
                    >
                      <span className="p-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-shrink-0">
                        <item.icon size={16} className="text-blue-600 dark:text-blue-400" />
                      </span>
                      <span className="pt-0.5">{item.text}</span>
                    </li>
                  ))}
                </ul>

                {/* Tech used */}
                <div className="relative flex flex-wrap gap-2 pt-6 border-t border-slate-900/10 dark:border-white/10">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="px-3 py-1 text-xs font-medium rounded-full bg-slate-100 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-gray-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
