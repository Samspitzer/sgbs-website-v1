import { Link } from 'react-router-dom';
import { ArrowRight, Phone, MapPin, Mail } from 'lucide-react';

interface FooterProps {
  /** CTA heading text */
  ctaHeading?: string;
  /** CTA description text */
  ctaDescription?: string;
  /** Whether this is the homepage (uses h-screen + snap) */
  isHomePage?: boolean;
}

export function Footer({ 
  ctaHeading = 'Ready to Start Your Project?',
  ctaDescription = 'Get a quote for your next multifamily or commercial project. Our team is ready to help with estimating, coordination, and delivery.',
  isHomePage = false,
}: FooterProps) {
  const sectionClass = isHomePage
    ? 'h-screen flex flex-col bg-dark-950 relative overflow-hidden snap-section'
    : 'relative overflow-hidden';

  return (
    <section className={sectionClass} style={!isHomePage ? { minHeight: '70vh' } : {}}>
      {/* Background Image */}
      <div className="absolute inset-0 overflow-hidden">
        <img
          src="/images/backgrounds/cta.jpeg"
          alt=""
          className="w-full h-full object-cover"
          style={{ filter: 'blur(2px)', transform: 'scale(1.05)' }}
        />
        <div 
          className="absolute inset-0"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.6) 0%, rgba(0,0,0,0.45) 30%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.7) 100%)' }}
        />
      </div>

      <div className="relative flex flex-col" style={isHomePage ? { height: '100%' } : { minHeight: '70vh' }}>
        {/* CTA area */}
        <div className="flex-[3] flex items-center justify-center relative" style={{ paddingBottom: '40px' }}>
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100" style={{ textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
                {ctaHeading}
              </h2>
              <p className="mt-6 text-cream-100/70 text-lg" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
                {ctaDescription}
              </p>
              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link to="/contact" className="btn-primary">
                  Request a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <a href="tel:845-923-2052" className="btn-outline">
                  <Phone className="w-5 h-5" /> Call 845-923-2052
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative border-t border-dark-700" style={{ background: 'rgba(0,0,0,0.6)' }}>
          <div className="container-custom py-6">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-6">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <img src="/images/logo.png" alt="S&G Builders Supply Inc." className="h-12 w-auto mb-3" />
                <p className="text-cream-100/40 text-xs leading-relaxed max-w-xs">
                  Your single source for doors, frames, hardware, and molding.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <a href="https://www.linkedin.com/in/sam-spitzer/" target="_blank" rel="noopener noreferrer" className="w-8 h-8 flex items-center justify-center border border-dark-600 text-cream-100/50 hover:text-accent-400 hover:border-accent-500 transition-colors" aria-label="LinkedIn">
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-xs mb-4">Quick Links</h4>
                <nav className="flex flex-col gap-2">
                  <Link to="/about" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">About Us</Link>
                  <Link to="/services" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">Services</Link>
                  <Link to="/projects" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">Projects</Link>
                  <Link to="/contact" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">Contact</Link>
                </nav>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-xs mb-4">Contact</h4>
                <div className="flex flex-col gap-3">
                  <a href="https://maps.google.com/?q=200+NY-17M+Harriman+NY" target="_blank" rel="noopener noreferrer" className="flex items-start gap-2 text-cream-100/50 hover:text-accent-400 transition-colors text-sm">
                    <MapPin className="w-4 h-4 mt-0.5 flex-shrink-0" />
                    <span>200 NY-17M, Harriman, NY 10926</span>
                  </a>
                  <a href="tel:845-923-2052" className="flex items-center gap-2 text-cream-100/50 hover:text-accent-400 transition-colors text-sm">
                    <Phone className="w-4 h-4 flex-shrink-0" />
                    <span>845-923-2052</span>
                  </a>
                  <a href="mailto:sales@sgbsny.com" className="flex items-center gap-2 text-cream-100/50 hover:text-accent-400 transition-colors text-sm">
                    <Mail className="w-4 h-4 flex-shrink-0" />
                    <span>sales@sgbsny.com</span>
                  </a>
                </div>
              </div>

              {/* Hours */}
              <div>
                <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-xs mb-4">Hours</h4>
                <div className="flex flex-col gap-2 text-cream-100/50 text-sm">
                  <p>Mon – Fri: 7:00 AM – 5:00 PM</p>
                  <p>Sat – Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Copyright bar */}
          <div className="border-t border-dark-800/50" style={{ background: 'rgba(0,0,0,0.4)' }}>
            <div className="container-custom py-3 flex items-center justify-between text-xs text-cream-100/40">
              <p>© {new Date().getFullYear()} S&G Builders Supply Inc. All rights reserved.</p>
              <Link to="/employee-login" className="hover:text-accent-400 transition-colors">Employee Portal</Link>
            </div>
          </div>
        </footer>
      </div>
    </section>
  );
}