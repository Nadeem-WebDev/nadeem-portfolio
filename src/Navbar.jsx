import { useState, useEffect } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useSpring,
  useMotionValueEvent,
} from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import ThemeToggle from "./ThemeToggle.jsx";
import resume from "./certificates/Nadeem_Resume.pdf";

// Used by both the desktop navbar and the mobile side menu
const navLinks = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
  { href: resume, label: "Resume" },
];

// Section ids the navbar can highlight (the resume link isn't a section)
const sectionIds = navLinks
  .filter(({ href }) => href.startsWith("#"))
  .map(({ href }) => href.slice(1));

// PDF links (the resume) open in a new tab
const linkTarget = (href) =>
  href.includes(".pdf") ? { target: "_blank", rel: "noopener noreferrer" } : {};

// Returns the id of the section currently being read: the last section whose
// top has scrolled past 35% of the screen height
function useActiveSection() {
  const [active, setActive] = useState(sectionIds[0]);

  useEffect(() => {
    let frame = null;
    const update = () => {
      frame = null;
      const line = window.innerHeight * 0.35;
      let current = sectionIds[0];
      for (const id of sectionIds) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= line) current = id;
      }
      // At the very bottom, the last section (Contact) may never reach the line
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2;
      setActive(atBottom ? sectionIds[sectionIds.length - 1] : current);
    };
    // Run at most once per frame, however fast the scroll events come in
    const onScroll = () => {
      if (frame === null) frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, []);

  return active;
}

