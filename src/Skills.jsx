import { motion } from "framer-motion";
import { Cpu, Laptop, Globe, Database, Wrench } from "lucide-react";

// Builds a devicon SVG URL, e.g. devicon("react/react-original")
const devicon = (path) =>
  `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${path}.svg`;

// `logoClass` fixes logos that are hard to see in one of the themes
// (e.g. the black GitHub logo on a dark background)
const skillGroups = [
  {
    title: "Languages",
    icon: Laptop,
    gradient: "from-pink-500 to-purple-500",
    // Colour used for the tile glow and border on hover
    glow: "rgba(236,72,153,0.35)",
    hoverBorder: "hover:border-pink-500/50",
    skills: [
      { name: "JavaScript", icon: devicon("javascript/javascript-original") },
      { name: "PHP", icon: devicon("php/php-original") },
      { name: "Python", icon: devicon("python/python-original") },
      { name: "SQL", icon: devicon("azuresqldatabase/azuresqldatabase-original") },
      { name: "C", icon: devicon("c/c-original") },
    ],
  },
  {
    title: "Databases",
    icon: Database,
    gradient: "from-emerald-400 to-green-500",
    glow: "rgba(16,185,129,0.35)",
    hoverBorder: "hover:border-emerald-500/50",
    skills: [
      { name: "PostgreSQL", icon: devicon("postgresql/postgresql-original") },
      { name: "MySQL", icon: devicon("mysql/mysql-original"), logoClass: "dark:brightness-[1.8]" },
      { name: "MongoDB", icon: devicon("mongodb/mongodb-original") },
      { name: "SQLite", icon: devicon("sqlite/sqlite-original") },
      // Bright yellow logo: darken it a little on the light background
      { name: "ClickHouse", icon: devicon("clickhouse/clickhouse-original"), logoClass: "brightness-[0.8] dark:brightness-100" },
    ],
  },
  {
    title: "Web Technologies",
    icon: Globe,
    gradient: "from-blue-500 to-teal-400",
    glow: "rgba(59,130,246,0.35)",
    hoverBorder: "hover:border-blue-500/50",
    skills: [
      // Frontend
      { name: "React.js", icon: devicon("react/react-original") },
      { name: "HTML5", icon: devicon("html5/html5-original") },
      { name: "CSS3", icon: devicon("css3/css3-original") },
      { name: "Tailwind CSS", icon: devicon("tailwindcss/tailwindcss-original") },
      // Backend
      { name: "Node.js", icon: devicon("nodejs/nodejs-original") },
      { name: "Express.js", icon: devicon("express/express-original"), logoClass: "dark:invert" },
      { name: "REST APIs", icon: "https://media.lordicon.com/icons/wired/gradient/1330-rest-api.svg" },
      { name: "JWT", icon: devicon("jwt/jwt-original") },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    gradient: "from-amber-400 to-pink-500",
    glow: "rgba(245,158,11,0.35)",
    hoverBorder: "hover:border-amber-500/50",
    skills: [
      { name: "Git", icon: devicon("git/git-original") },
      { name: "GitHub", icon: devicon("github/github-original"), logoClass: "dark:invert" },
      { name: "GitLab", icon: devicon("gitlab/gitlab-original") },
      { name: "Linux", icon: devicon("linux/linux-original") },
      { name: "Sentry", icon: devicon("sentry/sentry-original"), logoClass: "dark:brightness-[2.5]" },
      { name: "Postman", icon: devicon("postman/postman-original") },
      { name: "VS Code", icon: devicon("vscode/vscode-original") },
    ],
  },
];

// Fades the card's top accent line out towards both ends
const fadeEnds = {
  maskImage: "linear-gradient(to right, transparent, black 25%, black 75%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 25%, black 75%, transparent)",
};

// Tiles inside a card fade in one after another
const tileList = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
};
const tileItem = {
  hidden: { opacity: 0, y: 12, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-24 px-4 md:px-6 bg-gradient-to-b from-slate-50 via-slate-100 to-slate-50 dark:from-black dark:via-gray-900 dark:to-black overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-pink-500 rounded-full blur-[150px] opacity-10 dark:opacity-20" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10 dark:opacity-20" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-14"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Cpu className="text-blue-600 dark:text-blue-400" size={32} />
            <h2 className="text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              Skills
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            The technologies and tools I use to build modern, full-stack web
            applications.
          </p>
        </motion.div>

        {/* Category cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {skillGroups.map((group, groupIndex) => (
            <motion.div
              key={group.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="relative p-6 rounded-3xl bg-white/70 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
            >
              {/* Gradient line along the top edge that fades out at both ends,
                  with a soft blurred glow of the same colours underneath */}
              <div className="absolute top-0 inset-x-0 h-6 pointer-events-none" style={fadeEnds}>
                <div className={`absolute top-0 inset-x-0 h-px bg-gradient-to-r ${group.gradient}`} />
                <div className={`absolute top-0 inset-x-12 h-4 bg-gradient-to-r ${group.gradient} opacity-10 dark:opacity-25 blur-lg`} />
              </div>

              {/* Card header */}
              <div className="flex items-center gap-3 mb-6">
                <div className={`p-2.5 rounded-xl bg-gradient-to-br ${group.gradient} shadow-lg`}>
                  <group.icon size={22} className="text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                  {group.title}
                </h3>
              </div>

              {/* Skill tiles */}
              <motion.div
                className="grid grid-cols-3 sm:grid-cols-5 gap-3"
                variants={tileList}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={tileItem}
                    // The lift is done by framer-motion (not a Tailwind class) because
                    // framer-motion controls this element's transform for the entrance animation
                    whileHover={{ y: -4 }}
                    className={`group relative flex flex-col items-center justify-center gap-2 p-3 rounded-2xl bg-slate-50 dark:bg-[#111111] border border-slate-900/10 dark:border-white/10 ${group.hoverBorder} hover:shadow-lg transition-[box-shadow,border-color] duration-300 overflow-hidden`}
                  >
                    {/* Glow in the category colour, shown on hover */}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{ background: `radial-gradient(circle at 50% 30%, ${group.glow}, transparent 70%)` }}
                    />
                    <img
                      src={skill.icon}
                      alt=""
                      loading="lazy"
                      className={`relative w-9 h-9 object-contain group-hover:scale-110 transition-transform duration-300 ${skill.logoClass || ""}`}
                    />
                    <span className="relative text-xs font-medium text-center leading-tight text-slate-700 dark:text-gray-300 group-hover:text-slate-900 dark:group-hover:text-white transition-colors">
                      {skill.name}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
