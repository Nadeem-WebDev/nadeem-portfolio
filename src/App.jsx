import { useState, useEffect, useCallback } from "react";

import Contact from "./Contact.jsx";
import Projects from "./Projects.jsx";
import Experience from "./Experience.jsx";
import About from "./About.jsx";
import Education from "./Education.jsx";
import Certifications from "./Certifications.jsx";
import Footer from "./Footer.jsx";
import Preloader from "./Preloader.jsx";
import Navbar from "./Navbar.jsx";
import Hero from "./Hero.jsx";
import Skills from "./Skills.jsx";
import CustomCursor from "./CustomCursor.jsx";

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
      {/* Custom mouse cursor (desktop mice only) */}
      <CustomCursor />

      {/* Loading screen (first visit of the session only) */}
      {isLoading && <Preloader onComplete={handlePreloaderComplete} />}

      {/* Navbar + mobile menu */}
      <Navbar isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />

      {/* Main Sections */}
      <main className="pt-12 md:pt-14">
        {/* Hero Section */}
        <Hero />

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
      <Footer />
    </div>
  );
}

export default App;
