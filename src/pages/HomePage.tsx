import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Check, ChevronLeft, ChevronRight, MapPin, Mail } from 'lucide-react';
import { services } from '../data/services';
import { useSmoothSnap } from '../hooks/useSmoothSnap';
import { ImageWithFallback, stripExtension } from '../components/ImageWithFallback';

type SlideSettings = {
  focusX: number;
  focusYStart: number;
  focusYEnd: number;
  zoomFrom: number;
  zoomTo: number;
};

type Project = {
  id: number;
  name: string;
  location: string;
  units: string;
  image: string;
  settings: SlideSettings;
};

const projects: Project[] = [
  {
    id: 1,
    name: '70 Fisk Street',
    location: 'Jersey City, NJ',
    units: '44 Units',
    image: '/images/projects/70-fisk-street.jpg',
    settings: {
      focusX: 0,
      focusYStart: 0,
      focusYEnd: 100,
      zoomFrom: 1.2,
      zoomTo: 1.03,
    },
  },
  {
    id: 2,
    name: 'Halo Newark Phase 1',
    location: 'Newark, NJ',
    units: '303 Units',
    image: '/images/projects/halo-newark.jpg',
    settings: {
      focusX: 50,
      focusYStart: 0,
      focusYEnd: 96,
      zoomFrom: 1.03,
      zoomTo: 1.21,
    },
  },
  {
    id: 3,
    name: 'Harrison Grand',
    location: 'Harrison, NY',
    units: '31 Units',
    image: '/images/projects/harrison-grand.jpg',
    settings: {
      focusX: 50,
      focusYStart: 50,
      focusYEnd: 50,
      zoomFrom: 1.1,
      zoomTo: 1.03,
    },
  },
  {
    id: 4,
    name: 'Allure 258',
    location: 'East Orange, NJ',
    units: '203 Units',
    image: '/images/projects/allure-258.jpeg',
    settings: {
      focusX: 50,
      focusYStart: 50,
      focusYEnd: 50,
      zoomFrom: 1.1,
      zoomTo: 1.03,
    },
  },
  {
    id: 5,
    name: 'Rainbow Village',
    location: 'Duluth, GA',
    units: '36 Units',
    image: '/images/projects/rainbow-village.jpg',
    settings: {
      focusX: 50,
      focusYStart: 50,
      focusYEnd: 50,
      zoomFrom: 1.1,
      zoomTo: 1.03,
    },
  },
  {
    id: 6,
    name: '15 Parkview',
    location: 'Bronxville, NY',
    units: '60 Units',
    image: '/images/projects/15-parkview.jpg',
    settings: {
      focusX: 50,
      focusYStart: 0,
      focusYEnd: 88,
      zoomFrom: 1.23,
      zoomTo: 1.03,
    },
  },
  {
    id: 7,
    name: 'Madison 2020',
    location: 'Reading, PA',
    units: '85 Units',
    image: '/images/projects/madison-2020.jpg',
    settings: {
      focusX: 50,
      focusYStart: 100,
      focusYEnd: 0,
      zoomFrom: 1.02,
      zoomTo: 1.2,
    },
  },
  {
    id: 8,
    name: 'Jersey Walk',
    location: 'Jersey City, NJ',
    units: '274 Units',
    image: '/images/projects/jersey-walk.jpg',
    settings: {
      focusX: 0,
      focusYStart: 100,
      focusYEnd: 38,
      zoomFrom: 1.29,
      zoomTo: 1.03,
    },
  },
];

