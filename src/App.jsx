import { useState, useEffect, useCallback } from "react";
import {  GraduationCap,  Sparkles,  Mail,  Rocket,  FileText,  Award,  ArrowUpRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

import nadImage from "./images/profile picture.jpg";

import resume from "./certificates/Nadeem_Resume.pdf";
import certificate1 from "./certificates/Coursera AWS S3 Basics.pdf";
import certificate2 from "./certificates/Data Science using python.pdf";
import certificate3 from "./certificates/Responsive_Web_Design_freeCodeCamp.pdf";
import certificate4 from "./certificates/Infosys AI&ML.pdf";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
import Experience from "./Experience.jsx";
import About from "./About.jsx";
import TextType from "./TextType.jsx";
import Preloader from "./Preloader.jsx";
import Navbar from "./Navbar.jsx";

// The loading screen plays once per browser session (not on every reload),
// and never for visitors who have turned off animations in their system settings
const shouldShowPreloader = () => {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    return !sessionStorage.getItem("preloaderSeen");
  } catch {
    return true; // storage unavailable (private mode etc.) – just show it
  }
};
import Skills from "./Skills.jsx";

// Titles the hero cycles through with the typing effect
const heroTitles = [
  "Full Stack Web Developer",
  "Software Engineer",
  "React & Node.js Developer",
  "PostgreSQL & Backend Enthusiast",
];

