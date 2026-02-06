import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Phone, MapPin, Mail, Clock, Send, CheckCircle, ArrowRight } from 'lucide-react';

type FormErrors = Partial<Record<string, string>>;

function validateForm(data: Record<string, string>): FormErrors {
  const errors: FormErrors = {};
  if (!data.name.trim()) errors.name = 'Name is required';
  if (!data.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (data.phone && !/^[\d\s\-()+.]+$/.test(data.phone)) {
    errors.phone = 'Enter a valid phone number';
  }
  if (!data.message.trim()) errors.message = 'Message is required';
  return errors;
}

/* Tight crisp shadow — no blur, just a solid dark outline */
const sharp = '0 1px 2px rgba(0,0,0,1), 0 0 4px rgba(0,0,0,0.9), 1px 1px 0 rgba(0,0,0,0.5)';
const sharpLight = '0 1px 2px rgba(0,0,0,1), 0 0 3px rgba(0,0,0,0.8)';

interface FooterProps {
  isSnapSection?: boolean;
}

export function Footer({ 
  isSnapSection = false,
}: FooterProps) {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [errors, setErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: undefined });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setFormState('submitting');
    setTimeout(() => {
      setFormState('success');
    }, 1500);
  };

  const inputClass = (field: string) =>
    `w-full px-3 py-2.5 bg-dark-950/70 border text-white text-sm placeholder-cream-100/35 focus:outline-none transition-colors backdrop-blur-md ${
      errors[field] ? 'border-red-500/60 focus:border-red-400' : 'border-white/15 focus:border-accent-500/60'
    }`;

  const sectionClass = isSnapSection
    ? 'h-screen flex flex-col bg-dark-950 relative overflow-hidden snap-section'
    : 'relative overflow-hidden';

  return (
    <section id="contact" className={sectionClass} style={!isSnapSection ? { minHeight: '70vh' } : {}}>
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/backgrounds/cta.jpeg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.45) 0%, rgba(0,0,0,0.3) 25%, rgba(0,0,0,0.35) 50%, rgba(0,0,0,0.5) 80%, rgba(0,0,0,0.7) 100%)' }}
        />
      </div>

      <div className="relative flex flex-col" style={isSnapSection ? { height: '100%' } : { minHeight: '70vh' }}>
        
        {/* Contact Section */}
        <div className="flex-1 flex items-center relative">
          <div className="container-custom w-full py-12">

            {/* Centered heading */}
            <div className="text-center mb-10">
              <div className="line-accent mx-auto mb-4" />
              <h2
                className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-white"
                style={{ textShadow: '0 2px 4px rgba(0,0,0,1), 0 0 8px rgba(0,0,0,0.8)' }}
              >
                Let's Start Your Project
              </h2>
              <p
                className="mt-3 text-white/80 text-base max-w-lg mx-auto font-medium"
                style={{ textShadow: sharp }}
              >
                Get a quote or ask a question — we respond within 24 hours.
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-6 lg:gap-8 max-w-5xl mx-auto items-start">

              {/* Left — Contact Info + Map */}
              <div className="lg:col-span-1">
                  
                <h3 className="text-base font-bold text-white mb-5 uppercase tracking-wider"
                  style={{ textShadow: sharp }}>
                  Contact Info
                </h3>

                <div className="space-y-4">
                  <a href="tel:845-923-2052" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-accent-500/20 group-hover:bg-accent-500 transition-colors">
                      <Phone className="w-4 h-4 text-accent-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold group-hover:text-accent-300 transition-colors" style={{ textShadow: sharp }}>845-923-2052</div>
                      <div className="text-white/60 text-xs font-medium" style={{ textShadow: sharpLight }}>Call us directly</div>
                    </div>
                  </a>

                  <a href="mailto:sales@sgbsny.com" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-accent-500/20 group-hover:bg-accent-500 transition-colors">
                      <Mail className="w-4 h-4 text-accent-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold group-hover:text-accent-300 transition-colors" style={{ textShadow: sharp }}>sales@sgbsny.com</div>
                      <div className="text-white/60 text-xs font-medium" style={{ textShadow: sharpLight }}>Email our team</div>
                    </div>
                  </a>

                  <a href="https://maps.google.com/?q=200+NY-17M+Harriman+NY" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 group">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-accent-500/20 group-hover:bg-accent-500 transition-colors">
                      <MapPin className="w-4 h-4 text-accent-400 group-hover:text-white transition-colors" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold group-hover:text-accent-300 transition-colors" style={{ textShadow: sharp }}>200 NY-17M, Harriman, NY</div>
                      <div className="text-white/60 text-xs font-medium" style={{ textShadow: sharpLight }}>Get directions</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 flex-shrink-0 flex items-center justify-center bg-accent-500/20">
                      <Clock className="w-4 h-4 text-accent-400" />
                    </div>
                    <div>
                      <div className="text-white text-sm font-bold" style={{ textShadow: sharp }}>Mon – Fri: 7AM – 5PM</div>
                      <div className="text-white/60 text-xs font-medium" style={{ textShadow: sharpLight }}>Sat – Sun: Closed</div>
                    </div>
                  </div>
                </div>

                {/* Map */}
                <div className="mt-5 overflow-hidden relative border border-white/10">
                  <iframe
                    title="S&G Builders Supply Location"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2994.5!2d-74.1455!3d41.3025!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c2e3a5c1c1c1c1%3A0x1234567890abcdef!2s200%20NY-17M%2C%20Harriman%2C%20NY%2010926!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
                    width="100%"
                    height="140"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="opacity-90 hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute inset-0 bg-dark-950/20 pointer-events-none mix-blend-multiply" />
                </div>

                <a
                  href="https://wa.me/18459232428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-2 text-xs text-accent-400 hover:text-accent-300 font-bold transition-colors"
                  style={{ textShadow: sharpLight }}
                >
                  Message us on WhatsApp <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>

              {/* Right — Form */}
              <div className="lg:col-span-2">
                <h3 className="text-base font-bold text-white mb-1 uppercase tracking-wider"
                  style={{ textShadow: sharp }}>
                  Request a Quote
                </h3>
                <p className="text-white/60 text-xs mb-5 font-medium"
                  style={{ textShadow: sharpLight }}>
                  Fill out the form and we'll get back to you within 24 hours.
                </p>

                {formState === 'success' ? (
                  <div className="text-center py-14">
                    <div className="w-14 h-14 mx-auto bg-accent-500/15 rounded-full flex items-center justify-center mb-4">
                      <CheckCircle className="w-7 h-7 text-accent-400" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">Thank You!</h4>
                    <p className="text-white/60 text-sm font-medium">We've received your message and will be in touch shortly.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-3">
                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="name" className="block text-xs font-bold text-white/80 mb-1" style={{ textShadow: sharpLight }}>Name *</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} className={inputClass('name')} placeholder="Your name" />
                        {errors.name && <p className="mt-1 text-red-400 text-xs font-semibold">{errors.name}</p>}
                      </div>
                      <div>
                        <label htmlFor="company" className="block text-xs font-bold text-white/80 mb-1" style={{ textShadow: sharpLight }}>Company</label>
                        <input type="text" id="company" name="company" value={formData.company} onChange={handleChange} className={inputClass('company')} placeholder="Company name" />
                      </div>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-3">
                      <div>
                        <label htmlFor="email" className="block text-xs font-bold text-white/80 mb-1" style={{ textShadow: sharpLight }}>Email *</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} className={inputClass('email')} placeholder="email@company.com" />
                        {errors.email && <p className="mt-1 text-red-400 text-xs font-semibold">{errors.email}</p>}
                      </div>
                      <div>
                        <label htmlFor="phone" className="block text-xs font-bold text-white/80 mb-1" style={{ textShadow: sharpLight }}>Phone</label>
                        <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} className={inputClass('phone')} placeholder="(555) 555-5555" />
                        {errors.phone && <p className="mt-1 text-red-400 text-xs font-semibold">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-xs font-bold text-white/80 mb-1" style={{ textShadow: sharpLight }}>Message *</label>
                      <textarea id="message" name="message" rows={4} value={formData.message} onChange={handleChange} className={`${inputClass('message')} resize-none`} placeholder="Tell us about your project, timeline, and what you need..." />
                      {errors.message && <p className="mt-1 text-red-400 text-xs font-semibold">{errors.message}</p>}
                    </div>

                    <button
                      type="submit"
                      disabled={formState === 'submitting'}
                      className="w-full py-3 bg-accent-500 text-white text-sm font-bold tracking-wide uppercase hover:bg-accent-400 transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {formState === 'submitting' ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Sending...
                        </>
                      ) : (
                        <>
                          Submit Request <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Footer bar */}
        <footer className="relative">
          <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.06) 30%, rgba(255,255,255,0.06) 70%, transparent)' }} />
          <div className="container-custom py-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <img src="/images/logo.png" alt="S&G Builders Supply Inc." className="h-9 w-auto" />
                <p className="text-white/60 text-xs hidden sm:block font-medium">
                  Your single source for doors, frames, hardware, and molding.
                </p>
              </div>
              <nav className="flex items-center gap-5">
                <Link to="/about" className="text-white/60 hover:text-accent-400 transition-colors text-xs font-medium">About</Link>
                <Link to="/services" className="text-white/60 hover:text-accent-400 transition-colors text-xs font-medium">Services</Link>
                <Link to="/projects" className="text-white/60 hover:text-accent-400 transition-colors text-xs font-medium">Projects</Link>
                <a href="https://www.linkedin.com/in/sam-spitzer/" target="_blank" rel="noopener noreferrer" className="text-white/60 hover:text-accent-400 transition-colors" aria-label="LinkedIn">
                  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
              </nav>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-x-0 top-0 h-px" style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.04) 30%, rgba(255,255,255,0.04) 70%, transparent)' }} />
            <div className="container-custom py-3 flex items-center justify-between text-xs text-white/50 font-medium">
              <p>© {new Date().getFullYear()} S&G Builders Supply Inc. All rights reserved.</p>
              <Link to="/employee-login" className="hover:text-accent-400 transition-colors">Employee Portal</Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}