import { motion } from "framer-motion";
import { GraduationCap, School, BookOpen, Calendar, Building2 } from "lucide-react";

// Most recent first. `percent` (0–100) is how full the score ring is drawn.
const education = [
  {
    degree: "Bachelor of Engineering",
    field: "Information Technology",
    level: "Degree",
    institution: "Theem College of Engineering",
    period: "2021 – 2025",
    scoreLabel: "CGPA",
    score: "7.75",
    scoreMax: "/10",
    percent: 77.5,
    icon: GraduationCap,
  },
  {
    degree: "Higher Secondary Certificate",
    field: "HSC",
    level: "Higher Secondary",
    institution: "Thakur College of Science & Commerce",
    period: "2021",
    scoreLabel: "Score",
    score: "81.67",
    scoreMax: "%",
    percent: 81.67,
    icon: School,
  },
  {
    degree: "Secondary School Certificate",
    field: "SSC",
    level: "Secondary",
    institution: "S.S. Patna High School",
    period: "2019",
    scoreLabel: "Score",
    score: "79.86",
    scoreMax: "%",
    percent: 79.86,
    icon: BookOpen,
  },
];

// Circular progress ring that fills up when it scrolls into view
function ScoreRing({ percent, score, scoreMax, label, id }) {
  const radius = 30;
  return (
    <div className="relative w-20 h-20 flex-shrink-0">
      <svg viewBox="0 0 72 72" className="w-full h-full -rotate-90">
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#3b82f6" />
            <stop offset="55%" stopColor="#a855f7" />
            <stop offset="100%" stopColor="#ec4899" />
          </linearGradient>
        </defs>
        {/* Background track */}
        <circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          strokeWidth="6"
          className="stroke-slate-900/10 dark:stroke-white/10"
        />
        {/* Filled part */}
        <motion.circle
          cx="36"
          cy="36"
          r={radius}
          fill="none"
          strokeWidth="6"
          strokeLinecap="round"
          stroke={`url(#${id})`}
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: percent / 100 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: "easeOut", delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center leading-none">
        <span className="text-[15px] font-black text-slate-900 dark:text-white">
          {score}
          <span className="text-[10px] font-semibold text-slate-500 dark:text-gray-400">{scoreMax}</span>
        </span>
        <span className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">
          {label}
        </span>
      </div>
    </div>
  );
}

export default function Education() {
  return (
    <section id="education" className="relative py-20 md:py-24 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-600 rounded-full blur-[130px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500 rounded-full blur-[130px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <GraduationCap className="text-blue-600 dark:text-blue-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              Education
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            The academic foundation behind what I build today.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Gradient line that draws itself downward */}
          <motion.div
            className="absolute left-6 md:left-7 top-2 bottom-2 w-0.5 origin-top rounded-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          <div className="space-y-8">
            {education.map((edu, index) => (
              <motion.div
                key={edu.degree}
                className="relative flex gap-5 md:gap-7"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.5, delay: index * 0.15 }}
              >
                {/* Timeline node with the level icon */}
                <div className="relative z-10 flex-shrink-0 self-start">
                  <div className="absolute -inset-1.5 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-500 opacity-30 blur-md" />
                  <div className="relative w-12 h-12 md:w-14 md:h-14 rounded-2xl bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center shadow-lg ring-4 ring-slate-50 dark:ring-black">
                    <edu.icon className="text-white w-6 h-6 md:w-7 md:h-7" />
                  </div>
                </div>

                {/* Card */}
                <div className="group flex-1 min-w-0 p-5 md:p-6 rounded-3xl bg-white/80 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 backdrop-blur-xl shadow-lg hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10 hover:border-blue-500/40 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="flex-1 min-w-0">
                      {/* Badges */}
                      <div className="flex flex-wrap gap-2 mb-3">
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-700 dark:text-gray-300">
                          <Calendar size={12} /> {edu.period}
                        </span>
                        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-500/10 border border-blue-500/25 text-blue-700 dark:text-blue-300">
                          {edu.level}
                        </span>
                      </div>

                      <h3 className="text-lg md:text-xl font-bold text-slate-900 dark:text-white leading-snug">
                        {edu.degree}
                        <span className="text-blue-600 dark:text-blue-400"> · {edu.field}</span>
                      </h3>
                      <p className="mt-1.5 flex items-center gap-1.5 text-sm text-slate-600 dark:text-gray-400">
                        <Building2 size={14} className="flex-shrink-0" />
                        {edu.institution}
                      </p>
                    </div>

                    <ScoreRing
                      id={`edu-ring-${index}`}
                      percent={edu.percent}
                      score={edu.score}
                      scoreMax={edu.scoreMax}
                      label={edu.scoreLabel}
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
