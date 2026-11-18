import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { MousePointerClick } from 'lucide-react';
import { FiGithub } from 'react-icons/fi';

// How many tech tags to show before collapsing the rest into "+N"
const MAX_TAGS = 3;

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

// Project card that tilts in 3D toward the mouse, with a glowing border
// and a soft spotlight that follow the cursor
export default function ProjectCard({ project }) {
  // Mouse position over the card, from -0.5 to 0.5 on each axis
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Springs make the tilt follow the mouse smoothly instead of snapping
  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ['7deg', '-7deg']);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ['-7deg', '7deg']);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = e.clientX - rect.left;
    const py = e.clientY - rect.top;
    x.set(px / rect.width - 0.5);
    y.set(py / rect.height - 0.5);
    // Position of the border glow and spotlight (CSS variables: no React re-render)
    e.currentTarget.style.setProperty('--mx', `${px}px`);
    e.currentTarget.style.setProperty('--my', `${py}px`);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  const hostname = new URL(project.liveUrl).hostname;
  const extraTags = project.tags.length - MAX_TAGS;

  return (
    <div style={{ perspective: 1000 }} className="w-full h-full flex flex-col">
      <motion.div
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileTap={{ scale: 0.98 }}
        className="group relative w-full h-full flex flex-col flex-grow"
      >
        {/* 1px frame: a plain border, plus a blue→purple glow that follows the mouse.
            translateZ lifts the card off the tilting base for a 3D pop. */}
        <div
          className="relative flex flex-col flex-grow w-full rounded-3xl p-px bg-slate-900/10 dark:bg-white/10 shadow-lg group-hover:shadow-2xl group-hover:shadow-blue-500/20 transition-shadow duration-500"
          style={{ transform: 'translateZ(40px)' }}
        >
          <div
            className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background:
                'radial-gradient(320px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.9), rgba(168,85,247,0.5) 30%, transparent 60%)',
            }}
          />

          {/* Card body */}
          <div className="relative flex flex-col flex-grow rounded-[calc(1.5rem-1px)] bg-white dark:bg-[#0a0a0a] overflow-hidden">
            {/* Spotlight inside the card */}
            <div
              className="absolute inset-0 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(400px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.10), transparent 45%)',
              }}
            />

            {/* Browser-window frame around the screenshot */}
            <div className="p-3 pb-0">
              <div className="rounded-t-xl overflow-hidden border border-b-0 border-slate-900/10 dark:border-white/10">
                {/* Title bar: window dots + web address */}
                <div className="flex items-center gap-3 px-3 h-8 bg-slate-100 dark:bg-[#151515] border-b border-slate-900/10 dark:border-white/10">
                  <div className="flex gap-1.5 flex-shrink-0">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
                    <span className="w-2.5 h-2.5 rounded-full bg-green-400/90" />
                  </div>
                  <div className="flex-1 min-w-0 h-5 px-2.5 rounded-md bg-white dark:bg-white/5 border border-slate-900/5 dark:border-white/5 text-[10px] text-slate-500 dark:text-gray-500 flex items-center truncate">
                    {hostname}
                  </div>
                </div>

                {/* Screenshot */}
                <div className="relative h-44 overflow-hidden bg-slate-100 dark:bg-[#111111]">
                  <div className="absolute top-3 left-3 z-20 h-7 inline-flex items-center px-3 bg-black/60 backdrop-blur-md border border-white/10 text-blue-300 text-[10px] font-bold rounded-lg uppercase tracking-wider overflow-hidden">
                    <SplitFlapText text={project.metric} />
                  </div>
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 pointer-events-none"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white dark:from-[#0a0a0a] to-transparent pointer-events-none" />
                </div>
              </div>
            </div>

            {/* Text, tags and buttons */}
            <div className="relative z-20 px-6 pt-4 pb-6 flex flex-col flex-grow">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
                {project.title}
              </h3>
              <p className="text-sm leading-relaxed text-slate-600 dark:text-gray-400 mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {project.tags.slice(0, MAX_TAGS).map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2.5 py-1 bg-slate-100 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 rounded-full text-slate-700 dark:text-gray-300 font-medium whitespace-nowrap"
                  >
                    {tag}
                  </span>
                ))}
                {extraTags > 0 && (
                  <span
                    title={project.tags.slice(MAX_TAGS).join(', ')}
                    className="text-xs px-2.5 py-1 bg-blue-500/10 border border-blue-500/20 rounded-full text-blue-700 dark:text-blue-300 font-semibold whitespace-nowrap"
                  >
                    +{extraTags}
                  </span>
                )}
              </div>

              <div className="flex items-center gap-3 mt-auto">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/live flex-1 flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 rounded-xl text-sm font-bold text-white shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                >
                  <MousePointerClick
                    strokeWidth={2.5}
                    className="w-[18px] h-[18px] group-hover/live:-rotate-12 group-hover/live:scale-110 transition-transform duration-200"
                  />
                  Live Demo
                </a>
                {project.githubUrl && (
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-slate-100 dark:bg-white/5 border border-slate-900/10 dark:border-white/10 hover:border-slate-900/30 dark:hover:border-white/30 rounded-xl text-sm font-bold text-slate-700 dark:text-gray-300 hover:text-slate-900 dark:hover:text-white hover:-translate-y-0.5 active:scale-95 transition-all duration-200"
                  >
                    <FiGithub className="w-4 h-4" /> Source
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
