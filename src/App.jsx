import { useState, useEffect, useCallback } from "react";
import {  Sparkles,  Mail,  Rocket,  FileText } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

import nadImage from "./images/profile picture.jpg";

import resume from "./certificates/Nadeem_Resume.pdf";
import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
import Experience from "./Experience.jsx";
import About from "./About.jsx";
import Education from "./Education.jsx";
import Certifications from "./Certifications.jsx";
import VisitCounter from "./VisitCounter.jsx";
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

            {/* Name: fades up on load, with a light sweeping across the gradient (see .name-shine in index.css) */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="name-shine text-4xl md:text-6xl font-extrabold mb-4"
            >
              Sk Nadeem Ahammad
            </motion.h1>

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

        {/* Education Section */}
        <Education />

        {/* Certifications Section */}
        <Certifications />

        {/* Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <footer className="py-6 border-t border-blue-900/30 bg-slate-50 dark:bg-black text-center flex flex-col items-center gap-3">
        <p className="text-slate-600 dark:text-gray-400 text-sm">
          © {new Date().getFullYear()} Sk Nadeem Ahammad. All rights reserved.
        </p>
        {/* Total visitors / page views (hidden if they can't be loaded) */}
        <VisitCounter />
      </footer>
    </div>
  );
}

export default App;