/* ============ SERVICE CAROUSEL COMPONENT ============ */
function ServiceCarousel({ services: items }: { services: typeof services }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isMounted, setIsMounted] = useState(false);
  const total = items.length;

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  // Set mounted after initial render
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Auto-rotate every 4 seconds
  useEffect(() => {
    if (!isMounted) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total);
    }, 4000);
    return () => clearInterval(timer);
  }, [total, isMounted]);

  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div 
      className="relative flex-1 min-h-0 flex flex-col"
    >
      {/* Cards */}
      <div className="flex-1 flex items-center justify-center relative">
        {items.map((service, i) => {
          const Icon = service.icon;
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.90 : 0.80;
          const xShift = offset * 350;
          const zIndex = 20 - Math.abs(offset) * 5;
          const baseOpacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.75 : 0.4;
          const opacity = isMounted ? baseOpacity : 0;

          return (
            <div
              key={service.id}
              className="absolute"
              style={{
                transform: `translateX(${xShift}px) translateY(40px) scale(${scale})`,
                zIndex,
                opacity,
                width: '450px',
                height: '320px',
                overflow: 'hidden',
                borderRadius: '12px',
                boxShadow: '0 4px 7px 0 rgba(0,0,0,0.6)',
                transition: isMounted ? 'transform 1.1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.1s cubic-bezier(0.16, 1, 0.3, 1)' : 'none',
              }}
              onClick={() => !isCenter && goTo(i)}
            >
              <div 
                className={`${!isCenter ? 'cursor-pointer' : ''} h-full overflow-hidden relative`}
                style={{
                  borderRadius: '12px',
                  WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)',
                  maskImage: 'linear-gradient(to bottom, transparent 0%, black 50%, black 100%)',
                }}
              >
                {/* Full card background image */}
                <ImageWithFallback 
                  basePath={stripExtension(service.image)} 
                  alt={service.title}
                  className="absolute inset-0 w-full h-full object-cover"
                  style={{ objectPosition: 'center 20%' }}
                />
                {/* Bottom gradient for text readability */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.4) 68%, rgba(0,0,0,0.85) 85%, rgba(0,0,0,0.95) 100%)'
                  }}
                />
                {/* Text content at bottom */}
                <div className="absolute bottom-0 left-0 right-0 flex flex-col items-center text-center" style={{ padding: '0 20px 20px' }}>
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`flex-shrink-0 flex items-center justify-center transition-all duration-500 ${isCenter ? 'bg-accent-500 text-white' : 'bg-accent-500/10 text-accent-400'}`} style={{ width: '34px', height: '34px' }}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="font-semibold text-accent-400" style={{ fontSize: '20px' }}>
                      {service.title}
                    </h3>
                  </div>
                  <p className="text-cream-100/70 leading-relaxed" style={{ fontSize: '13px' }}>
                    {service.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom bar: All Services link */}
      <div className="flex items-center justify-center" style={{ paddingBottom: '27px' }}>
        <Link to="/services" className="text-white hover:text-accent-400 font-semibold transition-colors flex items-center gap-2" style={{ fontSize: '18px', textShadow: '0 1px 3px rgba(0,0,0,0.8)' }}>
          All Services <ArrowRight className="w-5 h-5" />
        </Link>
      </div>
    </div>
  );
}

