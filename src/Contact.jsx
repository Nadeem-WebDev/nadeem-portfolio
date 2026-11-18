import { useRef, useEffect, useState } from 'react';
import {
  Send, Mail, Linkedin, Github, Instagram, Loader2, CheckCircle2, AlertCircle,
  Copy, Check, ArrowUpRight, User, AtSign, Tag, MessageSquare,
} from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const EMAIL = 'nadeem786shaikh92@gmail.com';
const MESSAGE_MAX = 1000;

// Contact tiles in the info card (the email tile is first and gets a copy button)
const contactLinks = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, icon: Mail, gradient: 'from-blue-500 to-purple-500' },
  { label: 'LinkedIn', value: 'Nadeem-Shaikh', href: 'https://www.linkedin.com/in/nadeem-shaikh-1035a4345/', icon: Linkedin, gradient: 'from-sky-500 to-blue-600' },
  { label: 'GitHub', value: 'Nadeem-WebDev', href: 'https://github.com/Nadeem-WebDev', icon: Github, gradient: 'from-slate-600 to-slate-900' },
  { label: 'Instagram', value: 'nadeem_7_shaikh', href: 'https://www.instagram.com/nadeem_7_shaikh/', icon: Instagram, gradient: 'from-pink-500 to-orange-400' },
];

// Shared input styling: icon space on the left, blue ring while typing
const inputClass =
  'w-full pl-11 pr-4 py-3 rounded-xl bg-slate-50 dark:bg-white/[0.04] border border-slate-900/10 dark:border-white/10 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-gray-500 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-500/15 transition-[border-color,box-shadow] duration-200';

// A labelled form field with an icon inside the input
function Field({ label, icon, children }) {
  const FieldIcon = icon;
  return (
    <label className="block">
      <span className="block mb-1.5 text-sm font-medium text-slate-700 dark:text-gray-300">{label}</span>
      <span className="relative block">
        <FieldIcon size={18} className="absolute left-4 top-3.5 text-slate-400 dark:text-gray-500 pointer-events-none" />
        {children}
      </span>
    </label>
  );
}

