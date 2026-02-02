import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';

const navLinks = [
  { label: 'About', to: '/about' },
  { label: 'Services', to: '/services' },
  { label: 'Projects', to: '/projects' },
  { label: 'Contact', to: '/contact' },
];

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  // Show header when mouse is near top of screen
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (e.clientY < 100) {
        setIsVisible(true);
      } else if (e.clientY > 150 && !isMobileMenuOpen) {
        setIsVisible(false);
      }
    };

    // Also show header when scrolling up significantly
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY < lastScrollY && currentScrollY > 100) {
        setIsVisible(true);
      }
      lastScrollY = currentScrollY;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobileMenuOpen]);

  // Keep header visible when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      setIsVisible(true);
    }
  }, [isMobileMenuOpen]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <>
      {/* Invisible hover trigger zone at top of screen */}
      <div 
        className="fixed top-0 left-0 right-0 h-16 z-40"
        onMouseEnter={() => setIsVisible(true)}
      />
      
      <header
        className={`fixed top-0 left-0 right-0 z-50 bg-black/15 backdrop-blur-[3px] transition-transform duration-300 ${
          isVisible ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <div className="container-custom">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link 
              to="/" 
              className="relative z-10"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <img
                src="/images/logo.png"
                alt="S&G Builders Supply Inc."
                className="h-12 lg:h-14 w-auto"
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`relative px-5 py-2 font-medium text-sm tracking-wide uppercase transition-colors ${
                    isActive(link.to)
                      ? 'text-accent-400'
                      : 'text-cream-100/80 hover:text-cream-100'
                  }`}
                >
                  {link.label}
                  {isActive(link.to) && (
                    <span className="absolute bottom-0 left-5 right-5 h-0.5 bg-accent-500" />
                  )}
                </Link>
              ))}

              <div className="w-px h-6 bg-cream-100/20 mx-4" />

              <a
                href="tel:845-923-2052"
                className="flex items-center gap-2 text-cream-100/80 hover:text-cream-100 transition-colors mr-4"
              >
                <Phone className="w-4 h-4" />
                <span className="text-sm font-medium">845-923-2052</span>
              </a>

              <Link
                to="/contact"
                className="px-6 py-2.5 bg-accent-500 text-white text-sm font-semibold tracking-wide uppercase hover:bg-accent-400 transition-all duration-300"
              >
                Get a Quote
              </Link>
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
            </nav>
          </div>
        </div>
      </header>
    </>
  );
}