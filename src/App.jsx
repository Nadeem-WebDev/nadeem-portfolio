import { useState, useEffect, useCallback } from "react";
import {  Code,  User,  GraduationCap,  Briefcase,  Sparkles,  Mail,  Rocket,  FileText,  Award,  ArrowUpRight,  Brain } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

import nadImage from "./images/profile picture.jpg";
import rockSolidLogo from "./images/rock-solid-logo.png";

import resume from "./certificates/Nadeem_Resume.pdf";
import certificate1 from "./certificates/Coursera AWS S3 Basics.pdf";
import certificate2 from "./certificates/Data Science using python.pdf";
import certificate3 from "./certificates/Responsive_Web_Design_freeCodeCamp.pdf";
import certificate4 from "./certificates/Infosys AI&ML.pdf";
import Contact from "./Contact.jsx";
import ProjectCard from "./ProjectCard.jsx";
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

// Projects from the SNA Digital portfolio (shown as tilt cards by ProjectCard.jsx)
const projects = [
  {
    title: "Clinix OPD System",
    description:
      "Multi-tenant clinic management CRM with patient records, appointments, a live OPD queue, digital prescriptions, billing and role-based access.",
    tags: ["React.js", "Node.js", "Express.js", "MongoDB", "Tailwind CSS", "JWT", "Cloudinary"],
    metric: "Full-Stack SaaS",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://clinix-jywo.onrender.com/",
    githubUrl: "https://github.com/Nadeem-WebDev/clinix",
  },
  {
    title: "Salon Appointment Booking",
    description:
      "Full-stack PERN salon booking system with Razorpay payments, live queue tracking, OTP email verification and an admin dashboard with analytics.",
    tags: ["Node.js", "Express.js", "PostgreSQL", "Recharts", "JWT", "Razorpay", "PDFKit"],
    metric: "Full-Stack",
    image: "https://images.unsplash.com/photo-1560066984-138dadb4c035?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://salon-appointment-booking-system.onrender.com/",
    githubUrl: "https://github.com/Nadeem-WebDev/salon-appointment-booking-system",
  },
  {
    title: "Chat Application 2.0",
    description:
      "Real-time one-on-one chat app powered by Socket.io, with secure JWT authentication and bcrypt password hashing.",
    tags: ["Node.js", "Express.js", "MongoDB", "Socket.io", "Daisy UI"],
    metric: "Real-Time",
    image: "https://images.unsplash.com/photo-1611606063065-ee7946f0787a?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://chat-application-2-0.onrender.com/",
    githubUrl: "https://github.com/Nadeem-WebDev/chat-application-2.0",
  },
  {
    title: "Bakery Shop Web App",
    description:
      "Responsive bakery storefront that fetches products from a REST API, with filtering by price, flavour and category.",
    tags: ["React.js", "Tailwind CSS", "Vite", "REST API"],
    metric: "Dynamic UI",
    image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://honey-bakery-shop.vercel.app/",
    githubUrl: "https://github.com/Nadeem-WebDev/bakery-shop",
  },
  {
    title: "Premium Realty Portal",
    description:
      "Property listing app with advanced search filters, high-res image galleries and automated lead capture straight to WhatsApp.",
    tags: ["React.js", "Tailwind CSS", "GSAP", "Framer Motion", "Lenis"],
    metric: "+45% Conversions",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://sna-real-estate-07.vercel.app/",
    githubUrl: "https://github.com/Nadeem-WebDev/real-estate",
  },
  {
    title: "Fitness Studio Landing Page",
    description:
      "High-performance, fully responsive landing page for a fitness center, with membership tiers and a UI built to drive sign-ups.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
    metric: "High Conversion UI",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://gym-site-demoo.netlify.app/",
    githubUrl: "https://github.com/Nadeem-WebDev/gym-site-demo",
  },
];

