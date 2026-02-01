import { Link } from 'react-router-dom';
import { Phone, Mail, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-950 border-t border-dark-700">
      {/* Main Footer */}
      <div className="container-custom py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <img
              src="/images/logo.png"
              alt="S&G Builders Supply Inc."
              className="h-12 w-auto mb-6"
            />
            <p className="text-cream-100/60 leading-relaxed max-w-md mb-6">
              Your single source for doors, frames, hardware, and molding. 
              Serving contractors and developers with reliable supply and professional service since 1998.
            </p>
            <div className="flex items-center gap-4">
              <a
                href="https://www.linkedin.com/in/sam-spitzer/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-dark-600 text-cream-100/60 hover:text-accent-400 hover:border-accent-500 transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-sm mb-6">
              Quick Links
            </h4>
            <nav className="flex flex-col gap-3">
              <Link to="/about" className="text-cream-100/60 hover:text-accent-400 transition-colors">
                About Us
              </Link>
              <Link to="/services" className="text-cream-100/60 hover:text-accent-400 transition-colors">
                Services
              </Link>
              <Link to="/projects" className="text-cream-100/60 hover:text-accent-400 transition-colors">
                Projects
              </Link>
              <Link to="/contact" className="text-cream-100/60 hover:text-accent-400 transition-colors">
                Contact
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-sm mb-6">
              Contact
            </h4>
            <div className="flex flex-col gap-4">
              <a
                href="https://maps.google.com/?q=200+NY-17M+Harriman+NY"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 text-cream-100/60 hover:text-accent-400 transition-colors"
              >
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>200 NY-17M<br />Harriman, NY 10926</span>
              </a>
              <a
                href="tel:845-923-2052"
                className="flex items-center gap-3 text-cream-100/60 hover:text-accent-400 transition-colors"
              >
                <Phone className="w-5 h-5 flex-shrink-0" />
                <span>845-923-2052</span>
              </a>
              <a
                href="mailto:sales@sgbsny.com"
                className="flex items-center gap-3 text-cream-100/60 hover:text-accent-400 transition-colors"
              >
                <Mail className="w-5 h-5 flex-shrink-0" />
                <span>sales@sgbsny.com</span>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-dark-700">
        <div className="container-custom py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-cream-100/40">
            <p>© {currentYear} S&G Builders Supply Inc. All rights reserved.</p>
            <Link
              to="/employee-login"
              className="hover:text-accent-400 transition-colors"
            >
              Employee Portal
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
