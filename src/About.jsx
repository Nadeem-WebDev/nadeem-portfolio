import { motion } from "framer-motion";
import { User, Brain, MapPin, Briefcase, GraduationCap } from "lucide-react";

// Shown as tags under the About text
const softSkills = [
  "Communication",
  "Team Collaboration",
  "Problem Solving",
  "Time Management",
  "Adaptability",
  "Critical Thinking",
  "Creativity",
];

// The "Quick Facts" card next to the About text
const quickFacts = [
  { icon: MapPin, label: "Location", value: "Mumbai, India" },
  { icon: Briefcase, label: "Experience", value: "1+ year in production" },
  { icon: GraduationCap, label: "Education", value: "B.E. Information Technology" },
];

export default function About() {
  return (
    <section id="about" className="relative py-20 md:py-24 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-15 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <User className="text-blue-600 dark:text-blue-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              About Me
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            A little about who I am and what drives me.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* About text + soft skills */}
          <motion.div
            className="lg:col-span-2 p-8 md:p-10 rounded-3xl bg-white/80 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 backdrop-blur-xl shadow-xl"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <p className="text-lg md:text-xl text-slate-700 dark:text-blue-100 leading-relaxed mb-5">
              Hey, I'm{" "}
              <span className="text-blue-600 dark:text-blue-400 font-semibold">
                Sk Nadeem Ahammad
              </span>{" "}
              — a Full Stack Developer and AI Enthusiast who loves crafting
              user-friendly web apps that make a difference. From frontend
              to backend, I turn complex ideas into clean, functional
              solutions.
            </p>

            <p className="text-lg md:text-xl text-slate-700 dark:text-blue-100 leading-relaxed mb-8">
              What started as curiosity about how things work is now an
              obsession with building and learning. I'm passionate about AI,
              React, and anything that makes me think differently — I never
              stop leveling up.
            </p>

            {/* Soft skills */}
            <div className="flex items-center gap-2 mb-3">
              <Brain className="text-green-600 dark:text-green-400" size={20} />
              <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-gray-400">
                Soft Skills
              </h3>
            </div>
            <div className="flex flex-wrap gap-2">
              {softSkills.map((skill) => (
                <span
                  key={skill}
                  className="px-3 py-1.5 text-sm font-medium text-slate-700 dark:text-blue-100 border border-slate-900/10 dark:border-white/10 bg-slate-900/5 dark:bg-white/5 rounded-full"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Quick facts */}
          <motion.div
            className="relative p-8 rounded-3xl bg-white/80 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Soft corner glow */}
            <div className="absolute -top-16 -right-16 w-48 h-48 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <h3 className="relative text-xl font-bold text-slate-900 dark:text-white mb-6">
              Quick Facts
            </h3>

            <ul className="relative space-y-5">
              {quickFacts.map((fact) => (
                <li key={fact.label} className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-blue-500/15 to-purple-500/15 border border-blue-500/20 flex-shrink-0">
                    <fact.icon size={20} className="text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">
                      {fact.label}
                    </p>
                    <p className="font-semibold text-slate-900 dark:text-white">{fact.value}</p>
                  </div>
                </li>
              ))}

              {/* Availability, with a pulsing green dot */}
              <li className="flex items-center gap-4">
                <div className="p-3 rounded-2xl bg-green-500/10 border border-green-500/25 flex-shrink-0">
                  <span className="relative flex w-5 h-5 items-center justify-center">
                    <span className="absolute inline-flex w-3 h-3 rounded-full bg-green-500 opacity-60 animate-ping" />
                    <span className="relative inline-flex w-2.5 h-2.5 rounded-full bg-green-500" />
                  </span>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">
                    Status
                  </p>
                  <p className="font-semibold text-green-700 dark:text-green-400">
                    Open to opportunities
                  </p>
                </div>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
