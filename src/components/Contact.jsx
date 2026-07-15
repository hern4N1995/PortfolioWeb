import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Check, Copy, Mail, Linkedin, MapPin, Phone, Send } from 'lucide-react';

const contactInfo = [
  {
    label: 'Email',
    value: 'hernan.cs@hotmail.com',
    href: 'mailto:hernan.cs@hotmail.com',
    icon: Mail,
  },
  {
    label: 'WhatsApp',
    value: '3794-142880',
    href: 'https://wa.me/5493794142880',
    icon: Phone,
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/hernanalegre/',
    href: 'https://www.linkedin.com/in/hernanalegre/',
    icon: Linkedin,
  },
  {
    label: 'Ubicación',
    value: 'Corrientes, Argentina',
    icon: MapPin,
  },
];

function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState('');
  const [submitError, setSubmitError] = useState('');
  const [isEmailMenuOpen, setIsEmailMenuOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const emailMenuRef = useRef(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (emailMenuRef.current && !emailMenuRef.current.contains(event.target)) {
        setIsEmailMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText('hernan.cs@hotmail.com');
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch (error) {
      setCopied(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitMessage('');
    setSubmitError('');

    const { name, email, message } = formData;

    if (!name.trim() || !email.trim() || !message.trim()) {
      setSubmitError('Completá todos los campos para enviar el mensaje.');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch('https://formspree.io/f/mojgjakz', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      if (!response.ok) {
        throw new Error('No se pudo enviar el mensaje');
      }

      setSubmitMessage('¡Mensaje enviado! Te responderé pronto.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setSubmitError('Ocurrió un error al enviar el mensaje. Intentá nuevamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.25 }}
        transition={{ duration: 0.5 }}
        className="mb-10"
      >
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600 dark:text-cyan-400">
          Contacto
        </p>
        <div className="mt-3 flex items-center gap-3">
          <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl dark:text-white">
            Hablemos de tu próximo proyecto
          </h2>
          <div className="hidden h-1 flex-1 rounded-full bg-gradient-to-r from-cyan-500 to-emerald-500 sm:block" />
        </div>
        <p className="mt-4 max-w-2xl text-lg text-slate-600 dark:text-slate-300">
          ¿Tenés un proyecto en mente? Escribime y charlamos.
        </p>
      </motion.div>

      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <motion.form
          initial={{ opacity: 0, x: -24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45 }}
          onSubmit={handleSubmit}
          className="rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/70"
        >
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="mb-2 block">Nombre</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="Tu nombre"
              />
            </label>

            <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
              <span className="mb-2 block">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                placeholder="tu@email.com"
              />
            </label>
          </div>

          <label className="mt-5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            <span className="mb-2 block">Mensaje</span>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows="6"
              className="w-full rounded-2xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none transition focus:border-cyan-500 dark:border-slate-700 dark:bg-slate-950 dark:text-white"
              placeholder="Contame brevemente qué necesitás..."
            />
          </label>

          <input
            type="text"
            name="_gotcha"
            style={{ display: 'none' }}
            tabIndex="-1"
            autoComplete="off"
          />

          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-cyan-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-cyan-700 disabled:cursor-not-allowed disabled:opacity-70"
          >
            <Send size={16} />
            {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
          </button>

          {submitMessage && (
            <p className="mt-4 text-sm font-medium text-emerald-600 dark:text-emerald-400">
              {submitMessage}
            </p>
          )}
          {submitError && (
            <p className="mt-4 text-sm font-medium text-rose-600 dark:text-rose-400">
              {submitError}
            </p>
          )}
        </motion.form>

        <motion.div
          initial={{ opacity: 0, x: 24 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.45, delay: 0.08 }}
          className="flex flex-col gap-4 rounded-[2rem] border border-slate-200 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/70"
        >
          {contactInfo.map((item) => {
            const Icon = item.icon;

            if (item.label === 'Email') {
              return (
                <div key={item.label} ref={emailMenuRef} className="relative">
                  <button
                    type="button"
                    onClick={() => setIsEmailMenuOpen((value) => !value)}
                    className="flex w-full items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 text-left transition hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-950/50"
                  >
                    <div className="rounded-full bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
                      <Icon size={16} />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                      <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.value}</p>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isEmailMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -6, scale: 0.96 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -6, scale: 0.96 }}
                        transition={{ duration: 0.18 }}
                        className="absolute left-0 right-0 z-20 mt-2 overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-lg backdrop-blur dark:border-slate-700 dark:bg-slate-900/95"
                      >
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=hernan.cs@hotmail.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                        >
                          <Mail size={14} />
                          <span>Abrir en Gmail</span>
                        </a>
                        <a
                          href="https://outlook.live.com/mail/0/deeplink/compose?to=hernan.cs@hotmail.com"
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                        >
                          <Mail size={14} />
                          <span>Abrir en Outlook</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => {
                            handleCopyEmail();
                            setIsEmailMenuOpen(false);
                          }}
                          className="flex w-full items-center gap-3 px-4 py-3 text-left text-sm text-slate-700 transition hover:bg-cyan-50 hover:text-cyan-600 dark:text-slate-200 dark:hover:bg-slate-800 dark:hover:text-cyan-400"
                        >
                          {copied ? <Check size={14} /> : <Copy size={14} />}
                          <span>{copied ? '¡Copiado!' : 'Copiar email'}</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            }

            const content = (
              <div className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-slate-50/80 p-4 transition hover:border-cyan-500/40 dark:border-slate-800 dark:bg-slate-950/50">
                <div className="rounded-full bg-cyan-500/10 p-2 text-cyan-600 dark:text-cyan-400">
                  <Icon size={16} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.value}</p>
                </div>
              </div>
            );

            if (item.href) {
              return (
                <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
                  {content}
                </a>
              );
            }

            return <div key={item.label}>{content}</div>;
          })}
        </motion.div>
      </div>
    </section>
  );
}

export default Contact;
