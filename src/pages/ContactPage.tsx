import { useState } from 'react';
import PageHeader from '../components/PageHeader';
import { motion } from 'framer-motion';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle } from 'lucide-react';
import { Instagram, Facebook, Twitter } from '../components/SocialIcons';
import { businessHours, contactInfo } from '../data';
import { useInView } from '../hooks/useInView';

function FadeIn({ children, delay = 0, className = '' }: { children: React.ReactNode; delay?: number; className?: string }) {
  const { ref, inView } = useInView();
  return (
    <motion.div
      ref={ref as React.Ref<HTMLDivElement>}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] as const }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Invalid email address';
    if (!form.message.trim()) e.message = 'Please enter a message';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setLoading(false);
    setSubmitted(true);
  };

  const [todayIdx] = useState(() => new Date().getDay());
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[todayIdx];

  return (
    <>
      <title>Contact — ÉLORA SALON | Get in Touch</title>

      <PageHeader crumb="Contact" title="Get in touch" intro="Whether you have a question, want to book, or simply want to say hello, we’re here." image="https://images.unsplash.com/photo-1521590832167-7bcbfaa6381f?auto=format&fit=crop&w=700&h=900&q=80" imageAlt="Stylist at work" />

      <section className="section-padding bg-[#111110]">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-16">
            {/* Contact Info */}
            <FadeIn className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="subheading text-[#F5F0E8] mb-8">Contact Information</h2>

                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#C6A66B]/30 flex items-center justify-center flex-shrink-0">
                      <MapPin size={16} className="text-[#C6A66B]" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-[#AAA49A] mb-1 font-bold">Address</p>
                      <p className="font-sans text-sm text-[#F5F0E8] leading-relaxed">{contactInfo.address}</p>
                      <a
                        href={contactInfo.mapUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-sans text-xs text-[#C6A66B] hover:text-[#D4B87A] transition-colors mt-1 inline-block"
                      >
                        Get directions →
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#C6A66B]/30 flex items-center justify-center flex-shrink-0">
                      <Phone size={16} className="text-[#C6A66B]" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-[#AAA49A] mb-1 font-bold">Phone</p>
                      <a href={`tel:${contactInfo.phone}`} className="font-sans text-sm text-[#F5F0E8] hover:text-[#C6A66B] transition-colors">
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-4">
                    <div className="w-10 h-10 border border-[#C6A66B]/30 flex items-center justify-center flex-shrink-0">
                      <Mail size={16} className="text-[#C6A66B]" />
                    </div>
                    <div>
                      <p className="font-sans text-xs uppercase tracking-widest text-[#AAA49A] mb-1 font-bold">Email</p>
                      <a href={`mailto:${contactInfo.email}`} className="font-sans text-sm text-[#F5F0E8] hover:text-[#C6A66B] transition-colors">
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h3 className="font-sans text-[11px] uppercase tracking-widest text-[#C6A66B] font-bold mb-4 flex items-center gap-2">
                  <Clock size={13} /> Opening Hours
                </h3>
                <div className="space-y-2">
                  {businessHours.map(h => (
                    <div key={h.day} className={`flex justify-between text-sm font-sans ${h.day === today ? 'text-[#C6A66B] font-semibold' : 'text-[#AAA49A]'}`}>
                      <span>{h.day}</span>
                      <span>{h.closed ? 'Closed' : `${h.open} – ${h.close}`}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social */}
              <div>
                <h3 className="font-sans text-[11px] uppercase tracking-widest text-[#C6A66B] font-bold mb-4">Follow Us</h3>
                <div className="flex gap-3">
                  {[
                    { icon: Instagram, href: '#', label: 'Instagram' },
                    { icon: Facebook, href: '#', label: 'Facebook' },
                    { icon: Twitter, href: '#', label: 'Twitter' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 border border-[#2A2926] flex items-center justify-center text-[#AAA49A] hover:text-[#C6A66B] hover:border-[#C6A66B]/40 transition-all"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Contact Form */}
            <FadeIn delay={0.15} className="lg:col-span-3">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-16 h-16 bg-[#C6A66B]/15 border border-[#C6A66B]/30 flex items-center justify-center mb-6">
                    <CheckCircle size={28} className="text-[#C6A66B]" />
                  </div>
                  <h3 className="font-serif text-2xl font-bold text-[#F5F0E8] mb-3">Message Received!</h3>
                  <p className="font-sans text-[#AAA49A] max-w-sm leading-relaxed">
                    Thank you for reaching out. We'll be in touch within 24 hours. (Demo form — no message was actually sent.)
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', subject: '', message: '' }); }}
                    className="btn-outline-gold mt-8"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-5">
                  <h2 className="subheading text-[#F5F0E8] mb-8">Send Us a Message</h2>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className="form-label">Full Name *</label>
                      <input
                        id="name"
                        type="text"
                        className={`form-input ${errors.name ? 'border-[#ef4444]' : ''}`}
                        placeholder="Alexandra Wilson"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        aria-invalid={!!errors.name}
                      />
                      {errors.name && <p className="font-sans text-xs text-[#ef4444] mt-1">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="email" className="form-label">Email Address *</label>
                      <input
                        id="email"
                        type="email"
                        className={`form-input ${errors.email ? 'border-[#ef4444]' : ''}`}
                        placeholder="alex@example.com"
                        value={form.email}
                        onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                        aria-invalid={!!errors.email}
                      />
                      {errors.email && <p className="font-sans text-xs text-[#ef4444] mt-1">{errors.email}</p>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className="form-label">Phone Number</label>
                      <input
                        id="phone"
                        type="tel"
                        className="form-input"
                        placeholder="+44 20 0000 0000"
                        value={form.phone}
                        onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="form-label">Subject</label>
                      <input
                        id="subject"
                        type="text"
                        className="form-input"
                        placeholder="How can we help?"
                        value={form.subject}
                        onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="form-label">Message *</label>
                    <textarea
                      id="message"
                      rows={5}
                      className={`form-input resize-none ${errors.message ? 'border-[#ef4444]' : ''}`}
                      placeholder="Tell us about your requirements..."
                      value={form.message}
                      onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                      aria-invalid={!!errors.message}
                    />
                    {errors.message && <p className="font-sans text-xs text-[#ef4444] mt-1">{errors.message}</p>}
                  </div>

                  <button type="submit" disabled={loading} className="btn-gold">
                    {loading ? (
                      <span className="flex items-center gap-2">
                        <span className="w-4 h-4 border-2 border-[#111110]/30 border-t-[#111110] rounded-full animate-spin" />
                        Sending...
                      </span>
                    ) : (
                      <><Send size={16} /> Send Message</>
                    )}
                  </button>
                </form>
              )}
            </FadeIn>
          </div>
        </div>
      </section>

      {/* Map placeholder */}
      <div className="h-80 bg-[#1B1A18] border-t border-[#2A2926] relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1524661135-423995f22d0b?auto=format&fit=crop&w=1920&q=60"
          alt="Map area"
          className="w-full h-full object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <MapPin size={32} className="text-[#C6A66B] mx-auto mb-3" />
            <p className="font-sans text-sm text-[#F5F0E8] font-semibold">{contactInfo.address}</p>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-xs text-[#C6A66B] hover:text-[#D4B87A] transition-colors mt-2 inline-block"
            >
              Open in Google Maps →
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
