import { useRef, useEffect, useState } from 'react';
import { Send, Mail, Linkedin, Github, Instagram, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from '@emailjs/browser';

const serviceID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const templateID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

const Contact = () => {
  const form = useRef(null);
  // 'idle' | 'sending' | 'success' | 'error' – controls what the button shows
  const [status, setStatus] = useState('idle');

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
        })
        .catch((error) => {
          console.error("Email sending error:", error);
          setStatus('error');
        });
    }
  };

  return (
    <section id="contact" className="relative py-20 px-4 bg-slate-50 dark:bg-black overflow-hidden">
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="flex items-center space-x-2 mb-12">
          <Send className="text-blue-500" size={28} />
          <h2 className="text-3xl md:text-4xl font-bold tracking-wide text-slate-900 dark:text-white">Get in Touch</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Contact Information */}
          <motion.div className="bg-slate-900/5 dark:bg-white/5 p-8 rounded-xl backdrop-blur-xl">
            <p className="text-slate-700 dark:text-gray-300 mb-8">
              I'm always open to new collaborations! Drop a message anytime.
            </p>
            <div className="space-y-4">
              <a href="mailto:nadeem786shaikh92@gmail.com" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400">
                <Mail size={18} />
                <span>nadeem786shaikh92@gmail.com</span>
              </a>
              <a href="https://www.linkedin.com/in/nadeem-shaikh-1035a4345/" target="_blank" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400">
                <Linkedin size={18} />
                <span>Nadeem-Shaikh</span>
              </a>
              <a href="https://github.com/Nadeem-WebDev" target="_blank" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400">
                <Github size={18} />
                <span>Nadeem-WebDev</span>
              </a>
              <a href="https://www.instagram.com/nadeem_7_shaikh/" target="_blank" className="flex items-center space-x-3 text-blue-600 dark:text-blue-400">
                <Instagram size={18} />
                <span>nadeem_7_shaikh</span>
              </a>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.form ref={form} onSubmit={handleSubmit} className="space-y-4 bg-slate-900/5 dark:bg-white/5 p-8 rounded-xl backdrop-blur-xl">
            <input type="text" name="subject" placeholder="Subject..." required className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-500/50 text-slate-900 dark:text-white" />
            <input type="text" name="name" placeholder="Name..." required className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-500/50 text-slate-900 dark:text-white" />
            <input type="email" name="email" placeholder="Email..." required className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-500/50 text-slate-900 dark:text-white" />
            <textarea name="message" placeholder="Your Message..." rows={4} required className="w-full p-3 rounded-lg bg-blue-50 dark:bg-blue-900/40 border border-blue-500/50 text-slate-900 dark:text-white"></textarea>
            <button
              type="submit"
              disabled={status === 'sending'}
              className={`w-full py-3 rounded-lg text-white font-semibold flex items-center justify-center gap-2 transition-colors duration-300 disabled:cursor-wait ${
                status === 'success'
                  ? 'bg-green-600'
                  : status === 'error'
                  ? 'bg-red-600'
                  : 'bg-blue-600 hover:bg-blue-700'
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
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