// Shown as tags at the bottom of the About card
const softSkills = [
  "Communication",
  "Team Collaboration",
  "Problem Solving",
  "Time Management",
  "Adaptability",
  "Critical Thinking",
  "Creativity",
];

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

        {/*aboout*/}

        <section
          id="about"
          className="relative py-20 px-4 bg-slate-50 dark:bg-black overflow-hidden"
        >
          {/* Background glow animation */}
          <div className="absolute inset-0">
            <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-purple-700 rounded-full blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/3 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-10 animate-pulse" />
          </div>

          <motion.div
            className="relative z-10 max-w-7xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Section Header */}
            <div className="flex items-center justify-center space-x-2 mb-12">
              <User className="text-blue-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white">
                About Me
              </h2>
            </div>

            {/* Main Content */}
            <div className="flex flex-col md:flex-row items-center justify-center gap-12">
              {/* Image */}

              <motion.div
                className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-blue-500 shadow-[0_0_20px_4px_rgba(59,130,246,0.6)] hover:shadow-[0_0_25px_8px_rgba(59,130,246,0.8)] transition-shadow duration-500 ease-in-out hover:scale-105"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <img
                  src={nadImage}
                  className="w-full h-full object-cover object-[0px_-45px]"
                  alt="Nadeem"
                />
              </motion.div>

              {/* Text & Cards */}
              <motion.div
                className="max-w-xl text-center md:text-left md:max-w-3xl backdrop-blur-xl bg-slate-900/5 dark:bg-white/5 p-8 rounded-3xl border border-slate-900/10 dark:border-white/10 shadow-2xl"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.8 }}
                viewport={{ once: true }}
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

                <p className="text-lg md:text-xl text-slate-700 dark:text-blue-100 leading-relaxed mb-5">
                  What started as curiosity about how things work is now an
                  obsession with building and learning. I'm passionate about AI,
                  React, and anything that makes me think differently — I never
                  stop leveling up.
                </p>

                {/* Soft skills */}
                <div className="flex items-center justify-center md:justify-start gap-2 mt-2 mb-3">
                  <Brain className="text-green-600 dark:text-green-400" size={20} />
                  <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-600 dark:text-gray-400">
                    Soft Skills
                  </h3>
                </div>
                <div className="flex flex-wrap justify-center md:justify-start gap-2">
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
            </div>
          </motion.div>
        </section>

        {/* Experience Section */}
        <section
          id="experience"
          className="relative py-20 px-4 bg-slate-50 dark:bg-black overflow-hidden"
        >
          <div className="absolute inset-0">
            <div className="absolute top-1/4 left-1/3 w-72 h-72 bg-blue-700 rounded-full blur-3xl opacity-10 animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-purple-600 rounded-full blur-3xl opacity-10 animate-pulse" />
          </div>

          <motion.div
            className="relative z-10 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-12">
              <Briefcase className="text-blue-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white">
                Experience
              </h2>
            </div>

            {/* Experience Cards */}
            <div className="space-y-6 md:space-y-8">
              {[
                {
                  role: "Full Stack Developer (Intern)",
                  company: "Rock Solid Solutions",
                  period: "Aug 2025 – Nov 2026",
                  logo: rockSolidLogo,
                  points: [
                    <>
                      Shipped <strong className="text-slate-900 dark:text-white">250+ merge requests</strong> across 16 production repositories.
                    </>,
                    <>
                      Sped up a slow database job from <strong className="text-slate-900 dark:text-white">15+ min to 55 s</strong>.
                    </>,
                    <>
                      Fixed <strong className="text-slate-900 dark:text-white">150+ production issues</strong> and patched security vulnerabilities.
                    </>,
                    <>
                      Built customer features like automated domain-renewal reminder emails.
                    </>,
                  ],
                  tech: ["PHP", "JavaScript", "PostgreSQL", "ClickHouse", "Sentry"],
                },
              ].map((exp) => (
                <motion.div
                  key={exp.company}
                  className="p-6 md:p-8 bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-xl backdrop-blur-xl shadow-xl hover:bg-slate-900/10 dark:hover:bg-white/10 transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  viewport={{ once: true }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-1 md:gap-4 mb-4">
                    <div className="flex items-center gap-4">
                      {/* Company logo (falls back to initials if there's no logo) */}
                      <div
                        className={`w-14 h-14 flex-shrink-0 rounded-xl flex items-center justify-center overflow-hidden shadow-md ${
                          exp.logo ? "border border-white/10" : "bg-white"
                        }`}
                      >
                        {exp.logo ? (
                          <img
                            src={exp.logo}
                            alt={`${exp.company} logo`}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-lg font-extrabold text-blue-600">
                            {exp.company
                              .split(" ")
                              .map((word) => word[0])
                              .join("")}
                          </span>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xl md:text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {exp.role}
                        </h3>
                        <p className="text-base md:text-lg text-slate-600 dark:text-blue-200">
                          {exp.company}
                        </p>
                      </div>
                    </div>
                    <span className="text-xs md:text-sm text-slate-600 dark:text-blue-200 whitespace-nowrap md:pt-2">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="list-disc pl-5 space-y-2 text-sm md:text-base text-slate-700 dark:text-blue-100/90 marker:text-blue-500">
                    {exp.points.map((point, i) => (
                      <li key={i}>{point}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-2 mt-6">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="px-3 py-1 text-xs font-medium text-slate-700 dark:text-blue-100 bg-blue-500/10 border border-blue-500/30 rounded-full"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-16 md:py-20 px-4 bg-slate-50 dark:bg-black">
          <div className="max-w-7xl mx-auto">
            <div className="flex items-center space-x-2 mb-8 md:mb-12">
              <Code className="text-blue-600 dark:text-blue-500" size={28} />
              <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white">
                Featured Projects
              </h2>
            </div>
            {/* items-stretch makes every card in a row as tall as the tallest one */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 items-stretch">
              {projects.map((project) => (
                <ProjectCard key={project.title} project={project} />
              ))}
            </div>
          </div>
        </section>

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