export default function Navbar({ isMenuOpen, setIsMenuOpen }) {
  const active = useActiveSection();
  const [scrolled, setScrolled] = useState(false);

  // Scroll progress bar along the bottom of the navbar (spring makes it glide)
  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30, restDelta: 0.001 });

  // Once the page is scrolled a little, make the navbar slimmer and more solid
  useMotionValueEvent(scrollY, "change", (current) => {
    setScrolled(current > 20);
  });

  // Close the mobile menu if the window is widened to desktop size (md = 768px)
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const handleChange = (e) => {
      if (e.matches) setIsMenuOpen(false);
    };
    desktop.addEventListener("change", handleChange);
    return () => desktop.removeEventListener("change", handleChange);
  }, [setIsMenuOpen]);

  // Close the mobile menu with the Escape key
  useEffect(() => {
    if (!isMenuOpen) return;
    const onKey = (e) => e.key === "Escape" && setIsMenuOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMenuOpen, setIsMenuOpen]);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 w-full z-50 backdrop-blur-md border-b border-slate-900/10 dark:border-white/10 transition-[background-color,box-shadow] duration-300 ${
          scrolled
            ? "bg-slate-50/90 dark:bg-black/90 shadow-lg"
            : "bg-slate-50/70 dark:bg-black/70 shadow-md"
        }`}
      >
        <div
          className={`max-w-7xl mx-auto flex items-center justify-between px-4 transition-[padding] duration-300 ${
            scrolled ? "py-2" : "py-2 md:py-3"
          }`}
        >
          {/* Logo: back to the top */}
          <a
            href="#home"
            aria-label="Back to top"
            className="text-2xl md:text-3xl font-extrabold tracking-widest bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent hover:scale-105 transition-transform duration-300"
          >
            SNA.
          </a>

          {/* Desktop links, with a pill that slides to the current section */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map(({ href, label }) => {
              const isActive = href === `#${active}`;
              return (
                <a
                  key={label}
                  href={href}
                  {...linkTarget(href)}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative isolate px-3 py-1.5 rounded-full text-sm font-medium tracking-wide transition-colors duration-300 ${
                    isActive
                      ? "text-blue-700 dark:text-white"
                      : "text-slate-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
                  }`}
                >
                  {isActive && (
                    // Frosted-glass pill: a soft top-to-bottom sheen, blur behind it,
                    // a bright edge along the top and a faint blue/purple glow
                    <motion.span
                      layoutId="nav-active-pill"
                      className="absolute inset-0 -z-10 rounded-full backdrop-blur-md bg-gradient-to-b from-white/90 to-blue-50/60 dark:from-white/[0.16] dark:to-white/[0.04] border border-blue-500/20 dark:border-white/[0.12] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_14px_-4px_rgba(59,130,246,0.35)] dark:shadow-[inset_0_1px_0_rgba(255,255,255,0.18),0_4px_16px_-4px_rgba(139,92,246,0.45)]"
                      transition={{ type: "spring", stiffness: 260, damping: 28, mass: 0.9 }}
                    />
                  )}
                  <span className="inline-flex items-center gap-0.5">
                    {label}
                    {href.includes(".pdf") && <ArrowUpRight size={14} />}
                  </span>
                </a>
              );
            })}
          </div>

          <div className="flex items-center space-x-3 md:space-x-4">
            {/* Dark/light mode switch */}
            <ThemeToggle />

            {/* Hire Me Button */}
            <a
              href="#contact"
              className="hidden md:inline-block px-4 py-2 text-sm rounded-full font-semibold text-white bg-gradient-to-r from-blue-500 to-pink-500 shadow-md shadow-blue-500/20 hover:shadow-lg hover:shadow-pink-500/30 hover:scale-105 active:scale-95 transition-all duration-300"
            >
              Hire Me
            </a>

            {/* Hamburger Button (mobile only) */}
            <motion.button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label={isMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={isMenuOpen}
              whileTap={{ scale: 0.9 }}
              className="md:hidden p-3 bg-blue-500/10 hover:bg-blue-500/20 rounded-full transition-colors duration-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isMenuOpen ? "close" : "open"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex"
                >
                  {isMenuOpen ? (
                    <X size={26} className="text-blue-600 dark:text-blue-400" />
                  ) : (
                    <Menu size={26} className="text-blue-600 dark:text-blue-400" />
                  )}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>

        {/* Scroll progress bar */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute bottom-0 left-0 right-0 h-[2px] origin-left bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500"
        />
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Dimmed backdrop: tap it to close the menu */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsMenuOpen(false)}
              className="md:hidden fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
            />

            {/* Side panel */}
            <motion.div
              key="panel"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 32 }}
              className="md:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] z-[60] bg-slate-50 dark:bg-black border-l border-slate-900/10 dark:border-white/10 shadow-2xl"
            >
              <div className="flex flex-col h-full p-8">
                <div className="flex justify-end mb-8">
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    aria-label="Close menu"
                    className="p-2 hover:bg-slate-900/5 dark:hover:bg-white/5 rounded-full"
                  >
                    <X size={24} />
                  </button>
                </div>

                {/* Links slide in one after another */}
                <motion.div
                  className="flex flex-col space-y-2"
                  initial="hidden"
                  animate="visible"
                  variants={{ visible: { transition: { staggerChildren: 0.05, delayChildren: 0.1 } } }}
                >
                  {navLinks.map(({ href, label }) => {
                    const isActive = href === `#${active}`;
                    return (
                      <motion.a
                        key={label}
                        href={href}
                        {...linkTarget(href)}
                        onClick={() => setIsMenuOpen(false)}
                        variants={{
                          hidden: { opacity: 0, x: 30 },
                          visible: { opacity: 1, x: 0 },
                        }}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-lg tracking-wide border-l-4 transition-colors duration-300 ${
                          isActive
                            ? "border-blue-500 bg-blue-500/10 text-blue-700 dark:text-blue-300 font-semibold"
                            : "border-transparent hover:bg-slate-900/5 dark:hover:bg-white/5 hover:text-blue-600 dark:hover:text-blue-400"
                        }`}
                      >
                        {label}
                        {href.includes(".pdf") && <ArrowUpRight size={18} />}
                      </motion.a>
                    );
                  })}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
