import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Code } from "lucide-react";
import ProjectCard from "./ProjectCard.jsx";

// Projects from the SNA Digital portfolio (shown as tilt cards by ProjectCard.jsx).
// `category` decides which filter tab a project shows up under.
const projects = [
  {
    title: "Clinix OPD System",
    category: "Full-Stack",
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
    category: "Full-Stack",
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
    category: "Full-Stack",
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
    category: "Frontend",
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
    category: "Frontend",
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
    category: "Frontend",
    description:
      "High-performance, fully responsive landing page for a fitness center, with membership tiers and a UI built to drive sign-ups.",
    tags: ["React.js", "Tailwind CSS", "Framer Motion", "Lucide React"],
    metric: "High Conversion UI",
    image: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=800&h=400&auto=format&fit=crop",
    liveUrl: "https://gym-site-demoo.netlify.app/",
    githubUrl: "https://github.com/Nadeem-WebDev/gym-site-demo",
  },
];

const filters = ["All", "Full-Stack", "Frontend"];

export default function Projects() {
  const [filter, setFilter] = useState("All");
  const shown = filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="relative py-20 md:py-24 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-blue-600 rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-10"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Code className="text-blue-600 dark:text-blue-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              Featured Projects
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            Real-world apps I've designed, built and shipped, from full-stack
            platforms to polished frontends.
          </p>
        </motion.div>

        {/* Filter tabs, with a glass pill that slides to the selected tab */}
        <div className="flex justify-center mb-12">
          <div
            role="tablist"
            aria-label="Filter projects"
            className="inline-flex p-1.5 gap-1 rounded-full bg-white/70 dark:bg-white/[0.04] border border-slate-900/10 dark:border-white/10 backdrop-blur-xl shadow-lg"
          >
            {filters.map((name) => {
              const isActive = filter === name;
              const count =
                name === "All" ? projects.length : projects.filter((p) => p.category === name).length;
              return (
                <button
                  key={name}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => setFilter(name)}
                  className={`relative isolate px-4 sm:px-5 py-2 rounded-full text-sm font-semibold transition-colors duration-300 ${
                    isActive
                      ? "text-white"
                      : "text-slate-600 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white"
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="project-filter-pill"
                      className="absolute inset-0 -z-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 shadow-[inset_0_1px_0_rgba(255,255,255,0.25),0_4px_14px_-4px_rgba(99,102,241,0.6)]"
                      transition={{ type: "spring", stiffness: 260, damping: 28 }}
                    />
                  )}
                  {name}
                  <span className={`ml-1.5 text-xs ${isActive ? "text-white/70" : "opacity-60"}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Cards: switching tabs smoothly rearranges the grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          <AnimatePresence mode="popLayout">
            {shown.map((project) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, y: 30, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35 }}
                className="flex"
              >
                <ProjectCard project={project} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
