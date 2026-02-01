import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Check } from 'lucide-react';
import { services, stats } from '../data/services';

type SlideSettings = {
  focusX: number;
  focusYStart: number;
  focusYEnd: number;
  dim: number;
  leftGradient: number;
  blur: number;
  blurOpacity: number;
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
      dim: 25,
      leftGradient: 70,
      blur: 18,
      blurOpacity: 60,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      dim: 22,
      leftGradient: 62,
      blur: 18,
      blurOpacity: 55,
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
      <section className="relative h-screen min-h-[700px] overflow-hidden">
        {/* Background Image with Settings Applied */}
        <div className="absolute inset-0">
          {/* Blurred background layer */}
          <div 
            className="absolute inset-0 overflow-hidden"
            style={{ opacity: s.blurOpacity / 100 }}
          >
            <img
              src={current.image}
              alt=""
              className="absolute w-full h-full object-cover"
              style={{
                filter: `blur(${s.blur}px)`,
                transform: `scale(1.2)`,
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

          {/* Dim overlay */}
          <div 
            className="absolute inset-0 bg-black"
            style={{ opacity: s.dim / 100 }}
          />

          {/* Left gradient for text readability */}
          <div 
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to right, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.60) 35%, rgba(0,0,0,0.25) 65%, transparent 100%)`,
            }}
          />
        </div>

        {/* Hero Content */}
        <div className="relative h-full container-custom">
          <div className="flex flex-col justify-center h-full pt-20">
            <div className="max-w-2xl">
              <p className="text-accent-400 font-semibold tracking-[0.2em] uppercase text-sm mb-4 animate-fade-in">
                Your Complete Door, Hardware & Millwork Partner
              </p>

              <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-100 leading-[1.1] animate-fade-in-up">
                Opening Doors for<br />
                <span className="text-accent-400 whitespace-nowrap">Builders & Developers</span>
              </h1>
              <p className="mt-3 text-cream-100/70 text-xl font-medium animate-fade-in-up">Since 2019</p>

              <p className="mt-6 text-lg lg:text-xl text-cream-100/90 leading-relaxed max-w-lg animate-fade-in-up stagger-2">
                Multifamily and commercial door packages — from estimating to installation. Let us handle the details.
              </p>

              <div className="mt-10 flex flex-col sm:flex-row gap-4 animate-fade-in-up stagger-3">
                <Link to="/contact" className="btn-primary">
                  Get a Quote <ArrowRight className="w-5 h-5" />
                </Link>
                <Link to="/projects" className="btn-outline">
                  View Projects
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="mt-8 flex flex-wrap gap-6 animate-fade-in-up stagger-4">
                <div className="flex items-center gap-2 text-cream-100/70 text-sm">
                  <Check className="w-4 h-4 text-accent-400" />
                  Nationwide Delivery
                </div>
                <div className="flex items-center gap-2 text-cream-100/70 text-sm">
                  <Check className="w-4 h-4 text-accent-400" />
                  Professional Installation
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ============ INTRO SECTION ============ */}
      <section className="section-padding bg-dark-900 relative overflow-hidden noise-overlay">
        <div className="container-custom relative">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <div className="line-accent mb-6" />
              <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-cream-100">
                The Leader in<br />
                <span className="text-accent-400">Door & Hardware Supply</span>
              </h2>
              <p className="mt-6 text-cream-100/70 text-lg leading-relaxed">
                S&G Builders Supply is your complete source for doors, frames, hardware, 
                and molding. We specialize in multifamily residential and commercial construction, 
                providing complete door packages for projects ranging from small renovations to 
                large-scale developments with hundreds of units.
              </p>
              <p className="mt-4 text-cream-100/70 text-lg leading-relaxed">
                With nationwide delivery capabilities and professional installation services 
                throughout the tristate area, we streamline your procurement process and 
                ensure your project stays on schedule.
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center gap-2 mt-8 text-accent-400 font-semibold hover:text-accent-300 transition-colors"
              >
                Learn More About Us <ArrowRight className="w-5 h-5" />
              </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => (
                <div 
                  key={stat.label}
                  className={`p-8 border bg-dark-800/50 ${
                    idx === 0 ? 'border-accent-500/50' : 'border-dark-600'
                  }`}
                >
                  <div className="text-4xl lg:text-5xl font-display font-bold text-accent-400">
                    {stat.value}
                  </div>
                  <div className="mt-2 text-cream-100/60 text-sm uppercase tracking-wide">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ============ SERVICES SECTION ============ */}
      <section className="section-padding bg-dark-950">
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
      <section className="section-padding bg-dark-900 relative overflow-hidden">
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
      <section className="section-padding bg-dark-950 relative overflow-hidden">
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