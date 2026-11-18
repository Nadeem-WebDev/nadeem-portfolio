import { motion } from "framer-motion";
import { FaWhatsapp } from "react-icons/fa";

// WhatsApp number with country code, digits only (same number as on sna-digital)
const PHONE = "918972469383";
// Message already typed in when the chat opens; the visitor can edit it before sending
const MESSAGE = "Hi Nadeem, I saw your portfolio and would like to connect!";
const whatsappUrl = `https://wa.me/${PHONE}?text=${encodeURIComponent(MESSAGE)}`;

// Floating "chat on WhatsApp" button in the bottom-right corner of every screen
export default function WhatsAppButton() {
  return (
    <motion.a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with me on WhatsApp"
      // z-30: stays under the mobile menu and its dark backdrop (z-40 and up)
      className="group fixed bottom-5 right-5 md:bottom-8 md:right-8 z-30 flex items-center justify-center"
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20, delay: 1.2 }}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      {/* Soft pulse ring (off for visitors who turn off animations) */}
      <span className="absolute inline-flex h-full w-full rounded-full bg-[#25D366] opacity-40 animate-ping [animation-duration:2s] motion-reduce:hidden" />

      {/* The button */}
      <span className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg shadow-[#25D366]/40">
        <FaWhatsapp size={30} />
      </span>

      {/* Label that slides in on hover (mouse only) */}
      <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-xl px-3 py-2 text-sm font-semibold text-slate-800 dark:text-white bg-white/90 dark:bg-slate-900/90 border border-slate-900/10 dark:border-white/10 backdrop-blur-md shadow-xl opacity-0 translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
        Chat on WhatsApp
      </span>
    </motion.a>
  );
}