/* ============ PROJECT CAROUSEL COMPONENT ============ */
function ProjectCarousel({ projects: items }: { projects: Project[] }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const total = items.length;

  const goTo = (index: number) => {
    setActiveIndex(((index % total) + total) % total);
  };

  // Auto-rotate every 5 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % total);
    }, 5000);
    return () => clearInterval(timer);
  }, [isPaused, total]);

  const getOffset = (i: number) => {
    let diff = i - activeIndex;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;
    return diff;
  };

  return (
    <div 
      className="relative flex-1 min-h-0 flex flex-col"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Left arrow */}
      <button
        onClick={() => goTo(activeIndex - 1)}
        className="absolute left-6 md:left-10 lg:left-16 xl:left-20 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-dark-900/90 border border-dark-600 hover:border-accent-500 text-cream-100/70 hover:text-accent-400 transition-all rounded-full"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>

      {/* Right arrow */}
      <button
        onClick={() => goTo(activeIndex + 1)}
        className="absolute right-6 md:right-10 lg:right-16 xl:right-20 top-1/2 -translate-y-1/2 z-30 w-12 h-12 flex items-center justify-center bg-dark-900/90 border border-dark-600 hover:border-accent-500 text-cream-100/70 hover:text-accent-400 transition-all rounded-full"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Cards */}
      <div className="flex-1 flex items-center justify-center relative">
        {items.map((project, i) => {
          const offset = getOffset(i);
          const isCenter = offset === 0;
          const isVisible = Math.abs(offset) <= 2;

          if (!isVisible) return null;

          const scale = isCenter ? 1 : Math.abs(offset) === 1 ? 0.88 : 0.76;
          const xShift = offset * 420;
          const zIndex = 20 - Math.abs(offset) * 5;
          const opacity = isCenter ? 1 : Math.abs(offset) === 1 ? 0.5 : 0.25;

          return (
            <div
              key={project.id}
              className="absolute transition-all duration-500 ease-in-out"
              style={{
                transform: `translateX(${xShift}px) scale(${scale})`,
                zIndex,
                opacity,
                width: '420px',
              }}
              onClick={() => !isCenter && goTo(i)}
            >
              <div className={`relative overflow-hidden border ${isCenter ? 'border-accent-500/60' : 'border-dark-700'} transition-colors duration-500 ${!isCenter ? 'cursor-pointer' : ''}`}>
                <div className="aspect-[4/3]">
                  <img
                    src={project.image}
                    alt={project.name}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 card-overlay-bottom" />
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-accent-400 text-sm font-semibold mb-1">
                    {project.units}
                  </p>
                  <h3 className="text-xl font-semibold text-cream-100">
                    {project.name}
                  </h3>
                  <p className="text-cream-100/70 text-sm mt-1">
                    {project.location}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom bar: dots + View All link */}
      <div className="flex items-center justify-center gap-6 pb-6">
        <div className="flex gap-2">
          {items.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === activeIndex ? 'bg-accent-500 w-6' : 'bg-dark-600 hover:bg-dark-500 w-2'}`}
            />
          ))}
        </div>
        <Link to="/projects" className="text-accent-400 hover:text-accent-300 font-semibold text-sm transition-colors flex items-center gap-1">
          View All Projects <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  // Smooth section snapping - 1200ms for slower, smoother animation
  useSmoothSnap(1200);

  // Auto-rotate slides
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % projects.length);
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const current = projects[activeSlide];
  const s = current.settings;

  return (
    <div className="bg-dark-950">
      {/* ============ HERO SECTION ============ */}
      <section className="relative h-screen min-h-[700px] overflow-hidden snap-section">
        {/* Background Image with Settings Applied */}
        <div className="absolute inset-0">
          {/* Blurred background layer */}
          <div className="absolute inset-0 overflow-hidden opacity-35">
            <img
              src={current.image}
              alt=""
              className="absolute w-full h-full object-cover"
              style={{
                filter: 'blur(18px)',
                transform: 'scale(1.2)',
              }}
            />
          </div>

          {/* Main image layer */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              key={current.id}
              src={current.image}
              alt=""
              className="absolute w-full h-full object-cover hero-zoom"
              style={{
                objectPosition: `${s.focusX}% ${s.focusYStart}%`,
                transformOrigin: `${s.focusX}% ${s.focusYStart}%`,
                '--zoom-from': s.zoomFrom,
                '--zoom-to': s.zoomTo,
                '--focus-x': `${s.focusX}%`,
                '--y-start': `${s.focusYStart}%`,
                '--y-end': `${s.focusYEnd}%`,
              } as React.CSSProperties}
            />
          </div>

          {/* Dark overlay across entire image */}
          <div className="absolute inset-0 overlay-dark" />
          
          {/* Left gradient for text area */}
          <div className="absolute inset-0 hero-text-backdrop" />
          
          {/* Top gradient for header readability */}
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full w-full px-8 md:px-14 lg:px-20 xl:px-24">
          <div className="flex flex-col justify-center h-full pt-20">
            <div className="max-w-3xl">
              <p className="text-white font-bold tracking-[0.2em] uppercase text-base mb-4 animate-fade-in hero-text-strong">
                Your Complete Door, Hardware & Millwork Partner
              </p>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">
                Opening Doors for<br />
                <span className="text-accent-400 whitespace-nowrap">Builders &amp; Developers</span>
              </h1>
              <p className="mt-3 text-white text-xl font-semibold animate-fade-in-up stagger-1 hero-text">Since 2019</p>

              <p className="mt-6 text-2xl lg:text-3xl text-white font-bold leading-relaxed animate-fade-in-up stagger-2 hero-text-strong">
                Doors &amp; millwork? Our problem. Not yours.
              </p>
              <p className="mt-2 text-lg lg:text-xl text-white/90 font-medium leading-relaxed max-w-lg animate-fade-in-up stagger-3 hero-text">
                From blueprint to punch list — one call, completely handled.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-4">
                <Link to="/contact" className="btn-primary">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/projects" className="btn-outline">
                  View Projects
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-2 flex flex-wrap gap-6 animate-fade-in-up stagger-5 hero-text-strong">
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Check className="w-5 h-5 text-accent-400 stroke-[3]" />
                  Nationwide Delivery
                </div>
                <div className="flex items-center gap-2 text-white font-bold text-sm">
                  <Check className="w-5 h-5 text-accent-400 stroke-[3]" />
                  Professional Installation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRO SECTION ============ */}
      <section className="relative h-screen flex items-center overflow-hidden snap-section">
        {/* Red line divider at top */}
        <div className="absolute top-0 left-0 right-0 h-1 accent-divider z-10" />
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/backgrounds/intro.png"
            alt=""
            className="w-full h-full object-cover"
          />
          {/* Gradient from left edge for text readability */}
          <div className="absolute inset-0 intro-text-backdrop" />
        </div>
        
        {/* Text content - aligned with header logo */}
        <div className="relative z-10 w-full">
          <div className="pl-[100px] mt-[85px]" style={{ maxWidth: '42%' }}>
            <h2 className="font-display lg:text-[43px] text-3xl md:text-4xl font-bold text-white leading-tight hero-text-strong animate-fade-in-up stagger-1 whitespace-nowrap mb-[6px]">
              Your Complete Partner for
            </h2>
            
            <h3 className="font-display lg:text-[60px] text-4xl md:text-5xl font-bold text-accent-400 leading-tight hero-text-strong animate-fade-in-up stagger-2">
              Doors, Hardware<br />&amp; Millwork
            </h3>
            
            <p className="mt-[200px] text-white text-[20px] leading-relaxed hero-text-strong animate-fade-in-up stagger-3 max-w-[500px]">
              Complete multifamily door and millwork packages — interior doors, 
              frames, hardware, trim, and moldings. From blueprint to punch list, 
              one call handles it all.
            </p>
            
            {/* Buttons */}
            <div className="mt-[20px] flex items-center gap-[50px] animate-fade-in-up stagger-4">
              <Link 
                to="/about" 
                className="text-white font-bold text-[18px] hover:text-white/80 transition-colors hero-text-strong"
              >
                About Us →
              </Link>
              <Link 
                to="/services" 
                className="text-white font-bold text-[18px] hover:text-white/80 transition-colors hero-text-strong"
              >
                Our Services →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="h-screen flex flex-col justify-center bg-dark-950 snap-section overflow-hidden relative">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="/images/backgrounds/services.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
          <div 
            className="absolute inset-0"
            style={{ 
              background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.15) 30%, rgba(0,0,0,0.1) 60%, rgba(0,0,0,0.3) 100%)' 
            }}
          />
        </div>
        <div className="relative z-10 w-full flex flex-col items-center text-center" style={{ paddingTop: '80px', marginBottom: '20px' }}>
          <h2 className="font-display font-bold text-cream-100" style={{ fontSize: '48px', marginBottom: '8px', textShadow: '0 2px 10px rgba(0,0,0,0.8), 0 0 40px rgba(0,0,0,0.5)' }}>
            Full-Service Solutions
          </h2>
          <p className="text-white font-semibold" style={{ fontSize: '18px', marginTop: '12px', maxWidth: '576px', textShadow: '0 1px 3px rgba(0,0,0,1), 0 2px 8px rgba(0,0,0,0.9)' }}>
            From initial estimating through final punch list, we handle every phase of your door and hardware scope.
          </p>
        </div>

        {/* Center-focused carousel */}
        <ServiceCarousel services={services} />
      </section>

      {/* ============ FEATURED PROJECTS SECTION ============ */}
      <section className="h-screen flex flex-col justify-center bg-dark-900 relative overflow-hidden snap-section">
        <div className="container-custom pt-20 mb-10">
          <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100">
            Featured Projects
          </h2>
          <p className="mt-3 text-cream-100/70 text-lg max-w-xl">
            A sample of recent multifamily and commercial work across the Northeast and beyond.
          </p>
        </div>

        {/* Center-focused carousel */}
        <ProjectCarousel projects={projects} />
      </section>

      {/* ============ CTA + FOOTER SECTION ============ */}
      <section className="h-screen flex flex-col bg-dark-950 relative overflow-hidden snap-section">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/20 rounded-full blur-3xl" />
        </div>
        
        {/* CTA area */}
        <div className="flex-1 flex items-center relative">
          <div className="container-custom">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100">
                Ready to Start Your Project?
              </h2>
              <p className="mt-6 text-cream-100/70 text-lg">
                Get a quote for your next multifamily or commercial project. 
                Our team is ready to help with estimating, coordination, and delivery.
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
        <footer className="relative border-t border-dark-700">
          <div className="container-custom py-10">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
              {/* Company Info */}
              <div className="lg:col-span-1">
                <img
                  src="/images/logo.png"
                  alt="S&G Builders Supply Inc."
                  className="h-10 w-auto mb-4"
                />
                <p className="text-cream-100/50 text-sm leading-relaxed max-w-xs">
                  Your single source for doors, frames, hardware, and molding. 
                  Serving contractors and developers since 1998.
                </p>
                <div className="flex items-center gap-3 mt-4">
                  <a
                    href="https://www.linkedin.com/in/sam-spitzer/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-8 h-8 flex items-center justify-center border border-dark-600 text-cream-100/50 hover:text-accent-400 hover:border-accent-500 transition-colors"
                    aria-label="LinkedIn"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                    </svg>
                  </a>
                </div>
              </div>

              {/* Quick Links */}
              <div>
                <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-xs mb-4">
                  Quick Links
                </h4>
                <nav className="flex flex-col gap-2">
                  <Link to="/about" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">About Us</Link>
                  <Link to="/services" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">Services</Link>
                  <Link to="/projects" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">Projects</Link>
                  <Link to="/contact" className="text-cream-100/50 hover:text-accent-400 transition-colors text-sm">Contact</Link>
                </nav>
              </div>

              {/* Contact Info */}
              <div>
                <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-xs mb-4">
                  Contact
                </h4>
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

              {/* Hours / Extra */}
              <div>
                <h4 className="text-cream-100 font-semibold tracking-wide uppercase text-xs mb-4">
                  Hours
                </h4>
                <div className="flex flex-col gap-2 text-cream-100/50 text-sm">
                  <p>Mon – Fri: 7:00 AM – 5:00 PM</p>
                  <p>Sat – Sun: Closed</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom copyright */}
          <div className="border-t border-dark-800">
            <div className="container-custom py-4 flex items-center justify-between text-xs text-cream-100/30">
              <p>© {new Date().getFullYear()} S&G Builders Supply Inc. All rights reserved.</p>
              <Link to="/employee-login" className="hover:text-accent-400 transition-colors">Employee Portal</Link>
            </div>
          </div>
        </footer>
      </section>
    </div>
  );
}

export default HomePage;