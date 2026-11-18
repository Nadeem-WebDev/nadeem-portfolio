import { ArrowUp, ArrowRight } from "lucide-react";
import { FaGithub, FaLinkedin, FaEnvelope, FaInstagram } from "react-icons/fa";
import VisitCounter from "./VisitCounter.jsx";

const quickLinks = [
  { href: "#about", label: "About" },
  { href: "#experience", label: "Experience" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#education", label: "Education" },
  { href: "#certifications", label: "Certifications" },
];

const socials = [
  { href: "mailto:nadeem786shaikh92@gmail.com", label: "Email", icon: FaEnvelope },
  { href: "https://github.com/Nadeem-WebDev", label: "GitHub", icon: FaGithub },
  { href: "https://www.linkedin.com/in/nadeem-shaikh-1035a4345/", label: "LinkedIn", icon: FaLinkedin },
  { href: "https://www.instagram.com/nadeem_7_shaikh/", label: "Instagram", icon: FaInstagram },
];

// Fades the top accent line out towards both ends
const fadeEnds = {
  maskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
  WebkitMaskImage: "linear-gradient(to right, transparent, black 20%, black 80%, transparent)",
};

export default function Footer() {
  return (
    <footer className="relative bg-slate-50 dark:bg-black overflow-hidden">
      {/* Gradient line along the top, with a soft glow under it */}
      {/* (tall enough that the blurred glow fades out before the box's bottom edge) */}
      <div className="absolute top-0 inset-x-0 h-32 pointer-events-none" style={fadeEnds}>
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
        <div className="absolute top-0 inset-x-1/4 h-8 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-0 dark:opacity-20 blur-2xl" />
      </div>

      {/* Extra bottom padding keeps the last row clear of the floating WhatsApp button */}
      <div className="relative max-w-6xl mx-auto px-6 pt-16 pb-24 md:pb-28">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-8 mb-12">
          {/* Brand */}
          <div className="md:col-span-5">
            <a
              href="#home"
              className="inline-block text-3xl font-extrabold tracking-widest bg-gradient-to-r from-blue-500 to-pink-500 bg-clip-text text-transparent"
            >
              SNA.
            </a>
            <p className="mt-4 max-w-sm text-slate-600 dark:text-gray-400 leading-relaxed">
              Full Stack Developer building fast, secure and user-friendly web
              apps, from frontend to database.
            </p>
            <a
              href="#contact"
              className="group mt-6 inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-300"
            >
              Let's talk
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
            </a>
          </div>

          {/* Quick links */}
          <nav aria-label="Footer" className="md:col-span-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Quick Links
            </h3>
            <ul className="grid grid-cols-2 gap-x-6 gap-y-3">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-2 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200"
                  >
                    {/* Small bar that grows on hover */}
                    <span className="h-px w-2 bg-current opacity-50 group-hover:w-4 group-hover:opacity-100 transition-all duration-300" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div className="md:col-span-3">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-slate-900 dark:text-white mb-4">
              Connect
            </h3>
            <div className="flex flex-wrap gap-3">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target={social.href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  title={social.label}
                  className="w-11 h-11 flex items-center justify-center rounded-xl bg-white dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-white hover:border-transparent hover:bg-gradient-to-br hover:from-blue-600 hover:to-purple-600 hover:-translate-y-1 hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300"
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-6 border-t border-slate-900/10 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500 dark:text-gray-500 text-center sm:text-left">
            © {new Date().getFullYear()} SNA. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {/* Total visitors / page views (hidden if they can't be loaded) */}
            <VisitCounter />
            <a
              href="#home"
              className="group inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-slate-900/5 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 text-slate-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40 transition-colors duration-200"
            >
              Back to top
              <ArrowUp size={14} className="group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
