import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Linkedin, MessageCircle, LogIn } from 'lucide-react';

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '#contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => {
    if (path === '#contact') return false;
    return location.pathname === path;
  };

  const scrollToContact = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsMobileMenuOpen(false);
    // Small delay so menu closes first on mobile
    setTimeout(() => {
      const el = document.getElementById('contact');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  }, []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[2px] border-b border-white/10 header-gradient">
        <div className="w-full px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-16 sm:h-18 lg:h-24">
            {/* Logo */}
            <Link 
              to="/" 
              className="relative z-[60] flex-shrink-0"
              onClick={() => { setIsMobileMenuOpen(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
            >
              <img
                src="/images/logo.png"
                alt="S&G Builders Supply Inc."
                className="h-11 sm:h-14 lg:h-[4.5rem] w-auto logo-glow"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const isContact = link.to === '#contact';
                return isContact ? (
                  <a
                    key={link.label}
                    href="#contact"
                    onClick={scrollToContact}
                    className="relative px-5 py-2 font-bold text-base tracking-wide uppercase transition-colors hero-text-strong text-white hover:text-accent-300"
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.label}
                    to={link.to}
                    className={`relative px-5 py-2 font-bold text-base tracking-wide uppercase transition-colors hero-text-strong ${
                      isActive(link.to)
                        ? 'text-accent-400'
                        : 'text-white hover:text-accent-300'
                    }`}
                  >
                    {link.label}
                    {isActive(link.to) && (
                      <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-accent-500" />
                    )}
                  </Link>
                );
              })}

              <div className="w-px h-6 bg-white/20 mx-4" />

              <a
                href="tel:845-923-2052"
                className="flex items-center gap-2 text-white hover:text-accent-300 transition-colors mr-4 hero-text-strong"
              >
                <Phone className="w-4 h-4" />
                <span className="text-base font-bold">845-923-2052</span>
              </a>

              <a
                href="#contact"
                onClick={scrollToContact}
                className="px-6 py-2.5 bg-accent-500 text-white text-sm font-semibold tracking-wide uppercase hover:bg-accent-400 transition-all duration-300"
              >
                Get a Quote
              </a>

              <div className="ml-4 flex items-center gap-3 hero-text-strong">
                <a
                  href="https://www.linkedin.com/company/sgbuilderssupply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-accent-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5" />
                </a>
                <a
                  href="https://wa.me/18459232428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white hover:text-green-400 transition-colors"
                  aria-label="WhatsApp"
                >
                  <MessageCircle className="w-5 h-5" />
                </a>
                <Link
                  to="/employee-login"
                  className="text-white/60 hover:text-accent-300 transition-colors"
                  aria-label="Employee Login"
                  title="Employee Login"
                >
                  <LogIn className="w-5 h-5" />
                </Link>
              </div>
            </nav>

            {/* Mobile Right Side — Phone + Hamburger */}
            <div className="lg:hidden flex items-center gap-2 relative z-[60]">
              <a
                href="tel:845-923-2052"
                className="p-2.5 text-white hover:text-accent-300 transition-colors"
                aria-label="Call us"
              >
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2.5 text-cream-100"
                aria-label="Toggle menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu — Full Screen Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-50 transition-all duration-400 ${
          isMobileMenuOpen 
            ? 'opacity-100 pointer-events-auto' 
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-dark-950/98 backdrop-blur-sm" />

        {/* Menu Content */}
        <div className={`relative h-full flex flex-col items-center justify-center transition-transform duration-400 ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-8'
        }`}>
          <nav className="flex flex-col items-center gap-5 sm:gap-6">
            {navLinks.map((link, i) => {
              const isContact = link.to === '#contact';
              return isContact ? (
                <a
                  key={link.label}
                  href="#contact"
                  onClick={scrollToContact}
                  className="text-xl sm:text-2xl font-display font-semibold text-cream-100 hover:text-accent-400 transition-colors"
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-xl sm:text-2xl font-display font-semibold transition-colors ${
                    isActive(link.to) ? 'text-accent-400' : 'text-cream-100 hover:text-accent-400'
                  }`}
                  style={{ transitionDelay: `${i * 50}ms` }}
                >
                  {link.label}
                </Link>
              );
            })}
            
            <div className="w-16 h-px bg-cream-100/20 my-2 sm:my-4" />
            
            {/* Phone */}
            <a
              href="tel:845-923-2052"
              className="flex items-center gap-3 text-cream-100/80 hover:text-white transition-colors"
            >
              <Phone className="w-5 h-5" />
              <span className="text-lg font-semibold">845-923-2052</span>
            </a>
            
            {/* CTA */}
            <a
              href="#contact"
              onClick={scrollToContact}
              className="mt-2 sm:mt-4 px-8 py-3.5 bg-accent-500 text-white font-semibold tracking-wide uppercase hover:bg-accent-400 transition-colors text-sm"
            >
              Get a Quote
            </a>

            {/* Social + Employee Links */}
            <div className="flex items-center gap-6 mt-4 sm:mt-6">
              <a
                href="https://www.linkedin.com/company/sgbuilderssupply"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-100/60 hover:text-cream-100 transition-colors p-1"
              >
                <Linkedin className="w-6 h-6" />
              </a>
              <a
                href="https://wa.me/18459232428"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-100/60 hover:text-green-400 transition-colors p-1"
              >
                <MessageCircle className="w-6 h-6" />
              </a>
              <Link
                to="/employee-login"
                className="text-cream-100/60 hover:text-cream-100 transition-colors p-1"
              >
                <LogIn className="w-6 h-6" />
              </Link>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}