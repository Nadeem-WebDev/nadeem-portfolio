import { motion } from "framer-motion";
import { Award, ArrowUpRight, FileText } from "lucide-react";

import certificate1 from "./certificates/Coursera AWS S3 Basics.pdf";
import certificate2 from "./certificates/Data Science using python.pdf";
import certificate3 from "./certificates/Responsive_Web_Design_freeCodeCamp.pdf";
import certificate4 from "./certificates/Infosys AI&ML.pdf";

// `gradient` colours the logo ring; `glow` is the same colour for the border glow
const certifications = [
  {
    title: "AWS S3 Basics",
    provider: "Coursera",
    icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
    gradient: "from-orange-500 to-red-500",
    glow: "rgba(249,115,22,0.85)",
    link: certificate1,
  },
  {
    title: "Data Science using Python",
    provider: "LivetechINDIA",
    icon: "https://cdn-icons-png.flaticon.com/512/5408/5408783.png",
    gradient: "from-blue-400 to-cyan-500",
    glow: "rgba(34,211,238,0.85)",
    link: certificate2,
  },
  {
    title: "Responsive Web Design",
    provider: "freeCodeCamp",
    icon: "https://cdn-icons-png.flaticon.com/512/2504/2504196.png",
    gradient: "from-blue-600 to-indigo-500",
    glow: "rgba(99,102,241,0.85)",
    link: certificate3,
  },
  {
    title: "Artificial Intelligence & Machine Learning",
    provider: "Infosys Springboard",
    icon: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png",
    gradient: "from-green-400 to-blue-500",
    glow: "rgba(52,211,153,0.85)",
    link: certificate4,
  },
];

// Border glow + spotlight follow the mouse (CSS variables: no re-render)
const trackGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - rect.top}px`);
};

export default function Certifications() {
  return (
    <section id="certifications" className="relative py-20 md:py-24 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-80 h-80 bg-pink-600 rounded-full blur-[140px] opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-blue-600 rounded-full blur-[140px] opacity-10" />
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
            <Award className="text-pink-600 dark:text-pink-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              Certifications
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            Courses and programs I've completed to keep sharpening my skills.
          </p>
        </motion.div>

        {/* Certificate cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              onMouseMove={trackGlow}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: (index % 2) * 0.1 }}
              className="group relative rounded-3xl p-px bg-slate-900/10 dark:bg-white/10 shadow-lg hover:shadow-2xl transition-shadow duration-500"
            >
              {/* 1px border glow in the certificate's colour, under the mouse */}
              <div
                className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: `radial-gradient(280px circle at var(--mx, 50%) var(--my, 50%), ${cert.glow}, transparent 60%)`,
                }}
              />

              {/* Card body */}
              <div className="relative h-full flex flex-col rounded-[calc(1.5rem-1px)] bg-white dark:bg-[#0a0a0a] p-6 overflow-hidden">
                {/* Spotlight inside the card */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), ${cert.glow.replace("0.85", "0.08")}, transparent 50%)`,
                  }}
                />
                {/* Faint award watermark */}
                <Award
                  aria-hidden="true"
                  className="absolute -bottom-6 -right-6 w-32 h-32 text-slate-900/[0.04] dark:text-white/[0.04] rotate-12 pointer-events-none"
                />

                <div className="relative flex items-start gap-4 mb-6">
                  {/* Issuer logo on a white tile with a gradient ring and glow */}
                  <div className="relative flex-shrink-0">
                    <div className={`absolute -inset-1.5 rounded-2xl bg-gradient-to-br ${cert.gradient} opacity-30 blur-md group-hover:opacity-50 transition-opacity duration-500`} />
                    <div className={`relative p-[2px] rounded-2xl bg-gradient-to-br ${cert.gradient}`}>
                      <div className="w-14 h-14 rounded-[14px] bg-white flex items-center justify-center p-2.5">
                        <img src={cert.icon} alt="" loading="lazy" className="w-full h-full object-contain" />
                      </div>
                    </div>
                  </div>

                  <div className="min-w-0">
                    <p className="text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500 mb-1">
                      {cert.provider}
                    </p>
                    <h3 className="text-lg md:text-xl font-bold leading-snug text-slate-900 dark:text-white">
                      {cert.title}
                    </h3>
                  </div>
                </div>

                {/* Footer: file type + view button */}
                <div className="relative mt-auto pt-4 flex items-center justify-between gap-3 border-t border-slate-900/10 dark:border-white/10">
                  <span className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 dark:text-gray-500">
                    <FileText size={14} /> PDF certificate
                  </span>
                  <a
                    href={cert.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View ${cert.title} certificate`}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-semibold text-slate-700 dark:text-gray-200 bg-slate-100 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 hover:text-white hover:border-transparent hover:bg-gradient-to-r hover:from-blue-600 hover:to-purple-600 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
                  >
                    View
                    <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
