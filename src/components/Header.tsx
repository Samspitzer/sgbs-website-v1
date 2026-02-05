import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Linkedin, MessageCircle, LogIn } from 'lucide-react';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 backdrop-blur-[2px] border-b border-white/10 header-gradient"
      >
        <div className="w-full px-6 md:px-10 lg:px-16 xl:px-20">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link 
              to="/" 
              className="relative z-10 flex-shrink-0"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/images/logo.png"
                alt="S&G Builders Supply Inc."
                className="h-16 lg:h-[4.5rem] w-auto logo-glow"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
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
              ))}

              <Link
                to="/employee-login"
                className={`relative px-5 py-2 font-bold text-base tracking-wide uppercase transition-colors hero-text-strong ${
                  isActive('/employee-login')
                    ? 'text-accent-400'
                    : 'text-white hover:text-accent-300'
                }`}
              >
                Employee Login
                {isActive('/employee-login') && (
                  <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-accent-500" />
                )}
              </Link>

              <div className="w-px h-6 bg-white/20 mx-4" />

              <a
                href="tel:845-923-2052"
                className="flex items-center gap-2 text-white hover:text-accent-300 transition-colors mr-4 hero-text-strong"
              >
                <Phone className="w-4 h-4" />
                <span className="text-base font-bold">845-923-2052</span>
              </a>

              <Link
                to="/contact"
                className="px-6 py-2.5 bg-accent-500 text-white text-sm font-semibold tracking-wide uppercase hover:bg-accent-400 transition-all duration-300"
              >
                Get a Quote
              </Link>

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
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden relative z-10 p-2 text-cream-100"
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`lg:hidden fixed inset-0 bg-dark-950 transition-all duration-500 ${
            isMobileMenuOpen 
              ? 'opacity-100 pointer-events-auto' 
              : 'opacity-0 pointer-events-none'
          }`}
        >
          <div className="flex flex-col items-center justify-center h-full">
            <nav className="flex flex-col items-center gap-6">
              <Link
                to="/"
                className="text-2xl font-display text-cream-100 hover:text-accent-400 transition-colors"
              >
                Home
              </Link>
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-2xl font-display transition-colors ${
                    isActive(link.to) ? 'text-accent-400' : 'text-cream-100 hover:text-accent-400'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
              
              <div className="w-16 h-px bg-cream-100/20 my-4" />
              
              <a
                href="tel:845-923-2052"
                className="flex items-center gap-3 text-cream-100/80"
              >
                <Phone className="w-5 h-5" />
                <span className="text-lg">845-923-2052</span>
              </a>
              
              <Link
                to="/contact"
                className="mt-4 px-8 py-4 bg-accent-500 text-white font-semibold tracking-wide uppercase"
              >
                Get a Quote
              </Link>

              {/* Mobile Social Links */}
              <div className="flex items-center gap-6 mt-6">
                <a
                  href="https://www.linkedin.com/company/sgbuilderssupply"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/60 hover:text-cream-100 transition-colors"
                >
                  <Linkedin className="w-6 h-6" />
                </a>
                <a
                  href="https://wa.me/18459232428"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cream-100/60 hover:text-green-400 transition-colors"
                >
                  <MessageCircle className="w-6 h-6" />
                </a>
                <a
                  href="/employee-login"
                  className="text-cream-100/60 hover:text-cream-100 transition-colors"
                >
                  <LogIn className="w-6 h-6" />
                </a>
              </div>
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}