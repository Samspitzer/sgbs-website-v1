import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Check } from 'lucide-react';
import { services } from '../data/services';

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

export function HomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

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
          <div className="absolute inset-0 overflow-hidden opacity-55">
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
          <div className="absolute inset-0 hero-overlay" />
          
          {/* Left gradient for text area */}
          <div className="absolute inset-0 hero-text-backdrop" />
          
          {/* Top gradient for header readability */}
          <div className="absolute inset-x-0 top-0 h-40 hero-top-gradient" />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container-custom">
          <div className="flex flex-col justify-center h-full pt-20">
            <div className="max-w-3xl">
              <p className="text-accent-400 font-bold tracking-[0.2em] uppercase text-sm mb-4 animate-fade-in hero-text">
                Your Complete Door, Hardware & Millwork Partner
              </p>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.1] animate-fade-in-up hero-text-strong">
                Opening Doors for<br />
                <span className="text-accent-400 whitespace-nowrap">Builders & Developers</span>
              </h1>
              <p className="mt-3 text-white text-xl font-semibold animate-fade-in-up stagger-1 hero-text">Since 2019</p>

              <p className="mt-6 text-2xl lg:text-3xl text-white font-bold leading-relaxed animate-fade-in-up stagger-2 hero-text-strong">
                Doors & millwork? Our problem. Not yours.
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
              <div className="mt-8 flex flex-wrap gap-6 animate-fade-in-up stagger-5 hero-text">
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <Check className="w-4 h-4 text-accent-400" />
                  Nationwide Delivery
                </div>
                <div className="flex items-center gap-2 text-white font-medium text-sm">
                  <Check className="w-4 h-4 text-accent-400" />
                  Professional Installation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRO SECTION ============ */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden snap-section">
        {/* Red line divider at top - spacer between header and section */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-accent-500 to-transparent" />
        
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="/images/backgrounds/intro.png"
            alt=""
            className="w-full h-full object-cover object-[50%_32%]"
          />
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="container-custom relative h-full flex flex-col items-center justify-center">
          {/* Text content - positioned for picture frame */}
          <div className="text-center" style={{ marginTop: '-26vh' }}>
            <h2 
              className="font-display text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight"
              style={{ textShadow: '2px 2px 8px rgba(0,0,0,0.7)' }}
            >
              Your Complete Partner for<br />
              <span className="text-accent-400">Doors, Hardware & Millwork</span>
            </h2>
            
            <p 
              className="mt-6 text-white/90 text-base leading-relaxed max-w-lg mx-auto"
              style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
            >
              S&G Builders Supply specializes in multifamily residential 
              and commercial construction. Complete door packages from 
              blueprint to punch list — one call, completely handled.
            </p>
          </div>
          
          {/* Buttons - positioned for wainscoting boxes */}
          <div className="absolute bottom-[21%] left-0 right-0 flex items-center justify-center">
            <div className="flex items-center" style={{ gap: '12vw' }}>
              <Link 
                to="/about" 
                className="text-accent-400 font-semibold text-lg hover:text-accent-300 transition-colors"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
              >
                About Our Company
              </Link>
              <Link 
                to="/services" 
                className="text-white font-semibold text-lg hover:text-white/80 transition-colors"
                style={{ textShadow: '1px 1px 4px rgba(0,0,0,0.7)' }}
              >
                Our Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="min-h-screen flex items-center bg-dark-950 snap-section py-20">
        <div className="container-custom">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="line-accent mx-auto mb-6" />
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100">
              Full-Service Solutions
            </h2>
            <p className="mt-4 text-cream-100/70 text-lg">
              From initial estimating through final punch list, we handle every phase of your door and hardware scope.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = service.icon;
              return (
                <div
                  key={service.id}
                  className="group p-8 bg-dark-900 border border-dark-700 hover:border-accent-500/50 transition-all duration-300"
                >
                  <div className="w-14 h-14 flex items-center justify-center bg-accent-500/10 text-accent-400 mb-6 group-hover:bg-accent-500 group-hover:text-white transition-all duration-300">
                    <Icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-semibold text-cream-100 mb-3">
                    {service.title}
                  </h3>
                  <p className="text-cream-100/60 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link to="/services" className="btn-outline">
              All Services <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* ============ FEATURED PROJECTS SECTION ============ */}
      <section className="min-h-screen flex items-center bg-dark-900 relative overflow-hidden snap-section py-20">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
            <div>
              <div className="line-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100">
                Featured Projects
              </h2>
              <p className="mt-4 text-cream-100/70 text-lg max-w-xl">
                A sample of recent multifamily and commercial work across the Northeast and beyond.
              </p>
            </div>
            <Link to="/projects" className="btn-outline shrink-0">
              View All Projects <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.slice(0, 6).map((project) => (
              <article
                key={project.id}
                className="group relative aspect-[4/3] overflow-hidden card-hover"
              >
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover card-image transition-transform duration-700"
                />
                <div className="absolute inset-0 overlay-gradient" />
                <div className="absolute inset-0 bg-accent-500/0 group-hover:bg-accent-500/20 transition-colors duration-300" />
                
                <div className="absolute bottom-0 left-0 right-0 p-6">
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
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ============ CTA SECTION ============ */}
      <section className="min-h-screen flex items-center bg-dark-950 relative overflow-hidden snap-section">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent-500/20 rounded-full blur-3xl" />
        </div>
        
        <div className="container-custom relative">
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
      </section>
    </div>
  );
}

export default HomePage;