import { motion } from "framer-motion";
import { Sparkles, Mail, Rocket, FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import TextType from "./TextType.jsx";
import nadImage from "./images/profile picture.jpg";
import resume from "./certificates/Nadeem_Resume.pdf";

// Titles the hero cycles through with the typing effect
const heroTitles = [
  "Full Stack Web Developer",
  "Software Engineer",
  "React & Node.js Developer",
  "PostgreSQL & Backend Enthusiast",
];

const socials = [
  { href: "mailto:nadeem786shaikh92@gmail.com", label: "Email", icon: FaEnvelope },
  { href: "https://github.com/Nadeem-WebDev", label: "GitHub", icon: FaGithub },
  { href: "https://www.linkedin.com/in/nadeem-shaikh-1035a4345/", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://www.instagram.com/nadeem_7_shaikh/", label: "Instagram", icon: FaInstagram },
];

// Moves the hexagon glow to follow the mouse.
// CSS variables avoid re-rendering React on every mouse move.
const trackHexGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--hex-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--hex-y", `${e.clientY - rect.top}px`);
};

// Each block fades up a little after the previous one
const fadeUp = (delay) => ({
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: "easeOut", delay },
});

const glassButton =
  "inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold text-slate-800 dark:text-white bg-white/70 dark:bg-white/5 border border-slate-900/10 dark:border-white/15 backdrop-blur-md shadow-sm hover:border-blue-500/50 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 active:scale-95 transition-all duration-300";

export default function Hero() {
  return (
    <section
      id="home"
      onMouseMove={trackHexGlow}
      className="group relative min-h-[calc(100vh-3rem)] md:min-h-[calc(100vh-3.5rem)] flex items-center justify-center bg-slate-50 dark:bg-black overflow-hidden"
    >
      {/* Background glows */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 dark:from-blue-900/30 via-slate-50 dark:via-black to-slate-50 dark:to-black">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue-700 rounded-full blur-3xl opacity-25 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
      </div>

      {/* Hexagon grid background */}
      <div className="absolute inset-0 hex-grid pointer-events-none" />
      {/* Hexagons near the mouse light up blue (mouse only: hover never fires on touch) */}
      <div className="absolute inset-0 hex-grid-glow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 md:py-20 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] items-center gap-12 lg:gap-16">
        {/* Text */}
        <div className="order-2 lg:order-1 text-center lg:text-left">
          <motion.div {...fadeUp(0)} className="mb-5 flex justify-center lg:justify-start">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-sm font-medium bg-white/70 dark:bg-white/5 border border-slate-900/10 dark:border-white/15 backdrop-blur-md text-slate-700 dark:text-gray-300">
              <span aria-hidden="true">👋</span> Hi there, I'm
            </span>
          </motion.div>

          {/* Name: fades up, with a light sweeping across the gradient (see .name-shine in index.css) */}
          <motion.h1
            {...fadeUp(0.1)}
            className="name-shine text-4xl sm:text-5xl xl:text-[3.25rem] font-extrabold leading-tight mb-4 lg:inline-block lg:whitespace-nowrap"
          >
            Sk Nadeem Ahammad
          </motion.h1>

          {/* min-h keeps the layout steady while the text is typed and erased */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-xl md:text-2xl font-semibold text-slate-800 dark:text-white/90 mb-5 min-h-[1.75rem] md:min-h-[2rem]"
          >
            <TextType texts={heroTitles} />
          </motion.p>

          <motion.p
            {...fadeUp(0.3)}
            className="text-base md:text-lg leading-relaxed text-slate-600 dark:text-gray-400 max-w-xl mx-auto lg:mx-0 mb-8"
          >
            I turn ideas into responsive, interactive web experiences{" "}
            <Sparkles size={16} className="inline-block align-[-2px] text-amber-500 dark:text-yellow-300" />,
            building full-stack apps that solve real-world problems while
            exploring Python, Node.js, React and AI.
          </motion.p>

          {/* Buttons */}
          <motion.div {...fadeUp(0.4)} className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm md:text-base font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              <Mail size={18} /> Contact Me
            </a>
            <a href="#projects" className={glassButton}>
              <Rocket size={18} /> View Work
            </a>
            <a href={resume} target="_blank" rel="noopener noreferrer" className={glassButton}>
              <FileText size={18} /> Resume
            </a>
          </motion.div>

          {/* Socials */}
          <motion.div {...fadeUp(0.5)} className="flex justify-center lg:justify-start gap-3">
            {socials.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                rel="noopener noreferrer"
                aria-label={social.label}
                title={social.label}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/70 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 backdrop-blur-md text-slate-600 dark:text-gray-300 hover:text-white hover:border-transparent hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
              >
                <social.icon size={18} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Photo with a rotating gradient ring */}
        <motion.div
          className="order-1 lg:order-2 flex justify-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <div className="relative w-52 h-52 sm:w-60 sm:h-60 lg:w-80 lg:h-80">
            {/* Soft glow behind */}
            <div className="absolute -inset-4 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 opacity-30 blur-3xl" />
            {/* Spinning gradient ring */}
            <div className="absolute inset-0 rounded-full bg-[conic-gradient(from_0deg,#3b82f6,#a855f7,#ec4899,#3b82f6)] animate-[spin_8s_linear_infinite] motion-reduce:animate-none" />
            {/* Gap between ring and photo */}
            <div className="absolute inset-[4px] rounded-full bg-slate-50 dark:bg-black" />
            {/* Photo: shows the full width of the picture, from just above the hair
                down to the chest (same framing as the original hero photo).
                To reframe: change the second number in object-[center_30%]
                (lower = more space above the head, higher = more of the shirt). */}
            <div className="absolute inset-[10px] rounded-full overflow-hidden">
              <img
                src={nadImage}
                alt="Sk Nadeem Ahammad"
                className="w-full h-full object-cover object-[center_30%] hover:scale-105 transition-transform duration-700 ease-out"
              />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden sm:flex flex-col items-center gap-2 text-xs font-medium text-slate-500 dark:text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <span className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <span className="w-1 h-2 rounded-full bg-current animate-bounce motion-reduce:animate-none" />
        </span>
        Scroll
      </a>
    </section>
  );
}