// Moves the hexagon glow in the hero to follow the mouse.
// CSS variables avoid re-rendering React on every mouse move.
const trackHexGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--hex-x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--hex-y", `${e.clientY - rect.top}px`);
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(shouldShowPreloader);

  const handlePreloaderComplete = useCallback(() => {
    try {
      sessionStorage.setItem("preloaderSeen", "1");
    } catch {
      // storage unavailable – the preloader will just show again next time
    }
    setIsLoading(false);
  }, []);

  // Stop the page scrolling while the mobile menu or the loading screen is open
  useEffect(() => {
    document.body.style.overflow = isMenuOpen || isLoading ? "hidden" : "unset";
  }, [isMenuOpen, isLoading]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-black text-slate-900 dark:text-white">
      {/* Loading screen (first visit of the session only) */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navbar + mobile menu */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main Sections */}
      <main className="pt-12 md:pt-14">
        {/* Hero Section */}
        <section
          id="home"
          onMouseMove={trackHexGlow}
          className="group relative min-h-screen flex items-center justify-center bg-slate-50 dark:bg-black overflow-hidden"
        >
          {/* Background glow animation */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/50 dark:from-blue-900/30 via-slate-50 dark:via-black to-slate-50 dark:to-black">
            <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-700 rounded-full blur-3xl opacity-30 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-20 animate-pulse" />
          </div>

          {/* Hexagon grid background */}
          <div className="absolute inset-0 hex-grid pointer-events-none" />
          {/* Hexagons near the mouse light up blue (mouse only: hover never fires on touch) */}
          <div className="absolute inset-0 hex-grid-glow pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Hero Content */}
          <div className="relative z-10 text-center px-4 py-6 md:py-10 max-w-3xl">
            {/* Profile Image */}
            <div className="w-36 h-36 md:w-44 md:h-44 mx-auto mb-6 rounded-full border-4 shadow-[0_0_20px_4px_rgba(59,130,246,0.35)] hover:shadow-[0_0_25px_8px_rgba(59,130,246,0.5)] dark:shadow-[0_0_20px_4px_rgba(255,255,255,0.6)] dark:hover:shadow-[0_0_25px_8px_rgba(255,255,255,0.9)] transition-shadow duration-500 ease-in-out hover:scale-105 overflow-hidden">
              <img
                src={nadImage}
                className="w-full h-full object-cover object-[0px_-40px]"
                alt="Nadeem"
              />
            </div>

            <h1 className="font-poppins text-blue-700 dark:text-blue-300 text-sm mb-2 tracking-wider uppercase">
              Hello I'm
            </h1>

            <h1 className="text-4xl md:text-6xl font-extrabold mb-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Sk Nadeem Ahammad
            </h1>

            {/* min-h keeps the layout steady while the text is typed and erased */}
            <p className="text-lg md:text-xl text-slate-700 dark:text-blue-100/90 mb-6 min-h-[1.75rem] md:min-h-[2rem]">
              <TextType texts={heroTitles} />
            </p>

            <p className="text-sm md:text-base text-slate-600 dark:text-blue-200 max-w-xl mx-auto mb-8">
              I turn ideas into responsive, interactive web experiences{" "}
              <Sparkles size={16} className="inline-block align-[-2px] text-amber-500 dark:text-yellow-300" />.
              Passionate about frontend magic, backend logic, and building
              full-stack apps that solve real-world problems. Exploring Python, Node.js, React, and AI to level up my craft.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap justify-center items-center gap-4 mt-6">
              <a
                href="#contact"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full text-sm md:text-base font-semibold hover:scale-105 transition transform"
              >
                <Mail size={18} /> Contact Me
              </a>

              <a
                href="#projects"
                className="inline-flex items-center gap-2 px-6 py-3 border border-blue-400 text-blue-700 dark:text-blue-300 rounded-full text-sm md:text-base font-semibold hover:bg-blue-500/10 hover:scale-105 transition"
              >
                <Rocket size={18} /> View Work
              </a>

              <a
                href={resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-full text-sm md:text-base font-semibold hover:scale-105 transition transform"
              >
                <FileText size={18} /> View Resume
              </a>
            </div>

            {/* Socials */}
            <div className="flex justify-center gap-6 text-blue-700 dark:text-blue-300 text-xl mt-6">
              <a
                href="mailto:nadeem786shaikh92@gmail.com"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition"
              >
                <FaEnvelope />
              </a>
              <a
                href="https://github.com/nadeem-webdev"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition"
              >
                <FaGithub />
              </a>
              <a
                href="https://www.linkedin.com/in/nadeem-shaikh-1035a4345/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition"
              >
                <FaLinkedin />
              </a>
              <a
                href="https://www.instagram.com/nadeem_7_shaikh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-slate-900 dark:hover:text-white hover:scale-110 transition"
              >
                <FaInstagram />
              </a>
            </div>
          </div>
        </section>

        {/* About Section */}
        <About />

        {/* Experience Section */}
        <Experience />

        {/* Projects Section */}
        <Projects />

        {/* Skills Section */}
        <Skills />

        {/*Education*/}
        <section
          id="education"
          className="relative py-20 px-4 bg-slate-50 dark:bg-black overflow-hidden"
        >
          {/* Background Glows */}
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-pink-600 rounded-full blur-3xl opacity-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" />
          </div>

          <motion.div
            className="relative z-10 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Heading */}
            <div className="flex items-center space-x-2 mb-12">
              <GraduationCap className="text-blue-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white">
                Education
              </h2>
            </div>

            {/* Vertical Timeline Line */}
            <div className="relative border-l-2 border-blue-500/30 pl-6 space-y-12">
              {[
                {
                  degree: "Bachelor of Engineering (Information Technology)",
                  institution: "Theem College of Engineering",
                  period: "2021 - 2025",
                  score: "CGPA: 7.75",
                },
                {
                  degree: "Higher Secondary Certificate (HSC)",
                  institution: "Thakur College of Science & Commerce",
                  period: "2021",
                  score: "Percentage: 81.67%",
                },
                {
                  degree: "Secondary School Certificate (SSC)",
                  institution: "S.S. Patna High School",
                  period: "2019",
                  score: "Percentage: 79.86%",
                },
              ].map((edu, index) => (
                <motion.div
                  key={edu.degree}
                  className="relative ml-4"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  {/* Timeline Dot */}
                  <div className="absolute -left-[33px] top-1.5 w-5 h-5 bg-blue-500 border-4 border-slate-50 dark:border-black rounded-full shadow-lg" />

                  {/* Card Content */}
                  <div className="p-5 md:p-6 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl backdrop-blur-xl shadow-xl hover:bg-slate-900/10 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105">
                    <h3 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {edu.degree}
                    </h3>
                    <div className="flex justify-between text-xs md:text-sm text-slate-600 dark:text-blue-200 mb-3">
                      <span>{edu.institution}</span>
                      <span>{edu.period}</span>
                    </div>
                    <p className="text-sm md:text-base text-slate-700 dark:text-blue-100/90">
                      {edu.score}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/*certificate section*/}
        <section
          id="certifications"
          className="py-20 px-4 bg-gradient-to-b from-slate-100 dark:from-[#0f0f0f] to-slate-50 dark:to-black"
        >
          <div className="max-w-6xl mx-auto">
            {/* Heading */}
            <div className="flex items-center space-x-2 mb-12">
              <Award className="text-pink-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white">
                Certifications
              </h2>
            </div>

            {/* Certificates Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[
                {
                  title: "AWS S3 Basics",
                  provider: "Coursera ",
                  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original.svg",
                  gradient: "from-orange-500 to-red-500",
                  link: certificate1,
                },
                {
                  title: "Data Science using Python",
                  provider: "LivetechINDIA",
                  icon: "https://cdn-icons-png.flaticon.com/512/5408/5408783.png",
                  gradient: "from-blue-400 to-cyan-500",
                  link: certificate2,
                },
                {
                  title: "Responsive Web Design",
                  provider: "freeCodeCamp",
                  icon: "https://cdn-icons-png.flaticon.com/512/2504/2504196.png",
                  gradient: "from-blue-600 to-indigo-500",
                  link: certificate3,
                },
                {
                  title: "Artificial Intelligence & Machine Learning",
                  provider: "Infosys Springboard",
                  icon: "https://cdn-icons-png.flaticon.com/512/8637/8637099.png",
                  gradient: "from-green-400 to-blue-500",
                  link: certificate4,
                },
              ].map((cert, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10  backdrop-blur-xl shadow-xl hover:bg-slate-900/10 dark:hover:bg-white/10 transition-all duration-300 transform hover:scale-105 rounded-2xl overflow-hidden bg-white dark:bg-[#111111] "
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: { opacity: 1, y: 0 },
                  }}
                >
                  {/* Gradient Header */}
                  <div
                    className={`p-6 bg-gradient-to-r ${cert.gradient} flex items-center`}
                  >
                    <img src={cert.icon} alt="icon" className="w-10 h-10" />
                  </div>

                  {/* Certificate Details */}
                  <div className="p-6">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-1">
                      {cert.title}
                    </h3>
                    <p className="text-sm text-slate-600 dark:text-gray-400">{cert.provider}</p>
                    <a
                      href={cert.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1 text-purple-600 dark:text-purple-400 font-medium text-sm hover:underline"
                    >
                      View Certificate <ArrowUpRight size={16} />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-blue-900/30 bg-slate-50 dark:bg-black text-center">
        <p className="text-slate-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Sk Nadeem Ahammad. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default App;
