import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

// Badge text that flips in letter by letter when the card scrolls into view
function SplitFlapText({ text }) {
  return (
    <span className="inline-flex overflow-hidden">
      {text.split('').map((char, index) => (
        <motion.span
          key={index}
          initial={{ y: '100%', opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: index * 0.05, type: 'spring', damping: 15, stiffness: 200 }}
          className="inline-block"
        >
          {char === ' ' ? ' ' : char}
        </motion.span>
      ))}
    </span>
  );
}

// Project card that tilts in 3D toward the mouse
export default function ProjectCard({ project }) {
  // Mouse position over the card, from -0.5 to 0.5 on each axis
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs make the tilt follow the mouse smoothly instead of snapping
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['8deg', '-8deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-8deg', '8deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full flex flex-col">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.1 }}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full h-full flex flex-col flex-grow"
      >
        {/* translateZ lifts the card content off the tilting base, for a 3D pop */}
        <div
          className="relative flex flex-col flex-grow w-full rounded-3xl bg-white dark:bg-[#0a0a0a] border border-slate-900/10 dark:border-white/10 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-shadow duration-500 overflow-hidden"
          style={{ transform: 'translateZ(40px)' }}
        >
          {/* Hover glow behind the text area */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_70%,rgba(59,130,246,0.18),rgba(168,85,247,0.08)_45%,transparent_75%)] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

          {/* Image */}
          <div className="relative w-full h-48 overflow-hidden border-b border-slate-900/10 dark:border-white/10 flex-shrink-0 bg-slate-100 dark:bg-[#111111]">
            <div className="absolute top-4 left-4 z-20 h-7 inline-flex items-center px-3 bg-black/60 backdrop-blur-md border border-white/10 text-blue-300 text-[10px] font-bold rounded-lg uppercase tracking-wider overflow-hidden">
              <SplitFlapText text={project.metric} />
            </div>
            <img
              src={project.image}
              alt={project.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-90 group-hover:opacity-100 pointer-events-none"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-white/60 dark:from-[#0a0a0a] via-transparent to-transparent opacity-80 pointer-events-none" />
          </div>

          {/* Text, tags and buttons */}
          <div className="relative p-6 flex flex-col flex-grow">
            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {project.title}
            </h3>
            <p className="text-sm text-slate-600 dark:text-gray-400 mb-4 line-clamp-3">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-[#111111] border border-slate-900/10 dark:border-white/10 rounded-lg text-slate-700 dark:text-gray-300 font-medium whitespace-nowrap"
                >
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 mt-auto">
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group/live flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:scale-95 transition-all duration-200"
              >
                <MousePointerClick
                  strokeWidth={2.5}
                  className="w-[18px] h-[18px] group-hover/live:-rotate-12 group-hover/live:scale-110 transition-transform duration-200"
                />
                Live
              </a>
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-[#111111] border border-slate-900/10 dark:border-white/10 hover:border-slate-900/30 dark:hover:border-white/30 rounded-xl text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:-translate-y-1 active:scale-95 transition-all duration-200"
                >
                  <FiGithub className="w-4 h-4" /> Source
                </a>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