// Border glow + spotlight follow the mouse (CSS variables: no re-render)
const trackGlow = (e) => {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - rect.top}px`);
};

const Contact = () => {
  const form = useRef(null);
  // 'idle' | 'sending' | 'success' | 'error' – controls what the button shows
  const [status, setStatus] = useState('idle');
  const [messageLength, setMessageLength] = useState(0);
  const [copied, setCopied] = useState(false);

  // Initialize EmailJS with the public key once
  useEffect(() => {
    emailjs.init(publicKey);
  }, []);

  // After a success or error, go back to the normal button after a few seconds
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    const timer = setTimeout(() => setStatus('idle'), 4000);
    return () => clearTimeout(timer);
  }, [status]);

  // "Copied!" goes back to the copy icon after 2 seconds
  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 2000);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      // Clipboard not available (old browser / insecure page) – the mailto link still works
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (form.current && status !== 'sending') {
      setStatus('sending');
      const formElements = form.current.elements;

      // These names must match the {{variables}} in the EmailJS template
      // (see email-templates/contact-notification.html)
      const formData = {
        subject: formElements.subject.value,
        from_name: formElements.name.value,
        from_email: formElements.email.value,
        message: formElements.message.value,
      };

      emailjs
        .send(serviceID, templateID, formData, publicKey)
        .then(() => {
          setStatus('success');
          form.current?.reset();
          setMessageLength(0);
        })
        .catch((error) => {
          console.error("Email sending error:", error);
          setStatus('error');
        });
    }
  };

  return (
    <section id="contact" className="relative py-20 md:py-24 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-80 h-80 bg-blue-600 rounded-full blur-[140px] opacity-10" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-600 rounded-full blur-[140px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          className="flex flex-col items-center text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="flex items-center space-x-3 mb-3">
            <Send className="text-blue-600 dark:text-blue-400 w-7 h-7 md:w-8 md:h-8 flex-shrink-0" />
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-wide text-slate-900 dark:text-white">
              Get in Touch
            </h2>
          </div>
          <p className="text-slate-600 dark:text-gray-400 max-w-xl">
            Have a project, a role or just a question? My inbox is always open.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          {/* Info card */}
          <motion.div
            className="lg:col-span-2 relative p-7 md:p-8 rounded-3xl bg-white/80 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 backdrop-blur-xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />

            <h3 className="relative text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Let's build something together
            </h3>
            <p className="relative text-slate-600 dark:text-gray-400 leading-relaxed mb-8">
              I'm always open to new collaborations, freelance work and full-time
              roles. Drop a message anytime.
            </p>

            {/* Contact tiles */}
            <ul className="relative space-y-3">
              {contactLinks.map((item) => {
                const isEmail = item.label === 'Email';
                return (
                  <li
                    key={item.label}
                    className="group flex items-center gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-white/[0.03] border border-slate-900/10 dark:border-white/10 hover:border-blue-500/40 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-blue-500/10 transition-all duration-300"
                  >
                    <a
                      href={item.href}
                      target={isEmail ? undefined : '_blank'}
                      rel={isEmail ? undefined : 'noopener noreferrer'}
                      className="flex flex-1 min-w-0 items-center gap-3"
                    >
                      <span className={`p-2.5 rounded-xl bg-gradient-to-br ${item.gradient} shadow-md flex-shrink-0`}>
                        <item.icon size={18} className="text-white" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-gray-500">
                          {item.label}
                        </span>
                        {/* The email may wrap (only right after the "@") instead of being cut off */}
                        <span className={`block font-medium text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors ${isEmail ? 'text-sm sm:text-base' : 'truncate'}`}>
                          {isEmail ? (
                            <>
                              {item.value.split('@')[0]}@<wbr />
                              {item.value.split('@')[1]}
                            </>
                          ) : (
                            item.value
                          )}
                        </span>
                      </span>
                    </a>

                    {isEmail ? (
                      <button
                        type="button"
                        onClick={copyEmail}
                        aria-label={copied ? 'Email copied' : 'Copy email address'}
                        title={copied ? 'Copied!' : 'Copy email'}
                        className={`flex-shrink-0 p-2 rounded-lg border transition-colors duration-200 ${
                          copied
                            ? 'bg-green-500/10 border-green-500/30 text-green-600 dark:text-green-400'
                            : 'border-slate-900/10 dark:border-white/10 text-slate-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:border-blue-500/40'
                        }`}
                      >
                        {copied ? <Check size={16} /> : <Copy size={16} />}
                      </button>
                    ) : (
                      <ArrowUpRight
                        size={18}
                        className="flex-shrink-0 text-slate-400 dark:text-gray-500 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </motion.div>

          {/* Form card, with a border glow that follows the mouse */}
          <motion.div
            onMouseMove={trackGlow}
            className="lg:col-span-3 group relative rounded-3xl p-px bg-slate-900/10 dark:bg-white/10 shadow-xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true, amount: 0.2 }}
          >
            <div
              className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{
                background:
                  'radial-gradient(360px circle at var(--mx, 50%) var(--my, 50%), rgba(99,102,241,0.9), rgba(168,85,247,0.5) 30%, transparent 60%)',
              }}
            />

            <form
              ref={form}
              onSubmit={handleSubmit}
              className="relative h-full rounded-[calc(1.5rem-1px)] bg-white dark:bg-[#0a0a0a] p-7 md:p-8 space-y-5"
            >
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">Send a message</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <Field label="Name" icon={User}>
                  <input type="text" name="name" placeholder="Your name" autoComplete="name" required className={inputClass} />
                </Field>
                <Field label="Email" icon={AtSign}>
                  <input type="email" name="email" placeholder="you@example.com" autoComplete="email" required className={inputClass} />
                </Field>
              </div>

              <Field label="Subject" icon={Tag}>
                <input type="text" name="subject" placeholder="What's it about?" required className={inputClass} />
              </Field>

              <Field label="Message" icon={MessageSquare}>
                <textarea
                  name="message"
                  placeholder="Tell me a little about your project or role..."
                  rows={5}
                  maxLength={MESSAGE_MAX}
                  required
                  onChange={(e) => setMessageLength(e.target.value.length)}
                  className={`${inputClass} resize-none`}
                />
                <span className="absolute right-3 bottom-2.5 text-xs text-slate-400 dark:text-gray-500 pointer-events-none">
                  {messageLength}/{MESSAGE_MAX}
                </span>
              </Field>

              <button
                type="submit"
                disabled={status === 'sending'}
                className={`w-full py-3.5 rounded-xl text-white font-semibold flex items-center justify-center gap-2 shadow-lg transition-all duration-300 disabled:cursor-wait active:scale-[0.98] ${
                  status === 'success'
                    ? 'bg-green-600 shadow-green-500/25'
                    : status === 'error'
                    ? 'bg-red-600 shadow-red-500/25'
                    : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5'
                }`}
              >
                {status === 'sending' && (<><Loader2 size={18} className="animate-spin" /> Sending...</>)}
                {status === 'success' && (<><CheckCircle2 size={18} /> Message sent!</>)}
                {status === 'error' && (<><AlertCircle size={18} /> Couldn't send, please try again</>)}
                {status === 'idle' && (<><Send size={18} /> Send Message</>)}
              </button>

              {/* Screen readers announce the result; it's also shown under the button */}
              <p aria-live="polite" className="text-sm text-center min-h-[1.25rem]">
                {status === 'success' && (
                  <span className="text-green-600 dark:text-green-400">Thanks! I'll get back to you soon.</span>
                )}
                {status === 'error' && (
                  <span className="text-red-600 dark:text-red-400">
                    Something went wrong. You can also email me directly.
                  </span>
                )}
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
